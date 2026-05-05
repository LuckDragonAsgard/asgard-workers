# DNS records for schoolsportportal.com.au (manual setup — 5 min)

**Why:** without these, emails from `noreply@luckdragon.io` and `hello@schoolsportportal.com.au` will land in spam. Schools won't see the polished welcome / auto-reply you just shipped.

**How:** Cloudflare dashboard → DNS → Records → Add record. CF API tokens in vault don't have DNS:Edit permission.

## Records

### 1. SPF — TXT record on `send.schoolsportportal.com.au`
```
Type:  TXT
Name:  send
Value: v=spf1 include:amazonses.com ~all
TTL:   Auto
Proxy: DNS only (off)
```

### 2. SPF — MX record on `send.schoolsportportal.com.au`
```
Type:     MX
Name:     send
Value:    feedback-smtp.ap-northeast-1.amazonses.com
Priority: 10
TTL:      Auto
```

### 3. DKIM — TXT record on `resend._domainkey.schoolsportportal.com.au`
```
Type:  TXT
Name:  resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIy5+Sv0u0s9s271lwYjmjY/HgV6H7PptEkcVV8rXSg6Pw6H9j/a3A95GzuOL1lOmxSC1DW5pH4BnVVNLSZ4pAPlKDiQHPf9Pgkwcj9bl78boaBaPxYTjdLqxorRetVNwFZQsQpBLOPJFLDP3TPN+jukH56feXpiaqAm4XnlOADQIDAQAB
TTL:   Auto
```

### 4. DMARC — TXT record on `_dmarc.schoolsportportal.com.au`
```
Type:  TXT
Name:  _dmarc
Value: v=DMARC1; p=none; rua=mailto:paddy@luckdragon.io; ruf=mailto:paddy@luckdragon.io; fo=1; adkim=r; aspf=r
TTL:   Auto
```

(start with `p=none` — observation only. After 2 weeks of clean reports, upgrade to `p=quarantine`, then `p=reject`.)

## After adding

1. In Resend dashboard → Domains → schoolsportportal.com.au → click **Verify**.
2. Send yourself a test from `hello@schoolsportportal.com.au` via the SSP contact form.
3. Test deliverability at https://www.mail-tester.com — should score 9/10 or 10/10.

## Resend domain details
- **Domain:** schoolsportportal.com.au
- **Domain ID:** 5e861595-6244-4cf0-bfb0-11fb93b5a939
- **Region:** ap-northeast-1 (Tokyo — fastest to AU)
- **Status:** not_started (until DNS propagates and you verify)
