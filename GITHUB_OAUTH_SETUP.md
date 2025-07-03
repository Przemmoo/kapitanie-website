# GitHub OAuth App Configuration

## Instrukcja konfiguracji GitHub OAuth dla Decap CMS

### Krok 1: Utwórz OAuth App w GitHub

1. Idź na: https://github.com/settings/developers
2. Kliknij **"New OAuth App"**
3. Wypełnij formularz:
   - **Application name:** `kapitanie CMS`
   - **Homepage URL:** `https://kapitanie-website.pages.dev`
   - **Application description:** `CMS dla strony kapitanie`
   - **Authorization callback URL:** `https://kapitanie-website.pages.dev/admin/`

### Krok 2: Po utworzeniu OAuth App

1. Skopiuj **Client ID**
2. Wygeneruj i skopiuj **Client Secret**
3. Te dane będą potrzebne do konfiguracji w Cloudflare Pages

### Krok 3: Konfiguracja Environment Variables w Cloudflare Pages

W panelu Cloudflare Pages dla projektu `kapitanie-website`:

1. Idź do **Settings** > **Environment variables**
2. Dodaj zmienne:
   - **GITHUB_CLIENT_ID:** [Twój Client ID]
   - **GITHUB_CLIENT_SECRET:** [Twój Client Secret]

### Krok 4: Redeploy

Po dodaniu zmiennych środowiskowych, Cloudflare automatycznie przebuduje stronę.

### Krok 5: Test

1. Idź na: https://kapitanie-website.pages.dev/admin/
2. Kliknij **"Login with GitHub"**
3. Autoryzuj aplikację
4. Powinieneś zobaczyć panel CMS

## Uwagi

- OAuth App będzie działał tylko dla właściciela repository (Przemmoo)
- Aby dodać innych użytkowników, dodaj ich jako collaborators do repository
- CMS będzie zapisywał zmiany bezpośrednio do GitHub repository
