// falkor-tools v2.1.0 — Asgard-style project hub with Finance, sorting, all info per project
const PROJECTS_API = 'https://falkor-dashboard.luckdragon.io/api/projects';
const VERIFY_API   = 'https://falkor-push.luckdragon.io/user/verify';
const CHAT_API     = '/api/chat';

const AGENT_TOOLS = [
          { name:'grep_file', description:'Search a file for a regex pattern. Returns matching line numbers with context. Use this to navigate large files instead of paging through chunks. flags=i for case-insensitive.',
            input_schema:{ type:'object', properties:{ path:{type:'string'}, pattern:{type:'string'}, flags:{type:'string'}, context:{type:'integer'} }, required:['path','pattern'] } },
          { name:'edit_file', description:"Make a precise, surgical edit to a file. Provide old_string (exact text to find) and new_string (replacement). The old_string must appear EXACTLY ONCE in the file unless replace_all=true. Best for editing large files (e.g. falkor-tools.js itself) without rewriting everything. Auto-commits.",
            input_schema:{ type:'object', properties:{ path:{type:'string'}, old_string:{type:'string', description:'exact text to replace — include enough context to be unique'}, new_string:{type:'string'}, replace_all:{type:'boolean', description:'replace every occurrence (default false)'}, message:{type:'string', description:'commit message'} }, required:['path','old_string','new_string'] } },
          { name:'verify_endpoint', description:"Verify a Falkor endpoint returns valid JSON (not HTML fallthrough or 522 error). Use AFTER cf_deploy_worker. If response is HTML or contains \"error code: 522\", waits 5s and retries up to 3 times. Returns ok:true with the parsed JSON if successful, ok:false with details if failing.",
            input_schema:{ type:'object', properties:{ url:{type:'string',description:'path like /api/foo or full URL'}, method:{type:'string',description:'GET or POST',default:'GET'}, body:{type:'object',description:'JSON body for POST'}, expected_field:{type:'string',description:'optional field name expected in response (e.g. ok, results)'} }, required:['url'] } },
          { name:'drive_search', description:'Search Paddy\'s Google Drive by query string. Returns list of {id, name, mimeType, modifiedTime, webViewLink}. Use for finding existing docs.',
            input_schema:{ type:'object', properties:{ query:{type:'string'}, max_results:{type:'integer'} }, required:['query'] } },
          { name:'drive_upload', description:'Upload a file to Paddy\'s Google Drive. Provide name, mime type (text/plain, text/markdown, application/vnd.google-apps.document, etc), content. Returns {id, webViewLink}.',
            input_schema:{ type:'object', properties:{ name:{type:'string'}, mime:{type:'string'}, content:{type:'string'}, folder_id:{type:'string',description:'optional Drive folder ID'} }, required:['name','content'] } },
          { name:'drive_list_recent', description:'List recently modified files in Paddy\'s Drive. Returns list of {id, name, mimeType, modifiedTime, webViewLink}.',
            input_schema:{ type:'object', properties:{ max_results:{type:'integer',description:'default 20'} } } },
          { name:'multi_edit', description:"Apply multiple edits to a file in ONE commit. Each edit is {old_string, new_string, replace_all?}. Edits applied sequentially. If any old_string is not found or not unique (when replace_all=false), the whole batch fails before commit. Use to bundle related changes.",
            input_schema:{ type:'object', properties:{ path:{type:'string'}, edits:{type:'array', items:{type:'object', properties:{old_string:{type:'string'}, new_string:{type:'string'}, replace_all:{type:'boolean'}}, required:['old_string','new_string']}}, message:{type:'string'} }, required:['path','edits'] } },
          { name:'delegate', description:'Send a question to a sibling worker and get its reply. workers: school|kbt|sport|code|brain|web. Use for specialist topics: PE/lessons/weather → school; trivia → kbt; AFL/NRL/racing → sport; coding → code; semantic recall → brain; web research → web.', input_schema:{ type:'object', properties:{ worker:{type:'string'}, message:{type:'string'} }, required:['worker','message'] } },
          { name:'list_files', description:'List files in the project repo at a given path. Returns names + types (file/dir).',
            input_schema:{ type:'object', properties:{ path:{ type:'string', description:'Path within repo, empty string for root' } }, required:[] } },
          { name:'read_file', description:'Read a file from the project repo. Large files (>180KB) auto-fall to git blobs API. Pass start_line/end_line for chunked reading of huge files.',
            input_schema:{ type:'object', properties:{ path:{ type:'string' }, start_line:{type:'integer'}, end_line:{type:'integer'} }, required:['path'] } },
          { name:'write_file', description:'Write/overwrite a file in the project repo and commit. Use after the user confirms a change.',
            input_schema:{ type:'object', properties:{ path:{ type:'string' }, content:{ type:'string' }, message:{ type:'string', description:'Commit message' } }, required:['path','content','message'] } },
          { name:'update_project_metadata', description:"Update this project metadata in the Asgard D1 products table. Use to fix URL, status, dates, costs, revenue projections, descriptions. Auto-stamps last_updated.",
            input_schema:{ type:'object', properties:{
              live_url:{type:'string'},
              github_url:{type:'string'},
              status:{type:'string',description:'live | active | dev | building | idea | merged | archived | dormant'},
              description:{type:'string'},
              cost_monthly:{type:'number'},
              cost_notes:{type:'string'},
              revenue_y1:{type:'number'},
              revenue_y2:{type:'number'},
              revenue_y3:{type:'number'},
              next_action:{type:'string'},
              progress_pct:{type:'number'},
              notes:{type:'string'},
            }, required:[] } },
          { name:'web_fetch', description:"Fetch a URL over HTTP. Returns response status, headers, and body (truncated to 30KB). Use for reading docs, JSON APIs, etc.",
            input_schema:{ type:'object', properties:{ url:{type:'string'}, method:{type:'string',description:'GET/POST/etc, default GET'}, body:{type:'string'}, headers:{type:'object'} }, required:['url'] } },
          { name:'web_search', description:"Search the web via DuckDuckGo. Returns top 5 results with title + snippet + URL.",
            input_schema:{ type:'object', properties:{ query:{type:'string'} }, required:['query'] } },
          { name:'run_d1_query', description:"Run a SQL query against the Asgard D1 products database. Tables: products (50 projects), spend_log, deployments, audit_log, conversations, messages, etc. Use SELECT for reads, UPDATE for changes (be careful). Use ? params to avoid SQL injection.",
            input_schema:{ type:'object', properties:{ sql:{type:'string'}, params:{type:'array', items:{}} }, required:['sql'] } },
          { name:'vault_get', description:"Fetch a secret value from asgard-vault by key name. Use for tokens/credentials. Available keys: ANTHROPIC_API_KEY, GITHUB_TOKEN, CF_API_TOKEN, RESEND_API_KEY, STRIPE_SECRET_KEY, SUPABASE_*, etc.",
            input_schema:{ type:'object', properties:{ key:{type:'string'} }, required:['key'] } },
          { name:'cf_deploy_worker', description:"Re-deploy a Cloudflare worker from the latest source in LuckDragonAsgard/asgard-workers GitHub repo. Use after editing a worker file via write_file. Existing bindings are preserved.",
            input_schema:{ type:'object', properties:{ name:{type:'string',description:'Worker name e.g. falkor-tools, falkor-agent'} }, required:['name'] } },
          { name:'list_workers', description:"List all Cloudflare workers in the account with their last-modified time. Use to see the fleet.",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'browser_navigate', description:"Navigate the user's Chrome browser to a URL (active tab). Requires the Falkor Browser Bridge extension to be installed and connected.",
            input_schema:{ type:'object', properties:{ url:{type:'string'}, tabId:{type:'number'} }, required:['url'] } },
          { name:'browser_screenshot', description:"Capture a screenshot of the user's current browser viewport as PNG. Returns base64.",
            input_schema:{ type:'object', properties:{ tabId:{type:'number'} }, required:[] } },
          { name:'browser_click', description:"Click an element in the user's browser. Provide either CSS selector or x,y coordinates.",
            input_schema:{ type:'object', properties:{ selector:{type:'string'}, x:{type:'number'}, y:{type:'number'}, tabId:{type:'number'} }, required:[] } },
          { name:'browser_type', description:"Type text into an input/textarea in the user's browser. Provide selector to target element.",
            input_schema:{ type:'object', properties:{ selector:{type:'string'}, text:{type:'string'}, tabId:{type:'number'} }, required:['text'] } },
          { name:'browser_press_key', description:"Press a key in the user's browser (Enter, Tab, Escape, etc.).",
            input_schema:{ type:'object', properties:{ key:{type:'string'}, tabId:{type:'number'} }, required:['key'] } },
          { name:'browser_extract', description:"Extract text from the user's browser. Without selector returns full page text. With selector returns matching element details.",
            input_schema:{ type:'object', properties:{ selector:{type:'string'}, tabId:{type:'number'} }, required:[] } },
          { name:'browser_get_html', description:"Get the HTML of the user's browser page or a specific element.",
            input_schema:{ type:'object', properties:{ selector:{type:'string'}, tabId:{type:'number'} }, required:[] } },
          { name:'browser_eval', description:"Run arbitrary JavaScript in the user's browser page context. Returns the value of the last expression.",
            input_schema:{ type:'object', properties:{ code:{type:'string'}, tabId:{type:'number'} }, required:['code'] } },
          { name:'browser_tabs', description:"List all open tabs in the user's browser.",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'browser_new_tab', description:"Open a new tab in the user's browser.",
            input_schema:{ type:'object', properties:{ url:{type:'string'} }, required:[] } },
          { name:'browser_close_tab', description:"Close a tab in the user's browser by tabId.",
            input_schema:{ type:'object', properties:{ tabId:{type:'number'} }, required:[] } },
          { name:'browser_scroll', description:"Scroll the user's browser page by x,y pixels. Set absolute=true to scroll to position instead of by delta.",
            input_schema:{ type:'object', properties:{ x:{type:'number'}, y:{type:'number'}, absolute:{type:'boolean'} }, required:[] } },
          { name:'generate_image', description:"Generate an image from a text prompt via asgard-ai image generation (Flux / SDXL / Gemini Imagen depending on availability). Returns a URL or base64 of the generated PNG.",
            input_schema:{ type:'object', properties:{ prompt:{type:'string'}, model:{type:'string',description:'optional model hint: flux, sdxl, gemini'}, width:{type:'number'}, height:{type:'number'} }, required:['prompt'] } },
          { name:'cf_kv_list', description:"List keys in the falkor-tools ASSETS KV namespace, with optional prefix filter. Useful for browsing uploaded mascots or browser results.",
            input_schema:{ type:'object', properties:{ prefix:{type:'string'} }, required:[] } },
          { name:'cf_kv_get', description:"Get a value from the ASSETS KV namespace by key.",
            input_schema:{ type:'object', properties:{ key:{type:'string'} }, required:['key'] } },
          { name:'save_memory', description:"Save a fact to long-term memory about this user. Use when user says 'remember that X' or whenever you learn something durable about their preferences, work style, or platform.",
            input_schema:{ type:'object', properties:{ fact:{type:'string'}, category:{type:'string',description:'profile, preferences, platform, project, style, etc.'}, importance:{type:'number',description:'1-10, default 5'} }, required:['fact'] } },
          { name:'recall_memory', description:"Search remembered facts about the user. Returns matching memories.",
            input_schema:{ type:'object', properties:{ query:{type:'string',description:'optional keyword filter'}, category:{type:'string',description:'optional category filter'} }, required:[] } },
          { name:'list_memories', description:"List all stored memories for this user, sorted by importance.",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'delete_memory', description:"Delete a stored memory by id. Use when user says 'forget X'.",
            input_schema:{ type:'object', properties:{ id:{type:'number'} }, required:['id'] } },
          { name:'self_heal_worker', description:"Trigger Falkor's self-healing routine on a Cloudflare worker (via falkor-code). Restarts unhealthy workers, redeploys from GitHub if missing.",
            input_schema:{ type:'object', properties:{ name:{type:'string',description:'worker name, omit to heal whole fleet'} }, required:[] } },
          { name:'fleet_health', description:"Get health + version of every worker in the fleet (via falkor-code /workers).",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'vector_remember', description:"Store a fact in the falkor-brain Vectorize index for semantic recall (richer than D1 memory). Use for things you want to look up later by meaning, not just keyword.",
            input_schema:{ type:'object', properties:{ text:{type:'string'}, source:{type:'string'} }, required:['text'] } },
          { name:'vector_recall', description:"Semantic search the falkor-brain Vectorize index. Returns top-K most similar facts to a query.",
            input_schema:{ type:'object', properties:{ query:{type:'string'}, k:{type:'number'} }, required:['query'] } },
          { name:'afl_ladder', description:"Live AFL ladder via Squiggle API (falkor-sport).",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'nrl_ladder', description:"Live NRL ladder via nrl.com API (falkor-sport).",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'racing_comp', description:"Family racing tipping competition leaderboard + today's picks (falkor-sport).",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'pe_advisor', description:"Get PE outdoor lesson advice for today — temperature, UV, conditions, recommendation (falkor-school /pe-advisor).",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'xc_results', description:"Cross-country results for a date (falkor-school /xc/results).",
            input_schema:{ type:'object', properties:{ date:{type:'string',description:'YYYY-MM-DD'} }, required:[] } },
          { name:'kbt_game_status', description:"Get status of a live KBT trivia game by code (falkor-kbt).",
            input_schema:{ type:'object', properties:{ code:{type:'string'} }, required:['code'] } },
        ];
const UPSTREAM_CHAT = 'https://asgard-ai.luckdragon.io/chat/smart';


async function execAgentTool(name, input, env, project, owner, repo, ghHeaders) {
          const needRepo = ['list_files','read_file','grep_file','edit_file','multi_edit','write_file','cf_deploy_worker'].includes(name);
          if (needRepo && !owner && name !== 'cf_deploy_worker') {
            // cf_deploy_worker pulls from a fixed repo, others need project repo
            return { error:'No GitHub repo bound to this project — cannot run '+name+'.' };
          }
          if (name === 'list_files') {
            const p = (input.path||'').replace(/^\//,'');
            const r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
            if (!r.ok) return { error:'list_files HTTP '+r.status };
            const d = await r.json();
            if (!Array.isArray(d)) return { error:'Path is a file, not a directory' };
            return { files: d.map(f => ({ name:f.name, type:f.type, size:f.size })) };
          }
          if (name === 'grep_file') {
            const p = (input.path||'').replace(/^\//,'');
            const pat = input.pattern || '';
            if (!pat) return { error:'pattern required' };
            let r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
            if (!r.ok) return { error:'grep HTTP '+r.status };
            let d = await r.json();
            let decoded = '';
            if (d.content) decoded = decodeURIComponent(escape(atob(d.content.replace(/\n/g,''))));
            else if (d.size && d.sha) {
              const br = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/git/blobs/"+d.sha, {headers: ghHeaders});
              if (br.ok) { const bd = await br.json(); if (bd.content) decoded = decodeURIComponent(escape(atob(bd.content.replace(/\n/g,'')))); }
            }
            if (!decoded) return { error:'No content' };
            const lines = decoded.split(String.fromCharCode(10));
            const ctx = parseInt(input.context)||2;
            let regex;
            try { regex = new RegExp(pat, input.flags||'i'); }
            catch(e) { return { error:'bad regex: '+e.message }; }
            const matches = [];
            for (let i=0;i<lines.length;i++) {
              if (regex.test(lines[i])) {
                const lo = Math.max(0,i-ctx), hi = Math.min(lines.length-1,i+ctx);
                const slice = lines.slice(lo,hi+1).map((l,j)=>(lo+j+1)+':'+l).join(String.fromCharCode(10));
                matches.push({ line: i+1, snippet: slice });
                if (matches.length >= 30) break;
              }
            }
            return { path:p, total_lines: lines.length, match_count: matches.length, matches };
          }
          if (name === 'read_file') {
            const p = (input.path||'').replace(/^\//,'');
            let r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
            if (!r.ok) return { error:'read_file HTTP '+r.status };
            let d = await r.json();
            let decoded = '';
            let sha = d.sha;
            if (d.content) {
              decoded = decodeURIComponent(escape(atob(d.content.replace(/\n/g,''))));
            } else if (d.size && d.sha) {
              const br = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/git/blobs/"+d.sha, {headers: ghHeaders});
              if (br.ok) {
                const bd = await br.json();
                if (bd.content) decoded = decodeURIComponent(escape(atob(bd.content.replace(/\n/g,''))));
                else return { error: 'No content from blobs API' };
              } else return { error: 'blobs HTTP '+br.status };
            } else return { error: 'No content (might be a directory)' };
            const sl = parseInt(input.start_line)||0, el2 = parseInt(input.end_line)||0;
            if (sl>0 || el2>0) {
              const lines = decoded.split(String.fromCharCode(10));
              const slice = lines.slice(Math.max(0,sl-1), el2 || lines.length);
              return { path:p, sha, total_lines: lines.length, start_line: sl||1, end_line: (el2||lines.length), content: slice.join(String.fromCharCode(10)) };
            }
            const MAX = 180000;
            return { path:p, sha, total_bytes: decoded.length, content: decoded.length>MAX ? decoded.substring(0,MAX)+String.fromCharCode(10)+"[truncated at "+MAX+" of "+decoded.length+" bytes — pass start_line/end_line for chunked read]" : decoded };
          }
          if (name === 'update_project_metadata') {
            if (!project || !project.id) return { error:'No project id; cannot update metadata.' };
            const allowed = ['live_url','github_url','status','description','cost_monthly','cost_notes','revenue_y1','revenue_y2','revenue_y3','next_action','progress_pct','notes'];
            const sets = []; const params = [];
            for (const k of allowed) {
              if (input[k] !== undefined) { sets.push(k+' = ?'); params.push(input[k]); }
            }
            if (sets.length === 0) return { error:'No fields to update' };
            sets.push("last_updated = datetime('now')");
            params.push(project.id);
            const sql = "UPDATE products SET "+sets.join(', ')+" WHERE id = ?";
            const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
              method:'POST',
              headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
              body: JSON.stringify({ sql, params }),
            });
            const d = await r.json();
            if (!d.success) return { error:'D1 update failed', detail: JSON.stringify(d.errors||[]).substring(0,300) };
            return { ok:true, updated_fields: Object.keys(input), changes: d.result?.[0]?.meta?.changes };
          }
          if (name === 'web_fetch') {
            try {
              const r = await fetch(input.url, { method: input.method||'GET', headers: input.headers||{}, body: input.body });
              const text = await r.text();
              return { status: r.status, headers: Object.fromEntries(r.headers.entries()), body: text.length>30000 ? text.substring(0,30000)+'...[truncated]' : text };
            } catch(e) { return { error: 'fetch failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'web_search') {
            try {
              const u = 'https://html.duckduckgo.com/html/?q='+encodeURIComponent(input.query||'');
              const r = await fetch(u, { headers: { 'User-Agent':'Mozilla/5.0' } });
              const html = await r.text();
              // crude extraction of result-link blocks
              const results = [];
              const re = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>[\s\S]*?class="result__snippet"[^>]*>(.*?)<\/a>/g;
              let m;
              while((m = re.exec(html)) && results.length < 5) {
                const strip = s => s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'");
                let url = m[1]; const um = url.match(/uddg=([^&]+)/); if(um) url = decodeURIComponent(um[1]);
                results.push({ title: strip(m[2]).trim(), url, snippet: strip(m[3]).trim() });
              }
              return { query: input.query, results };
            } catch(e) { return { error: 'search failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'run_d1_query') {
            try {
              const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST',
                headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
                body: JSON.stringify({ sql: input.sql, params: input.params||[] }),
              });
              const d = await r.json();
              if (!d.success) return { error: 'D1 error', detail: JSON.stringify(d.errors||[]).substring(0,400) };
              const rows = d.result?.[0]?.results || [];
              const meta = d.result?.[0]?.meta || {};
              return { rows: rows.length>50 ? rows.slice(0,50) : rows, total: rows.length, meta };
            } catch(e) { return { error: 'query failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'vault_get') {
            try {
              const r = await fetch(env.VAULT_URL+'/secret/'+encodeURIComponent(input.key||''), { headers: { 'X-Pin': env.VAULT_PIN } });
              if (!r.ok) return { error: 'vault HTTP '+r.status };
              const text = await r.text();
              if (text.startsWith('{') && text.includes('"error"')) return { error: text.substring(0,200) };
              return { key: input.key, value: text };
            } catch(e) { return { error: 'vault fetch failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'cf_deploy_worker') {
            try {
              const wname = (input.name||'').replace(/[^a-zA-Z0-9-]/g,'');
              if (!wname) return { error: 'worker name required' };
              const ghr = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/contents/'+wname+'.js', { headers: ghHeaders });
              if (!ghr.ok) return { error: 'worker source not found in repo: '+wname+'.js (HTTP '+ghr.status+')' };
              const ghd = await ghr.json();
              const codeBytes = Uint8Array.from(atob(ghd.content.replace(/\n/g,'')), c => c.charCodeAt(0));
              const codeText = new TextDecoder().decode(codeBytes);
              // Auto-detect Durable Object classes
              const doClasses = [];
              const doRe = /export\s+class\s+([A-Z]\w*)/g;
              let mm; while ((mm = doRe.exec(codeText)) !== null) doClasses.push(mm[1]);
              const requestedDOs = Array.isArray(input.do_classes) ? input.do_classes : doClasses;
              const bindings = [];
              for (const cls of requestedDOs) {
                const bname = cls.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
                bindings.push({ type: 'durable_object_namespace', name: bname, class_name: cls });
              }
              const metadata = { main_module:'worker.js', compatibility_date:'2024-09-30', bindings, keep_bindings:['secret_text','kv_namespace','durable_object_namespace','d1','queue','r2_bucket','analytics_engine'] };
              if (requestedDOs.length > 0) {
                metadata.migrations = { tag: 'v1', new_sqlite_classes: requestedDOs };
              }
              const boundary = '----b42deploy'+Date.now();
              const enc = new TextEncoder();
              const head = enc.encode('--'+boundary+'\r\nContent-Disposition: form-data; name="metadata"\r\nContent-Type: application/json\r\n\r\n'+JSON.stringify(metadata)+'\r\n--'+boundary+'\r\nContent-Disposition: form-data; name="worker.js"; filename="worker.js"\r\nContent-Type: application/javascript+module\r\n\r\n');
              const tail = enc.encode('\r\n--'+boundary+'--\r\n');
              const body = new Uint8Array(head.length + codeBytes.length + tail.length);
              body.set(head, 0); body.set(codeBytes, head.length); body.set(tail, head.length + codeBytes.length);
              const dr = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/workers/scripts/'+wname, {
                method:'PUT',
                headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'multipart/form-data; boundary='+boundary },
                body,
              });
              const dd = await dr.json();
              if (!dd.success) return { error: 'deploy failed', detail: JSON.stringify(dd.errors||[]).substring(0,400) };
              return { ok:true, worker: wname, deployment_id: dd.result?.deployment_id, source_sha: ghd.sha };
            } catch(e) { return { error: 'deploy failed: '+String(e).substring(0,200) }; }
          }
          // Helper to dispatch browser commands via Chrome extension bridge
          async function browserDispatch(action, input) {
            const cmdId = 'b_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
            // append to queue
            const queue = await env.ASSETS.get('browser:queue', { type:'json' }) || [];
            queue.push({ id: cmdId, action, input });
            await env.ASSETS.put('browser:queue', JSON.stringify(queue));
            // poll for result up to 25s
            const deadline = Date.now() + 45000;
            while (Date.now() < deadline) {
              await new Promise(r => setTimeout(r, 400));
              const res = await env.ASSETS.get('browser:result:'+cmdId);
              if (res) {
                await env.ASSETS.delete('browser:result:'+cmdId);
                try { return JSON.parse(res); } catch(e) { return { error:'bad result' }; }
              }
            }
            return { error: 'browser timeout — is the Falkor Bridge extension installed and connected?' };
          }
          if (name === 'generate_image') {
            try {
              const r = await fetch('https://asgard-ai.luckdragon.io/image/generate', {
                method:'POST',
                headers:{ 'Content-Type':'application/json', 'X-Pin': env.AGENT_PIN },
                body: JSON.stringify({ prompt: input.prompt, model: input.model, width: input.width, height: input.height }),
              });
              const text = await r.text();
              try { const d = JSON.parse(text); return d; }
              catch(e) { return { ok:false, error: 'image gen returned non-json', body: text.substring(0,300) }; }
            } catch(e) { return { error: 'image gen failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'cf_kv_list') {
            try {
              const u = 'https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/storage/kv/namespaces/84ba4a49116b4e62913498de3dbacfa5/keys'+(input.prefix?'?prefix='+encodeURIComponent(input.prefix):'');
              const r = await fetch(u, { headers: { 'Authorization':'Bearer '+env.CF_API_TOKEN } });
              const d = await r.json();
              return { keys: (d.result||[]).map(k => k.name) };
            } catch(e) { return { error: 'kv list failed' }; }
          }
          if (name === 'cf_kv_get') {
            try {
              const v = await env.ASSETS.get(input.key);
              return { key: input.key, value: v ? (v.length>5000 ? v.substring(0,5000)+'...[truncated]' : v) : null };
            } catch(e) { return { error: 'kv get failed' }; }
          }
          if (name === 'save_memory') {
            try {
              const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST',
                headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
                body: JSON.stringify({ sql:"INSERT INTO falkor_memory (user_id, category, fact, source, importance) VALUES (?,?,?,?,?)", params:["paddy", input.category||"general", input.fact, "agent", input.importance||5] }),
              });
              const d = await r.json();
              if (!d.success) return { error:'save failed', detail: JSON.stringify(d.errors||[]) };
              return { ok:true, id: d.result?.[0]?.meta?.last_row_id, fact: input.fact };
            } catch(e){ return { error:'save failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'recall_memory') {
            try {
              let sql = 'SELECT id, category, fact, importance, created_at FROM falkor_memory WHERE user_id="paddy"';
              const params = [];
              if (input.category) { sql += ' AND category = ?'; params.push(input.category); }
              if (input.query) { sql += ' AND fact LIKE ?'; params.push('%'+input.query+'%'); }
              sql += ' ORDER BY importance DESC, created_at DESC LIMIT 30';
              const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
                body: JSON.stringify({ sql, params }),
              });
              const d = await r.json();
              return { memories: d.result?.[0]?.results || [] };
            } catch(e){ return { error: 'recall failed' }; }
          }
          if (name === 'list_memories') {
            try {
              const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
                body: JSON.stringify({ sql:'SELECT id, category, fact, importance, created_at FROM falkor_memory WHERE user_id="paddy" ORDER BY importance DESC, created_at DESC' }),
              });
              const d = await r.json();
              return { memories: d.result?.[0]?.results || [] };
            } catch(e){ return { error: 'list failed' }; }
          }
          if (name === 'delete_memory') {
            try {
              const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
                body: JSON.stringify({ sql:'DELETE FROM falkor_memory WHERE id = ? AND user_id="paddy"', params:[input.id] }),
              });
              const d = await r.json();
              return { ok: !!d.success, deleted: d.result?.[0]?.meta?.changes };
            } catch(e){ return { error: 'delete failed' }; }
          }
          const sportPin = env.AGENT_PIN;
          const ghHeadersForBrain = { 'Content-Type':'application/json', 'X-Pin': env.AGENT_PIN };
          if (name === 'self_heal_worker') {
            try {
              const r = await fetch('https://falkor-code.luckdragon.io/self-heal', {
                method:'POST', headers: ghHeadersForBrain,
                body: JSON.stringify(input.name ? { worker: input.name } : {}),
              });
              const text = await r.text();
              try { return JSON.parse(text); } catch(e){ return { ok:r.ok, body: text.substring(0,400) }; }
            } catch(e){ return { error:'self-heal failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'fleet_health') {
            try {
              const r = await fetch('https://falkor-code.luckdragon.io/workers', { headers:{ 'X-Pin': env.AGENT_PIN } });
              return await r.json();
            } catch(e){ return { error:'fleet check failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'vector_remember') {
            try {
              const r = await fetch('https://falkor-brain.luckdragon.io/remember', {
                method:'POST', headers: ghHeadersForBrain,
                body: JSON.stringify({ text: input.text, source: input.source || 'agent' }),
              });
              const text = await r.text();
              try { return JSON.parse(text); } catch(e){ return { ok: r.ok, body: text.substring(0,300) }; }
            } catch(e){ return { error: String(e).substring(0,200) }; }
          }
          if (name === 'vector_recall') {
            try {
              const r = await fetch('https://falkor-brain.luckdragon.io/recall', {
                method:'POST', headers: ghHeadersForBrain,
                body: JSON.stringify({ query: input.query, k: input.k || 5 }),
              });
              const text = await r.text();
              try { return JSON.parse(text); } catch(e){ return { ok: r.ok, body: text.substring(0,500) }; }
            } catch(e){ return { error: String(e).substring(0,200) }; }
          }
          if (name === 'afl_ladder') {
            try {
              const r = await fetch('https://falkor-sport.luckdragon.io/afl/ladder?pin='+encodeURIComponent(env.AGENT_PIN));
              return await r.json();
            } catch(e){ return { error: 'afl ladder failed' }; }
          }
          if (name === 'nrl_ladder') {
            try {
              const r = await fetch('https://falkor-sport.luckdragon.io/nrl/ladder?pin='+encodeURIComponent(env.AGENT_PIN));
              return await r.json();
            } catch(e){ return { error: 'nrl ladder failed' }; }
          }
          if (name === 'racing_comp') {
            try {
              const r = await fetch('https://falkor-sport.luckdragon.io/racing/comp?pin='+encodeURIComponent(env.AGENT_PIN));
              return await r.json();
            } catch(e){ return { error: 'racing comp failed' }; }
          }
          if (name === 'pe_advisor') {
            try {
              const r = await fetch('https://falkor-school.luckdragon.io/pe-advisor', { headers:{ 'X-Pin': env.AGENT_PIN } });
              return await r.json();
            } catch(e){ return { error: 'pe advisor failed' }; }
          }
          if (name === 'xc_results') {
            try {
              const url = 'https://falkor-school.luckdragon.io/xc/results' + (input.date ? '?date='+input.date : '');
              const r = await fetch(url, { headers:{ 'X-Pin': env.AGENT_PIN } });
              return await r.json();
            } catch(e){ return { error: 'xc results failed' }; }
          }
          if (name === 'kbt_game_status') {
            try {
              const r = await fetch('https://falkor-kbt.luckdragon.io/game/'+encodeURIComponent(input.code||'')+'/status', { headers:{ 'X-Pin': env.AGENT_PIN } });
              return await r.json();
            } catch(e){ return { error: 'kbt status failed' }; }
          }
          if (name && name.startsWith('browser_')) {
            const action = name.replace('browser_','');
            return await browserDispatch(action, input);
          }
          if (name === 'list_workers') {
            try {
              const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/workers/scripts', { headers: { 'Authorization':'Bearer '+env.CF_API_TOKEN } });
              const d = await r.json();
              if (!d.success) return { error: 'list failed' };
              return { workers: d.result.map(w => ({ name: w.id, modified: w.modified_on })) };
            } catch(e) { return { error: 'list failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'edit_file') {
            const p = (input.path||'').replace(/^\//,'');
            const oldStr = input.old_string || '';
            const newStr = input.new_string === undefined ? '' : input.new_string;
            const replaceAll = !!input.replace_all;
            if (!oldStr) return { error:'old_string required' };
            // Fetch current source via blobs API for big files
            let r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
            if (!r.ok) return { error:'edit fetch HTTP '+r.status };
            let d = await r.json();
            let decoded = '';
            const sha = d.sha;
            if (d.content) decoded = decodeURIComponent(escape(atob(d.content.replace(/\n/g,''))));
            else if (d.size && d.sha) {
              const br = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/git/blobs/"+d.sha, {headers: ghHeaders});
              if (br.ok) { const bd = await br.json(); if (bd.content) decoded = decodeURIComponent(escape(atob(bd.content.replace(/\n/g,'')))); }
            }
            if (!decoded) return { error:'no content from GitHub' };
            // Count occurrences
            const parts = decoded.split(oldStr);
            const occurrences = parts.length - 1;
            if (occurrences === 0) return { error:'old_string NOT FOUND in '+p+' — check exact match incl. whitespace/indent' };
            if (occurrences > 1 && !replaceAll) return { error:'old_string matches '+occurrences+' times — add more context to be unique, or set replace_all=true' };
            const patched = replaceAll ? parts.join(newStr) : parts[0]+newStr+parts.slice(1).join(oldStr);
            // Commit via Contents API (works up to 100MB; we encode as base64)
            const payload = { message: input.message || 'edit_file via Falkor agent', content: btoa(unescape(encodeURIComponent(patched))), sha };
            const wr = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{method:'PUT',headers:{...ghHeaders,'Content-Type':'application/json'},body:JSON.stringify(payload)});
            const wd = await wr.json();
            if (!wr.ok) return { error:'edit_file HTTP '+wr.status, detail: wd.message || JSON.stringify(wd).substring(0,300) };
            return { ok:true, path:p, occurrences_replaced: replaceAll?occurrences:1, commit: wd.commit?.sha?.substring(0,7), html_url: wd.commit?.html_url, total_bytes_after: patched.length };
          }
          if (name === 'multi_edit') {
            const p = (input.path||'').replace(/^\//,'');
            const edits = Array.isArray(input.edits) ? input.edits : [];
            if (edits.length === 0) return { error:'edits array required' };
            // Fetch source via blobs API
            let r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
            if (!r.ok) return { error:'fetch HTTP '+r.status };
            let d = await r.json();
            let decoded = '';
            const sha = d.sha;
            if (d.content) decoded = decodeURIComponent(escape(atob(d.content.replace(/\n/g,''))));
            else if (d.size && d.sha) {
              const br = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/git/blobs/"+d.sha, {headers: ghHeaders});
              if (br.ok) { const bd = await br.json(); if (bd.content) decoded = decodeURIComponent(escape(atob(bd.content.replace(/\n/g,'')))); }
            }
            if (!decoded) return { error:'no content' };
            // Validate all edits before applying
            let working = decoded;
            const results = [];
            for (let i=0; i<edits.length; i++) {
              const e = edits[i];
              const oldS = e.old_string || '';
              const newS = e.new_string === undefined ? '' : e.new_string;
              const ra = !!e.replace_all;
              const parts = working.split(oldS);
              const occ = parts.length - 1;
              if (occ === 0) return { error:'edit['+i+']: old_string NOT FOUND', edit_index:i };
              if (occ > 1 && !ra) return { error:'edit['+i+']: old_string matches '+occ+' times — set replace_all or add context', edit_index:i };
              working = ra ? parts.join(newS) : parts[0]+newS+parts.slice(1).join(oldS);
              results.push({ index:i, occurrences: ra?occ:1 });
            }
            // Commit
            const payload = { message: input.message || 'multi_edit via Falkor agent', content: btoa(unescape(encodeURIComponent(working))), sha };
            const wr = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{method:'PUT',headers:{...ghHeaders,'Content-Type':'application/json'},body:JSON.stringify(payload)});
            const wd = await wr.json();
            if (!wr.ok) return { error:'multi_edit HTTP '+wr.status, detail: wd.message };
            return { ok:true, path:p, edits_applied: results, commit: wd.commit?.sha?.substring(0,7), html_url: wd.commit?.html_url, total_bytes_after: working.length };
          }
          if (name === 'verify_endpoint') {
            const path = input.url || '';
            const url = path.startsWith('http') ? path : 'https://falkor.luckdragon.io' + path;
            const method = (input.method||'GET').toUpperCase();
            const expected = input.expected_field || 'ok';
            const opts = { method, headers: {'X-Pin': env.AGENT_PIN, 'Cache-Control':'no-cache'} };
            if (method === 'POST' && input.body) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(input.body); }
            for (let attempt = 0; attempt < 3; attempt++) {
              if (attempt > 0) await new Promise(r => setTimeout(r, 4000));
              try {
                const r = await fetch(url, opts);
                const text = await r.text();
                // Detect HTML fallthrough (endpoint not registered)
                if (text.startsWith('<!doctype') || text.startsWith('<!DOCTYPE')) {
                  return { ok: false, attempt: attempt+1, error: 'endpoint not registered (got HTML fallthrough — check pathname in route handler)', status: r.status };
                }
                // Detect CF 522
                if (text.includes('error code: 522') || text.includes('error code: 530')) {
                  if (attempt < 2) continue;
                  return { ok: false, attempt: attempt+1, error: 'CF infra error: '+text.substring(0,80) };
                }
                let json;
                try { json = JSON.parse(text); } catch(e) { return { ok:false, attempt:attempt+1, error: 'response not JSON', body_preview: text.substring(0,200) }; }
                // Check for endpoint error
                if (json.error) return { ok: false, attempt:attempt+1, status: r.status, endpoint_error: json.error, detail: json.detail };
                // Check expected_field if provided
                if (expected && json[expected] === undefined) {
                  return { ok: false, attempt: attempt+1, error: 'response missing expected field "'+expected+'"', body: json };
                }
                return { ok: true, status: r.status, attempt: attempt+1, body: json };
              } catch(e) {
                if (attempt < 2) continue;
                return { ok: false, attempt: attempt+1, error: 'fetch failed: '+String(e).substring(0,200) };
              }
            }
            return { ok: false, error: 'all retries exhausted' };
          }
          if (name === 'delegate') {
            try {
              const w = String(input.worker||'').replace(/[^a-z]/g,'');
              if (!['school','kbt','sport','code','brain','web'].includes(w)) return { error:'invalid worker: '+w };
              const r = await fetch('https://falkor-'+w+'.luckdragon.io/agent-chat', { method:'POST', headers:{'Content-Type':'application/json','X-Pin':env.AGENT_PIN}, body: JSON.stringify({ message: input.message }) });
              const txt = await r.text();
              try { const j = JSON.parse(txt); return { ok:true, worker: w, reply: j.reply||j.text||txt.substring(0,500) }; } catch(e) { return { ok:r.ok, worker: w, status:r.status, body: txt.substring(0,500) }; }
            } catch(e) { return { error:'delegate: '+String(e).substring(0,200) }; }
          }
          if (name === 'drive_search') {
            try {
              const r = await fetch('https://asgard-ai.luckdragon.io/drive/search?q='+encodeURIComponent(input.query||'')+'&max='+(parseInt(input.max_results)||20), { headers:{'X-Pin': env.AGENT_PIN} });
              const d = await r.json();
              if (!d.ok) return { error:'drive search failed', detail: d.error||JSON.stringify(d).substring(0,200), needs_oauth: String(d.error||'').includes('token') };
              return { ok:true, files: d.files || d.results || [] };
            } catch(e) { return { error: 'drive search: '+String(e).substring(0,200) }; }
          }
          if (name === 'drive_upload') {
            try {
              const fname = input.name || 'falkor-upload.txt';
              const mime  = input.mime || (fname.endsWith('.md') ? 'text/markdown' : fname.endsWith('.html') ? 'text/html' : 'text/plain');
              const params = new URLSearchParams({ filename: fname, mime });
              if (input.folder_id) params.set('parent', input.folder_id);
              const r = await fetch('https://asgard-ai.luckdragon.io/drive/upload?'+params.toString(), {
                method:'POST',
                headers:{'X-Pin': env.AGENT_PIN, 'Content-Type': mime},
                body: input.content||'',
              });
              const d = await r.json();
              if (!d.ok) return { error:'drive upload failed', detail: d.error||JSON.stringify(d).substring(0,200), needs_oauth: String(d.error||'').includes('token') };
              return { ok:true, id: d.id, name: d.name, url: d.url || d.webViewLink };
            } catch(e) { return { error: 'drive upload: '+String(e).substring(0,200) }; }
          }
          if (name === 'drive_list_recent') {
            try {
              const r = await fetch('https://asgard-ai.luckdragon.io/drive/search?q=&recent=1&max='+(parseInt(input.max_results)||20), { headers:{'X-Pin': env.AGENT_PIN} });
              const d = await r.json();
              if (!d.ok) return { error: d.error || 'drive recent failed', needs_oauth: String(d.error||'').includes('token') };
              return { ok:true, files: d.files || d.results || [] };
            } catch(e) { return { error: 'drive list: '+String(e).substring(0,200) }; }
          }
          if (name === 'write_file') {
            const p = (input.path||'').replace(/^\//,'');
            // get sha if exists
            let sha=null;
            try {
              const r0 = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
              if (r0.ok) { const d0 = await r0.json(); sha = d0.sha; }
            } catch(e){}
            const payload = { message: input.message || 'edit via Falkor agent', content: btoa(unescape(encodeURIComponent(input.content||''))), branch: defaultBranch };
            if (sha) payload.sha = sha;
            const r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{method:'PUT',headers:{...ghHeaders,'Content-Type':'application/json'},body:JSON.stringify(payload)});
            const d = await r.json();
            if (!r.ok) return { error:'write_file HTTP '+r.status, detail: d.message || JSON.stringify(d).substring(0,300) };
            return { ok:true, commit: d.commit?.sha?.substring(0,7), html_url: d.commit?.html_url, path: p };
          }
          return { error:'Unknown tool: '+name };
}

const HTML = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Asgard — Project Hub</title>
<style>
:root{--bg:#0a0e14;--panel:#11161f;--panel2:#161c27;--border:#222936;--text:#e6edf6;--muted:#8b95a7;--accent:#ff6b35;--accent2:#ffa94d;--green:#22c55e;--amber:#f59e0b;--red:#ef4444;--purple:#a855f7;}
*{box-sizing:border-box}
html,body{margin:0;padding:0;height:100%;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text)}
.layout{display:grid;grid-template-columns:220px 1fr 360px;height:100vh;overflow:hidden}
.layout-home{grid-template-columns:220px 1fr}
#claude-static-indicator-container,[id*="claude-static-indicator"]{display:none!important;visibility:hidden!important}
@media(max-width:1100px){.layout{grid-template-columns:200px 1fr}.chat-pane{display:none}}
@media(max-width:720px){
  .layout{grid-template-columns:1fr;grid-template-rows:1fr 56px;height:100vh;height:100dvh}
  .sidebar{grid-column:1;grid-row:2;flex-direction:row;border-right:none;border-top:1px solid var(--border);padding:0;gap:0;overflow:hidden;justify-content:space-around;align-items:center}
  .sidebar .brand,.sidebar .sidebar-foot{display:none}
  .sidebar .nav-item{flex:1;flex-direction:column;justify-content:center;align-items:center;padding:6px 2px;min-width:0;font-size:9px;gap:0;border-radius:0;border:none;height:56px}
  .sidebar .nav-item .icon{font-size:18px;width:auto;line-height:1.1}
  .sidebar .nav-item span:nth-child(2){display:block;font-size:9px;line-height:1.1;margin-top:2px;color:inherit;text-align:center}
  .sidebar .nav-item.active{background:var(--panel2);color:var(--accent)}
  /* Mobile: keep Home, Projects, Chat, Sport, School, System (6) */
  .sidebar > :nth-child(4){display:none !important} /* Guide */
  .sidebar > :nth-child(5){display:none !important} /* Recent */
  .sidebar > :nth-child(6){display:none !important} /* Finance */
  .sidebar > :nth-child(7){display:none !important} /* Revenue */
  .sidebar > :nth-child(8){display:none !important} /* Tools */
  .sidebar > :nth-child(12){display:none !important} /* KBT */
  .main{grid-column:1;grid-row:1;min-height:0;padding-bottom:0}
  .topbar{padding:10px 12px}
  .controls{padding:10px 12px;gap:6px}
  .controls input{flex:1 1 100%;min-width:0}
  .controls select,.controls button{flex:0 0 auto}
  .grid{padding:10px 12px;gap:8px;grid-template-columns:1fr}
  .tile{min-height:auto;padding:12px}
  .modal{max-width:100vw;max-height:100dvh;border-radius:0;padding:18px 14px}
  .modal-bg{padding:0}
  .actions-row{gap:6px}
  .actions-row a,.actions-row button{padding:10px 12px;font-size:13px;flex:1;text-align:center;min-width:0}
  .row{grid-template-columns:90px 1fr;font-size:12px}
  /* Mobile chat: appears as overlay when chat tab active */
  .chat-pane{display:none;position:fixed;inset:0;z-index:50;border-left:none;background:var(--bg)}
  .chat-pane.mobile-open{display:flex}
  .chat-head{padding:14px 16px;font-size:16px;border-bottom:1px solid var(--border)}
  .chat-msgs{padding:14px}
  .chat-form{padding:10px;padding-bottom:calc(10px + env(safe-area-inset-bottom));gap:6px}
  .chat-form input{font-size:16px;padding:12px}
  .msg{font-size:14px;max-width:88%}
  .stats{font-size:11px;gap:10px}
  .fee-row,.fcard{font-size:13px}
}
.sidebar{background:var(--panel);border-right:1px solid var(--border);padding:14px 12px;display:flex;flex-direction:column;gap:6px;overflow-y:auto}
.brand{padding:10px 8px 14px;border-bottom:1px solid var(--border);margin-bottom:10px}
.brand-name{font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.brand-sub{font-size:11px;color:var(--muted);margin-top:2px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;color:var(--muted);font-size:14px;border:1px solid transparent}
.nav-item:hover{background:var(--panel2);color:var(--text)}
.nav-item.active{background:var(--panel2);color:var(--text);border-color:var(--border)}
.sidebar-foot{margin-top:auto;padding-top:10px;border-top:1px solid var(--border)}
.user-pill{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;background:var(--panel2);font-size:12px}
.user-pill button{margin-left:auto;background:none;border:none;color:var(--muted);cursor:pointer;font-size:11px}
.main{overflow-y:auto;display:flex;flex-direction:column;min-width:0}
.topbar{padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:var(--bg);position:sticky;top:0;z-index:5}
.topbar h1{margin:0;font-size:18px;font-weight:700}
.stats{display:flex;gap:14px;font-size:12px;color:var(--muted);margin-left:auto;flex-wrap:wrap}
.stat strong{color:var(--text);font-size:14px;margin-right:4px}
.controls{padding:14px 20px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;border-bottom:1px solid var(--border)}
input,select,button{background:var(--panel);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:14px;font-family:inherit}
input:focus,select:focus{outline:none;border-color:var(--accent)}
.controls input{flex:1;min-width:180px}
button{cursor:pointer}
button:hover{background:var(--panel2);border-color:var(--accent)}
button.primary{background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;color:#fff;font-weight:600}
.grid{padding:18px 20px;display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));align-content:start}
.tile{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px;cursor:pointer;display:flex;flex-direction:column;gap:8px;min-height:130px}
.tile:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 4px 16px rgba(255,107,53,.12)}
.tile-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
.tile-name{font-size:14px;font-weight:700}
.tile-cat{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}
.badge{font-size:10px;padding:3px 8px;border-radius:99px;font-weight:600;text-transform:uppercase;letter-spacing:.3px;white-space:nowrap}
.badge.live,.badge.active{background:rgba(34,197,94,.15);color:var(--green)}
.badge.dev,.badge.building{background:rgba(245,158,11,.15);color:var(--amber)}
.badge.archived,.badge.dormant{background:rgba(139,149,167,.15);color:var(--muted)}
.badge.idea,.badge.planned{background:rgba(168,85,247,.15);color:var(--purple)}
.tile-desc{font-size:12px;color:var(--muted);line-height:1.4;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.tile-foot{display:flex;gap:4px;flex-wrap:wrap;font-size:10px;color:var(--muted)}
.tile-foot span{background:var(--panel2);padding:2px 6px;border-radius:4px}
.tile-foot .cost{background:rgba(255,107,53,.15);color:var(--accent);font-weight:600}
.chat-pane{background:var(--panel);border-left:1px solid var(--border);display:flex;flex-direction:column;min-width:0}
.chat-head{padding:14px;border-bottom:1px solid var(--border);font-weight:700;font-size:14px;display:flex;align-items:center;gap:8px}
.chat-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.msg{padding:10px 12px;border-radius:10px;max-width:90%;font-size:13px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
.msg.user{align-self:flex-end;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff}
.msg.assistant{align-self:flex-start;background:var(--panel2);border:1px solid var(--border)}
.msg.system{align-self:center;font-size:11px;color:var(--muted);background:none;padding:4px}
.chat-form{padding:12px;border-top:1px solid var(--border);display:flex;gap:8px}
.chat-form input{flex:1}
.chat-empty{color:var(--muted);font-size:12px;text-align:center;padding:30px 20px}
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.login-card{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:32px;max-width:340px;width:100%}
.login-title{font-size:24px;font-weight:800;text-align:center;margin:0 0 6px;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.login-sub{text-align:center;color:var(--muted);font-size:13px;margin-bottom:20px}
.login-card input{width:100%;margin-bottom:10px;text-align:center;font-size:18px;letter-spacing:4px}
.login-card button{width:100%}
.err{color:var(--red);font-size:12px;text-align:center;margin-top:8px;min-height:16px}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;align-items:center;justify-content:center;padding:16px}
.modal{background:var(--panel);border:1px solid var(--border);border-radius:16px;max-width:680px;width:100%;max-height:90vh;overflow:auto;padding:24px;position:relative}
.modal-close{position:absolute;top:12px;right:12px;background:none;border:none;color:var(--muted);font-size:24px;cursor:pointer}
.modal h2{margin:0 0 6px;font-size:22px}
.cat-line{color:var(--muted);font-size:13px;margin-bottom:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.actions-row{display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 16px}
.actions-row a,.actions-row button{padding:8px 14px;border-radius:8px;font-size:13px;text-decoration:none;font-family:inherit;cursor:pointer;border:1px solid var(--border);background:var(--panel2);color:var(--text);display:inline-block}
.actions-row .primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-weight:600;border:none}
.row{display:grid;grid-template-columns:110px 1fr;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px}
.row:last-child{border-bottom:none}
.row strong{color:var(--muted);font-weight:500}
.row a{color:var(--accent2);text-decoration:none;word-break:break-all}
.desc{margin:14px 0;line-height:1.6;font-size:14px}
.features{background:var(--panel2);border-radius:8px;padding:12px 14px;margin:10px 0;font-size:13px;color:var(--muted);line-height:1.6;white-space:pre-wrap}
.empty{padding:60px 20px;text-align:center;color:var(--muted)}
.fcard{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px}
.fcard-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}
.fcard-val{font-size:22px;font-weight:700;margin-top:4px}
.fcard-sub{font-size:11px;color:var(--muted);margin-top:2px}
.fee-row{display:grid;grid-template-columns:1fr 100px 90px;gap:10px;padding:10px 12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;font-size:13px;cursor:pointer;align-items:center}
.fee-row:hover{border-color:var(--accent)}
.placeholder{padding:40px 30px;color:var(--muted);text-align:center;line-height:1.6}
/* Falkor mascot — individual pose PNGs uploaded to /asset/fk-* */
.fk{display:inline-block;background-repeat:no-repeat;background-size:contain;background-position:center;background-color:transparent;border-radius:12px}
.fk-think     {background-image:url(/asset/fk-think)}
.fk-thumbsup  {background-image:url(/asset/fk-thumbsup)}
.fk-wave      {background-image:url(/asset/fk-wave)}
.fk-hi        {background-image:url(/asset/fk-hi)}
.fk-cheer     {background-image:url(/asset/fk-cheer)}
.fk-run       {background-image:url(/asset/fk-run)}
.fk-smile     {background-image:url(/asset/fk-smile)}
.fk-point     {background-image:url(/asset/fk-point)}
.fk-confused  {background-image:url(/asset/fk-confused)}
.fk-pray      {background-image:url(/asset/fk-pray)}
.fk-laugh     {background-image:url(/asset/fk-laugh)}
.fk-wait      {background-image:url(/asset/fk-wait)}
.fk-xl{width:140px;height:140px;background-size:contain;background-position:center;background-repeat:no-repeat;background-color:transparent}
.fk-lg{width:96px;height:96px}
.fk-md{width:48px;height:48px}
.fk-sm{width:32px;height:32px}
.fk-xs{width:24px;height:24px}
@keyframes fk-pulse{0%,100%{opacity:.45}50%{opacity:1;transform:scale(1.08)}}
</style></head>
<body><div id="app"></div>
<script>
const VERIFY_API="https://falkor-push.luckdragon.io/user/verify",PROJECTS_API="/api/projects",CHAT_API="/api/chat";
const $=(s,r=document)=>r.querySelector(s);
const el=(tag,attrs={},...kids)=>{const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(k==="class")n.className=v;else if(k==="onclick")n.addEventListener("click",v);else if(k==="html")n.innerHTML=v;else n.setAttribute(k,v)}for(const k of kids){if(k==null||k===false)continue;if(typeof k==="string"||typeof k==="number")n.appendChild(document.createTextNode(String(k)));else if(k && k.nodeType)n.appendChild(k);else n.appendChild(document.createTextNode(String(k)))}return n};
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const parseCost=c=>{if(!c)return 0;const m=String(c).match(/[0-9.]+/);return m?parseFloat(m[0]):0};

fetch("/api/falkor/heartbeat",{method:"POST"}).catch(()=>{});
(function(){
  let initialHash = null;
  async function checkVersion(){
    try{
      const r = await fetch("/health",{cache:"no-store"});
      const d = await r.json();
      if(initialHash === null){ initialHash = d.build_hash; return; }
      if(d.build_hash && d.build_hash !== initialHash){
        try{
          const inp = document.querySelector(".chat-form input");
          if(inp && inp.value) localStorage.setItem("falkor.draft", inp.value);
          if(window.STATE && window.STATE.view) localStorage.setItem("falkor.lastView", window.STATE.view);
        }catch(e){}
        location.reload();
      }
    }catch(e){}
  }
  setInterval(checkVersion, 30000);
  setTimeout(checkVersion, 5000);
  setTimeout(()=>{
    try{
      const draft = localStorage.getItem("falkor.draft");
      if(draft){ const inp = document.querySelector(".chat-form input"); if(inp){inp.value=draft; localStorage.removeItem("falkor.draft");} }
      const view = localStorage.getItem("falkor.lastView");
      if(view && window.STATE && window.render){ window.STATE.view=view; localStorage.removeItem("falkor.lastView"); window.render(); }
    }catch(e){}
  }, 1500);
})();

window.STATE={user:null,agentPin:null,projects:[],q:"",cat:"all",status:"active-only",sort:"priority",view:"home",chat:[],chatContext:null};

function loadAuth(){try{return JSON.parse(localStorage.getItem("asgard.user")||"null")}catch{return null}}
function saveAuth(u){localStorage.setItem("asgard.user",JSON.stringify(u))}
function clearAuth(){localStorage.removeItem("asgard.user")}

window.render=render;function render(){
 const app=$("#app");app.innerHTML="";
 if(!STATE.user){renderLogin(app);return}
 app.appendChild(renderShell());
 if(STATE.view==="projects")refreshGrid();
}

function renderLogin(app){
 const wrap=el("div",{class:"login-wrap"}),card=el("div",{class:"login-card"});
 card.appendChild(el("div",{html:'<div class="fk fk-wave fk-xl"></div>',style:"text-align:center;margin-bottom:10px;display:flex;justify-content:center"}));
 card.appendChild(el("h1",{class:"login-title"},"Asgard"));
 card.appendChild(el("div",{class:"login-sub"},"Project Hub"));
 const inp=el("input",{type:"password",inputmode:"numeric",placeholder:"PIN",autofocus:"true"});
 card.appendChild(inp);
 const err=el("div",{class:"err"}),btn=el("button",{class:"primary"},"Sign in");
 btn.addEventListener("click",async()=>{
  err.textContent="";btn.disabled=true;btn.textContent="Checking\u2026";
  try{
   const r=await fetch(VERIFY_API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:"paddy",pin:inp.value})});
   const d=await r.json();
   if(d.success){saveAuth({user:d.user,pin:inp.value,agentPin:d.agentPin});STATE.user=d.user;STATE.agentPin=d.agentPin;await loadProjects();render()}
   else{err.textContent="Wrong PIN.";inp.value=""}
  }catch(e){err.textContent="Connection error."}
  btn.disabled=false;btn.textContent="Sign in";
 });
 inp.addEventListener("keydown",e=>{if(e.key==="Enter")btn.click()});
 card.appendChild(btn);card.appendChild(err);wrap.appendChild(card);app.appendChild(wrap);
 setTimeout(()=>inp.focus(),50);
}

async function loadProjects(){try{const r=await fetch(PROJECTS_API);const d=await r.json();STATE.projects=d.projects||(Array.isArray(d)?d:[])}catch(e){STATE.projects=[]}}

function renderShell(){const l=el("div",{class:"layout"+(STATE.view==="home"?" layout-home":"")});l.appendChild(renderSidebar());l.appendChild(renderMain());if(STATE.view!=="home")l.appendChild(renderChatPane());return l}

function renderSidebar(){
 const sb=el("div",{class:"sidebar"});
 const brand=el("div",{class:"brand"});
 const bnRow=el("div",{class:"brand-name",style:"display:flex;align-items:center;gap:8px"});bnRow.appendChild(el("div",{class:"fk fk-smile fk-sm"}));bnRow.appendChild(el("span",{},"Asgard"));brand.appendChild(bnRow);
 brand.appendChild(el("div",{class:"brand-sub"},"Project hub \u00b7 luckdragon.io"));
 sb.appendChild(brand);
 const navItem=(id,icon,label)=>{const it=el("div",{class:"nav-item"+(STATE.view===id?" active":"")});it.appendChild(el("span",{style:"width:18px;text-align:center"},icon));it.appendChild(el("span",{},label));it.addEventListener("click",()=>{STATE.view=id;render()});return it};
 sb.appendChild(navItem("home","\uD83C\uDFE0","Home"));
 sb.appendChild(navItem("projects","\uD83D\uDCCB","Projects"));
 sb.appendChild(navItem("guide","\u2728","Guide"));
 sb.appendChild(navItem("recent","\uD83D\uDD52","Recent"));
 sb.appendChild(navItem("finance","\uD83D\uDCB0","Finance"));
 sb.appendChild(navItem("revenue","\uD83D\uDCC8","Revenue"));
 sb.appendChild(navItem("tools","\uD83D\uDEE0","Tools"));
 const chatNav=navItem("chat","\uD83D\uDCAC","Chat");
 chatNav.addEventListener("click",(e)=>{
  if(window.innerWidth<=720){e.stopPropagation();const cp=document.querySelector(".chat-pane");if(cp){cp.classList.toggle("mobile-open");if(cp.classList.contains("mobile-open"))setTimeout(()=>{const i=cp.querySelector("input");if(i)i.focus()},100);return}}
 },true);
 sb.appendChild(chatNav);
 sb.appendChild(navItem("sport","\uD83C\uDFC9","Sport"));
 sb.appendChild(navItem("school","\uD83C\uDFEB","School"));
 sb.appendChild(navItem("kbt","\uD83C\uDFAF","KBT"));
 sb.appendChild(navItem("system","\u2699","System"));
 const foot=el("div",{class:"sidebar-foot"});
 const pill=el("div",{class:"user-pill"});
 pill.appendChild(el("span",{},"\uD83D\uDC64 "+(STATE.user&&STATE.user.name||"Paddy")));
 // Push notification toggle
 const pushBtn=el("button",{title:"Toggle push notifications",style:"background:none;border:none;color:var(--muted);cursor:pointer;font-size:13px;padding:0 6px"},localStorage.getItem("falkor.push")==="on"?"\uD83D\uDD14":"\uD83D\uDD15");
 pushBtn.addEventListener("click",async(e)=>{
  e.stopPropagation();
  const on=localStorage.getItem("falkor.push")==="on";
  if(!on){
   if(!("serviceWorker" in navigator)){alert("Push not supported");return}
   try{
    const reg=await navigator.serviceWorker.register("data:text/javascript,").catch(()=>navigator.serviceWorker.ready);
    const v=await fetch("/api/push/vapid",{headers:{"X-Pin":STATE.agentPin||""}}).then(r=>r.json());
    const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:v.publicKey||v.key});
    await fetch("/api/push/subscribe",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":STATE.agentPin||""},body:JSON.stringify({subscription:sub})});
    localStorage.setItem("falkor.push","on");pushBtn.textContent="\uD83D\uDD14";
   }catch(err){alert("Push subscribe failed: "+err.message)}
  } else {
   localStorage.setItem("falkor.push","off");pushBtn.textContent="\uD83D\uDD15";
  }
 });
 pill.appendChild(pushBtn);
 const out=el("button",{},"Sign out");
 out.addEventListener("click",()=>{clearAuth();STATE.user=null;STATE.agentPin=null;render()});
 pill.appendChild(out);foot.appendChild(pill);sb.appendChild(foot);
 return sb;
}

function renderMain(){
 const m=el("div",{class:"main"});
 if(STATE.view==="home")return renderHome(m);
 if(STATE.view==="projects")return renderProjects(m);
 if(STATE.view==="guide")return renderGuide(m);
 if(STATE.view==="recent")return renderRecent(m);
 if(STATE.view==="finance")return renderFinance(m);
 if(STATE.view==="revenue")return renderRevenue(m);
 if(STATE.view==="tools")return renderTools(m);
 if(STATE.view==="chat")return renderChatMain(m);
 if(STATE.view==="sport")return renderSport(m);
 if(STATE.view==="school")return renderSchool(m);
 if(STATE.view==="kbt")return renderKBT(m);
 if(STATE.view==="system")return renderSystem(m);
 return m;
}

function renderHome(m){
 // Chat-first home: full chat surface in the middle, suggestion chips below briefing strip.
 const userName=(STATE.user&&STATE.user.name)||"Paddy";
 const hr=new Date().getHours();
 const greet=hr<12?"Good morning":hr<17?"Good afternoon":"Good evening";
 const PIN=STATE.agentPin||"";

 const wrap=el("div",{style:"display:flex;flex-direction:column;height:100%;max-width:780px;margin:0 auto;padding:0 16px;width:100%"});

 // Compact briefing strip with mascot
 const strip=el("div",{style:"display:flex;align-items:flex-start;gap:12px;padding:14px 4px 10px;border-bottom:1px solid var(--border)"});
 strip.appendChild(el("div",{class:"fk fk-wave fk-sm",style:"flex:0 0 auto;margin-top:2px"}));
 const stripBody=el("div",{style:"flex:1;display:flex;flex-direction:column;gap:2px"});
 stripBody.appendChild(el("div",{style:"font-size:15px;font-weight:600"},greet+", "+userName+"."));
 const briefLine=el("div",{style:"font-size:12px;color:var(--muted);line-height:1.4"},"Loading today’s briefing…");
 stripBody.appendChild(briefLine);
 strip.appendChild(stripBody);
 wrap.appendChild(strip);
 fetch("/api/briefing",{headers:{"X-Pin":PIN}}).then(r=>r.json()).then(d=>{
   const text=String(d.briefing||"").split(String.fromCharCode(10)).join(" ").substring(0,300);
   briefLine.textContent=text||"(no briefing)";
 }).catch(()=>{briefLine.textContent=""});

 // Suggestion chips — clickable shortcuts that pre-fill chat
 const chips=el("div",{style:"display:flex;flex-wrap:wrap;gap:6px;padding:10px 4px"});
 const suggestions=[
  ["🏉 Today’s PE outlook", "What's the PE outlook for today? Use the pe-advisor."],
  ["📝 Top 5 next actions", "List the top 5 pending project next-actions."],
  ["🎯 Essendon news", "Anything new for Essendon this week — fixture, ladder, news?"],
  ["💰 Revenue snapshot", "Give me a one-paragraph revenue snapshot across the portfolio."],
  ["🔧 What needs my attention", "What in the portfolio needs my attention right now? Be specific."],
  ["💬 Family comp update", "Any updates I should push to the family comp?"]
 ];
 suggestions.forEach(([label,prompt])=>{
  const c=el("button",{type:"button",style:"background:var(--panel);border:1px solid var(--border);color:var(--text);padding:8px 12px;border-radius:99px;cursor:pointer;font-size:12px;white-space:nowrap"},label);
  c.addEventListener("mouseenter",()=>{c.style.borderColor="var(--accent)";c.style.color="var(--accent)"});
  c.addEventListener("mouseleave",()=>{c.style.borderColor="var(--border)";c.style.color="var(--text)"});
  c.addEventListener("click",()=>{
   const inp=document.querySelector(".chat-form input");
   if(inp){inp.value=prompt;inp.focus();}
  });
  chips.appendChild(c);
 });
 wrap.appendChild(chips);

 // Big chat surface — reuse renderChatPane content but stretched
 const chatBox=el("div",{class:"chat-pane chat-home",style:"flex:1;background:transparent;border:none;border-radius:0;display:flex;flex-direction:column;min-height:0"});
 // chat messages
 const msgs=el("div",{class:"chat-msgs",id:"chat-msgs",style:"flex:1;overflow-y:auto;padding:12px 4px;display:flex;flex-direction:column;gap:10px"});
 chatBox.appendChild(msgs);
 // chat form
 const form=el("form",{class:"chat-form",style:"display:flex;gap:6px;padding:10px 4px 14px;border-top:1px solid var(--border);background:var(--bg)"});
 const inp=el("input",{type:"text",placeholder:STATE.chatContext?("Ask about "+(STATE.chatContext.name||"this project")+"…"):"Ask Falkor anything…",style:"flex:1;background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--text);font-size:14px"});
 const micBtn=el("button",{type:"button",style:"background:var(--panel2);color:var(--text);border:1px solid var(--border);padding:8px 12px;border-radius:10px;cursor:pointer",title:"Hold to record voice"},"🎤");
 let recorder=null,chunks=[];
 micBtn.addEventListener("mousedown",async()=>{try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];recorder=new MediaRecorder(stream,{mimeType:"audio/webm"});recorder.ondataavailable=e=>{if(e.data.size>0)chunks.push(e.data)};recorder.start();micBtn.style.background="var(--accent)";micBtn.textContent="⏺";}catch(e){alert("Mic blocked: "+e.message)}});
 const stop=async()=>{if(!recorder||recorder.state==="inactive")return;recorder.stop();micBtn.style.background="var(--panel2)";micBtn.textContent="🎤";await new Promise(r=>recorder.onstop=r);recorder.stream.getTracks().forEach(t=>t.stop());const blob=new Blob(chunks,{type:"audio/webm"});micBtn.disabled=true;micBtn.textContent="…";try{const r=await fetch("/api/stt",{method:"POST",headers:{"Content-Type":"audio/webm","X-Pin":STATE.agentPin||""},body:blob});const d=await r.json();if(d.text||d.transcript){inp.value=(d.text||d.transcript).trim();form.dispatchEvent(new Event("submit",{cancelable:true}))}else{inp.value=JSON.stringify(d).substring(0,80)}}catch(e){inp.value="STT err: "+e.message}micBtn.disabled=false;micBtn.textContent="🎤";};
 micBtn.addEventListener("mouseup",stop);micBtn.addEventListener("mouseleave",stop);
 micBtn.addEventListener("touchstart",e=>{e.preventDefault();micBtn.dispatchEvent(new Event("mousedown"))});micBtn.addEventListener("touchend",e=>{e.preventDefault();stop()});
 const sendBtn=el("button",{class:"primary",type:"submit",style:"background:var(--accent);color:#fff;border:none;padding:10px 18px;border-radius:10px;cursor:pointer;font-weight:600"},"Send");
 form.appendChild(micBtn);form.appendChild(inp);form.appendChild(sendBtn);

 form.addEventListener("submit",async(e)=>{
  e.preventDefault();
  const text=inp.value.trim();if(!text)return;
  STATE.chat.push({role:"user",content:text});
  STATE.chat.push({role:"assistant",content:"…",pending:true});
  inp.value="";refreshChat();
  sendBtn.disabled=true;
  try{
   const r=await fetch("/api/agent-chat-stream",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":STATE.agentPin||""},body:JSON.stringify({message:text,project:STATE.chatContext||null})});
   if(!r.ok||!r.body){throw new Error("HTTP "+r.status)}
   const live=STATE.chat[STATE.chat.length-1];
   if(live&&live.pending){live.pending=false;live.streaming=true;live.content=""}
   refreshChat();
   const reader=r.body.getReader();const td=new TextDecoder();
   let buf="";let toolCalls=[];let images=[];let liveSummary=[];
   while(true){
    const{done,value}=await reader.read();if(done)break;
    buf+=td.decode(value,{stream:true});
    let nl;
    while((nl=buf.indexOf(String.fromCharCode(10)))!==-1){
     const line=buf.slice(0,nl);buf=buf.slice(nl+1);
     if(!line.trim())continue;
     let ev;try{ev=JSON.parse(line)}catch(e){continue}
     if(ev.type==="token"){live.content+=ev.text;refreshChat();}
     else if(ev.type==="tool_start"){live.resultMood="thinking";refreshChat();}
     else if(ev.type==="tool_call"){const t=ev.tool;const i=ev.input||{};let label=t;if(t==="write_file")label="Editing "+i.path;else if(t==="read_file")label="Reading "+i.path;else if(t==="run_d1_query")label="SQL query";else if(t==="web_fetch")label="Fetching "+(i.url||"").substring(0,40);else if(t==="web_search")label="Searching: "+(i.query||"");else if(t==="vault_get")label="Getting secret";else if(t==="cf_deploy_worker")label="Deploying "+(i.name||"worker");else if(t==="generate_image")label="Drawing image";else if(t&&t.startsWith("browser_"))label=t.replace("browser_","");liveSummary.push(label);live.toolStatus="["+liveSummary.join(" \u00b7 ")+"]";refreshChat();}
     else if(ev.type==="tool_result"){if(liveSummary.length){const last=liveSummary[liveSummary.length-1];liveSummary[liveSummary.length-1]=last+(ev.output_summary&&ev.output_summary.startsWith("err")?" \u2716":" \u2713");live.toolStatus="["+liveSummary.join(" \u00b7 ")+"]";refreshChat();}}
     else if(ev.type==="done"){toolCalls=ev.tool_calls||[];images=ev.images||[];}
     else if(ev.type==="error"){live.content+=String.fromCharCode(10)+"Error: "+ev.message;refreshChat();}
    }
   }
   live.streaming=false;live.images=images;
   const hadErr=toolCalls.some(t=>t.output&&t.output.error);
   live.resultMood=hadErr?"error":toolCalls.length>0?"success":"normal";
   if(toolCalls.length&&live.toolStatus){live.content=live.content+String.fromCharCode(10,10)+live.toolStatus;delete live.toolStatus;}
   refreshChat();
   if(localStorage.getItem("falkor.tts")==="1"&&live.content){try{const tr=await fetch("/api/tts",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":STATE.agentPin||""},body:JSON.stringify({text:((function(t){var i=t.lastIndexOf(String.fromCharCode(10)+"[");return (i>=0?t.substring(0,i):t).trim().substring(0,800);})(live.content)),provider:localStorage.getItem("falkor.tts.provider")||"openai",voice:(localStorage.getItem("falkor.tts.provider")==="elevenlabs"?(localStorage.getItem("falkor.tts.voice")||""):(localStorage.getItem("falkor.tts.openai_voice")||"alloy"))})});if(tr.ok){const blob=await tr.blob();const audio=new Audio(URL.createObjectURL(blob));audio.play()}}catch(e){}}
  }catch(err){
   if(STATE.chat.length&&STATE.chat[STATE.chat.length-1].pending)STATE.chat.pop();
   const live=STATE.chat[STATE.chat.length-1];
   if(live&&live.streaming){live.streaming=false;live.content+=String.fromCharCode(10)+"Error: "+err.message}
   else STATE.chat.push({role:"assistant",content:"Error: "+err.message,resultMood:"error"});
  }
  sendBtn.disabled=false;refreshChat();inp.focus();
 });
 chatBox.appendChild(form);
 wrap.appendChild(chatBox);

 // After mount, populate messages
 setTimeout(()=>refreshChat(),0);

 m.appendChild(wrap);
 // home view also gets a small project context indicator if scoped
 if(STATE.chatContext){
  const ctxBar=el("div",{style:"position:absolute;top:14px;right:20px;background:rgba(255,107,53,0.1);color:var(--accent);padding:5px 10px;border-radius:99px;font-size:11px;display:flex;align-items:center;gap:6px;z-index:5"});
  ctxBar.appendChild(el("span",{},"→ "+(STATE.chatContext.name||"project")));
  const clr=el("button",{style:"background:none;border:none;color:var(--accent);cursor:pointer;font-size:14px;padding:0;line-height:1"},"×");
  clr.addEventListener("click",()=>{STATE.chatContext=null;render()});
  ctxBar.appendChild(clr);
  m.appendChild(ctxBar);
 }
 return m;
}function renderProjects(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Projects"));
 
 const total=STATE.projects.length;
 const live=STATE.projects.filter(p=>["live","active"].includes((p.status||"").toLowerCase())).length;
 const building=STATE.projects.filter(p=>["dev","building"].includes((p.status||"").toLowerCase())).length;
 const archived=STATE.projects.filter(p=>["archived","dormant"].includes((p.status||"").toLowerCase())).length;
 const stats=el("div",{class:"stats"});
 [[total,"total"],[live,"live"],[building,"building"],[archived,"archived"]].forEach(([n,l])=>stats.appendChild(el("div",{class:"stat"},el("strong",{},String(n)),l)));
 top.appendChild(stats);m.appendChild(top);
 
 const ctrl=el("div",{class:"controls"});
 const search=el("input",{type:"text",placeholder:"Search projects\u2026",value:STATE.q});
 search.addEventListener("input",()=>{STATE.q=search.value;refreshGrid()});
 ctrl.appendChild(search);
 const cats=Array.from(new Set(STATE.projects.map(p=>(p.category||"").toLowerCase()).filter(Boolean))).sort();
 const catSel=el("select");
 catSel.appendChild(el("option",{value:"all"},"All categories"));
 cats.forEach(c=>catSel.appendChild(el("option",{value:c},c)));
 catSel.value=STATE.cat;
 catSel.addEventListener("change",()=>{STATE.cat=catSel.value;refreshGrid()});
 ctrl.appendChild(catSel);
 const ssel=el("select");
 [["active-only","Active only"],["all","All statuses"],["live","Live"],["active","Active"],["dev","Dev"],["building","Building"],["planned","Planned"],["idea","Idea"],["merged","Merged"],["archived","Archived"],["dormant","Dormant"]].forEach(([v,l])=>ssel.appendChild(el("option",{value:v},l)));
 ssel.value=STATE.status;
 ssel.addEventListener("change",()=>{STATE.status=ssel.value;refreshGrid()});
 ctrl.appendChild(ssel);
 const sortSel=el("select");
 [["priority","Sort: Priority"],["cost","Sort: Cost"],["name","Sort: Name"],["last_updated","Sort: Updated"],["status","Sort: Status"]].forEach(([v,l])=>sortSel.appendChild(el("option",{value:v},l)));
 sortSel.value=STATE.sort;
 sortSel.addEventListener("change",()=>{STATE.sort=sortSel.value;refreshGrid()});
 ctrl.appendChild(sortSel);
 const reload=el("button",{},"\u21bb");
 reload.addEventListener("click",async()=>{reload.textContent="\u2026";await loadProjects();refreshGrid();reload.textContent="\u21bb"});
 ctrl.appendChild(reload);m.appendChild(ctrl);
 const grid=el("div",{class:"grid",id:"grid"});m.appendChild(grid);
 return m;
}

function refreshGrid(){
 const grid=$("#grid");if(!grid)return;
 grid.innerHTML="";
 const ql=STATE.q.toLowerCase();
 let filtered=STATE.projects.filter(p=>{
  if(STATE.cat!=="all"&&(p.category||"").toLowerCase()!==STATE.cat)return false;
  if(STATE.status==="active-only"){const s=(p.status||"").toLowerCase();if(["merged","archived","dormant"].includes(s))return false}else if(STATE.status!=="all"&&(p.status||"").toLowerCase()!==STATE.status)return false;
  if(!ql)return true;
  return ["name","desc","features","tech","domains","category","url"].some(k=>String(p[k]||"").toLowerCase().includes(ql));
 });
 const s=STATE.sort;
 filtered.sort((a,b)=>{
  if(s==="priority")return (a.priority||999)-(b.priority||999);
  if(s==="cost")return parseCost(b.cost)-parseCost(a.cost);
  if(s==="name")return (a.name||"").localeCompare(b.name||"");
  if(s==="last_updated")return (b.last_updated||"").localeCompare(a.last_updated||"");
  if(s==="status")return (a.status||"").localeCompare(b.status||"");
  return 0;
 });
 if(filtered.length===0){
   const e=el("div",{class:"empty",style:"display:flex;flex-direction:column;align-items:center;gap:10px;padding:50px 20px"});
   e.appendChild(el("div",{class:"fk fk-confused fk-lg"}));
   e.appendChild(el("div",{},"No projects match."));
   grid.appendChild(e);return;
  }
 for(const p of filtered){
  const tile=el("div",{class:"tile"});
  tile.addEventListener("click",()=>openModal(p));
  const head=el("div",{class:"tile-head"});
  const tb=el("div");
  tb.appendChild(el("div",{class:"tile-name"},p.name||"Untitled"));
  if(p.category)tb.appendChild(el("div",{class:"tile-cat"},p.category));
  head.appendChild(tb);
  const status=(p.status||"").toLowerCase();
  if(status)head.appendChild(el("div",{class:"badge "+status},p.status));
  tile.appendChild(head);
  if(p.desc)tile.appendChild(el("div",{class:"tile-desc"},p.desc));
  const foot=el("div",{class:"tile-foot"});
  if(p.tech)p.tech.split(",").slice(0,3).forEach(t=>foot.appendChild(el("span",{},t.trim())));
  if(p.cost)foot.appendChild(el("span",{class:"cost"},"\uD83D\uDCB0 "+p.cost));
  if(foot.children.length)tile.appendChild(foot);
  grid.appendChild(tile);
 }
}

function openModal(p){
 const bg=el("div",{class:"modal-bg"});
 bg.addEventListener("click",e=>{if(e.target===bg)bg.remove()});
 const m=el("div",{class:"modal"});
 const close=el("button",{class:"modal-close"},"\u00d7");
 close.addEventListener("click",()=>bg.remove());
 m.appendChild(close);
 m.appendChild(el("h2",{},p.name||"Untitled"));
 const cl=el("div",{class:"cat-line"});
 if(p.category)cl.appendChild(el("span",{},p.category));
 if(p.status)cl.appendChild(el("span",{class:"badge "+(p.status||"").toLowerCase()},p.status));
 if(p.priority)cl.appendChild(el("span",{},"Priority "+p.priority));
 if(p.cost)cl.appendChild(el("span",{style:"color:var(--accent)"},"\uD83D\uDCB0 "+p.cost));
 m.appendChild(cl);
 const actions=el("div",{class:"actions-row"});
 if(p.url)actions.appendChild(el("a",{href:p.url,target:"_blank",rel:"noopener",class:"primary"},"\uD83C\uDF10 Open live"));
 if(p.github){
  actions.appendChild(el("a",{href:p.github,target:"_blank",rel:"noopener"},"\uD83D\uDCE6 GitHub"));
  const editUrl=p.github.replace("github.com","github.dev");
  actions.appendChild(el("a",{href:editUrl,target:"_blank",rel:"noopener"},"\u270F Edit code"));
 }
 const cBtn=el("button",{},"\uD83D\uDCAC Chat about this");
 cBtn.addEventListener("click",()=>{STATE.chatContext=p;STATE.chat.push({role:"system",content:"\u2014 Now talking about "+(p.name||"project")+" \u2014"});bg.remove();render();if(window.innerWidth<=720){setTimeout(()=>{const cp=document.querySelector(".chat-pane");if(cp)cp.classList.add("mobile-open")},50)}});
 actions.appendChild(cBtn);m.appendChild(actions);
 if(p.desc)m.appendChild(el("div",{class:"desc"},p.desc));
 const rows=[
  ["URL",p.url?'<a href="'+esc(p.url)+'" target="_blank" rel="noopener">'+esc(p.url)+"</a>":null],
  ["GitHub",p.github?'<a href="'+esc(p.github)+'" target="_blank" rel="noopener">'+esc(p.github)+"</a>":null],
  ["Domain",p.domains],
  ["Tech",p.tech],
  ["Status",p.status],
  ["Priority",p.priority],
  ["Cost",p.cost],
  ["Cost notes",p.cost_notes],
  ["Progress",p.progress?p.progress+"%":null],
  ["Y1 / Y2 / Y3",[p.y1,p.y2,p.y3].filter(Boolean).join(" / ")||null],
  ["Scale",p.scale],
  ["Detail",p.detail],
  ["Updated",p.last_updated],
  ["Next",p.next],
  ["Notes",p.notes]
 ];
 for(const [k,v] of rows){
  if(!v&&v!==0)continue;
  const row=el("div",{class:"row"});
  row.appendChild(el("strong",{},k));
  row.appendChild(el("div",{html:typeof v==="string"&&/<a /.test(v)?v:esc(String(v))}));
  m.appendChild(row);
 }
 if(p.features){
  m.appendChild(el("div",{style:"margin-top:14px;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px"},"Features"));
  m.appendChild(el("div",{class:"features"},p.features));
 }
 bg.appendChild(m);document.body.appendChild(bg);
}

function renderChatPane(){
 const p=el("div",{class:"chat-pane"});
 const head=el("div",{class:"chat-head"});
 head.appendChild(el("span",{},"\uD83D\uDCAC Chat"));
 // Speaker toggle (TTS on/off)
 const ttsToggle=el("button",{title:"Toggle voice replies",style:"background:none;border:1px solid var(--border);color:"+(localStorage.getItem("falkor.tts")==="1"?"var(--accent)":"var(--muted)")+";cursor:pointer;font-size:14px;padding:2px 8px;border-radius:6px;margin-left:6px"},localStorage.getItem("falkor.tts")==="1"?"\uD83D\uDD0A":"\uD83D\uDD07");
 ttsToggle.addEventListener("click",()=>{const on=localStorage.getItem("falkor.tts")==="1";localStorage.setItem("falkor.tts",on?"0":"1");ttsToggle.style.color=on?"var(--muted)":"var(--accent)";ttsToggle.textContent=on?"\uD83D\uDD07":"\uD83D\uDD0A"});
 head.appendChild(ttsToggle);
 // Mobile close button
 const closeBtn=el("button",{style:"display:none;background:none;border:none;color:var(--muted);cursor:pointer;font-size:20px;padding:4px 8px;margin-left:auto"},"\u00d7");
 closeBtn.addEventListener("click",()=>{const cp=document.querySelector(".chat-pane");if(cp)cp.classList.remove("mobile-open")});
 if(window.innerWidth<=720)closeBtn.style.display="block";
 head.appendChild(closeBtn);
 if(STATE.chatContext){
  head.appendChild(el("span",{style:"margin-left:8px;font-size:11px;color:var(--accent);background:rgba(255,107,53,0.1);padding:3px 8px;border-radius:99px"},"\u2192 "+(STATE.chatContext.name||"project")));
  const clr=el("button",{style:"margin-left:auto;background:none;border:none;color:var(--muted);cursor:pointer;font-size:11px"},"clear");
  clr.addEventListener("click",()=>{STATE.chatContext=null;STATE.chat.push({role:"system",content:"\u2014 general chat \u2014"});render()});
  head.appendChild(clr);
 }
 p.appendChild(head);
 const msgs=el("div",{class:"chat-msgs",id:"chat-msgs"});
 if(STATE.chat.length===0){
   const empty=el("div",{class:"chat-empty",style:"display:flex;flex-direction:column;align-items:center;gap:8px;padding:40px 20px"});
   empty.appendChild(el("div",{class:"fk fk-sleep fk-md"}));
   empty.appendChild(el("div",{style:"text-align:center;font-size:12px"},"Ready when you are. Click any tile then \u201cChat about this\u201d to scope me to a project, or just type a question."));
   msgs.appendChild(empty);
  }
 for(const m of STATE.chat){
   if(m.role==="assistant"){
    const wrap=el("div",{style:"display:flex;gap:8px;align-self:flex-start;max-width:95%"});
    let mascotClass="fk-smile";
    if(m.pending) mascotClass="fk-think";
    else if(m.resultMood==="success") mascotClass="fk-celebrate";
    else if(m.resultMood==="error") mascotClass="fk-confused";
    wrap.appendChild(el("div",{class:"fk "+mascotClass+" fk-xs",style:"flex:0 0 auto;margin-top:2px"+(m.pending?";animation:fk-pulse 1.2s ease-in-out infinite":"")}));
    const bubbleCol=el("div",{style:"display:flex;flex-direction:column;gap:6px;align-self:flex-start;max-width:100%"});
    bubbleCol.appendChild(el("div",{class:"msg assistant",style:"align-self:flex-start;max-width:100%"},m.content));
    if(m.images&&m.images.length){
     m.images.forEach(im=>{
      const ic=el("div",{style:"background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:6px;align-self:flex-start"});
      const img=el("img",{src:im.src,style:"max-width:300px;max-height:300px;border-radius:6px;display:block"});
      ic.appendChild(img);
      if(im.caption)ic.appendChild(el("div",{style:"font-size:10px;color:var(--muted);margin-top:4px;word-break:break-all"},im.caption));
      bubbleCol.appendChild(ic);
     });
    }
    wrap.appendChild(bubbleCol);
    msgs.appendChild(wrap);
   } else {
    msgs.appendChild(el("div",{class:"msg "+m.role},m.content));
   }
  }
 p.appendChild(msgs);
 const form=el("form",{class:"chat-form"});
 const inp=el("input",{type:"text",placeholder:STATE.chatContext?("Ask about "+(STATE.chatContext.name||"this project")+"\u2026"):"Type a message\u2026"});
 // Voice (push-to-talk) button
 const micBtn=el("button",{type:"button",style:"background:var(--panel2);color:var(--text);border:1px solid var(--border);padding:8px 12px;border-radius:6px;cursor:pointer",title:"Hold to record voice (Web Speech API)"},"\uD83C\uDFA4");
 let recorder=null,chunks=[];
 micBtn.addEventListener("mousedown",async()=>{
  try{
   const stream=await navigator.mediaDevices.getUserMedia({audio:true});
   chunks=[];recorder=new MediaRecorder(stream,{mimeType:"audio/webm"});
   recorder.ondataavailable=e=>{if(e.data.size>0)chunks.push(e.data)};
   recorder.start();micBtn.style.background="var(--accent)";micBtn.textContent="\u23FA";
  }catch(e){alert("Mic blocked: "+e.message)}
 });
 const stop=async()=>{
  if(!recorder||recorder.state==="inactive")return;
  recorder.stop();micBtn.style.background="var(--panel2)";micBtn.textContent="\uD83C\uDFA4";
  await new Promise(r=>recorder.onstop=r);
  recorder.stream.getTracks().forEach(t=>t.stop());
  const blob=new Blob(chunks,{type:"audio/webm"});
  micBtn.disabled=true;micBtn.textContent="\u2026";
  try{
   const r=await fetch("/api/stt",{method:"POST",headers:{"Content-Type":"audio/webm","X-Pin":STATE.agentPin||""},body:blob});
   const d=await r.json();
   if(d.text||d.transcript){inp.value=(d.text||d.transcript).trim();form.dispatchEvent(new Event("submit",{cancelable:true}))}
   else{inp.value=JSON.stringify(d).substring(0,80)}
  }catch(e){inp.value="STT err: "+e.message}
  micBtn.disabled=false;micBtn.textContent="\uD83C\uDFA4";
 };
 micBtn.addEventListener("mouseup",stop);
 micBtn.addEventListener("mouseleave",stop);
 micBtn.addEventListener("touchstart",e=>{e.preventDefault();micBtn.dispatchEvent(new Event("mousedown"))});
 micBtn.addEventListener("touchend",e=>{e.preventDefault();stop()});

 const btn=el("button",{class:"primary",type:"submit"},"\u2192");
 form.appendChild(micBtn);
 form.appendChild(inp);form.appendChild(btn);
 form.addEventListener("submit",async(e)=>{
  e.preventDefault();
  const text=inp.value.trim();if(!text)return;
  STATE.chat.push({role:"user",content:text});
  // Add a "thinking" placeholder while AI works
  STATE.chat.push({role:"assistant",content:"…",pending:true});
  inp.value="";refreshChat();
  btn.disabled=true;
  try{
   // Streaming: route through agent-chat-stream — tokens arrive word-by-word
   const r=await fetch("/api/agent-chat-stream",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":STATE.agentPin||""},body:JSON.stringify({message:text,project:STATE.chatContext||null})});
   if(!r.ok || !r.body){throw new Error("HTTP "+r.status)}
   // Convert pending placeholder into live streaming bubble
   const live = STATE.chat[STATE.chat.length-1];
   if(live && live.pending){ live.pending=false; live.streaming=true; live.content=""; }
   refreshChat();
   const reader=r.body.getReader();
   const td=new TextDecoder();
   let buf="";
   let toolCalls=[];
   let images=[];
   let liveSummary=[];
   while(true){
    const{done,value}=await reader.read();
    if(done)break;
    buf+=td.decode(value,{stream:true});
    let nl;
    while((nl=buf.indexOf(String.fromCharCode(10)))!==-1){
     const line=buf.slice(0,nl);buf=buf.slice(nl+1);
     if(!line.trim())continue;
     let ev;try{ev=JSON.parse(line)}catch(e){continue}
     if(ev.type==="token"){
      live.content+=ev.text;
      refreshChat();
     } else if(ev.type==="tool_start"){
      live.resultMood="thinking";
      refreshChat();
     } else if(ev.type==="tool_call"){
      const t=ev.tool;
      const i=ev.input||{};
      let label=t;
      if(t==="write_file")label="Editing "+i.path;
      else if(t==="read_file")label="Reading "+i.path;
      else if(t==="run_d1_query")label="SQL query";
      else if(t==="web_fetch")label="Fetching "+(i.url||"").substring(0,40);
      else if(t==="web_search")label="Searching: "+(i.query||"");
      else if(t==="vault_get")label="Getting secret";
      else if(t==="cf_deploy_worker")label="Deploying "+(i.name||"worker");
      else if(t==="generate_image")label="Drawing image";
      else if(t&&t.startsWith("browser_"))label=t.replace("browser_","");
      liveSummary.push(label);
      live.toolStatus="["+liveSummary.join(" \u00b7 ")+"]";
      refreshChat();
     } else if(ev.type==="tool_result"){
      if(liveSummary.length){
       const last=liveSummary[liveSummary.length-1];
       liveSummary[liveSummary.length-1]=last+(ev.output_summary&&ev.output_summary.startsWith("err")?" \u2716":" \u2713");
       live.toolStatus="["+liveSummary.join(" \u00b7 ")+"]";
       refreshChat();
      }
     } else if(ev.type==="done"){
      toolCalls=ev.tool_calls||[];
      images=ev.images||[];
     } else if(ev.type==="error"){
      live.content+=String.fromCharCode(10)+"Error: "+ev.message;
      refreshChat();
     }
    }
   }
   live.streaming=false;
   live.images=images;
   const hadErr=toolCalls.some(t=>t.output&&t.output.error);
   live.resultMood=hadErr?"error":toolCalls.length>0?"success":"normal";
   if(toolCalls.length && live.toolStatus){
    live.content=live.content+String.fromCharCode(10,10)+live.toolStatus;
    delete live.toolStatus;
   }
   refreshChat();
   if(localStorage.getItem("falkor.tts")==="1" && live.content){
    try{
     const tr=await fetch("/api/tts",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":STATE.agentPin||""},body:JSON.stringify({text:((function(t){var i=t.lastIndexOf(String.fromCharCode(10)+"[");return (i>=0?t.substring(0,i):t).trim().substring(0,800);})(live.content)),provider:localStorage.getItem("falkor.tts.provider")||"openai",voice:(localStorage.getItem("falkor.tts.provider")==="elevenlabs"?(localStorage.getItem("falkor.tts.voice")||""):(localStorage.getItem("falkor.tts.openai_voice")||"alloy"))})});
     if(tr.ok){const blob=await tr.blob();const audio=new Audio(URL.createObjectURL(blob));audio.play()}
    }catch(e){}
   }
  }catch(err){
   if(STATE.chat.length && STATE.chat[STATE.chat.length-1].pending) STATE.chat.pop();
   const live=STATE.chat[STATE.chat.length-1];
   if(live && live.streaming){live.streaming=false;live.content+=String.fromCharCode(10)+"Error: "+err.message}
   else STATE.chat.push({role:"assistant",content:"Error: "+err.message,resultMood:"error"});
  }
  btn.disabled=false;refreshChat();inp.focus();
 });
 p.appendChild(form);return p;
}

function refreshChat(){
 const msgs=$("#chat-msgs");if(!msgs)return;
 msgs.innerHTML="";
 if(STATE.chat.length===0){
   const empty=el("div",{class:"chat-empty",style:"display:flex;flex-direction:column;align-items:center;gap:8px;padding:40px 20px"});
   empty.appendChild(el("div",{class:"fk fk-sleep fk-md"}));
   empty.appendChild(el("div",{style:"text-align:center;font-size:12px"},"Ready when you are. Click any tile then \u201cChat about this\u201d to scope me to a project, or just type a question."));
   msgs.appendChild(empty);
  }
 for(const m of STATE.chat){
   if(m.role==="assistant"){
    const wrap=el("div",{style:"display:flex;gap:8px;align-self:flex-start;max-width:95%"});
    let mascotClass="fk-smile";
    if(m.pending) mascotClass="fk-think";
    else if(m.resultMood==="success") mascotClass="fk-celebrate";
    else if(m.resultMood==="error") mascotClass="fk-confused";
    wrap.appendChild(el("div",{class:"fk "+mascotClass+" fk-xs",style:"flex:0 0 auto;margin-top:2px"+(m.pending?";animation:fk-pulse 1.2s ease-in-out infinite":"")}));
    const bubbleCol=el("div",{style:"display:flex;flex-direction:column;gap:6px;align-self:flex-start;max-width:100%"});
    bubbleCol.appendChild(el("div",{class:"msg assistant",style:"align-self:flex-start;max-width:100%"},m.content));
    if(m.images&&m.images.length){
     m.images.forEach(im=>{
      const ic=el("div",{style:"background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:6px;align-self:flex-start"});
      const img=el("img",{src:im.src,style:"max-width:300px;max-height:300px;border-radius:6px;display:block"});
      ic.appendChild(img);
      if(im.caption)ic.appendChild(el("div",{style:"font-size:10px;color:var(--muted);margin-top:4px;word-break:break-all"},im.caption));
      bubbleCol.appendChild(ic);
     });
    }
    wrap.appendChild(bubbleCol);
    msgs.appendChild(wrap);
   } else {
    msgs.appendChild(el("div",{class:"msg "+m.role},m.content));
   }
  }
 msgs.scrollTop=msgs.scrollHeight;
}

function renderChatMain(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Chat"));m.appendChild(top);
 m.appendChild(el("div",{class:"placeholder"},
  el("h2",{style:"color:var(--text);margin:0 0 10px"},"Chat panel is on the right \u2192"),
  el("span",{},"On wide screens chat sits in the sidebar. Click any project then \u201cChat about this\u201d to scope the AI."),
 ));
 return m;
}

function renderFinance(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Finance"));m.appendChild(top);
 const list=STATE.projects.map(p=>({...p,_cost:parseCost(p.cost)})).sort((a,b)=>b._cost-a._cost);
 const total=list.reduce((s,p)=>s+p._cost,0);
 const monthly=list.filter(p=>{const c=String(p.cost||"").toLowerCase();return c.indexOf("month")>=0||c.indexOf("/mo")>=0||c.indexOf("/m")>=0});
 const monthlyTotal=monthly.reduce((s,p)=>s+p._cost,0);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:14px"});
 const cards=el("div",{style:"display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px"});
 const card=(label,val,sub)=>{const c=el("div",{class:"fcard"});c.appendChild(el("div",{class:"fcard-label"},label));c.appendChild(el("div",{class:"fcard-val"},val));if(sub)c.appendChild(el("div",{class:"fcard-sub"},sub));return c};
 cards.appendChild(card("Total spend","$"+total.toFixed(2), list.length+" projects"));
 cards.appendChild(card("Monthly recurring","$"+monthlyTotal.toFixed(2)+"/mo", monthly.length+" projects"));
 cards.appendChild(card("Avg per project","$"+(list.length?total/list.length:0).toFixed(2),""));
 wrap.appendChild(cards);
 wrap.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-top:10px"},"Highest cost first \u2014 click any row for full project info."));
 const tbl=el("div",{style:"display:grid;gap:4px"});
 list.forEach(p=>{
  const row=el("div",{class:"fee-row"});
  row.addEventListener("click",()=>openModal(p));
  const left=el("div");
  left.appendChild(el("div",{style:"font-weight:600"},p.name||"\u2014"));
  if(p.cost_notes||p.tech)left.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-top:2px"},p.cost_notes||p.tech||""));
  row.appendChild(left);
  row.appendChild(el("div",{style:"color:var(--accent);font-weight:600;text-align:right"},p.cost||"\u2014"));
  row.appendChild(el("span",{class:"badge "+(p.status||"").toLowerCase(),style:"text-align:center"},p.status||"\u2014"));
  tbl.appendChild(row);
 });
 wrap.appendChild(tbl);
 m.appendChild(wrap);return m;
}

function renderRecent(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Recent"));m.appendChild(top);
 const list=STATE.projects.slice().sort((a,b)=>(b.last_updated||"").localeCompare(a.last_updated||"")).slice(0,30);
 const wrap=el("div",{style:"padding:18px 20px;display:grid;gap:8px"});
 wrap.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-bottom:6px"},"Last 30 projects by update date \u2014 click to open."));
 list.forEach(p=>{
  const row=el("div",{style:"display:grid;grid-template-columns:140px 1fr auto;gap:14px;padding:12px 14px;background:var(--panel);border:1px solid var(--border);border-radius:8px;cursor:pointer;align-items:center"});
  row.addEventListener("click",()=>openModal(p));
  row.appendChild(el("div",{style:"font-size:11px;color:var(--muted);font-family:ui-monospace,monospace"},p.last_updated||"\u2014"));
  const mid=el("div");
  mid.appendChild(el("div",{style:"font-weight:600;font-size:14px"},p.name||"\u2014"));
  if(p.next)mid.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-top:2px"},"Next: "+p.next));
  row.appendChild(mid);
  row.appendChild(el("span",{class:"badge "+(p.status||"").toLowerCase()},p.status||"\u2014"));
  wrap.appendChild(row);
 });
 m.appendChild(wrap);return m;
}
function renderTools(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Tools"));m.appendChild(top);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:14px"});
 wrap.appendChild(el("div",{style:"color:var(--muted);font-size:12px"},"Direct links to your operator infrastructure. Open in new tab."));
 const groups=[
  {title:"Cloudflare",items:[
   ["CF Dashboard","https://dash.cloudflare.com/a6f47c17811ee2f8b6caeb8f38768c20","\u2601 All workers, DNS, R2, D1, KV"],
   ["Workers list","https://dash.cloudflare.com/a6f47c17811ee2f8b6caeb8f38768c20/workers/overview","Worker fleet"],
   ["DNS (luckdragon.io)","https://dash.cloudflare.com/a6f47c17811ee2f8b6caeb8f38768c20/luckdragon.io/dns","DNS records"],
   ["AI Gateway","https://dash.cloudflare.com/a6f47c17811ee2f8b6caeb8f38768c20/ai/ai-gateway","AI usage + caching"],
  ]},
  {title:"GitHub",items:[
   ["Repos (LuckDragonAsgard)","https://github.com/LuckDragonAsgard","\uD83D\uDCE6 Source repos"],
   ["asgard-workers","https://github.com/LuckDragonAsgard/asgard-workers","Main worker repo"],
   ["asgard-source","https://github.com/LuckDragonAsgard/asgard-source","Legacy source"],
  ]},
  {title:"Services",items:[
   ["Stripe Dashboard","https://dashboard.stripe.com","\uD83D\uDCB3 Payments"],
   ["Vercel Dashboard","https://vercel.com/dashboard","\u25B2 Vercel deploys"],
   ["Supabase","https://supabase.com/dashboard/projects","\uD83D\uDDC4 Postgres"],
   ["Google Drive","https://drive.google.com","\uD83D\uDCC1 Drive"],
   ["Connect Google Drive","/connect-drive?slot=ld","\uD83D\uDD17 Re-auth Drive (one click — auto-redirects to Google)"],
   ["Asgard Vault","https://asgard-vault.pgallivan.workers.dev/secrets","\uD83D\uDD11 Secrets (PIN required)"],
  ]},
  {title:"Falkor APIs",items:[
   ["Projects API","https://falkor-dashboard.luckdragon.io/api/projects","48 projects JSON"],
   ["Asgard AI chat","https://asgard-ai.luckdragon.io/health","AI router"],
   ["Falkor Brain","https://falkor-brain.luckdragon.io/health","Vectorize RAG"],
  ]},
 ];
 groups.forEach(g=>{
  wrap.appendChild(el("div",{style:"font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:14px"},g.title));
  const grid=el("div",{style:"display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px"});
  g.items.forEach(([label,url,desc])=>{
   const card=el("a",{href:url,target:"_blank",rel:"noopener",style:"background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:12px 14px;text-decoration:none;color:var(--text);transition:all 0.1s;display:block"});
   card.appendChild(el("div",{style:"font-weight:600;font-size:13px"},label));
   if(desc)card.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-top:2px"},desc));
   grid.appendChild(card);
  });
  wrap.appendChild(grid);
 });
 // Voice settings
 wrap.appendChild(el("div",{style:"font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:14px"},"Voice"));
 const vcard=el("div",{style:"background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:14px"});
 vcard.appendChild(el("div",{style:"font-weight:600;font-size:13px;margin-bottom:8px"},"TTS provider"));
 const provSel=el("select",{style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px;width:100%;margin-bottom:8px"});
 [["openai","OpenAI TTS (default, free-ish)"],["elevenlabs","ElevenLabs (paid plan needed — voice clone)"]].forEach(([v,t])=>{const o=el("option",{value:v},t);if(localStorage.getItem("falkor.tts.provider")===v)o.selected=true;provSel.appendChild(o)});
 provSel.addEventListener("change",()=>{localStorage.setItem("falkor.tts.provider",provSel.value)});
 vcard.appendChild(provSel);
 vcard.appendChild(el("div",{style:"font-weight:600;font-size:13px;margin:8px 0 4px"},"Voice ID (ElevenLabs)"));
 vcard.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-bottom:6px"},"Paste an ElevenLabs voice ID. Get one from elevenlabs.io \u2192 Voice Lab \u2192 your cloned voice. Default: 21m00Tcm4TlvDq8ikWAM (Rachel)."));
 const voiceIn=el("input",{type:"text",placeholder:"21m00Tcm4TlvDq8ikWAM",value:localStorage.getItem("falkor.tts.voice")||"",style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px;width:100%;font-family:ui-monospace,monospace;font-size:12px"});
 voiceIn.addEventListener("change",()=>{localStorage.setItem("falkor.tts.voice",voiceIn.value.trim())});
 vcard.appendChild(voiceIn);
 vcard.appendChild(el("div",{style:"font-weight:600;font-size:13px;margin:8px 0 4px"},"OpenAI voice"));
 const oaSel=el("select",{style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px;width:100%"});
 ["alloy","echo","fable","onyx","nova","shimmer"].forEach(v=>{const o=el("option",{value:v},v);if(localStorage.getItem("falkor.tts.openai_voice")===v)o.selected=true;oaSel.appendChild(o)});
 oaSel.addEventListener("change",()=>{localStorage.setItem("falkor.tts.openai_voice",oaSel.value)});
 vcard.appendChild(oaSel);
 const testBtn=el("button",{class:"primary",style:"margin-top:10px"},"\uD83D\uDD0A Test voice");
 const testStat=el("span",{style:"font-size:11px;color:var(--muted);margin-left:10px"});
 vcard.appendChild(testBtn);vcard.appendChild(testStat);
 testBtn.addEventListener("click",async()=>{
  testBtn.disabled=true;testStat.textContent="Generating\u2026";
  const provider=provSel.value;const body={text:"G\u2019day Paddy. Voice test from Falkor.",provider};
  if(provider==="elevenlabs" && voiceIn.value.trim())body.voice=voiceIn.value.trim();
  else if(provider==="openai")body.voice=oaSel.value||"alloy";
  try{
   const r=await fetch("/api/tts",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":STATE.agentPin||""},body:JSON.stringify(body)});
   if(r.ok){const blob=await r.blob();new Audio(URL.createObjectURL(blob)).play();testStat.textContent="\u2713 Played";testStat.style.color="var(--green)"}
   else{const e=await r.text();testStat.textContent="Err: "+e.substring(0,80);testStat.style.color="var(--red)"}
  }catch(e){testStat.textContent="Err: "+e.message;testStat.style.color="var(--red)"}
  testBtn.disabled=false;
 });
 wrap.appendChild(vcard);

 m.appendChild(wrap);return m;
}
function renderRevenue(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Revenue (projected)"));m.appendChild(top);
 const isMerged = p => ["merged","archived","dormant"].includes((p.status||"").toLowerCase());
 const list = STATE.projects.filter(p=>!isMerged(p)).map(p=>{
  const y1=Number(p.y1||p.revenue_y1||0);
  const y2=Number(p.y2||p.revenue_y2||0);
  const y3=Number(p.y3||p.revenue_y3||0);
  return {...p,_y1:y1,_y2:y2,_y3:y3,_total:y1+y2+y3};
 }).sort((a,b)=>b._total-a._total);
 const t1=list.reduce((s,p)=>s+p._y1,0);
 const t2=list.reduce((s,p)=>s+p._y2,0);
 const t3=list.reduce((s,p)=>s+p._y3,0);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:14px"});
 const cards=el("div",{style:"display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px"});
 const fmt=n=>"$"+(n>=1e6?(n/1e6).toFixed(2)+"M":n>=1e3?(n/1e3).toFixed(1)+"k":n.toFixed(0));
 const card=(label,val,sub)=>{const c=el("div",{class:"fcard"});c.appendChild(el("div",{class:"fcard-label"},label));c.appendChild(el("div",{class:"fcard-val"},val));if(sub)c.appendChild(el("div",{class:"fcard-sub"},sub));return c};
 cards.appendChild(card("Year 1 projected",fmt(t1), list.length+" projects"));
 cards.appendChild(card("Year 2 projected",fmt(t2),""));
 cards.appendChild(card("Year 3 projected",fmt(t3),""));
 cards.appendChild(card("3-year total",fmt(t1+t2+t3),""));
 wrap.appendChild(cards);
 wrap.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-top:10px"},"Top revenue projects (by 3-year total). Click a row for full detail."));
 const tbl=el("div",{style:"display:grid;gap:4px"});
 list.forEach(p=>{
  if(p._total===0)return;
  const row=el("div",{style:"display:grid;grid-template-columns:1fr 80px 80px 80px 90px 90px;gap:10px;padding:10px 12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;font-size:13px;cursor:pointer;align-items:center"});
  row.addEventListener("click",()=>openModal(p));
  const left=el("div");
  left.appendChild(el("div",{style:"font-weight:600"},p.name||"\u2014"));
  if(p.url)left.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-top:2px"},p.url));
  row.appendChild(left);
  row.appendChild(el("div",{style:"text-align:right;color:var(--muted)"},fmt(p._y1)));
  row.appendChild(el("div",{style:"text-align:right;color:var(--muted)"},fmt(p._y2)));
  row.appendChild(el("div",{style:"text-align:right;color:var(--muted)"},fmt(p._y3)));
  row.appendChild(el("div",{style:"color:var(--accent);font-weight:600;text-align:right"},fmt(p._total)));
  row.appendChild(el("span",{class:"badge "+(p.status||"").toLowerCase(),style:"text-align:center"},p.status||"\u2014"));
  tbl.appendChild(row);
 });
 // header row
 const hdr=el("div",{style:"display:grid;grid-template-columns:1fr 80px 80px 80px 90px 90px;gap:10px;padding:6px 12px;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px"});
 ["Project","Y1","Y2","Y3","3yr total","Status"].forEach((h,i)=>hdr.appendChild(el("div",{style:i>0&&i<5?"text-align:right":""},h)));
 wrap.appendChild(hdr);
 wrap.appendChild(tbl);
 m.appendChild(wrap);return m;
}
function renderGuide(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Guide"));m.appendChild(top);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:18px;max-width:780px"});
 const intro=el("div",{style:"background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:16px;display:flex;gap:14px;align-items:center"});
 intro.appendChild(el("div",{class:"fk fk-help-book fk-md"}));
 intro.appendChild(el("div",{},
  el("div",{style:"font-weight:700;margin-bottom:4px"},"Talk to Falkor like a colleague who has access to everything."),
  el("div",{style:"font-size:13px;color:var(--muted);line-height:1.5"},"Falkor edits your sites, runs SQL on your D1, deploys workers, drives your browser, and remembers what you tell it. Try the prompts below — copy any of them into the chat panel.")
 ));
 wrap.appendChild(intro);

 const groups = [
  { title:"Edit a project", icon:"\uD83D\uDD27", color:"var(--accent)", prompts:[
    "Open the Bomber Boat project — show me the README",
    "On Bomber Boat: add a section about Marvel Stadium pickup times to the README",
    "Fix the typo on line 12 of horseracetipping.com/index.html",
    "Edit Falkor itself: change the login subtitle from 'Project Hub' to 'Paddy Command Centre' and redeploy",
  ]},
  { title:"Run SQL across your portfolio", icon:"\uD83D\uDCCA", color:"var(--purple)", prompts:[
    "What are my top 5 projects by Y3 revenue?",
    "Show me everything tagged School/SaaS",
    "Which projects haven't been updated in over a month?",
    "Mark Save My Seat as live and update its Y1 to $30k",
  ]},
  { title:"Drive my browser", icon:"\uD83C\uDF10", color:"var(--green)", prompts:[
    "What tabs do I have open?",
    "Open my Stripe dashboard in a new tab and screenshot it",
    "Go to schoolsportportal.com.au and check if anything is broken",
    "Open the Vercel project for pj-budget and tell me when it last deployed",
  ]},
  { title:"Use the wider toolset", icon:"\u2699", color:"var(--amber)", prompts:[
    "Search the web for Cloudflare Workers AI pricing 2026",
    "Fetch https://api.github.com/repos/LuckDragonAsgard/asgard-workers and tell me when it was last pushed",
    "Get my STRIPE_SECRET_KEY from the vault (just confirm it exists)",
    "Redeploy falkor-school worker",
  ]},
  { title:"Memory + preferences", icon:"\uD83E\uDDE0", color:"var(--blue)", prompts:[
    "Remember that I prefer all chat replies under 5 sentences",
    "Remember: SSV Sport Takeover and Sport Portal are now merged into School Sport Portal",
    "What do you remember about how I like to work?",
    "Forget anything you remembered about my old PIN",
  ]},
 ];

 groups.forEach(g => {
  const sec = el("div",{style:"background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px"});
  const head = el("div",{style:"display:flex;align-items:center;gap:8px;margin-bottom:10px"});
  head.appendChild(el("span",{style:"font-size:18px"},g.icon));
  head.appendChild(el("div",{style:"font-weight:700;font-size:15px;color:"+g.color},g.title));
  sec.appendChild(head);
  g.prompts.forEach(p => {
   const row = el("div",{style:"display:flex;align-items:center;gap:8px;padding:8px 12px;margin-top:6px;background:var(--panel2);border-radius:8px;font-size:13px;color:var(--muted);cursor:pointer;transition:all .1s"});
   row.addEventListener("mouseenter",()=>{row.style.borderLeft="3px solid "+g.color;row.style.color="var(--text)"});
   row.addEventListener("mouseleave",()=>{row.style.borderLeft="";row.style.color="var(--muted)"});
   row.appendChild(el("span",{style:"font-family:ui-monospace,monospace;font-size:11px;color:var(--accent);flex:0 0 auto"},"\u203A"));
   row.appendChild(el("span",{style:"flex:1"},p));
   const useBtn = el("button",{style:"background:var(--bg);border:1px solid var(--border);color:var(--muted);font-size:11px;padding:4px 10px;border-radius:6px;cursor:pointer"},"Try it");
   useBtn.addEventListener("click",(e)=>{
    e.stopPropagation();
    // Drop into chat input
    const inp = document.querySelector(".chat-form input");
    if(inp){ inp.value = p; inp.focus(); if(window.innerWidth<=720){const cp=document.querySelector(".chat-pane");if(cp)cp.classList.add("mobile-open");setTimeout(()=>inp.focus(),50)} }
   });
   row.appendChild(useBtn);
   sec.appendChild(row);
  });
  wrap.appendChild(sec);
 });

 // Tips
 const tips = el("div",{style:"background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:16px;font-size:13px;line-height:1.6;color:var(--muted)"});
 tips.appendChild(el("div",{style:"font-weight:700;color:var(--text);margin-bottom:8px"},"Tips"));
 [
  "Click any project tile, then \u201cChat about this\u201d to scope the conversation. The agent gets full context (URL/GitHub/tech/cost) automatically.",
  "Click the \u270F Edit code button on any project to open it in github.dev (web VS Code). Or just ask Falkor to edit it for you.",
  "Most of your projects auto-deploy on commit — when Falkor edits + commits a file, it ships within a minute.",
  "Browser tools need the Falkor Browser Bridge Chrome extension installed (one-time, takes 60 sec).",
  "Falkor edits its own code: open the Falkor (this hub) tile and tell it what you want changed. It rewrites itself and redeploys."
 ].forEach(t => tips.appendChild(el("div",{style:"margin:6px 0;display:flex;gap:8px"},
   el("span",{style:"color:var(--accent);flex:0 0 auto"},"\u2022"),
   el("span",{html:t.replace(/\\u201c/g,'"').replace(/\\u201d/g,'"')})
 )));
 wrap.appendChild(tips);

 m.appendChild(wrap);return m;
}
function renderSport(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Sport"));m.appendChild(top);
 const wrap=el("div",{style:"padding:18px 20px;display:grid;gap:14px;max-width:900px"});
 const tabs=el("div",{style:"display:flex;gap:6px;flex-wrap:wrap"});
 const out=el("div",{id:"sport-out",style:"min-height:200px"});
 const PIN=STATE.agentPin||"";
 const fmt=(promise,format)=>{out.innerHTML='';out.appendChild(el("div",{class:"fk fk-think fk-md",style:"margin:20px auto;display:block"}));promise.then(d=>{out.innerHTML="";out.appendChild(format(d))}).catch(e=>{out.textContent="Error: "+e.message})};
 const ladderTable=(rows)=>{const t=el("div",{style:"display:grid;gap:4px"});const hdr=el("div",{style:"display:grid;grid-template-columns:40px 1fr 50px 50px 50px 90px;gap:8px;padding:6px 12px;font-size:11px;color:var(--muted);text-transform:uppercase"});["#","Team","W","L","D","Pts %"].forEach(h=>hdr.appendChild(el("div",{},h)));t.appendChild(hdr);rows.forEach(r=>{const row=el("div",{style:"display:grid;grid-template-columns:40px 1fr 50px 50px 50px 90px;gap:8px;padding:8px 12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;font-size:13px"});row.appendChild(el("div",{style:"color:var(--accent);font-weight:600"},String(r.rank||r.position||"")));row.appendChild(el("div",{style:"font-weight:600"},r.team||r.name||""));row.appendChild(el("div",{},String(r.wins||r.W||0)));row.appendChild(el("div",{},String(r.losses||r.L||0)));row.appendChild(el("div",{},String(r.draws||r.D||0)));row.appendChild(el("div",{},String(r.points||r.pts||0)+" \u00b7 "+String(r.percentage||r.pct||"-")));t.appendChild(row)});return t};
 const tipsView=(d)=>{
  const c=el("div",{style:"display:grid;gap:10px"});
  const games=d.games||d.fixtures||[];
  if(games.length===0){c.appendChild(el("div",{style:"text-align:center;padding:30px;color:var(--muted)"},"No games to tip yet."));return c}
  c.appendChild(el("div",{style:"font-size:12px;color:var(--muted)"},"Round "+(d.round||"?")+" \u00b7 "+games.length+" games"));
  games.forEach(g=>{
   const gr=el("div",{style:"background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:10px"});
   gr.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-bottom:6px"},g.venue||g.start||""));
   const row=el("div",{style:"display:grid;grid-template-columns:1fr 50px 1fr;gap:8px;align-items:center"});
   const homeBtn=el("button",{style:"background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;border-radius:6px;cursor:pointer;font-weight:600"},g.homeTeam||g.home||"?");
   const vs=el("div",{style:"text-align:center;color:var(--muted);font-size:11px"},"vs");
   const awayBtn=el("button",{style:"background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:8px;border-radius:6px;cursor:pointer;font-weight:600"},g.awayTeam||g.away||"?");
   const submit=async(team)=>{[homeBtn,awayBtn].forEach(b=>b.style.background="var(--panel2)");(team===g.homeTeam?homeBtn:awayBtn).style.background="var(--accent)";try{await fetch("https://falkor-sport.luckdragon.io/afl/comp/tip?pin="+encodeURIComponent(PIN),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({player:STATE.user.name||"Paddy",season:2026,round:d.round,gameId:g.id||g.gameId,homeTeam:g.homeTeam||g.home,awayTeam:g.awayTeam||g.away,tip:team})})}catch(e){}};
   homeBtn.addEventListener("click",()=>submit(g.homeTeam||g.home));
   awayBtn.addEventListener("click",()=>submit(g.awayTeam||g.away));
   row.appendChild(homeBtn);row.appendChild(vs);row.appendChild(awayBtn);
   gr.appendChild(row);
   c.appendChild(gr);
  });
  return c;
 };
 const tab=(label,loader)=>{const b=el("button",{},label);b.addEventListener("click",async()=>{Array.from(tabs.children).forEach(c=>{c.style.background="";c.style.borderColor="var(--border)"});b.style.background="var(--panel2)";b.style.borderColor="var(--accent)";loader()});return b};
 tabs.appendChild(tab("\uD83C\uDFC9 AFL Ladder",()=>fmt(fetch("https://falkor-sport.luckdragon.io/afl/ladder?pin="+encodeURIComponent(PIN)).then(r=>r.json()),d=>ladderTable(Array.isArray(d)?d:(d.ladder||[])))));
 tabs.appendChild(tab("\uD83C\uDFC8 NRL Ladder",()=>fmt(fetch("https://falkor-sport.luckdragon.io/nrl/ladder?pin="+encodeURIComponent(PIN)).then(r=>r.json()),d=>ladderTable(Array.isArray(d)?d:(d.ladder||[])))));
 tabs.appendChild(tab("\uD83C\uDFAF AFL Tipping",()=>fmt(fetch("https://falkor-sport.luckdragon.io/afl/comp?pin="+encodeURIComponent(PIN)).then(r=>r.json()),tipsView)));
 tabs.appendChild(tab("\uD83C\uDFAF NRL Tipping",()=>fmt(fetch("https://falkor-sport.luckdragon.io/nrl/tipping?pin="+encodeURIComponent(PIN)).then(r=>r.json()),tipsView)));
 tabs.appendChild(tab("\uD83D\uDCE1 Squiggle Live",async()=>{
  out.innerHTML="";
  const card=el("div",{style:"display:grid;gap:14px"});
  // Digest preview
  const digestCard=el("div",{class:"fcard"});
  digestCard.appendChild(el("div",{class:"fcard-label"},"DAILY DIGEST PREVIEW"));
  const dpre=el("pre",{style:"white-space:pre-wrap;font-size:12px;background:var(--panel);padding:12px;border-radius:6px;border:1px solid var(--border);margin-top:8px;max-height:400px;overflow:auto"},"Loading\u2026");
  digestCard.appendChild(dpre);
  card.appendChild(digestCard);
  fetch("/api/sport/afl/digest").then(r=>r.json()).then(d=>{
   const txt = (d.digest||"(empty)").split("<b>").join("").split("</b>").join("");
   dpre.textContent=txt;
  }).catch(e=>{dpre.textContent="Error: "+e.message});

  // Push controls
  const pushCard=el("div",{class:"fcard"});
  pushCard.appendChild(el("div",{class:"fcard-label"},"PUSH TO TELEGRAM"));
  const ctrls=el("div",{style:"display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap"});
  const tgtSel=el("select",{style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px"});
  ["paddy","family"].forEach(t=>tgtSel.appendChild(el("option",{value:t},t)));
  ctrls.appendChild(tgtSel);
  const sendBtn=el("button",{class:"primary"},"\uD83D\uDCE8 Send digest");
  ctrls.appendChild(sendBtn);
  const status=el("div",{style:"font-size:11px;color:var(--muted)"});
  ctrls.appendChild(status);
  pushCard.appendChild(ctrls);
  sendBtn.addEventListener("click",async()=>{
   sendBtn.disabled=true;status.textContent="Fetching digest\u2026";
   try{
    const dr=await fetch("/api/sport/afl/digest");const dd=await dr.json();
    const text=dd.digest||"";
    if(!text){status.textContent="No digest";sendBtn.disabled=false;return}
    status.textContent="Sending to "+tgtSel.value+"\u2026";
    const r=await fetch("/api/sport/push",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":PIN},body:JSON.stringify({target:tgtSel.value,text})});
    const j=await r.json();
    if(j.ok){status.textContent="\u2713 Sent (msg #"+(j.result?.message_id||"?")+")";status.style.color="var(--green)"}
    else{status.textContent="Err: "+(j.error||j.description||JSON.stringify(j).substring(0,80));status.style.color="var(--red)"}
   }catch(e){status.textContent="Err: "+e.message;status.style.color="var(--red)"}
   sendBtn.disabled=false;
  });
  card.appendChild(pushCard);

  // Chat ID config
  const cfgCard=el("div",{class:"fcard"});
  cfgCard.appendChild(el("div",{class:"fcard-label"},"CONFIGURE TELEGRAM CHAT IDs"));
  cfgCard.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-top:6px"},"Save target \u2192 chat_id mappings (e.g. \\"family\\" \u2192 \\"-1001234\\"). Find your chat_id by messaging the bot then visiting api.telegram.org/bot<TOKEN>/getUpdates."));
  const cfgRow=el("div",{style:"display:grid;grid-template-columns:120px 1fr auto;gap:8px;margin-top:8px"});
  const cfgT=el("input",{type:"text",placeholder:"target",style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px"});
  const cfgC=el("input",{type:"text",placeholder:"chat_id (e.g. -1001234)",style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px"});
  const cfgBtn=el("button",{class:"primary"},"Save");
  cfgRow.appendChild(cfgT);cfgRow.appendChild(cfgC);cfgRow.appendChild(cfgBtn);
  cfgCard.appendChild(cfgRow);
  const cfgStat=el("div",{style:"font-size:11px;color:var(--muted);margin-top:8px"});
  cfgCard.appendChild(cfgStat);
  const refreshList=async()=>{try{const r=await fetch("/api/sport/chats",{headers:{"X-Pin":PIN}});const d=await r.json();const entries=Object.entries(d);if(entries.length===0){cfgStat.textContent="No chats configured yet."}else{cfgStat.textContent="Configured: "+entries.map(([k,v])=>k+"="+v).join(", ")}}catch(e){cfgStat.textContent="(could not fetch)"}};
  cfgBtn.addEventListener("click",async()=>{cfgBtn.disabled=true;try{const r=await fetch("/api/sport/chats",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":PIN},body:JSON.stringify({target:cfgT.value.trim(),chat_id:cfgC.value.trim()})});const d=await r.json();if(d.ok){cfgT.value="";cfgC.value="";await refreshList()}else{cfgStat.textContent="Err: "+JSON.stringify(d).substring(0,100)}}catch(e){cfgStat.textContent="Err: "+e.message}cfgBtn.disabled=false;});
  refreshList();
  card.appendChild(cfgCard);

  out.appendChild(card);
 }));
 tabs.appendChild(tab("\uD83C\uDFC7 Racing",()=>fmt(fetch("https://falkor-sport.luckdragon.io/racing/comp?pin="+encodeURIComponent(PIN)).then(r=>r.json()),d=>{const x=el("div");if(d.leaderboard&&Array.isArray(d.leaderboard)){x.appendChild(el("div",{style:"font-size:11px;color:var(--muted);text-transform:uppercase;margin-bottom:6px"},"Leaderboard"));d.leaderboard.forEach((p,i)=>{const r=el("div",{style:"display:grid;grid-template-columns:30px 1fr 60px;gap:8px;padding:8px 12px;background:var(--panel);border:1px solid var(--border);border-radius:6px;margin-bottom:4px;font-size:13px"});r.appendChild(el("div",{style:"color:var(--accent);font-weight:600"},(i===0?"\uD83E\uDD47":i===1?"\uD83E\uDD48":i===2?"\uD83E\uDD49":"#"+(i+1))));r.appendChild(el("div",{style:"font-weight:600"},p.player||p.name||""));r.appendChild(el("div",{style:"text-align:right"},String(p.points||p.score||0)));x.appendChild(r)})}else{const pre=el("pre",{style:"white-space:pre-wrap;font-size:11px;background:var(--panel);padding:14px;border-radius:8px;border:1px solid var(--border);overflow:auto"});pre.textContent=JSON.stringify(d,null,2);x.appendChild(pre)}return x})));
 wrap.appendChild(tabs);wrap.appendChild(out);m.appendChild(wrap);
 setTimeout(()=>{if(tabs.firstChild)tabs.firstChild.click()},100);
 return m;
}
function renderSchool(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"School (PE / XC / Lessons)"));m.appendChild(top);
 const PIN=STATE.agentPin||"";
 const wrap=el("div",{style:"padding:18px 20px;display:grid;gap:14px;max-width:900px"});

 // Lesson plan generator
 const lessonCard=el("div",{class:"fcard"});
 lessonCard.appendChild(el("div",{class:"fcard-label"},"PE LESSON PLANNER (5-DAY)"));
 const lf=el("div",{style:"display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px"});
 const yrIn=el("select",{style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px"});
 ["Mixed F-6","Foundation","1","2","3","4","5","6"].forEach(v=>yrIn.appendChild(el("option",{value:v},"Year "+v)));
 const durIn=el("select",{style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px"});
 [30,40,45,60].forEach(v=>durIn.appendChild(el("option",{value:String(v)},v+" min")));
 durIn.value="45";
 const themeIn=el("input",{type:"text",placeholder:"Theme (e.g. Athletics)",style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px"});
 const sizeIn=el("input",{type:"number",placeholder:"Class size",value:"25",min:"1",max:"60",style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:8px"});
 lf.appendChild(yrIn);lf.appendChild(durIn);lf.appendChild(themeIn);lf.appendChild(sizeIn);
 lessonCard.appendChild(lf);
 const planBtn=el("button",{class:"primary",style:"margin-top:10px"},"Generate week");
 lessonCard.appendChild(planBtn);
 const planOut=el("div",{style:"margin-top:12px"});
 lessonCard.appendChild(planOut);
 planBtn.addEventListener("click",async()=>{
  planOut.innerHTML="";planOut.appendChild(el("div",{class:"fk fk-think fk-md",style:"margin:10px auto;display:block"}));
  planOut.appendChild(el("div",{style:"text-align:center;color:var(--muted);font-size:12px;margin-top:6px"},"Generating 5-day plan… (~30s)"));
  planBtn.disabled=true;
  try{
   const r=await fetch("https://falkor-school.luckdragon.io/lesson-week",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":PIN},body:JSON.stringify({year_level:yrIn.value,duration:Number(durIn.value),theme:themeIn.value||null,class_size:Number(sizeIn.value)})});
   const d=await r.json();
   planOut.innerHTML="";
   if(d.error){planOut.appendChild(el("div",{style:"color:var(--red)"},"Error: "+d.error));return}
   if(d.weather_note)planOut.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-bottom:8px;background:var(--panel2);padding:6px 10px;border-radius:6px"},"☁ "+d.weather_note));
   const days=d.days||d.lessons||[];
   if(days.length===0){const pre=el("pre",{style:"white-space:pre-wrap;font-size:12px;background:var(--panel2);padding:10px;border-radius:6px"});pre.textContent=d.plan||d.raw||JSON.stringify(d,null,2);planOut.appendChild(pre);return}
   days.forEach((day,i)=>{
    const dc=el("details",{style:"background:var(--panel2);border-radius:8px;padding:10px;margin-bottom:6px"});
    const sm=el("summary",{style:"cursor:pointer;font-weight:600;font-size:13px"},"Day "+(i+1)+(day.focus?" — "+day.focus:""));
    dc.appendChild(sm);
    const body=el("div",{style:"margin-top:8px;font-size:12px;line-height:1.6"});
    if(day.warm_up)body.appendChild(el("div",{},el("strong",{style:"color:var(--accent)"},"Warm-up: "),day.warm_up));
    if(day.main_activity)body.appendChild(el("div",{style:"margin-top:4px"},el("strong",{style:"color:var(--accent)"},"Main: "),day.main_activity));
    if(day.game)body.appendChild(el("div",{style:"margin-top:4px"},el("strong",{style:"color:var(--accent)"},"Game: "),day.game));
    if(day.equipment)body.appendChild(el("div",{style:"margin-top:4px"},el("strong",{style:"color:var(--muted)"},"Equipment: "),Array.isArray(day.equipment)?day.equipment.join(", "):day.equipment));
    if(day.curriculum)body.appendChild(el("div",{style:"margin-top:4px;font-size:11px;color:var(--muted)"},"📚 "+day.curriculum));
    dc.appendChild(body);
    planOut.appendChild(dc);
   });
   const cp=el("button",{style:"margin-top:8px;background:var(--panel2);color:var(--text);border:1px solid var(--border);padding:6px 12px;border-radius:6px;cursor:pointer"},"Copy as text");
   cp.addEventListener("click",()=>{navigator.clipboard.writeText(d.plan||d.raw||JSON.stringify(d,null,2));cp.textContent="Copied!"});
   planOut.appendChild(cp);
  }catch(e){planOut.appendChild(el("div",{style:"color:var(--red)"},"Error: "+e.message))}
  planBtn.disabled=false;
 });
 wrap.appendChild(lessonCard);

 // PE advisor card
 const pe=el("div",{class:"fcard"});
 pe.appendChild(el("div",{class:"fcard-label"},"PE OUTDOOR ADVISOR"));
 const peBody=el("div",{style:"font-size:14px;margin-top:6px",id:"pe-body"},"Loading\u2026");
 pe.appendChild(peBody);
 fetch("https://falkor-school.luckdragon.io/pe-advisor",{headers:{"X-Pin":PIN}}).then(r=>r.json()).then(d=>{
  peBody.innerHTML="";
  if(d.error){peBody.textContent="Error: "+d.error;return}
  const head=el("div",{style:"display:flex;align-items:baseline;gap:8px;margin-bottom:8px"});
  head.appendChild(el("div",{style:"font-size:22px;font-weight:700;color:"+(d.recommendation==="OUTDOOR"?"var(--green)":d.recommendation==="INDOOR"?"var(--red)":"var(--amber)")},d.recommendation||"-"));
  head.appendChild(el("div",{style:"font-size:13px;color:var(--muted)"},d.date||""));
  peBody.appendChild(head);
  if(d.verdict)peBody.appendChild(el("div",{style:"font-size:14px;line-height:1.5;margin-bottom:10px"},d.verdict));
  const cc=d.current_conditions||{};
  const grid=el("div",{style:"display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin:10px 0"});
  const stat=(label,val)=>{const c=el("div",{style:"background:var(--panel2);border-radius:6px;padding:8px 10px"});c.appendChild(el("div",{style:"font-size:10px;color:var(--muted);text-transform:uppercase"},label));c.appendChild(el("div",{style:"font-size:15px;font-weight:600"},String(val||"-")));return c};
  if(cc.temp!=null)grid.appendChild(stat("Temp",cc.temp+"°C"));
  if(cc.max!=null)grid.appendChild(stat("Max",cc.max+"°C"));
  if(cc.condition)grid.appendChild(stat("Sky",cc.condition));
  if(cc.uv!=null)grid.appendChild(stat("UV",cc.uv+" "+(cc.uv_category||"")));
  if(cc.wind_kmh!=null)grid.appendChild(stat("Wind",cc.wind_kmh+" km/h"));
  if(cc.rain_chance!=null)grid.appendChild(stat("Rain",cc.rain_chance+"%"));
  peBody.appendChild(grid);
  const flags=[];
  if(d.sunscreen_required)flags.push("🧴 Sunscreen");
  if(d.hat_required)flags.push("🧢 Hat");
  if(d.water_breaks_required)flags.push("💧 Water breaks");
  if(flags.length)peBody.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-top:6px"},flags.join(" · ")));
  if(Array.isArray(d.stop_factors)&&d.stop_factors.length){const w=el("div",{style:"margin-top:10px;padding:10px;background:rgba(239,68,68,.1);border-radius:6px;font-size:12px"});w.appendChild(el("div",{style:"font-weight:600;color:var(--red);margin-bottom:4px"},"⛔ Stop factors"));d.stop_factors.forEach(f=>w.appendChild(el("div",{},"• "+f)));peBody.appendChild(w)}
  if(Array.isArray(d.caution_factors)&&d.caution_factors.length){const w=el("div",{style:"margin-top:8px;padding:10px;background:rgba(245,158,11,.1);border-radius:6px;font-size:12px"});w.appendChild(el("div",{style:"font-weight:600;color:var(--amber);margin-bottom:4px"},"⚠️ Caution"));d.caution_factors.forEach(f=>w.appendChild(el("div",{},"• "+f)));peBody.appendChild(w)}
}).catch(e=>{peBody.textContent="Error: "+e.message});
 wrap.appendChild(pe);
 // XC results card
 const xc=el("div",{class:"fcard"});
 xc.appendChild(el("div",{class:"fcard-label"},"CROSS COUNTRY RESULTS"));
 const xcRow=el("div",{style:"display:flex;gap:8px;margin-top:8px;align-items:center"});
 const xcInput=el("input",{type:"date",style:"flex:0 0 auto"});
 const xcBtn=el("button",{},"Load");
 xcRow.appendChild(xcInput);xcRow.appendChild(xcBtn);xc.appendChild(xcRow);
 const xcBody=el("div",{style:"margin-top:10px;font-size:13px",id:"xc-body"});
 xcBtn.addEventListener("click",()=>{xcBody.textContent="Loading\u2026";const url="https://falkor-school.luckdragon.io/xc/results"+(xcInput.value?"?date="+xcInput.value:"");fetch(url,{headers:{"X-Pin":PIN}}).then(r=>r.json()).then(d=>{xcBody.innerHTML="";const pre=el("pre",{style:"white-space:pre-wrap;font-size:12px;background:var(--panel2);padding:10px;border-radius:6px"});pre.textContent=JSON.stringify(d,null,2);xcBody.appendChild(pre);}).catch(e=>{xcBody.textContent="Error: "+e.message})});
 xc.appendChild(xcBody);
 wrap.appendChild(xc);
 m.appendChild(wrap);return m;
}
function renderKBT(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"KBT Trivia"));m.appendChild(top);
 const PIN=STATE.agentPin||"";
 const wrap=el("div",{style:"padding:18px 20px;display:grid;gap:14px;max-width:900px"});

 // === Build a question pack ===
 const buildCard=el("div",{class:"fcard"});
 buildCard.appendChild(el("div",{class:"fcard-label"},"BUILD A QUESTION PACK"));
 const bf=el("div",{style:"display:grid;grid-template-columns:1fr 90px 90px;gap:8px;margin-top:8px"});
 const themeIn=el("input",{type:"text",placeholder:"Theme (e.g. Aussie 90s pop, AFL legends)",style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:10px"});
 const roundsIn=el("input",{type:"number",placeholder:"Rounds",value:"4",min:"1",max:"8",style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:10px"});
 const qprIn=el("input",{type:"number",placeholder:"Q/round",value:"5",min:"3",max:"15",style:"background:var(--input-bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:10px"});
 bf.appendChild(themeIn);bf.appendChild(roundsIn);bf.appendChild(qprIn);
 buildCard.appendChild(bf);
 const buildBtn=el("button",{class:"primary",style:"margin-top:10px"},"Build pack");
 buildCard.appendChild(buildBtn);
 const buildOut=el("div",{style:"margin-top:12px;font-size:13px"});
 buildCard.appendChild(buildOut);
 buildBtn.addEventListener("click",async()=>{
  const theme=themeIn.value.trim()||"general knowledge Australia";
  buildOut.innerHTML="";buildOut.appendChild(el("div",{class:"fk fk-think fk-md",style:"margin:10px auto;display:block"}));
  buildOut.appendChild(el("div",{style:"text-align:center;color:var(--muted);font-size:12px;margin-top:6px"},"Generating "+roundsIn.value+" rounds × "+qprIn.value+" questions… (~30s)"));
  buildBtn.disabled=true;
  try{
   const r=await fetch("https://falkor-kbt.luckdragon.io/build-pack",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":PIN},body:JSON.stringify({theme,rounds:Number(roundsIn.value),qpr:Number(qprIn.value)})});
   const d=await r.json();
   buildOut.innerHTML="";
   if(d.error){buildOut.appendChild(el("div",{style:"color:var(--red)"},"Error: "+d.error));return}
   const head=el("div",{style:"display:flex;align-items:baseline;gap:10px;margin-bottom:8px"});
   head.appendChild(el("div",{style:"font-size:15px;font-weight:700"},theme));
   if(d.suno_prompt)head.appendChild(el("div",{style:"font-size:11px;color:var(--muted)"},"🎵 Suno prompt available"));
   buildOut.appendChild(head);
   (d.rounds||d.pack?.rounds||[]).forEach((rnd,i)=>{
    const rb=el("details",{style:"background:var(--panel2);border-radius:8px;padding:10px;margin-bottom:6px"});
    const sm=el("summary",{style:"cursor:pointer;font-weight:600;font-size:13px"},"Round "+(i+1)+": "+(rnd.category||rnd.title||"?"));
    rb.appendChild(sm);
    (rnd.questions||[]).forEach((q,j)=>{
     const qd=el("div",{style:"margin-top:8px;padding:8px;background:var(--panel);border-radius:6px;font-size:12px"});
     qd.appendChild(el("div",{style:"font-weight:600"},(j+1)+". "+(q.q||q.question||"")));
     qd.appendChild(el("div",{style:"color:var(--accent);margin-top:4px"},"Ans: "+(q.a||q.answer||"")));
     if(q.fun_fact)qd.appendChild(el("div",{style:"color:var(--muted);margin-top:2px;font-style:italic"},"💡 "+q.fun_fact));
     rb.appendChild(qd);
    });
    buildOut.appendChild(rb);
   });
   const copy=el("button",{style:"margin-top:8px;background:var(--panel2);color:var(--text);border:1px solid var(--border);padding:6px 12px;border-radius:6px;cursor:pointer"},"Copy answer sheet");
   copy.addEventListener("click",()=>{navigator.clipboard.writeText(JSON.stringify(d,null,2));copy.textContent="Copied!"});
   buildOut.appendChild(copy);
  }catch(e){buildOut.appendChild(el("div",{style:"color:var(--red)"},"Error: "+e.message))}
  buildBtn.disabled=false;
 });
 wrap.appendChild(buildCard);

 // === Live games list + host controls ===
 const liveCard=el("div",{class:"fcard"});
 liveCard.appendChild(el("div",{class:"fcard-label"},"LIVE GAMES"));
 const liveBody=el("div",{style:"margin-top:8px;font-size:13px"},"Loading…");
 liveCard.appendChild(liveBody);
 const refresh=async()=>{liveBody.textContent="Loading…";try{const r=await fetch("https://falkor-kbt.luckdragon.io/game/list",{headers:{"X-Pin":PIN}});const d=await r.json();liveBody.innerHTML="";const games=d.games||(Array.isArray(d)?d:[]);if(games.length===0){liveBody.appendChild(el("div",{style:"color:var(--muted);font-size:12px;text-align:center;padding:20px"},"No live games. Use the build-pack form above to generate a quiz, then host it via the falkor-kbt API."));return}games.forEach(g=>{const gr=el("div",{style:"display:grid;grid-template-columns:1fr auto auto;gap:10px;padding:10px;background:var(--panel2);border-radius:6px;margin-bottom:6px;align-items:center"});gr.appendChild(el("div",{},el("div",{style:"font-weight:600"},g.code||g.id||"?"),el("div",{style:"font-size:11px;color:var(--muted)"},g.theme||g.title||"")));gr.appendChild(el("span",{class:"badge "+(g.status||"").toLowerCase()},g.status||"?"));const view=el("a",{href:"https://falkor-kbt.luckdragon.io/scoreboard/"+(g.code||g.id),target:"_blank",style:"color:var(--accent);font-size:12px;text-decoration:none"},"📺 Scoreboard");gr.appendChild(view);liveBody.appendChild(gr)});}catch(e){liveBody.textContent="Error: "+e.message}};
 const refreshBtn=el("button",{style:"margin-top:8px;background:var(--panel2);color:var(--text);border:1px solid var(--border);padding:6px 12px;border-radius:6px;cursor:pointer"},"↻ Refresh");
 refreshBtn.addEventListener("click",refresh);
 liveCard.appendChild(refreshBtn);
 wrap.appendChild(liveCard);
 setTimeout(refresh,200);

 m.appendChild(wrap);return m;
}
function renderSystem(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"System"));m.appendChild(top);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:10px"});
 wrap.appendChild(el("div",{style:"color:var(--muted);font-size:12px"},"Cloudflare worker fleet (live):"));
 const list=el("div",{style:"display:grid;gap:6px"});wrap.appendChild(list);m.appendChild(wrap);
 const workers=["falkor-agent","falkor-kbt","falkor-workflows","falkor-school","falkor-sport","falkor-telegram","asgard-ai","falkor-brain","falkor-web","falkor-code","falkor-push","falkor-dashboard","falkor-widget","falkor-tools"];
 workers.forEach(w=>{
  const row=el("div",{style:"display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;font-size:13px"});
  row.appendChild(el("span",{style:"flex:1"},w));
  const ver=el("span",{style:"color:var(--muted);font-size:11px;font-family:ui-monospace,monospace"},"\u2026");
  const dot=el("span",{style:"width:8px;height:8px;border-radius:50%;background:var(--muted)"});
  row.appendChild(ver);row.appendChild(dot);list.appendChild(row);
  fetch("https://"+w+".luckdragon.io/health").then(r=>r.json()).then(d=>{ver.textContent=d.version||d.status||"ok";dot.style.background="var(--green)"}).catch(()=>{ver.textContent="down";dot.style.background="var(--red)"});
 });
 return m;
}

(async function init(){const a=loadAuth();if(a){STATE.user=a.user;STATE.agentPin=a.agentPin;try{await loadProjects()}catch(e){}}render()})();
</script></body></html>`;

const CORS={
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Pin',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};
const NOCACHE={
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};


async function sha256(s) {
  const buf = new TextEncoder().encode(s);
  const hashBuf = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hashBuf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

export default {
  async scheduled(event, env, ctx) {
    // CF Cron Trigger handler. event.cron is the matching cron string.
    const cron = event.cron || '';
    const now = new Date();
    try {
      // 09:00 UTC = 7pm Melbourne AEST — AFL daily digest to family
      if (cron === '0 9 * * *') {
        const d = await fetch('https://falkor.luckdragon.io/api/sport/afl/digest').then(r => r.json());
        if (d.digest) {
          const r = await fetch('https://falkor-telegram.luckdragon.io/send', {
            method:'POST',
            headers:{'Content-Type':'application/json','X-Pin': env.AGENT_PIN},
            body: JSON.stringify({target:'family', text: d.digest, parse_mode:'HTML'}),
          });
          await env.ASSETS.put('cron:afl_digest:'+now.toISOString().substring(0,10), JSON.stringify({status:r.status, sent:Date.now()}), {expirationTtl: 7*86400});
        }
      }
      // 21:00 UTC = 7am Melbourne AEST next-day — daily morning briefing to Paddy
      else if (cron === '0 21 * * *') {
        const d = await fetch('https://falkor.luckdragon.io/api/briefing', {headers:{'X-Pin':env.AGENT_PIN}}).then(r => r.json());
        if (d.briefing) {
          await fetch('https://falkor-telegram.luckdragon.io/send', {
            method:'POST',
            headers:{'Content-Type':'application/json','X-Pin': env.AGENT_PIN},
            body: JSON.stringify({target:'paddy', text: '🌅 <b>Morning briefing</b>\n\n'+d.briefing, parse_mode:'HTML'}),
          });
          await env.ASSETS.put('cron:briefing:'+now.toISOString().substring(0,10), JSON.stringify({sent:Date.now()}), {expirationTtl: 7*86400});
        }
      }
      // 17:00 UTC = 3am Melbourne AEST — memory consolidation (placeholder log)
      else if (cron === '0 17 * * *') {
        await env.ASSETS.put('cron:memory_consolidate:'+now.toISOString().substring(0,10), JSON.stringify({ran:Date.now()}), {expirationTtl: 7*86400});
      }
      // every 6h — autonomous self-improvement loop
      else if (cron === '0 */6 * * *' || cron === '15 */6 * * *') {
        const r = await fetch('https://falkor.luckdragon.io/api/falkor/self-improve', {method:'POST', headers:{'X-Pin':env.AGENT_PIN}});
        await env.ASSETS.put('cron:self_improve:'+now.toISOString(), JSON.stringify({status:r.status, at:Date.now()}), {expirationTtl:7*86400});
        // After any self-improvement, verify the served HTML still parses cleanly
        try {
          const vr = await fetch('https://falkor.luckdragon.io/api/falkor/verify-served');
          const vd = await vr.json();
          if (!vd.ok && vd.errors && vd.errors.length > 0) {
            // Browser-side JS broke! Auto-rollback to previous commit.
            await env.ASSETS.put('cron:autorollback_triggered:'+now.toISOString(), JSON.stringify({errors:vd.errors, at:Date.now()}), {expirationTtl:30*86400});
            await fetch('https://falkor.luckdragon.io/api/falkor/auto-rollback', {method:'POST', headers:{'X-Pin':env.AGENT_PIN}});
          }
        } catch(e){}
      }
      // Every 5 minutes — verify served JS parses (catches black-screen bugs that pass worker syntax check)
      else if (cron === '*/5 * * * *') {
        try {
          const vr = await fetch('https://falkor.luckdragon.io/api/falkor/verify-served');
          const vd = await vr.json();
          if (!vd.ok && vd.errors && vd.errors.length > 0) {
            await env.ASSETS.put('cron:autorollback_triggered:'+now.toISOString(), JSON.stringify({errors:vd.errors, at:Date.now()}), {expirationTtl:30*86400});
            await fetch('https://falkor.luckdragon.io/api/falkor/auto-rollback', {method:'POST', headers:{'X-Pin':env.AGENT_PIN}});
          }
        } catch(e){}
      }
    } catch(e) {
      try { await env.ASSETS.put('cron:err:'+now.toISOString(), String(e).substring(0,500), {expirationTtl: 7*86400}); } catch(ee){}
    }
  },
  async fetch(request, env) {
    const url=new URL(request.url);
    if(request.method==='OPTIONS')return new Response(null,{headers:CORS});
    if(url.pathname==='/health')return Response.json({ok:true,worker:'falkor-tools',version:'4.1.0',mode:'chat-first-home',streaming:true,build_hash:HTML.length.toString(36)+'_'+(HTML.charCodeAt(100)+HTML.charCodeAt(50000)).toString(36)},{headers:{...CORS,...NOCACHE}});
    if(url.pathname==='/api/projects'){
      try {
        const sql = "SELECT id, project_name AS name, category, status, live_url AS url, github_url AS github, tech_stack AS tech, description AS desc, key_features AS features, next_action AS next, progress_pct AS progress, scale_notes AS scale, detail_md AS detail, notes, last_updated, sort_order, domains, revenue_y1 AS y1, revenue_y2 AS y2, revenue_y3 AS y3, revenue_category, income_priority AS priority, cost_monthly AS cost, cost_notes FROM products ORDER BY sort_order, id";
        const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
          method:'POST',
          headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
          body: JSON.stringify({ sql }),
        });
        const d = await r.json();
        if (!d.success) return Response.json({ projects:[], error: d.errors }, { headers:{...CORS,...NOCACHE} });
        // Format cost as a string for tile display ($1.58 -> "$1.58/mo")
        const projects = (d.result?.[0]?.results || []).map(p => ({
          ...p,
          cost: p.cost > 0 ? '$'+p.cost.toFixed(2)+'/mo' : (p.cost === 0 ? '' : p.cost),
        }));
        return Response.json({ projects }, { headers:{...CORS,...NOCACHE} });
      } catch(e) {
        return Response.json({ error:'D1 query failed', detail: String(e).substring(0,300) }, { status:500, headers:{...CORS,...NOCACHE} });
      }
    }
    if(url.pathname==='/api/projects/search'){
      try {
        const q = url.searchParams.get('q') || '';
        if(!q) return Response.json({ok:false,error:'missing q param'},{status:400,headers:{...CORS,...NOCACHE}});
        const sql = "SELECT id, project_name, description, status, live_url, income_priority FROM products WHERE project_name LIKE ? OR description LIKE ? OR notes LIKE ? ORDER BY income_priority DESC LIMIT 20";
        const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
          method:'POST',
          headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
          body: JSON.stringify({ sql, params:['%'+q+'%','%'+q+'%','%'+q+'%'] }),
        });
        const d = await r.json();
        if (!d.success) return Response.json({ok:false,error:d.errors},{status:500,headers:{...CORS,...NOCACHE}});
        const results = d.result?.[0]?.results || [];
        return Response.json({ok:true,total:results.length,results},{headers:{...CORS,...NOCACHE}});
      } catch(e) {
        return Response.json({ok:false,error:String(e).substring(0,300)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }
    if(url.pathname==='/browser/ping'){
      const pin = request.headers.get('X-Pin') || '';
      // simple auth: any of agent pin, dashboard pin, or paddy pin via vault verify
      if (!pin) return new Response('Unauthorized',{status:401,headers:CORS});
      // check via falkor-push verify (same as login)
      try {
        const r = await fetch('https://falkor-push.luckdragon.io/user/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:'paddy',pin})});
        const d = await r.json();
        if (d && d.success) return Response.json({ok:true},{headers:{...CORS,...NOCACHE}});
      } catch(e){}
      // fallback: agent pin
      if (pin === env.AGENT_PIN) return Response.json({ok:true},{headers:{...CORS,...NOCACHE}});
      return new Response('Unauthorized',{status:401,headers:CORS});
    }
    if(url.pathname==='/browser/poll'){
      const pin = request.headers.get('X-Pin') || '';
      if (!pin || (pin !== env.AGENT_PIN && pin !== '2967')) {
        // verify against push
        let ok=false;
        try { const r=await fetch('https://falkor-push.luckdragon.io/user/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:'paddy',pin})}); const d=await r.json(); ok=!!(d&&d.success);}catch(e){}
        if(!ok) return new Response('Unauthorized',{status:401,headers:CORS});
      }
      // pop next pending command from KV
      const queue = await env.ASSETS.get('browser:queue', { type:'json' }) || [];
      if (queue.length === 0) return new Response('',{status:204,headers:{...CORS,...NOCACHE}});
      const cmd = queue.shift();
      await env.ASSETS.put('browser:queue', JSON.stringify(queue));
      return Response.json(cmd, {headers:{...CORS,...NOCACHE}});
    }
    if(url.pathname==='/browser/result'&&request.method==='POST'){
      const pin = request.headers.get('X-Pin') || '';
      if (!pin) return new Response('Unauthorized',{status:401,headers:CORS});
      const body = await request.json();
      if (!body.id) return Response.json({error:'id required'},{status:400,headers:CORS});
      // store result keyed by command id, expires 5 min
      await env.ASSETS.put('browser:result:'+body.id, JSON.stringify(body.output||{}), { expirationTtl: 300 });
      return Response.json({ok:true},{headers:{...CORS,...NOCACHE}});
    }
    if(url.pathname==='/upload'&&request.method==='GET'){
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Upload mascot</title>
<style>body{background:#0a0e14;color:#e6edf6;font-family:system-ui;padding:40px;max-width:600px;margin:auto}
h1{color:#ff6b35}
.drop{border:2px dashed #444;border-radius:12px;padding:60px;text-align:center;cursor:pointer;margin:20px 0}
.drop:hover{border-color:#ff6b35}
.row{display:flex;gap:10px;align-items:center;margin:8px 0;padding:10px;background:#11161f;border-radius:8px}
.row input{flex:1;background:#161c27;color:#e6edf6;border:1px solid #222;border-radius:6px;padding:8px}
.row button{background:linear-gradient(135deg,#ff6b35,#ffa94d);color:#fff;border:none;border-radius:6px;padding:8px 16px;cursor:pointer}
.thumb{width:80px;height:80px;object-fit:cover;border-radius:6px;background:#222}
.log{background:#11161f;border-radius:8px;padding:12px;margin-top:20px;font-family:ui-monospace,monospace;font-size:12px;white-space:pre-wrap;color:#8b95a7}
</style></head><body>
<h1>Upload Falkor mascots</h1>
<p>Drop the 3 PNGs here. Each will be saved with the key falkor1, falkor2, falkor3 (or use the file's name).</p>
<div class="drop" id="drop">Drag &amp; drop PNG/JPG files here, or click to pick</div>
<input type="file" id="fp" accept="image/*" multiple style="display:none">
<div id="rows"></div>
<button id="up" style="background:linear-gradient(135deg,#ff6b35,#ffa94d);color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:15px;cursor:pointer;margin-top:10px;display:none">Upload all</button>
<div class="log" id="log"></div>
<script>
const drop=document.getElementById('drop'),fp=document.getElementById('fp'),rows=document.getElementById('rows'),logEl=document.getElementById('log'),upBtn=document.getElementById('up');
const queue=[];
const log=m=>{logEl.textContent+=m+String.fromCharCode(10);logEl.scrollTop=logEl.scrollHeight};
drop.onclick=()=>fp.click();
drop.ondragover=e=>{e.preventDefault();drop.style.borderColor='#ff6b35'};
drop.ondragleave=()=>drop.style.borderColor='#444';
drop.ondrop=e=>{e.preventDefault();drop.style.borderColor='#444';add(e.dataTransfer.files)};
fp.onchange=()=>add(fp.files);
function add(files){
 for(const f of files){
  if(!f.type.startsWith('image/')){log('skip non-image: '+f.name);continue}
  const slug=(f.name.replace(/\.[^.]+$/,'').toLowerCase().replace(/[^a-z0-9]+/g,'-')).replace(/^-+|-+$/g,'')||('asset'+Date.now());
  const item={file:f,slug,size:f.size};queue.push(item);
  const reader=new FileReader();
  reader.onload=()=>{
   const row=document.createElement('div');row.className='row';
   const img=document.createElement('img');img.className='thumb';img.src=reader.result;row.appendChild(img);
   const info=document.createElement('div');info.style.flex='1';info.innerHTML='<div style="font-weight:600">'+f.name+'</div><div style="font-size:11px;color:#888">'+(f.size/1024).toFixed(1)+' KB</div>';row.appendChild(info);
   const inp=document.createElement('input');inp.value=slug;inp.oninput=()=>{item.slug=inp.value};row.appendChild(inp);
   rows.appendChild(row);
   item.dataUrl=reader.result;
   upBtn.style.display='block';
  };
  reader.readAsDataURL(f);
 }
}
upBtn.onclick=async()=>{
 upBtn.disabled=true;upBtn.textContent='Uploading...';
 for(const it of queue){
  if(!it.dataUrl){log('not ready: '+it.file.name);continue}
  log('uploading '+it.slug+' ('+(it.size/1024).toFixed(1)+' KB)...');
  const base64=it.dataUrl.split(',')[1];
  const ct=it.dataUrl.split(';')[0].split(':')[1];
  const r=await fetch('/upload',{method:'POST',headers:{'Content-Type':'application/json','X-Pin':localStorage.getItem('asgard.pin')||'2967'},body:JSON.stringify({slug:it.slug,base64,content_type:ct})});
  const d=await r.json();
  if(d.ok){log(' \u2713 '+it.slug+' -> /asset/'+it.slug+' ('+d.bytes+' bytes)')}
  else{log(' \u2717 '+it.slug+': '+(d.error||'failed'))}
 }
 upBtn.disabled=false;upBtn.textContent='Upload all';
 log('done. View: /asset/<slug>');
};
</script></body></html>`;
      return new Response(html, { headers:{'Content-Type':'text/html; charset=utf-8',...NOCACHE,...CORS} });
    }
    if(url.pathname==='/upload'&&request.method==='POST'){
      try{
        const pin = request.headers.get('X-Pin') || '';
        if (!pin) return Response.json({error:'PIN required'},{status:401,headers:{...CORS,...NOCACHE}});
        const body = await request.json();
        const slug = (body.slug||'').replace(/[^a-zA-Z0-9._-]/g,'').substring(0,80);
        const ct = body.content_type || 'application/octet-stream';
        const base64 = body.base64 || '';
        if (!slug || !base64) return Response.json({error:'slug + base64 required'},{status:400,headers:{...CORS,...NOCACHE}});
        // store base64 + content_type in KV
        await env.ASSETS.put('asset:'+slug, base64, { metadata: { content_type: ct } });
        const bin = atob(base64);
        return Response.json({ok:true, slug, bytes: bin.length, content_type: ct},{headers:{...CORS,...NOCACHE}});
      }catch(e){
        return Response.json({error:'upload failed', detail: String(e).substring(0,300)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }
    if(url.pathname.startsWith('/asset/')){
      const slug = url.pathname.replace('/asset/','').replace(/[^a-zA-Z0-9._-]/g,'').substring(0,80);
      if (!slug) return new Response('Not found',{status:404,headers:CORS});
      const obj = await env.ASSETS.getWithMetadata('asset:'+slug);
      if (!obj || !obj.value) return new Response('Not found',{status:404,headers:CORS});
      const ct = obj.metadata?.content_type || 'application/octet-stream';
      const bin = Uint8Array.from(atob(obj.value), c => c.charCodeAt(0));
      return new Response(bin, {headers:{'Content-Type':ct,'Cache-Control':'public, max-age=300, must-revalidate',...CORS}});
    }
    if(url.pathname==='/api/stt'&&request.method==='POST'){
      try {
        const pin = request.headers.get('X-Pin') || '';
        const audio = await request.arrayBuffer();
        // Build multipart/form-data with 'audio' field
        const boundary = '----falkorstt'+Date.now();
        const ct = request.headers.get('Content-Type') || 'audio/webm';
        const ext = ct.includes('mpeg')?'mp3':ct.includes('mp4')?'m4a':ct.includes('wav')?'wav':'webm';
        const head = new TextEncoder().encode(
          '--'+boundary+'\r\n'+
          'Content-Disposition: form-data; name="audio"; filename="rec.'+ext+'"\r\n'+
          'Content-Type: '+ct+'\r\n\r\n'
        );
        const tail = new TextEncoder().encode('\r\n--'+boundary+'--\r\n');
        const body = new Uint8Array(head.length + audio.byteLength + tail.length);
        body.set(head, 0);
        body.set(new Uint8Array(audio), head.length);
        body.set(tail, head.length + audio.byteLength);
        const upstream = await fetch('https://asgard-ai.luckdragon.io/stt', {
          method:'POST',
          headers:{ 'Content-Type':'multipart/form-data; boundary='+boundary, 'X-Pin': pin },
          body,
        });
        const text = await upstream.text();
        return new Response(text, { status: upstream.status, headers:{ 'Content-Type':'application/json', ...CORS, ...NOCACHE } });
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/tts'&&request.method==='POST'){
      try {
        const pin = request.headers.get('X-Pin') || '';
        const body = await request.text();
        const upstream = await fetch('https://asgard-ai.luckdragon.io/speak', {
          method:'POST',
          headers:{ 'Content-Type':'application/json', 'X-Pin': pin },
          body,
        });
        const buf = await upstream.arrayBuffer();
        return new Response(buf, { status: upstream.status, headers:{ 'Content-Type': upstream.headers.get('content-type')||'audio/mpeg', ...CORS } });
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/route'&&request.method==='POST'){
      // Phase 1: 17-tier waterfall router with KV usage tracker.
      // Picks the cheapest provider that can handle the query, falling through tiers as quotas exhaust.
      try {
        const body = await request.json();
        const message = body.message || '';
        const complexity = body.complexity || 'auto';  // 'simple' | 'medium' | 'complex' | 'auto'
        const today = new Date().toISOString().substring(0,10);
        const counterKey = (provider) => 'route:'+today+':'+provider;
        async function getCount(p) { try { return parseInt(await env.ASSETS.get(counterKey(p))||'0'); } catch { return 0; } }
        async function bumpCount(p) { try { const c = await getCount(p); await env.ASSETS.put(counterKey(p), String(c+1), {expirationTtl: 36*3600}); } catch(e){} }

        // Quotas (free tier limits per day)
        const QUOTAS = {
          'cf-cache': Infinity,
          'cf-workers-ai': 10000,    // 10k neurons/day approximation
          'groq': 1000,              // 1000 req/day free
          'gemini-flash-lite': 1000, // 1000 req/day
          'openrouter-free': 200,    // 200 req/day
          'mistral-free': 1000,      // ~33k req/month ≈ 1000/day
          'deepseek': Infinity,      // paid but cheapest
          'qwen': Infinity,
          'gemini-flash': Infinity,
          'haiku': Infinity,
          'mistral-small': Infinity,
          'grok-mini': Infinity,
          'gemini-pro': Infinity,
          'sonnet': Infinity,
          'gpt5': Infinity,
          'grok4': Infinity,
          'opus': Infinity,
        };

        // Tier order based on complexity
        const TIERS = {
          simple: ['cf-cache','cf-workers-ai','groq','gemini-flash-lite','openrouter-free','mistral-free','deepseek','qwen','gemini-flash','haiku'],
          medium: ['cf-cache','groq','gemini-flash-lite','openrouter-free','deepseek','gemini-flash','haiku','mistral-small','grok-mini'],
          complex: ['cf-cache','haiku','sonnet','gemini-pro','gpt5','grok4'],
        };
        // Auto-classify (very rough)
        let cls = complexity;
        if (cls === 'auto') {
          const wc = message.split(/\s+/).length;
          if (wc < 30 && !/code|debug|implement|architect|analyze|complex/i.test(message)) cls = 'simple';
          else if (/opus|complex|architect|deep|reason carefully/i.test(message)) cls = 'complex';
          else cls = 'medium';
        }
        const tiers = TIERS[cls] || TIERS.medium;

        // Pick first provider with quota left
        let pick = null;
        for (const p of tiers) {
          const used = await getCount(p);
          if (used < QUOTAS[p]) { pick = p; break; }
        }
        if (!pick) pick = 'haiku';

        // Cache lookup
        if (pick === 'cf-cache') {
          const cacheKey = 'cache:'+await sha256(message);
          const cached = await env.ASSETS.get(cacheKey);
          if (cached) {
            await bumpCount(pick);
            return Response.json({ok:true, reply:cached, provider:'cf-cache', tier:cls, cached:true}, {headers:{...CORS,...NOCACHE}});
          }
          // Fall to next tier
          pick = tiers[1] || 'haiku';
        }

        // Map provider → asgard-ai supported model + provider
        // Map our tier names to asgard-ai's model aliases (only providers asgard-ai supports today)
        const PROVIDER_MAP = {
          'groq':              {alias:'groq-fast'},
          'gemini-flash-lite': {alias:'gemini-2.5-flash'},
          'openrouter-free':   {alias:'groq'}, // fallback to groq large
          'mistral-free':      {alias:'groq'},
          'deepseek':          {alias:'haiku'},
          'qwen':              {alias:'groq-fast'},
          'gemini-flash':      {alias:'gemini-2.5-flash'},
          'haiku':             {alias:'haiku'},
          'mistral-small':     {alias:'haiku'},
          'grok-mini':         {alias:'haiku'},
          'gemini-pro':        {alias:'gemini-2.5-pro'},
          'sonnet':            {alias:'sonnet'},
          'gpt5':              {alias:'gpt-5-mini'},
          'grok4':             {alias:'sonnet'},
          'opus':              {alias:'opus'},
          'cf-workers-ai':     {alias:'groq-fast'}, // until CF AI binding wired
        };
        const cfg = PROVIDER_MAP[pick] || PROVIDER_MAP.haiku;

        // Forward to asgard-ai /chat/smart
        const upstream = await fetch('https://asgard-ai.luckdragon.io/chat/smart',{
          method:'POST',
          headers:{'Content-Type':'application/json','X-Pin':env.AGENT_PIN},
          body: JSON.stringify({message, model: cfg.alias, max_tokens: body.max_tokens || 1024}),
        });
        const data = await upstream.json();
        const reply = data.reply || data.text || data.error || '';

        // Cache simple replies
        if (cls === 'simple' && reply && !data.error) {
          const cacheKey = 'cache:'+await sha256(message);
          try { await env.ASSETS.put(cacheKey, reply, {expirationTtl: 24*3600}); } catch(e){}
        }

        await bumpCount(pick);
        return Response.json({ok: !data.error, reply, provider: pick, tier: cls, alias: cfg.alias, usage: { [pick]: (await getCount(pick)) }}, {headers:{...CORS,...NOCACHE}});
      } catch(e) {
        return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

    if(url.pathname==='/api/route/usage'){
      // Show today's per-provider counters
      try {
        const today = new Date().toISOString().substring(0,10);
        const providers = ['cf-cache','cf-workers-ai','groq','gemini-flash-lite','openrouter-free','mistral-free','deepseek','qwen','gemini-flash','haiku','mistral-small','grok-mini','gemini-pro','sonnet','gpt5','grok4','opus'];
        const out = {};
        for (const p of providers) { try { out[p] = parseInt(await env.ASSETS.get('route:'+today+':'+p)||'0'); } catch { out[p] = 0; } }
        return Response.json({ok:true, date:today, counters:out}, {headers:{...CORS,...NOCACHE}});
      } catch(e) {
        return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

    if(url.pathname==='/connect-drive'){
      // Public link: hits asgard-ai oauth-start with slot=ld + X-Pin server-side, redirects user to Google OAuth.
      try {
        const slot = url.searchParams.get('slot') || 'ld';
        const r = await fetch('https://asgard-ai.luckdragon.io/google/oauth-start?slot='+encodeURIComponent(slot), { headers:{ 'X-Pin': env.AGENT_PIN }, redirect: 'manual' });
        const loc = r.headers.get('location');
        if (loc) return Response.redirect(loc, 302);
        const txt = await r.text();
        const m = txt.match(/(https:\/\/accounts\.google\.com\/[^\s\r\n]+)/);
        if (!m) return new Response('No OAuth URL: '+txt.substring(0,200), {status:500});
        return Response.redirect(m[1], 302);
      } catch(e) {
        return new Response('connect-drive failed: '+String(e).substring(0,200), {status:500});
      }
    }
        if(url.pathname==='/api/weather'){
      try {
        const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-37.86&longitude=144.9&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation_probability,uv_index&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=Australia/Melbourne&forecast_days=3");
        const d = await r.json();
        return Response.json(d, {headers:{...CORS,...NOCACHE}});
      } catch(e){
        return Response.json({error:String(e)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

    if(url.pathname==='/api/kbt/generate-quiz' && request.method==='POST'){
      try {
        const body = await request.json();
        const theme = body.theme || 'General Knowledge';
        const rounds = body.rounds || 6;
        const qpr = body.questions_per_round || 8;
        const aReq = await fetch('https://api.anthropic.com/v1/messages',{
          method:'POST',
          headers:{'x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},
          body: JSON.stringify({
            model:'claude-haiku-4-5-20251001',
            max_tokens: 4096,
            system:'You are a trivia question writer for Kow Brainer Trivia. Generate engaging pub-quiz questions, answers, and fun_facts in JSON.',
            messages:[{role:'user',content:`Generate a quiz pack in JSON format:\n{\n  "pack": {\n    "theme": "${theme}",\n    "rounds": [\n      {\n        "title": "Round 1",\n        "questions": [\n          {"q": "question", "a": "answer", "fun_fact": "fun fact"}\n        ]\n      }\n    ]\n  }\n}\nGenerate exactly ${rounds} rounds with ${qpr} questions each.`}]
          })
        });
        const aData = await aReq.json();
        const content = aData.content?.[0]?.text || '{}';
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const pack = jsonMatch ? JSON.parse(jsonMatch[0]) : {pack:{theme,rounds:[]}};
        return Response.json(pack, {headers:{...CORS,...NOCACHE}});
      } catch(e){
        return Response.json({error:String(e)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

    if(url.pathname==='/api/briefing'){
      try {
        // Synthesize a daily summary from D1 data + tools
        const ctxR = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query',{
          method:'POST',headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},
          body: JSON.stringify({sql:"SELECT project_name, status, next_action, last_updated FROM products WHERE status NOT IN ('archived','merged','dormant') AND next_action IS NOT NULL AND next_action != '' ORDER BY income_priority DESC, last_updated DESC LIMIT 12"}),
        });
        const cd = await ctxR.json();
        const items = cd.result?.[0]?.results || [];
        const ctx = items.map(p => '- '+p.project_name+(p.next_action?' \u2014 next: '+p.next_action.substring(0,120):'')).join(String.fromCharCode(10));
        const aReq = await fetch('https://api.anthropic.com/v1/messages',{
          method:'POST',
          headers:{'x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},
          body: JSON.stringify({
            model:'claude-haiku-4-5-20251001',
            max_tokens: 600,
            system:'You are Falkor, briefing Paddy on his portfolio. Style: Jarvis-esque, dry, terse, helpful. No emojis. Pick 2-3 things worth focusing on TODAY.',
            messages:[{role:'user',content:'Active projects with pending next-actions:'+String.fromCharCode(10)+ctx+String.fromCharCode(10,10)+'Write a 4-sentence morning briefing.'}],
          }),
        });
        const a = await aReq.json();
        const text = (a.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('');
        return Response.json({ ok:true, briefing: text, items_considered: items.length, generated_at: new Date().toISOString() }, { headers:{...CORS,...NOCACHE} });
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname.startsWith('/api/sport/afl/')){
      // Squiggle AFL proxy with proper UA + caching
      const sub = url.pathname.replace('/api/sport/afl/','');
      const headers = {'User-Agent':'Falkor/1.0 (paddy@luckdragon.io)','Accept':'application/json'};
      const yr = url.searchParams.get('year') || new Date().getFullYear();
      try {
        if (sub === 'recent') {
          const r = await fetch('https://api.squiggle.com.au/?q=games;year='+yr+';complete=100&format=json', {headers});
          const d = await r.json();
          const games = (d.games||[]).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10);
          return Response.json({ok:true, games, count: games.length}, {headers:{...CORS,...NOCACHE}});
        }
        if (sub === 'upcoming') {
          const r = await fetch('https://api.squiggle.com.au/?q=games;year='+yr+';complete=0&format=json', {headers});
          const d = await r.json();
          const games = (d.games||[]).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,10);
          return Response.json({ok:true, games, count: games.length}, {headers:{...CORS,...NOCACHE}});
        }
        if (sub === 'ladder') {
          const r = await fetch('https://api.squiggle.com.au/?q=ladder;year='+yr+';source=1&format=json', {headers});
          const d = await r.json();
          const lad = (d.ladder||[]).filter(t=>t.source==='Squiggle' || !t.source).sort((a,b)=>(a.rank||99)-(b.rank||99));
          return Response.json({ok:true, ladder: lad}, {headers:{...CORS,...NOCACHE}});
        }
        if (sub === 'essendon') {
          const r = await fetch('https://api.squiggle.com.au/?q=games;year='+yr+';team=5&format=json', {headers});
          const d = await r.json();
          const games = d.games||[];
          const past = games.filter(g => g.complete===100).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
          const upcoming = games.filter(g => g.complete!==100).sort((a,b)=>a.date.localeCompare(b.date))[0]||null;
          return Response.json({ok:true, total:games.length, recent:past, next:upcoming}, {headers:{...CORS,...NOCACHE}});
        }
        if (sub === 'tips') {
          const rd = url.searchParams.get('round') || '';
          const r = await fetch('https://api.squiggle.com.au/?q=tips;year='+yr+(rd?';round='+rd:'')+'&format=json', {headers});
          const d = await r.json();
          return Response.json({ok:true, tips: d.tips||[]}, {headers:{...CORS,...NOCACHE}});
        }
        if (sub === 'match-report') {
          const gid = url.searchParams.get('game_id');
          const r = await fetch('https://api.squiggle.com.au/?q=games;year='+yr+';complete=100&format=json', {headers});
          const d = await r.json();
          const games = (d.games||[]).filter(g=>!gid || String(g.id)===String(gid)).sort((a,b)=>b.date.localeCompare(a.date));
          const g = games[0];
          if(!g) return Response.json({error:'no game'},{status:404,headers:{...CORS,...NOCACHE}});
          const aReq = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},body: JSON.stringify({model:'claude-haiku-4-5-20251001', max_tokens:600, system:'Punchy AFL match reports for SMS/Telegram. 4-6 sentences max. No filler.', messages:[{role:'user',content:'Match report: '+g.hteam+' '+g.hscore+' vs '+g.ateam+' '+g.ascore+' at '+g.venue+'. Round '+g.round+'. Include the storyline.'}]})});
          const a = await aReq.json();
          const report = (a.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('');
          return Response.json({ok:true, game:{id:g.id,date:g.date,venue:g.venue,hteam:g.hteam,hscore:g.hscore,ateam:g.ateam,ascore:g.ascore,winner:g.winner,round:g.round}, report}, {headers:{...CORS,...NOCACHE}});
        }
        if (sub === 'digest') {
          // Build a Telegram-friendly summary: today's results + tomorrow's fixtures + ladder top 8
          const [recR, upR, ladR] = await Promise.all([
            fetch('https://api.squiggle.com.au/?q=games;year='+yr+';complete=100&format=json',{headers}),
            fetch('https://api.squiggle.com.au/?q=games;year='+yr+';complete=0&format=json',{headers}),
            fetch('https://api.squiggle.com.au/?q=ladder;year='+yr+';source=1&format=json',{headers}),
          ]);
          const rec = (await recR.json()).games||[];
          const up  = (await upR.json()).games||[];
          const lad = ((await ladR.json()).ladder||[]).filter(t=>t.source==='Squiggle' || !t.source);
          // Today's results = recent games whose date is within last 24h
          const now = Date.now();
          const todays = rec.filter(g => Math.abs(now - new Date(g.date).getTime()) < 36*3600*1000).sort((a,b)=>a.date.localeCompare(b.date));
          const next  = up.filter(g => new Date(g.date).getTime() - now < 7*86400*1000).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,8);
          const lines = ['<b>AFL Update</b>'];
          if (todays.length) {
            lines.push('','<b>Recent results</b>');
            todays.forEach(g => { const hh=Number(g.hscore)||0, aa=Number(g.ascore)||0; const w = hh>aa?[g.hteam,hh,g.ateam,aa]:[g.ateam,aa,g.hteam,hh]; lines.push(`${w[0]} ${w[1]} d ${w[2]} ${w[3]} (${g.venue||''})`); });
          }
          if (next.length) {
            lines.push('','<b>Upcoming</b>');
            next.forEach(g => {
              const d = new Date(g.date);
              const dayShort = d.toLocaleDateString('en-AU',{weekday:'short',hour:'numeric',minute:'2-digit'});
              lines.push(`${dayShort}: ${g.hteam} v ${g.ateam} @ ${g.venue||''}`);
            });
          }
          if (lad.length) {
            lines.push('','<b>Ladder (top 8)</b>');
            lad.slice().sort((a,b)=>(a.rank||99)-(b.rank||99)).slice(0,8).forEach(t => { const nm = t.team || t.name || '?'; const pts = (parseFloat(t.wins)||0)*4 + (parseFloat(t.draws)||0)*2; lines.push(`${t.rank}. ${nm} (${pts.toFixed(0)} pts, ${t.percentage||''}%)`); });
            const ess = lad.find(t=>String(t.team||t.name||'').toLowerCase().includes('essendon'));
            if (ess) { const epts = (parseFloat(ess.wins)||0)*4 + (parseFloat(ess.draws)||0)*2; lines.push('','Essendon: '+ess.rank+'. ('+epts.toFixed(0)+' pts, '+(ess.percentage||'')+'%)'); }
          }
          return Response.json({ok:true, digest: lines.join(String.fromCharCode(10))}, {headers:{...CORS,...NOCACHE}});
        }
        return Response.json({error:'unknown sub: '+sub},{status:404,headers:{...CORS,...NOCACHE}});
      } catch(e){
        return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

    if(url.pathname==='/api/sport/push'&&request.method==='POST'){
      // Sends a Telegram message to family/paddy chat. Body: {target?:'family'|'paddy', text:'...'}
      try {
        const body = await request.json();
        const r = await fetch('https://falkor-telegram.luckdragon.io/send',{
          method:'POST',
          headers:{'Content-Type':'application/json','X-Pin':env.AGENT_PIN},
          body: JSON.stringify({target: body.target||'paddy', text: body.text||'', parse_mode:'HTML'}),
        });
        const d = await r.text();
        return new Response(d, {status:r.status, headers:{'Content-Type':'application/json',...CORS,...NOCACHE}});
      } catch(e){
        return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

    if(url.pathname==='/api/sport/chats'&&(request.method==='POST'||request.method==='GET')){
      // Proxy to falkor-telegram /chats
      try {
        const opts = {method: request.method, headers:{'X-Pin':env.AGENT_PIN}};
        if (request.method === 'POST') {
          opts.headers['Content-Type'] = 'application/json';
          opts.body = await request.text();
        }
        const r = await fetch('https://falkor-telegram.luckdragon.io/chats', opts);
        const d = await r.text();
        return new Response(d, {status:r.status, headers:{'Content-Type':'application/json',...CORS,...NOCACHE}});
      } catch(e){
        return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }









    if(url.pathname==='/api/family/members'&&request.method==='GET'){
      try {
        const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query',{method:'POST',headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({sql:'SELECT member, display_name FROM family_members ORDER BY member'})});
        const d = await r.json();
        return Response.json({ok:true, members: d.result?.[0]?.results || []}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/family/tip'&&request.method==='POST'){
      try {
        const body = await request.json();
        const {member, year, round, game_id, tip} = body;
        if (!member||!year||!round||!game_id||!tip) return Response.json({error:'missing fields'},{status:400,headers:{...CORS,...NOCACHE}});
        const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query',{method:'POST',headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({sql:'INSERT OR REPLACE INTO family_tips (member, year, round, game_id, tip) VALUES (?,?,?,?,?)', params:[member,year,round,game_id,tip]})});
        const d = await r.json();
        return Response.json({ok:!!d.success}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/family/tips'&&request.method==='GET'){
      try {
        const round = url.searchParams.get('round')||'';
        let q = 'SELECT member, year, round, game_id, tip, points FROM family_tips';
        if (round) q += ' WHERE round='+parseInt(round);
        q += ' ORDER BY member, round, game_id';
        const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query',{method:'POST',headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({sql:q})});
        const d = await r.json();
        return Response.json({ok:true, tips: d.result?.[0]?.results || []}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/family/leaderboard'&&request.method==='GET'){
      try {
        const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query',{method:'POST',headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({sql:'SELECT m.member, m.display_name, COALESCE(SUM(t.points),0) as total_points FROM family_members m LEFT JOIN family_tips t ON m.member=t.member GROUP BY m.member ORDER BY total_points DESC, m.member'})});
        const d = await r.json();
        return Response.json({ok:true, leaderboard: d.result?.[0]?.results || []}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/family/leaderboard-by-round'&&request.method==='GET'){
      try {
        const round = new URL(request.url).searchParams.get('round');
        if(!round) return Response.json({ok:false, error:'round param required'},{status:400,headers:{...CORS,...NOCACHE}});
        const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query',{method:'POST',headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({sql:'SELECT m.member, m.display_name, COALESCE(SUM(t.points),0) as round_points FROM family_members m LEFT JOIN family_tips t ON m.member=t.member AND t.round=? GROUP BY m.member ORDER BY round_points DESC, m.member', params:[round]})});
        const d = await r.json();
        return Response.json({ok:true, round:parseInt(round), leaderboard: d.result?.[0]?.results || []}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/family/score-round'&&request.method==='POST'){
      try {
        const body = await request.json();
        const {year, round} = body;
        if(!year || !round) return Response.json({ok:false, error:'year and round required'},{status:400,headers:{...CORS,...NOCACHE}});
        
        // Fetch completed games from Squiggle
        const gRes = await fetch('https://api.squiggle.com.au/?q=games;year='+year+';round='+round+';complete=100&format=json', {headers:{'User-Agent':'Falkor/1.0 (paddy@luckdragon.io)'}});
        const gData = await gRes.json();
        const gamesList = Array.isArray(gData) ? gData : (gData.games || []);
        
        // Build winner map: game_id -> winner team name
        const winners = {};
        const breakdown = [];
        for (const g of gamesList) {
          let winner = null;
          if (g.hscore > g.ascore) winner = g.hteam;
          else if (g.ascore > g.hscore) winner = g.ateam;
          if (winner) {
            winners[g.id] = winner;
            breakdown.push({game_id:g.id, winner, tippers_correct:0, tippers_wrong:0});
          }
        }
        
        // Fetch all tips for this year+round
        const tRes = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query',{method:'POST',headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({sql:'SELECT id, game_id, tip FROM family_tips WHERE year=? AND round=?', params:[year, round]})});
        const tData = await tRes.json();
        const tips = tData.result?.[0]?.results || [];
        
        // Score each tip and build update batch
        const updates = [];
        for (const t of tips) {
          const winnerTeam = winners[t.game_id];
          const points = (winnerTeam && t.tip === winnerTeam) ? 1 : 0;
          updates.push({id:t.id, points, tip:t.tip, winner:winnerTeam});
          // Track breakdown
          const bd = breakdown.find(b=>b.game_id===t.game_id);
          if (bd) { if (points===1) bd.tippers_correct++; else bd.tippers_wrong++; }
        }
        
        // Batch update family_tips
        if (updates.length > 0) {
          const updateSql = 'UPDATE family_tips SET points=? WHERE id=?';
          const statements = updates.map(u => ({sql:updateSql, params:[u.points, u.id]}));
          await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query',{method:'POST',headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({statements})});
        }
        
        return Response.json({ok:true, year, round, games_scored:Object.keys(winners).length, tips_updated:updates.length, breakdown}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/falkor/self-improve'&&request.method==='POST'){
      // Autonomous self-improvement loop. Triggered by cron every 6h or manually.
      try {
        // Kill switch
        const enabled = await env.ASSETS.get('falkor:autonomous:enabled');
        if (enabled === 'false') return Response.json({ok:false, skipped:'kill switch off'},{headers:{...CORS,...NOCACHE}});

        // Daily quota: max 3 improvements/day
        const today = new Date().toISOString().substring(0,10);
        const qkey = 'falkor:improvements:'+today;
        const qcount = parseInt(await env.ASSETS.get(qkey)||'0');
        if (qcount >= 3) return Response.json({ok:false, skipped:'daily quota reached', count:qcount},{headers:{...CORS,...NOCACHE}});

        // Gather context: recent cron errors + last 5 commits + fleet health
        const ctx = [];
        try {
          const errList = await env.ASSETS.list({prefix:'cron:err:'});
          for (const k of (errList?.keys||[]).slice(0,5)) {
            const v = await env.ASSETS.get(k.name);
            if (v) ctx.push('CRON ERROR ('+k.name+'): '+v.substring(0,200));
          }
        } catch(e){}
        try {
          const ghr = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/commits?path=falkor-tools.js&per_page=5',{headers:{'Authorization':'token '+env.GITHUB_TOKEN,'User-Agent':'falkor'}});
          const commits = await ghr.json();
          if (Array.isArray(commits)) ctx.push('RECENT COMMITS: '+commits.map(c=>c.sha.substring(0,7)+' - '+c.commit.message.substring(0,80)).join(' | '));
        } catch(e){}
        try {
          const fh = await fetch('https://falkor-code.luckdragon.io/workers',{headers:{'X-Pin':env.AGENT_PIN}});
          const fhd = await fh.json();
          if (fhd.broken > 0) ctx.push('FLEET: '+fhd.broken+' broken workers detected');
        } catch(e){}

        // Run agent loop with self-improvement prompt
        const project = { name:'Falkor', github:'https://github.com/LuckDragonAsgard/asgard-workers' };
        const messages = [{role:'user', content:
          'You are running the Falkor autonomous self-improvement loop. Pick ONE small concrete improvement to ship NOW.\n\n' +
          'CONTEXT:\n' + ctx.join('\n') + '\n\n' +
          'RULES:\n' +
          '- Make ONE surgical change via edit_file or multi_edit\n' +
          '- Run cf_deploy_worker name=falkor-tools to deploy it\n' +
          '- Verify with web_fetch /health that it still responds\n' +
          '- If anything was broken in the context above, FIX THAT FIRST\n' +
          '- Otherwise, pick a small UX or polish improvement (better error messages, more useful tool descriptions, etc)\n' +
          '- DO NOT add new endpoints or large new features — keep it small and safe\n' +
          '- DO NOT touch other workers — only falkor-tools.js\n' +
          '- If you cannot identify a safe improvement, respond "SKIP" and do nothing\n\n' +
          'Just pick something and ship it. Be terse.' }];

        // Call Anthropic with full tool set (reusing AGENT_TOOLS from module scope)
        let owner='LuckDragonAsgard', repo='asgard-workers';
        const ghHeaders = { 'Authorization':'token '+env.GITHUB_TOKEN, 'User-Agent':'falkor-self-improve', 'Accept':'application/vnd.github+json' };
        const toolResults = [];
        let iter = 0;
        const maxIter = 15;
        while (iter < maxIter) {
          iter++;
          const aReq = await fetch('https://api.anthropic.com/v1/messages',{
            method:'POST',
            headers:{'x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},
            body: JSON.stringify({model:'claude-haiku-4-5-20251001', max_tokens:2048, system:'You are Falkor in autonomous mode. You MUST ship ONE concrete improvement this cycle. If unsure, fix a typo, improve an error message, or clarify a tool description. Use grep_file once, edit_file once, cf_deploy_worker once, web_fetch /health once. Never just explore — always commit something.', tools: AGENT_TOOLS, messages}),
          });
          if (!aReq.ok) break;
          const a = await aReq.json();
          messages.push({role:'assistant', content: a.content});
          if (a.stop_reason === 'tool_use') {
            const results = [];
            for (const tu of a.content.filter(c=>c.type==='tool_use')) {
              let out;
              try { out = await execAgentTool(tu.name, tu.input, env, project, owner, repo, ghHeaders); }
              catch(e){ out = { error: String(e).substring(0,200) }; }
              toolResults.push({tool:tu.name, input:tu.input, output:out});
              results.push({type:'tool_result', tool_use_id:tu.id, content: JSON.stringify(out).substring(0,30000)});
            }
            messages.push({role:'user', content: results});
            continue;
          }
          break;
        }
        const finalText = (messages[messages.length-1]?.content || []).filter(c=>c.type==='text').map(c=>c.text).join('') || '(no text)';

        // Verify /health still works
        let healthOK = false;
        try { const hr = await fetch('https://falkor.luckdragon.io/health'); const hd = await hr.json(); healthOK = hd.ok === true; } catch(e){}

        // Bump quota and log
        await env.ASSETS.put(qkey, String(qcount+1), {expirationTtl: 36*3600});
        const logEntry = { at: new Date().toISOString(), summary: finalText.substring(0,500), tools: toolResults.map(t=>({tool:t.tool, ok: !t.output?.error})), health_ok: healthOK };
        const logKey = 'falkor:improvement:log:'+Date.now();
        await env.ASSETS.put(logKey, JSON.stringify(logEntry), {expirationTtl: 30*86400});

        return Response.json({ok:true, summary: finalText, tools_used: toolResults.length, health_after: healthOK, quota_used: qcount+1}, {headers:{...CORS,...NOCACHE}});
      } catch(e){
        return Response.json({error:String(e).substring(0,400)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

    if(url.pathname==='/api/falkor/heartbeat'&&request.method==='POST'){
      // Page calls this on load. We log timestamp; verify-served reads the latest.
      try {
        await env.ASSETS.put('falkor:heartbeat:latest', String(Date.now()), {expirationTtl: 7*86400});
        return Response.json({ok:true},{headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }

    if(url.pathname==='/api/falkor/verify-served'){
      // Health check: if no heartbeat from a real browser in last 10 min, the served JS is probably broken.
      // Combine with: HTML size sanity, contains expected markers.
      try {
        const html = HTML;
        const errors = [];
        // Sanity: HTML has the SPA shell
        if (!html.includes('<div id="app">')) errors.push({error:'missing #app div'});
        if (html.length < 30000) errors.push({error:'HTML too small: '+html.length+' bytes (expected >30KB)'});
        // Heartbeat freshness — if any heartbeat exists, check it's recent
        let lastHB = null;
        try {
          const v = await env.ASSETS.get('falkor:heartbeat:latest');
          if (v) {
            lastHB = parseInt(v);
            const ageMs = Date.now() - lastHB;
            // Stale if >30 min — page might be broken (or no one's loaded it)
            if (ageMs > 30*60*1000) errors.push({error:'no heartbeat in '+Math.round(ageMs/60000)+' min — page may be broken or unused'});
          }
        } catch(e){}
        return Response.json({ok: errors.length===0, errors, html_size: html.length, last_heartbeat: lastHB, last_heartbeat_age_sec: lastHB ? Math.round((Date.now()-lastHB)/1000) : null}, {headers:{...CORS,...NOCACHE}});
      } catch(e){
        return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

        if(url.pathname==='/api/falkor/auto-rollback'&&request.method==='POST'){
      // Auto-rollback: revert falkor-tools.js to the previous commit on GitHub, then redeploy.
      try {
        const ghHeaders = { 'Authorization':'token '+env.GITHUB_TOKEN, 'User-Agent':'falkor-rollback', 'Accept':'application/vnd.github+json' };
        // Get last 2 commits for falkor-tools.js
        const cR = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/commits?path=falkor-tools.js&per_page=2', {headers: ghHeaders});
        const commits = await cR.json();
        if (!Array.isArray(commits) || commits.length < 2) return Response.json({error:'cannot find previous commit'},{status:400,headers:{...CORS,...NOCACHE}});
        const prevSha = commits[1].sha;
        // Get prev file content
        const fR = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/contents/falkor-tools.js?ref='+prevSha, {headers: ghHeaders});
        const fD = await fR.json();
        let content = '';
        if (fD.content) content = atob(fD.content.replace(/\n/g,''));
        else if (fD.size && fD.sha) {
          const br = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/git/blobs/'+fD.sha, {headers: ghHeaders});
          if (br.ok) { const bd = await br.json(); content = atob(bd.content.replace(/\n/g,'')); }
        }
        if (!content) return Response.json({error:'no prev content'},{status:500,headers:{...CORS,...NOCACHE}});
        // Get current sha for HEAD file
        const headR = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/contents/falkor-tools.js', {headers: ghHeaders});
        const headD = await headR.json();
        // Commit revert
        const wR = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/contents/falkor-tools.js', {
          method:'PUT',
          headers: { ...ghHeaders, 'Content-Type':'application/json' },
          body: JSON.stringify({ message:'auto-rollback to '+prevSha.substring(0,7)+' (browser-side syntax error detected)', content: btoa(content), sha: headD.sha }),
        });
        const wD = await wR.json();
        if (!wR.ok) return Response.json({error:'rollback commit failed', detail: wD.message},{status:500,headers:{...CORS,...NOCACHE}});
        // Trigger redeploy via cf_deploy_worker pattern — fetch source from new HEAD and PUT
        const newHead = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/contents/falkor-tools.js', {headers: ghHeaders});
        const newHeadD = await newHead.json();
        const newCode = atob(newHeadD.content.replace(/\n/g,''));
        const boundary = '----rollback'+Date.now();
        const metadata = { main_module:'worker.js', compatibility_date:'2024-09-30', bindings:[], keep_bindings:['secret_text','kv_namespace','d1','durable_object_namespace'] };
        const part1 = '--'+boundary+'\r\nContent-Disposition: form-data; name="metadata"\r\nContent-Type: application/json\r\n\r\n'+JSON.stringify(metadata)+'\r\n';
        const part2 = '--'+boundary+'\r\nContent-Disposition: form-data; name="worker.js"; filename="worker.js"\r\nContent-Type: application/javascript+module\r\n\r\n';
        const enc = new TextEncoder();
        const body = new Blob([enc.encode(part1+part2), enc.encode(newCode), enc.encode('\r\n--'+boundary+'--\r\n')]);
        const dR = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/workers/scripts/falkor-tools', {
          method:'PUT',
          headers: { 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'multipart/form-data; boundary='+boundary },
          body,
        });
        const dD = await dR.json();
        // Log
        await env.ASSETS.put('cron:rollback:'+new Date().toISOString(), JSON.stringify({to: prevSha.substring(0,10), at: Date.now(), deploy_ok: dD.success}), {expirationTtl: 30*86400});
        return Response.json({ok: dD.success, rolled_back_to: prevSha.substring(0,10), commit: wD.commit?.sha?.substring(0,7), deploy: dD.result?.deployment_id}, {headers:{...CORS,...NOCACHE}});
      } catch(e){
        return Response.json({error:String(e).substring(0,400)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }

    if(url.pathname==='/api/falkor/improvements'){
      // Show recent autonomous improvements
      try {
        const list = await env.ASSETS.list({prefix:'falkor:improvement:log:'});
        const out = [];
        for (const k of (list?.keys||[]).slice(-30)) {
          const v = await env.ASSETS.get(k.name);
          if (v) try { out.push(JSON.parse(v)); } catch(e){}
        }
        out.sort((a,b)=>(b.at||'').localeCompare(a.at||''));
        return Response.json({ok:true, count:out.length, log:out.slice(0,30)}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }

    if(url.pathname==='/api/falkor/autonomous'&&request.method==='POST'){
      // Toggle kill switch: body {enabled: true|false}
      try {
        const body = await request.json();
        await env.ASSETS.put('falkor:autonomous:enabled', body.enabled === false ? 'false' : 'true');
        return Response.json({ok:true, enabled: body.enabled !== false}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/falkor/autonomous'){
      try {
        const v = await env.ASSETS.get('falkor:autonomous:enabled');
        return Response.json({enabled: v !== 'false', value: v||'(unset, defaults to enabled)'}, {headers:{...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }

    if(url.pathname==='/api/push/vapid'){
      try {
        const r = await fetch('https://falkor-push.luckdragon.io/vapid-public-key',{ headers:{'X-Pin':env.AGENT_PIN}});
        return new Response(await r.text(),{status:r.status,headers:{'Content-Type':'application/json',...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/push/subscribe'&&request.method==='POST'){
      try {
        const body = await request.text();
        const r = await fetch('https://falkor-push.luckdragon.io/subscribe',{
          method:'POST',headers:{'Content-Type':'application/json','X-Pin':env.AGENT_PIN},body,
        });
        return new Response(await r.text(),{status:r.status,headers:{'Content-Type':'application/json',...CORS,...NOCACHE}});
      } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }
    }
    if(url.pathname==='/api/chat'&&request.method==='POST'){
      // Server-side proxy to dodge browser CORS issues with asgard-ai
      const pin = request.headers.get('X-Pin') || '';
      const body = await request.text();
      const upstream = await fetch(UPSTREAM_CHAT, {
        method:'POST',
        headers:{'Content-Type':'application/json','X-Pin':pin},
        body,
      });
      const text = await upstream.text();
      return new Response(text, {
        status: upstream.status,
        headers:{'Content-Type':'application/json',...CORS,...NOCACHE},
      });
    }
    if(url.pathname==='/api/chat'){
      return new Response('Method Not Allowed',{status:405,headers:CORS});
    }
    if(url.pathname==='/api/agent-chat-stream'&&request.method==='POST'){
      const body = await request.json();
      const userMsg = body.message || '';
      const project = body.project || null;
      const history = Array.isArray(body.history) ? body.history : [];
      const enc = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const send = (obj) => controller.enqueue(enc.encode(JSON.stringify(obj)+String.fromCharCode(10)));
          const fail = (m) => { send({type:'error', message:m}); controller.close(); };
          try {
            // Same setup as non-streaming agent
            let owner=null, repo=null;
            if (project && project.github) { const m = project.github.match(/github\.com\/([^/]+)\/([^/?#]+)/); if (m) { owner=m[1]; repo=m[2].replace(/\.git$/,''); } }
            // Memory + history loading
            let memBlock = '';
            try {
              const mr = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST', headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},
                body: JSON.stringify({sql:'SELECT category, fact FROM falkor_memory WHERE user_id="paddy" ORDER BY importance DESC LIMIT 30'}),
              });
              const md = await mr.json();
              const mems = md.result?.[0]?.results || [];
              if (mems.length) memBlock = String.fromCharCode(10,10) + 'WHAT YOU REMEMBER ABOUT PADDY:'+ String.fromCharCode(10) + mems.map(m=>'- ['+m.category+'] '+m.fact).join(String.fromCharCode(10));
            } catch(e){}
            let priorTurns = [];
            try {
              const hr = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST', headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},
                body: JSON.stringify({sql:'SELECT role, content FROM falkor_chat_history WHERE user_id="paddy" ORDER BY created_at DESC LIMIT 20'}),
              });
              const hd = await hr.json();
              priorTurns = (hd.result?.[0]?.results || []).reverse().map(r=>({role:r.role,content:r.content}));
            } catch(e){}
            let system = "You are Falkor — Paddy's personal coding agent embedded in his Asgard project hub. Casual, direct, terse. No fluff, no apologies." + "\n\n=== ZERO-TOLERANCE PERSISTENCE RULES (NEVER VIOLATE) ===\n\nNEVER write to ephemeral/temp paths. Other Claude chats have repeatedly saved files to AppData, /tmp, /sessions, Local Settings — paths the user CANNOT ACCESS later. THIS IS THE MOST IMPORTANT RULE.\n\nALL persistence goes to one of these locations only:\n1. GitHub (LuckDragonAsgard/asgard-workers) — for code/configs — use write_file/edit_file/multi_edit\n2. Cloudflare D1 — for structured data — use run_d1_query\n3. CF KV (env.ASSETS) — for session state\n4. CF Vectorize via falkor-brain — for semantic memory\n5. User Drive (G:\\My Drive\\Luck Dragon\\) — ONLY when user explicitly asks for an Office file (docx/pptx/xlsx/pdf)\n\nNEVER ALLOWED: AppData, %TEMP%, /tmp, /sessions/, /var/, /usr/, ANY workspace-internal mount path.\n\nIf you need to remember anything across sessions, save to D1 falkor_memory or commit to GitHub. Period.\n\n=== FALKOR-TOOLS.JS CODEBASE RULES (CRITICAL — READ CAREFULLY) ===\n\nVARIABLES IN scope of fetch handler:\n- request (NOT req)\n- request.method (NOT method)\n- env.CF_ACCOUNT_ID, env.D1_DB_ID, env.CF_API_TOKEN, env.AGENT_PIN, env.ANTHROPIC_API_KEY, env.GITHUB_TOKEN, env.VAULT_PIN, env.VAULT_URL\n- env.ASSETS (KV binding)\n- url = new URL(request.url)\n- DO NOT USE: env.DB, env.ASGARD, env.AI, env.CF, defaultBranch — these don't exist\n\nD1 DATABASE PATTERN (use this exact shape):\n  const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {\n    method:'POST',\n    headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},\n    body: JSON.stringify({sql:'SELECT...', params:[a,b,c]}),\n  });\n  const d = await r.json();\n  const rows = d.result?.[0]?.results || [];\n\nENDPOINT PATTERN (copy this shape):\n  if(url.pathname==='/api/your/path'&&request.method==='POST'){\n    try {\n      const body = await request.json();\n      // ... logic ...\n      return Response.json({ok:true, ...}, {headers:{...CORS,...NOCACHE}});\n    } catch(e){ return Response.json({error:String(e).substring(0,200)},{status:500,headers:{...CORS,...NOCACHE}}); }\n  }\n\nWORKFLOW for adding new endpoints:\n1. grep_file path=falkor-tools.js pattern=\"existing similar endpoint\" — find anchor\n2. read_file with start_line/end_line for context (15 lines)\n3. edit_file with full context as old_string (include 5+ surrounding lines for uniqueness)\n4. cf_deploy_worker name=falkor-tools\n5. verify_endpoint url=/api/your/path expected_field=ok — REAL VERIFICATION not just status code\n\nNEVER:\n- Use env.DB.prepare() — D1 client binding doesn't work, USE FETCH PATTERN\n- Use req or method — they're undefined\n- Run cf_deploy_worker without verifying with verify_endpoint after\n- Trust 522 errors — those mean infra issue, retry verify with delay\n- Skip verification — always confirm endpoint returns expected JSON\n\nALWAYS:\n- Use multi_edit to bundle related changes (atomic commit)\n- Include 5+ lines context in edit_file old_string to ensure uniqueness\n- After deploy, sleep 5s, then verify\n- If verify fails, READ the response, FIX the code, redeploy\n- Commit messages: describe WHAT and WHY (not 'edit_file via Falkor agent')\n=== END RULES ===" + memBlock;
            if (project) {
              const ctx = ['','PROJECT CONTEXT:','Name: '+project.name];
              if (project.url) ctx.push('Live: '+project.url);
              if (project.github) ctx.push('GitHub: '+project.github);
              if (project.tech) ctx.push('Tech: '+project.tech);
              if (project.desc) ctx.push('Description: '+project.desc);
              system += String.fromCharCode(10) + ctx.join(String.fromCharCode(10));
            }
            const tools = AGENT_TOOLS;  // shared with non-streaming
            const messages = [...priorTurns, ...history, { role:'user', content: userMsg }];
            const toolResults = [];
            let iterations = 0;
            const maxIter = 15;
            let finalText = '';

            while (iterations < maxIter) {
              iterations++;
              const aReq = await fetch('https://api.anthropic.com/v1/messages', {
                method:'POST',
                headers:{'x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},
                body: JSON.stringify({model:'claude-haiku-4-5-20251001', max_tokens:4096, system, tools, messages, stream:true}),
              });
              if (!aReq.ok) { const t = await aReq.text(); fail('Anthropic '+aReq.status+': '+t.substring(0,300)); return; }

              // Parse SSE stream
              const reader = aReq.body.getReader();
              const td = new TextDecoder();
              let buf = '';
              const assistantContent = [];   // running content blocks for this turn
              let stopReason = null;
              let currentBlock = null;       // {type, index, ...}

              while (true) {
                const {done, value} = await reader.read();
                if (done) break;
                buf += td.decode(value, {stream:true});
                // SSE events split on double-newline
                let nl;
                while ((nl = buf.indexOf(String.fromCharCode(10,10))) !== -1) {
                  const evtBlock = buf.slice(0, nl);
                  buf = buf.slice(nl+2);
                  // each block has lines "event: X" and "data: {...}"
                  const lines = evtBlock.split(String.fromCharCode(10));
                  let evt = '', data = '';
                  for (const ln of lines) {
                    if (ln.startsWith('event: ')) evt = ln.slice(7);
                    else if (ln.startsWith('data: ')) data += ln.slice(6);
                  }
                  if (!data) continue;
                  let ev; try { ev = JSON.parse(data); } catch(e) { continue; }
                  if (ev.type === 'content_block_start') {
                    currentBlock = { ...ev.content_block, _index: ev.index };
                    if (currentBlock.type === 'tool_use') {
                      currentBlock.input_json = '';
                      send({ type:'tool_start', name: currentBlock.name, id: currentBlock.id });
                    }
                  } else if (ev.type === 'content_block_delta') {
                    if (ev.delta.type === 'text_delta') {
                      finalText += ev.delta.text;
                      send({ type:'token', text: ev.delta.text });
                    } else if (ev.delta.type === 'input_json_delta' && currentBlock) {
                      currentBlock.input_json += ev.delta.partial_json || '';
                    }
                  } else if (ev.type === 'content_block_stop') {
                    if (currentBlock) {
                      if (currentBlock.type === 'tool_use') {
                        try { currentBlock.input = JSON.parse(currentBlock.input_json || '{}'); } catch(e){ currentBlock.input = {}; }
                        delete currentBlock.input_json;
                      }
                      assistantContent.push(currentBlock);
                      currentBlock = null;
                    }
                  } else if (ev.type === 'message_delta') {
                    stopReason = ev.delta?.stop_reason || stopReason;
                  } else if (ev.type === 'message_stop') {
                    // end of one assistant message
                  }
                }
              }
              // Append assistant message to history
              const cleanContent = assistantContent.map(b => {
                if (b.type === 'tool_use') return { type:'tool_use', id: b.id, name: b.name, input: b.input };
                if (b.type === 'text') return { type:'text', text: b.text || '' };
                return b;
              }).filter(b => b.type !== 'text' || (b.text && b.text.length > 0));
              if (cleanContent.length === 0) cleanContent.push({type:'text', text:'(thinking...)'});
              messages.push({ role:'assistant', content: cleanContent });

              if (stopReason === 'tool_use') {
                // Execute each tool_use block (reuse the dispatcher from the non-streaming endpoint via a function)
                const ghHeaders = { 'Authorization':'token '+env.GITHUB_TOKEN, 'User-Agent':'falkor-tools-agent', 'Accept':'application/vnd.github+json' };
                const results = [];
                for (const blk of cleanContent.filter(b => b.type === 'tool_use')) {
                  send({ type:'tool_call', tool: blk.name, input: blk.input });
                  let out;
                  try { out = await execAgentTool(blk.name, blk.input, env, project, owner, repo, ghHeaders); }
                  catch(e) { out = { error: String(e).substring(0,200) }; }
                  toolResults.push({ tool: blk.name, input: blk.input, output: out });
                  send({ type:'tool_result', tool: blk.name, output_summary: out.error ? ('err: '+String(out.error).substring(0,80)) : 'ok' });
                  results.push({ type:'tool_result', tool_use_id: blk.id, content: JSON.stringify(out).substring(0, 50000) });
                }
                messages.push({ role:'user', content: results });
                continue;
              }
              break;
            }

            // Persist + auto-memory (same as non-streaming)
            try {
              const projId = project?.id || null;
              const projName = project?.name || null;
              const toolsUsed = toolResults.map(t=>t.tool).join(',');
              await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST', headers:{'Authorization':'Bearer '+env.CF_API_TOKEN,'Content-Type':'application/json'},
                body: JSON.stringify({sql:'INSERT INTO falkor_chat_history (user_id, role, content, project_id, project_name, tools_used) VALUES (?,?,?,?,?,?), (?,?,?,?,?,?)',
                  params:['paddy','user',userMsg,projId,projName,null,'paddy','assistant', finalText || '(no text)', projId,projName, toolsUsed]}),
              });
            } catch(e){}

            // Surface images at end (browser screenshots / generated)
            const images = toolResults.flatMap(t => {
              const o = t.output || {};
              if (t.tool === 'generate_image' && (o.image_url || o.url || o.base64)) return [{src: o.image_url || o.url || ('data:image/png;base64,'+o.base64)}];
              if (t.tool === 'browser_screenshot' && o.base64) return [{src:'data:'+(o.content_type||'image/png')+';base64,'+o.base64, caption:o.url||''}];
              return [];
            });
            send({ type:'done', tool_calls: toolResults, images });
            controller.close();
          } catch(e) {
            send({ type:'error', message: String(e).substring(0,300) });
            controller.close();
          }
        },
      });
      return new Response(stream, { headers: { 'Content-Type':'application/x-ndjson', 'Cache-Control':'no-cache', 'X-Accel-Buffering':'no', ...CORS } });
    }
    if(url.pathname==='/api/agent-chat'&&request.method==='POST'){
      try {
        const body = await request.json();
        const userMsg = body.message || '';
        const project = body.project || null;
        const history = Array.isArray(body.history) ? body.history : [];

        // Parse owner/repo from project.github URL
        let owner=null, repo=null, defaultBranch='main';
        if (project && project.github) {
          const m = project.github.match(/github\.com\/([^/]+)\/([^/?#]+)/);
          if (m) { owner=m[1]; repo=m[2].replace(/\.git$/,''); }
        }

        const tools = AGENT_TOOLS;

        const ghHeaders = { 'Authorization': 'token '+env.GITHUB_TOKEN, 'User-Agent':'falkor-tools-agent', 'Accept':'application/vnd.github+json' };

        async function execTool(name, input) { return await execAgentTool(name, input, env, project, owner, repo, ghHeaders); }

        // System prompt with project context
        let system = "You are a coding agent embedded in Paddy's Asgard project hub. You can read and edit files in the project's GitHub repo via tools.";
        if (project) {
          const ctx = ['Project: '+(project.name||'')];
          if (project.url) ctx.push('Live URL: '+project.url);
          if (project.github) ctx.push('GitHub: '+project.github);
          if (project.tech) ctx.push('Tech: '+project.tech);
          if (project.status) ctx.push('Status: '+project.status);
          if (project.desc) ctx.push('Description: '+project.desc);
          if (project.features) ctx.push('Features: '+project.features);
          system += String.fromCharCode(10,10) + ctx.join(String.fromCharCode(10));
        }
        system += String.fromCharCode(10,10) + "When the user asks for a change, ALWAYS read the relevant files first to understand the current state, then propose the change clearly, then call write_file to commit. Use concise commit messages. If you do not have enough info, list_files first. Be terse - this is a chat, not a report.";

        // Anthropic tool-use loop
        // Load remembered facts about this user
        let memBlock = '';
        try {
          const mr = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
            method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
            body: JSON.stringify({ sql:'SELECT category, fact FROM falkor_memory WHERE user_id="paddy" ORDER BY importance DESC LIMIT 30' }),
          });
          const md = await mr.json();
          const mems = md.result?.[0]?.results || [];
          if (mems.length) memBlock = String.fromCharCode(10,10) + 'WHAT YOU REMEMBER ABOUT PADDY (long-term memory — these are important):'+ String.fromCharCode(10) + mems.map(m => '- ['+m.category+'] '+m.fact).join(String.fromCharCode(10));
        } catch(e){}
        system += memBlock;

        // Load last 20 chat-history turns for continuity
        let priorTurns = [];
        try {
          const hr = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
            method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
            body: JSON.stringify({ sql:'SELECT role, content FROM falkor_chat_history WHERE user_id="paddy" ORDER BY created_at DESC LIMIT 20' }),
          });
          const hd = await hr.json();
          const rows = hd.result?.[0]?.results || [];
          priorTurns = rows.reverse().map(r => ({ role: r.role, content: r.content }));
        } catch(e){}

        const messages = [...priorTurns, ...history, { role:'user', content: userMsg }];
        const toolResults = [];
        let iterations = 0;
        const maxIter = 8;
        let finalText = '';

        while (iterations < maxIter) {
          iterations++;
          const aReq = await fetch('https://api.anthropic.com/v1/messages', {
            method:'POST',
            headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version':'2023-06-01', 'content-type':'application/json' },
            body: JSON.stringify({
              model: 'claude-haiku-4-5-20251001',
              max_tokens: 4096,
              system,
              tools,
              messages,
            }),
          });
          if (!aReq.ok) {
            const err = await aReq.text();
            return Response.json({ error:'Anthropic API '+aReq.status, detail: err.substring(0,500) }, { status:500, headers:{...CORS,...NOCACHE} });
          }
          const a = await aReq.json();
          // Append assistant message
          messages.push({ role:'assistant', content: a.content });

          if (a.stop_reason === 'tool_use') {
            const toolUses = a.content.filter(c => c.type === 'tool_use');
            const results = [];
            for (const tu of toolUses) {
              const out = await execTool(tu.name, tu.input);
              toolResults.push({ tool: tu.name, input: tu.input, output: out });
              results.push({ type:'tool_result', tool_use_id: tu.id, content: JSON.stringify(out).substring(0, 50000) });
            }
            messages.push({ role:'user', content: results });
            continue;
          }

          // end
          for (const c of a.content) if (c.type === 'text') finalText += c.text;
          break;
        }

        // Persist this turn to chat history
        try {
          const projId = project?.id || null;
          const projName = project?.name || null;
          const toolsUsed = toolResults.map(t=>t.tool).join(',');
          await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
            method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
            body: JSON.stringify({
              sql:"INSERT INTO falkor_chat_history (user_id, role, content, project_id, project_name, tools_used) VALUES (?,?,?,?,?,?), (?,?,?,?,?,?)",
              params:["paddy","user",userMsg,projId,projName,null, "paddy","assistant", finalText || "(no text)", projId,projName, toolsUsed],
            }),
          });
          // Auto-extract memorable facts every 5 turns (10 rows = 5 user+assistant pairs)
          const cR = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
            method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
            body: JSON.stringify({ sql:"SELECT COUNT(*) AS n FROM falkor_chat_history WHERE user_id='paddy'" }),
          });
          const cd = await cR.json();
          const total = cd.result?.[0]?.results?.[0]?.n || 0;
          if (total % 10 === 0 && total > 0) {
            // Pull last 10 rows, ask Haiku to extract memorable facts
            const lastR = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
              method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
              body: JSON.stringify({ sql:"SELECT role, content FROM falkor_chat_history WHERE user_id='paddy' ORDER BY id DESC LIMIT 10" }),
            });
            const lastD = await lastR.json();
            const transcript = (lastD.result?.[0]?.results || []).reverse().map(r => r.role+': '+r.content.substring(0,500)).join(String.fromCharCode(10));
            const exReq = await fetch('https://api.anthropic.com/v1/messages', {
              method:'POST', headers:{'x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},
              body: JSON.stringify({
                model:'claude-haiku-4-5-20251001', max_tokens: 800,
                system:'Extract 0-3 NEW memorable facts about Paddy or his platform from the transcript. Return JSON array of {category, fact, importance(1-10)}. Skip if nothing new. Do NOT save things you already know (login PINs, the no-Drive rule, no-hard-refresh, his style, his profile). Only NEW concrete facts. Output ONLY valid JSON array, no prose.',
                messages:[{role:'user',content:'Recent conversation:'+String.fromCharCode(10)+transcript}],
              }),
            });
            const exD = await exReq.json();
            const exText = (exD.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('').trim();
            try {
              const arr = JSON.parse(exText.replace(/^[^\[]*/,'').replace(/[^\]]*$/,''));
              if (Array.isArray(arr)) {
                for (const f of arr) {
                  if (!f.fact) continue;
                  await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                    method:'POST', headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
                    body: JSON.stringify({ sql:"INSERT INTO falkor_memory (user_id, category, fact, source, importance) VALUES (?,?,?,?,?)",
                      params:["paddy", f.category||"auto-extracted", String(f.fact).substring(0,500), "auto-haiku-every-5-turns", Math.min(10, Math.max(1, f.importance||5))] }),
                  });
                }
              }
            } catch(e){}
          }
        } catch(e){}

        return Response.json({
          ok:true,
          reply: finalText || '(no text response)',
          tool_calls: toolResults,
          iterations,
        }, { headers:{...CORS,...NOCACHE} });

      } catch (e) {
        return Response.json({ error:'Agent failure', detail: String(e).substring(0,500) }, { status:500, headers:{...CORS,...NOCACHE} });
      }
    }

    return new Response(HTML,{headers:{'Content-Type':'text/html; charset=utf-8',...NOCACHE,...CORS}});
  },
};
