# GitHub OAuth App Configuration

## ✅ ROZWIĄZANIE DZIAŁA!

**Status:** Panel CMS działa poprawnie z GitHub OAuth przez funkcje Cloudflare!

**Rozwiązanie:** Użycie dedykowanych funkcji Cloudflare (`functions/api/auth.js` i `functions/api/callback.js`) zamiast próby użycia `auth_type: implicit` lub zewnętrznych proxy.

**Kluczowe elementy:**
- ✅ Funkcje Cloudflare obsługują OAuth flow
- ✅ GitHub OAuth App callback URL: `https://kapitanie-website.pages.dev/api/callback`
- ✅ Config.yml wskazuje na nasze endpointy: `base_url` i `auth_endpoint`
- ✅ Variables and Secrets poprawnie skonfigurowane

## Instrukcja konfiguracji GitHub OAuth dla Decap CMS

### Krok 1: Utwórz OAuth App w GitHub

1. Idź na: https://github.com/settings/developers
2. Kliknij **"New OAuth App"**
3. Wypełnij formularz:
   - **Application name:** `kapitanie CMS`
   - **Homepage URL:** `https://kapitanie-website.pages.dev`
   - **Application description:** `CMS dla strony kapitanie`
   - **Authorization callback URL:** `https://kapitanie-website.pages.dev/api/callback`
   
   **WAŻNE:** Używamy nasze własne funkcje Cloudflare OAuth
   
   **AKTUALIZACJA:** Przełączono na Static CMS dla lepszej kompatybilności z GitHub OAuth
4. Zapisz aplikację

### Krok 2: Po utworzeniu OAuth App

1. Skopiuj **Client ID** (format: `Ov1.1234567890abcdef`)
2. Wygeneruj i skopiuj **Client Secret**
3. Zaktualizuj `app_id` w pliku `public/admin/config.yml`

### Krok 3: Konfiguracja Variables and Secrets w Cloudflare Pages

W panelu Cloudflare Pages dla projektu `kapitanie-website`:

1. Idź do **Settings** > **Variables and Secrets**
2. W sekcji "Variables and Secrets" dodaj zmienne:
   - **GITHUB_CLIENT_ID:** `Ov23ctnA9FmTTvGVovkR` (Type: Plaintext)
   - **GITHUB_CLIENT_SECRET:** `[Twój Client Secret]` (Type: Secret)

**UWAGA:** W Cloudflare Pages to nazywa się "Variables and Secrets", nie "Environment Variables"!

**UWAGA:** Upewnij się, że nazwy zmiennych są DOKŁADNIE takie jak powyżej!

### Krok 4: Redeploy

Po dodaniu zmiennych środowiskowych, Cloudflare automatycznie przebuduje stronę.

### Krok 5: Test

1. Idź na: https://kapitanie-website.pages.dev/admin/index.html
2. Kliknij **"Login with GitHub"**
3. Autoryzuj aplikację
4. Powinieneś zobaczyć panel CMS

## 🔧 ROZWIĄZYWANIE PROBLEMÓW

### Problem: Panel CMS wpada w pętlę autoryzacji

**Objawy:** Strona `/admin` ciągle się przeładowuje lub przekierowuje

**Możliwe przyczyny i rozwiązania:**

#### 1. Sprawdź GitHub OAuth App ustawienia
Idź na: https://github.com/settings/developers
1. Znajdź aplikację `kapitanie CMS`
2. Sprawdź czy:
   - **Homepage URL:** `https://kapitanie-website.pages.dev`
   - **Authorization callback URL:** `https://kapitanie-website.pages.dev/admin/`
   - **WAŻNE:** URL musi kończyć się DOKŁADNIE na `/admin/`

#### 2. Sprawdź Client ID
- Client ID musi być: `Ov23ctnA9FmTTvGVovkR`
- W config.yml jako `app_id`
- W Cloudflare Pages jako `GITHUB_CLIENT_ID`

#### 3. Sprawdź Client Secret
- Musi być ustawiony w Cloudflare Pages jako `GITHUB_CLIENT_SECRET`
- Typ: Secret (nie Text)

#### 4. Wyczyść cache przeglądarki
- Otwórz `/admin` w trybie incognito
- Lub wyczyść cache i cookies

#### 5. Sprawdź konsole przeglądarki
- F12 → Console
- Sprawdź błędy związane z OAuth lub CORS

## Uwagi

- OAuth App będzie działał tylko dla właściciela repository (Przemmoo)
- Aby dodać innych użytkowników, dodaj ich jako collaborators do repository
- CMS będzie zapisywał zmiany bezpośrednio do GitHub repository
