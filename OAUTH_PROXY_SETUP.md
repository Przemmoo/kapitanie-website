# OAuth Proxy Server for Cloudflare Pages

## Problem
Cloudflare Pages nie ma wbudowanego OAuth proxy dla GitHub, co powoduje błędy przy logowaniu do CMS.

## Rozwiązanie 1: Netlify CMS Proxy Server (rozwój lokalny)

### Instalacja
```bash
npm install -g netlify-cms-proxy-server
```

### Uruchomienie
```bash
npx netlify-cms-proxy-server
```

### Konfiguracja local_backend
W `config.yml` dodaj:
```yaml
local_backend: true
```

## Rozwiązanie 2: External OAuth Service

### Opcja A: Netlify (darmowe)
1. Utwórz konto na https://netlify.com
2. Połącz repository
3. W Netlify: Site settings > Identity > External providers > GitHub
4. Dodaj Client ID i Secret z GitHub OAuth App

### Opcja B: Git Gateway na Netlify
1. W Netlify: Site settings > Identity > Services > Git Gateway
2. Wygeneruj Access Token: https://github.com/settings/tokens
3. Scope: `repo` i `user`

## Rozwiązanie 3: Własny OAuth Proxy

### Cloudflare Workers OAuth Proxy
Utworzenie własnego proxy na Cloudflare Workers (zaawansowane).

## Zalecane rozwiązanie dla Cloudflare Pages

**Netlify jako OAuth provider** - nawet jeśli hosting jest na Cloudflare, można użyć Netlify tylko do autoryzacji CMS.

### Kroki:
1. Załóż konto na Netlify.com
2. Połącz to samo GitHub repository
3. Włącz Identity i Git Gateway
4. Zmień backend w config.yml na git-gateway
5. Ustaw site_url na adres Cloudflare Pages

## Konfiguracja dla Netlify Identity + Cloudflare hosting

W `config.yml`:
```yaml
backend:
  name: git-gateway
  branch: main

site_url: https://kapitanie-website.pages.dev
```

W `index.html`:
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```
