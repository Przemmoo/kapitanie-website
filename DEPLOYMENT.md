# 🚀 Instrukcje publikacji kapitanie.com

## GitHub + Cloudflare Pages - Setup

### 1. **Konfiguracja Cloudflare Pages**

1. Zaloguj się do [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Przejdź do **Pages** > **Create a project**
3. Wybierz **Connect to Git** > **GitHub**
4. Wybierz repozytorium `kapitanie-website`
5. Ustaw konfigurację budowania:
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (pozostaw puste)

### 2. **Dodanie zmiennych środowiskowych w GitHub**

W repozytorium GitHub przejdź do **Settings** > **Secrets and variables** > **Actions**

Dodaj następujące sekrety:

```bash
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

#### Jak uzyskać tokeny:

**Cloudflare API Token:**
1. Cloudflare Dashboard > **My Profile** > **API Tokens**
2. **Create Token** > **Custom token**
3. **🚨 UPRAWNIENIA - szukaj w liście (różne nazwy w interfejsie):**
   
   **Znajdź i dodaj TE uprawnienia:**
   - ✅ **`Cloudflare Pages:Edit`** (może być w różnych sekcjach)
   - ✅ **`Zone:Read`** (tylko jeśli używasz custom domain)
   
   **🔍 Jeśli nie widzisz "Account:Read" - ALTERNATYWY:**
   - Szukaj **`User:Read`** 
   - Szukaj **`Account Settings:Read`**
   - Lub użyj **gotowego template "Cloudflare Pages"** (jeśli dostępny)

4. **Account Resources**: `Include - All accounts` (lub wybierz konkretny)
5. **Zone Resources**: `Include - All zones` (lub konkretną domenę jeśli używasz custom domain)

**💡 WSKAZÓWKA**: Użyj wyszukiwarki w uprawnieniach - wpisz "Pages", "Read", "User"

**Alternatywnie - NAJŁATWIEJSZE ROZWIĄZANIE:**
- Szukaj **"Use template"** w API Tokens
- Wybierz **"Cloudflare Pages"** template (jeśli dostępny)
- Template automatycznie ustawi wszystkie potrzebne uprawnienia

**Metoda 1: Template (REKOMENDOWANE)**
1. W **API Tokens** kliknij **"Create Token"**
2. Szukaj sekcji **"Use template"** lub **"Quick start"**
3. Wybierz **"Cloudflare Pages"** jeśli dostępny
4. Skonfiguruj zasoby i utwórz token

**Account ID:**
1. Cloudflare Dashboard > **Right sidebar** > **Account ID**

### 📝 **Alternatywne metody dla API Token:**

**Metoda 1: Template (NAJŁATWIEJSZE) ⭐**
1. W **API Tokens** kliknij **"Create Token"**
2. Szukaj **"Use template"** lub gotowych opcji
3. Wybierz **"Cloudflare Pages"** template
4. Automatycznie ustawi potrzebne uprawnienia

**Metoda 2: Ręczne uprawnienia (trudniejsze)**
W **Custom token** szukaj w liście uprawnień:
- **`Cloudflare Pages:Edit`** 
- **`User:Read`** lub **`Account Settings:Read`** 
- **`Zone:Read`** - tylko dla custom domain

**🔍 Wskazówki do znajdowania uprawnień:**
- Użyj wyszukiwarki w permissions: "Pages", "User", "Read"
- Uprawnienia mogą mieć różne nazwy: "User:Read", "Account Settings:Read"
- Jeśli nie znajdziesz dokładnej nazwy, wybierz najbliższą

**Metoda 3: Minimalne uprawnienia (last resort)**
Jeśli nic nie znajdujesz:
- Tylko **`Cloudflare Pages:Edit`** 
- Podaj Account ID ręcznie (może zadziałać z ograniczeniami)

**Account ID:**
1. Cloudflare Dashboard > **Right sidebar** > **Account ID**

### 3. **Aktualizacja workflow (jeśli potrzeba)**

Edytuj `.github/workflows/deploy.yml` i zmień:
```yaml
projectName: kapitanie-website # Zmień na rzeczywistą nazwę projektu
```

### 4. **Konfiguracja GitHub Secrets** ✅ GOTOWE

**SUKCES! DEPLOYMENT DZIAŁA!** 🎉

**POTWIERDZONE DZIAŁAJĄCE DANE:**
```
CLOUDFLARE_API_TOKEN = gJy2Ho5Gu9Cz6B0185Cjv_DaejF4Ky5P-uPwTakD
CLOUDFLARE_ACCOUNT_ID = 51265bf8c7892eb3425d9aec26821bb0
```

**Status weryfikacji:**
- ✅ Token zweryfikowany - ma dostęp do konta i projektów
- ✅ Account ID potwierdzony - 51265bf8c7892eb3425d9aec26821bb0
- ✅ Projekt "kapitanie" istnieje w Cloudflare Pages
- ✅ Połączenie z GitHub repo: Przemmoo/kapitanie-website
- ✅ **DEPLOYMENT AUTOMATYCZNY DZIAŁA!**
- ✅ GitHub Secrets poprawnie skonfigurowane
- ✅ **Błędy JSON-LD w Google Search Console NAPRAWIONE!**

**📝 Historia rozwiązanych problemów:**
- ❌ `import.meta outside module` → ✅ **NAPRAWIONE** (Layout.astro)
- ❌ Błędy składni JSON-LD w GSC → ✅ **NAPRAWIONE** (index.astro, AboutSection.astro)
- ❌ "Brak znaku } lub brak nazwy elementu obiektu" → ✅ **NAPRAWIONE** (Usunięto JSON.stringify)

### 5. **Publikacja zmian**

```bash
# 1. Dodaj wszystkie zmiany
git add .

# 2. Commit z opisem
git commit -m "🚀 Add Cloudflare Pages deployment workflow"

# 3. Wypchnij na GitHub
git push origin main
```

### 5. **Weryfikacja deployment**

1. Przejdź do **Actions** w repozytorium GitHub
2. Sprawdź czy workflow się wykonał poprawnie
3. Sprawdź Cloudflare Pages Dashboard dla statusu deployment

## 🔧 Rozwiązywanie problemów

### Problem: "Input required and not supplied: apiToken"
**Rozwiązanie:**
1. Przejdź do GitHub repo > **Settings** > **Secrets and variables** > **Actions**
2. Dodaj sekrety:
   - `CLOUDFLARE_API_TOKEN` (z Cloudflare Dashboard > My Profile > API Tokens)
   - `CLOUDFLARE_ACCOUNT_ID` (z prawego panelu w Cloudflare Dashboard)
3. **🚨 UPRAWNIENIA API TOKEN - upewnij się, że ma OBA:**
   - ✅ `Cloudflare Pages:Edit` 
   - ✅ `Account:Read` ⚠️ **BEZ TEGO NIE BĘDZIE DZIAŁAĆ!**
   - ✅ `Zone:Read` (jeśli używasz custom domain)

### Problem: "Token nie ma wystarczających uprawnień"
**Objawy:** Puste listy kont, "Unauthorized" errors
**Rozwiązanie:** 
1. Utwórz NOWY token z uprawnieniem `Account:Read`
2. Zastąp stary token w GitHub Secrets
3. Token bez `Account:Read` **NIE BĘDZIE DZIAŁAĆ** z GitHub Actions!

### Problem: "Build failed"
- Sprawdź logi w GitHub Actions
- Upewnij się, że `npm run build` działa lokalnie
- Sprawdź czy wszystkie dependencies są w `package.json`

### Problem: "403 Forbidden" w Cloudflare
- Sprawdź czy API Token ma odpowiednie uprawnienia
- Sprawdź czy Account ID jest poprawny
- Sprawdź czy nazwa projektu istnieje w Cloudflare

### Problem: "Page not loading"
- Sprawdź czy `site` w `astro.config.mjs` jest poprawny
- Sprawdź czy DNS wskazuje na Cloudflare Pages
- Sprawdź ustawienia SSL/TLS w Cloudflare

## 📋 Checklist przed publikacją

- [ ] `npm run build` działa lokalnie bez błędów
- [ ] Brak błędów w konsoli przeglądarki (`npm run preview`)
- [ ] Wszystkie zmiany są scommitowane
- [ ] API tokeny są dodane w GitHub Secrets
- [ ] Nazwa projektu w workflow jest poprawna
- [ ] DNS domeny wskazuje na Cloudflare (jeśli używasz custom domain)

## 🎯 Po wdrożeniu

1. Sprawdź stronę w przeglądarce
2. Sprawdź konsolę DevTools - nie powinno być błędów
3. Sprawdź Google Search Console - brak błędów "development mode"
4. Sprawdź PageSpeed Insights - powinny być lepsze wyniki
5. Sprawdź czy wszystkie linki działają poprawnie

## 🚀 Przyszłe deployment

Po skonfigurowaniu wystarczy:
```bash
git add .
git commit -m "Your changes description"
git push origin main
```

Strona automatycznie się zaktualizuje w ciągu kilku minut!
