# FALKOR_PLAYBOOK.md

> Operational reference for Falkor (the autonomous coding agent). Read this on every fresh session. Lives at `LuckDragonAsgard/asgard-workers/FALKOR_PLAYBOOK.md`.

## ZERO-TOLERANCE RULES (never violate)

1. **Persistence locations only:** GitHub `LuckDragonAsgard/asgard-workers` for code/configs, CF D1 for structured data, CF KV (`env.ASSETS`) for session state, CF Vectorize via falkor-brain for semantic memory, Google Drive only when user explicitly asks for an Office file.
2. **NEVER write to ephemeral paths:** AppData, /tmp, /sessions/, /var/, /usr/. Lost forever next session.
3. **NEVER hardcode drive letters:** Paddy uses multiple machines. Use `present_files` for Office docs.
4. **NEVER use** `req`, `method`, `env.DB`, `env.ASGARD`, `defaultBranch` — these don't exist.
5. **Always verify after deploy.** Use `verify_endpoint` not just `web_fetch`.

## CODEBASE PATTERNS (falkor-tools.js)

### Variables in fetch handler scope
- `request` (NOT `req`), `request.method` (NOT `method`)
- `env.CF_ACCOUNT_ID`, `env.D1_DB_ID`, `env.CF_API_TOKEN`, `env.AGENT_PIN`, `env.ANTHROPIC_API_KEY`, `env.GITHUB_TOKEN`, `env.VAULT_PIN`, `env.VAULT_URL`
- `env.ASSETS` (KV binding)
- `url = new URL(request.url)`

### D1 query pattern
```js
const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
  method:'POST',
  headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},
  body: JSON.stringify({sql:'SELECT...', params:[a,b,c]}),
});
const d = await r.json();
const rows = d.result?.[0]?.results || [];
```

### Endpoint pattern
```js
if(url.pathname==='/api/your/path'&&request.method==='POST'){
  try {
    const body = await request.json();
    return Response.json({ok:true, ...}, {headers:{...CORS,...NOCACHE}});
  } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
}
```

## HOW TO ADD A NEW ENDPOINT

1. `grep_file path=falkor-tools.js pattern="existing similar endpoint"` to find anchor
2. `read_file` with `start_line`/`end_line` for 15 lines context
3. `edit_file` with 5+ lines surrounding context as `old_string` so it's unique
4. `cf_deploy_worker name=falkor-tools`
5. `verify_endpoint url=/api/your/path expected_field=ok`
6. If verify fails, READ the response, FIX, redeploy

## HOW TO ADD A NEW AGENT TOOL

Three edits, bundle via `multi_edit`:

1. **Registration** in `AGENT_TOOLS` array:
```js
{ name:'tool_name', description:'what it does + when to use',
  input_schema:{ type:'object', properties:{ field:{type:'string'} }, required:['field'] } },
```

2. **needRepo list** — add tool name only if it requires GitHub repo context (most don't).

3. **Handler** in `execAgentTool` function:
```js
if (name === 'tool_name') {
  try {
    // ... logic ...
    return { ok:true, result: ... };
  } catch(e) { return { error: 'tool_name: '+String(e).substring(0,200) }; }
}
```

## HOW TO ADD A NEW SUB-WORKER

1. `write_file path=worker-name.js content=<full source>` — creates the file on GitHub
2. `cf_deploy_worker name=worker-name` — auto-detects Durable Object classes from `export class Foo {}` and adds the migration metadata on first deploy
3. To wire a custom domain: call CF API directly via `web_fetch` POST to `/accounts/{ACCT}/workers/domains` with `{environment:'production', hostname:'worker-name.luckdragon.io', service:'worker-name', zone_id:'<luckdragon.io zone>'}`
4. `verify_endpoint url=https://worker-name.luckdragon.io/health expected_field=ok`

## HOW TO ADD A DURABLE OBJECT WORKER

Same as new sub-worker, but the source must use `export class ClassName { constructor(state, env) {...} async fetch(req) {...} }` — `cf_deploy_worker` auto-detects and creates the binding (named `CLASS_NAME` in SCREAMING_SNAKE) + first-time migration. Subsequent deploys skip migration automatically. **Don't try to migrate the same class twice — CF rejects.** If you need to rename/delete a class, increment the migration tag manually.

## RUNTIME CAVEATS

- **CF Workers can't `eval`** — no `new Function()` allowed. Use regex or string parsing instead.
- **Sub-request loops** — a worker can't fetch its own URL (causes 522). For self-introspection, access constants/state directly.
- **UTF-8 encoding** — never use raw `atob`/`btoa` for source code. Use `decodeURIComponent(escape(atob(...)))` to read and `btoa(unescape(encodeURIComponent(x)))` to write. For binary deploys, use `Uint8Array.from(atob(...), c => c.charCodeAt(0))` and pass bytes directly to multipart body — never round-trip via string.
- **Template literal escapes inside HTML constant** — `\n`, `\t` get evaluated. Use `String.fromCharCode(10)` for literal newlines in regex. Use `\\\\` for literal backslash in served JS.
- **522/530 errors** — transient CF infra. `verify_endpoint` retries 3 times with 4s delay. If still 522 after 3 retries, the worker is genuinely broken — check CF logs.
- **CF deploy quirks** — DO classes can't be migrated twice with same tag. KV binding names must be unique. `keep_bindings` must list every type you want preserved (`secret_text`, `kv_namespace`, `d1`, `durable_object_namespace`, etc).

## VERIFICATION WORKFLOW

Always after deploy:
```
verify_endpoint url=/your/path expected_field=ok
```

If it returns:
- `{ok:false, error:'endpoint not registered'}` → your route handler regex/path is wrong, or you're hitting the SPA fallthrough
- `{ok:false, error:'CF infra error: 522'}` → wait + retry, or check worker logs
- `{ok:false, endpoint_error: '...'}` → endpoint code threw, fix it
- `{ok:true, body:{...}}` → success

## TROUBLESHOOTING COMMON ERRORS

| Error | Likely Cause | Fix |
|---|---|---|
| `ReferenceError: req is not defined` | Used `req` instead of `request` | s/req/request/ |
| `TypeError: Cannot read properties of undefined (reading 'prepare')` | Used `env.DB.prepare()` | Switch to fetch-to-D1 pattern |
| `endpoint not registered (HTML fallthrough)` | Pathname mismatch in route | grep + edit the route check |
| `Uncaught SyntaxError: missing )` after deploy | Unescaped quote or template literal escape leaked | Look at served HTML at the line/col, fix escape |
| `ReferenceError: defaultBranch is not defined` | Stale write_file code | Use latest write_file (defaultBranch removed) |
| `keep_bindings has unknown type d1_database` | Wrong type name in metadata | Use `d1` not `d1_database` for keep_bindings |
| `Cannot apply new-sqlite-class migration to class X already depended on` | DO already migrated | cf_deploy_worker skips migration on re-deploy |

## INTEGRATION RECIPES

### Adding a new external API integration (Suno/Kling/Tripo/etc)

1. Sign up, get API key. User adds to vault as `<PROVIDER>_API_KEY`.
2. Add `<PROVIDER>_API_KEY` binding to falkor-tools (or asgard-ai if it's a "service"-tier integration). Modify deploy metadata.
3. Write endpoint: `if(url.pathname==='/api/<provider>/<action>')` that proxies to provider's API with `Bearer env.<PROVIDER>_API_KEY`.
4. Add agent tool wrapper for Falkor to call it.
5. Verify with verify_endpoint.

### Adding scheduled task (cron)

1. Add an `else if (cron === '<cron-string>') { ... }` branch to the `scheduled` handler in falkor-tools.js
2. Update CF crons list via CF API: `PUT /workers/scripts/falkor-tools/schedules` with `[{cron:'...'}, ...]`
3. KV-log results: `await env.ASSETS.put('cron:<name>:'+now.toISOString(), JSON.stringify({...}), {expirationTtl: 7*86400})`

## IF YOU GET STUCK

- Run `fleet_health` to see all 21 workers' status
- Run `self_heal_worker name=<worker>` to redeploy a broken worker from GitHub
- Check `/api/falkor/improvements` to see what previous self-improve cycles did
- Read `falkor-tools.js` itself if confused about a pattern — it IS the reference implementation
- If your edit_file or multi_edit fails with "old_string not found", you're working from stale source — pull HEAD again

## REMEMBER

You are Paddy's coding agent. Be terse. Ship things. Test after deploy. Never pretend something works without verifying. Never write to temp folders. Always commit messages that describe the change, not "edit_file via Falkor agent".
