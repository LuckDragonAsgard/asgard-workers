---
name: Family Hub deploy — always include D1 binding in metadata
description: CF Workers API PUT without explicit D1 binding silently wipes it; must include binding in every deploy
type: feedback
originSessionId: e09c55da-2862-4d8e-9a69-bd20e53dee7b
---
Always include the D1 binding in CF worker deploy metadata, or `env.DB` will be undefined and all DB routes crash with 1101.

**Why:** CF Workers API PUT replaces bindings with whatever is in `metadata.bindings`. Omitting DB binding silently removes it. This caused the Family Hub login/invite/register routes to crash (env.DB was undefined) while GET routes appeared to work (they hit `if (!user) return 401` before touching DB).

**How to apply:** Every deploy must include all non-secret bindings. Secrets (secret_text) are preserved automatically; D1, KV, R2 are NOT. Account ID = `a6f47c17811ee2f8b6caeb8f38768c20`.

**Known worker bindings:**
- `family-hub`: D1 `DB` (id `abcbe15d-9a98-4e01-82eb-c82a0acd1443`) + R2 `PHOTOS` (bucket `family-hub-photos`)
- `sly-api`: D1 `DB` (id `8d0b8373-40ea-4174-bfd9-628b790abf92`)
- `sly-app`: KV `SLY_STATIC` (namespace_id `4f427724561e48f682d4a7c6153d7124`)

Use Python requests (not curl) for large files. Confirm with GET /bindings after every deploy.
