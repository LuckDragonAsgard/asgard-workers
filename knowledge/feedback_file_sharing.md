---
name: File sharing — always use Google Drive
description: Never save files to the local app/outputs folder for sharing. Always upload to Google Drive (pgallivan@outlook.com) using the Drive MCP.
type: feedback
originSessionId: 70898cfc-0870-4f70-9475-49b1ff787c66
---
Always upload final files to Google Drive using the Drive MCP tool (mcp__185258b1...__create_file). Never save to the local outputs/appdata session folder and use present_files — this results in "Failed to load local file" errors because the session path is not accessible to the user.

**Why:** Mona explicitly corrected this — the present_files tool can't serve files from the internal session path. Google Drive is the only reliable delivery method.

**How to apply:** After creating any file in /tmp or the sandbox, immediately base64-encode it and upload via Drive MCP. Provide the Google Drive link/name as confirmation.
