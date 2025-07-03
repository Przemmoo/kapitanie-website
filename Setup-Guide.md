# **Przewodnik Konfiguracji: GitHub + Cloudflare Pages + Decap CMS**

## **Spis Treści**
1. [Przygotowanie środowiska VS Code](#1-przygotowanie-środowiska-vs-code)
2. [Konfiguracja GitHub Repository](#2-konfiguracja-github-repository)
3. [Konfiguracja Cloudflare Pages](#3-konfiguracja-cloudflare-pages)
4. [Konfiguracja Decap CMS](#4-konfiguracja-decap-cms)
5. [Integracja i testowanie](#5-integracja-i-testowanie)
6. [Deployment i automatyzacja](#6-deployment-i-automatyzacja)

---

## **1. Przygotowanie Środowiska VS Code**

### **Krok 1.1: Instalacja wymaganych rozszerzeń VS Code**

Otwórz VS Code i zainstaluj następujące rozszerzenia:

1. **Git Graph** (`mhutchie.git-graph`)
2. **GitHub Pull Requests and Issues** (`GitHub.vscode-pull-request-github`)
3. **Astro** (`astro-build.astro-vscode`)
4. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
5. **YAML** (`redhat.vscode-yaml`)

**Sposób instalacji:**
- Wciśnij `Ctrl+Shift+X`
- Wyszukaj każde rozszerzenie po nazwie
- Kliknij "Install"

### **Krok 1.2: Konfiguracja Git w VS Code**

Otwórz terminal w VS Code (`Ctrl+`` `) i skonfiguruj Git:

```bash
# Ustaw swoje dane (jeśli nie są już ustawione)
git config --global user.name "Przemmoo"
git config --global user.email "przmmoo@gmail.com"

# Sprawdź konfigurację
git config --list
```

### **Krok 1.3: Logowanie do GitHub w VS Code**

1. Wciśnij `Ctrl+Shift+P`
2. Wpisz "GitHub: Sign in"
3. Wybierz opcję i zaloguj się przez przeglądarkę
4. Autoryzuj VS Code

---

## **2. Konfiguracja GitHub Repository**

### **Krok 2.1: Utworzenie nowego repository**

**Opcja A: Przez VS Code (zalecana)**

1. Wciśnij `Ctrl+Shift+P`
2. Wpisz "Git: Clone"
3. Wybierz "Clone from GitHub"
4. Kliknij "Create Repository..."
5. Podaj nazwę: `kapitanie-website`
6. Wybierz: **Public** (aby Cloudflare Pages mogło się połączyć za darmo)
7. Zaznacz "Clone after create"
8. Wybierz folder `c:\Astro_kapitanie\` (lub pozostań w aktualnym katalogu)

**Opcja B: Przez GitHub.com**

1. Idź na [github.com](https://github.com)
2. Kliknij zielony przycisk "New" lub "+"
3. Nazwa repository: `kapitanie-website`
4. Opis: `Strona internetowa firmy eventowej kapitanie`
5. Ustaw jako **Public**
6. Zaznacz "Add a README file"
7. Kliknij "Create repository"

### **Krok 2.2: Konfiguracja istniejącego projektu**

**UWAGA:** Jeśli już pracujesz w katalogu `c:\Astro_kapitanie` (jak w tym przypadku), zostań tutaj! Nie musisz przenosić projektu do `c:\xampp\htdocs`.

**Opcja A: Projekt w aktualnym katalogu (c:\Astro_kapitanie)**

```bash
# Sprawdź, czy Git jest już zainicjalizowany
git status

# Jeśli nie ma repozytorium Git, zainicjalizuj je
git init

# Połącz z GitHub repository
git remote add origin https://github.com/Przemmoo/kapitanie-website.git

# Sprawdź połączenie
git remote -v
```

**Opcja B: Nowy projekt w c:\xampp\htdocs**

```bash
# Przejdź do folderu htdocs
cd c:\xampp\htdocs

# Sklonuj repository
git clone https://github.com/Przemmoo/kapitanie-website.git

# Przejdź do folderu projektu
cd kapitanie-website
```

### **Krok 2.3: Weryfikacja konfiguracji**

```bash
# Sprawdź status projektu
git status

# Sprawdź konfigurację remote
git remote -v

# Sprawdź branch
git branch
```

---

## **3. Konfiguracja Cloudflare Pages**

### **Krok 3.1: Utworzenie konta Cloudflare**

1. Idź na [dash.cloudflare.com](https://dash.cloudflare.com)
2. Kliknij "Sign Up" jeśli nie masz konta
3. Zweryfikuj email i zaloguj się

### **Krok 3.2: Utworzenie nowego projektu Pages**

1. W panelu Cloudflare kliknij **"Pages"** w menu po lewej
2. Kliknij **"Create a project"**
3. Wybierz **"Connect to Git"**

### **Krok 3.3: Połączenie z GitHub**

1. Kliknij **"Connect GitHub"**
2. Autoryzuj Cloudflare w GitHub
3. Wybierz **"Only select repositories"**
4. Dodaj repository `kapitanie-website`
5. Kliknij **"Install & Authorize"**

### **Krok 3.4: Konfiguracja build settings**

Po wybraniu repository:

1. **Project name:** `kapitanie-website`
2. **Production branch:** `main`
3. **Build settings:**
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Environment variables** (zostaw puste na razie)
5. Kliknij **"Save and Deploy"**

### **Krok 3.5: Konfiguracja Custom Domain (opcjonalne)**

Jeśli masz własną domenę:

1. W projekcie Pages idź do **"Custom domains"**
2. Kliknij **"Set up a custom domain"**
3. Wpisz domenę (np. `kapitanie.pl`)
4. Postępuj zgodnie z instrukcjami DNS

---

## **4. Konfiguracja Decap CMS**

### **Krok 4.1: Przygotowanie struktury folderów**

W VS Code utwórz następującą strukturę w swoim projekcie:

```
kapitanie-website/
├── public/
│   └── admin/
│       ├── config.yml
│       └── index.html
├── src/
│   └── content/
│       ├── realizacje/
│       └── ustawienia/
│           └── site.yml
└── (inne pliki)
```

### **Krok 4.2: Utworzenie pliku konfiguracyjnego CMS**

Utwórz plik `public/admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main
  commit_messages:
    create: 'Create {{collection}} "{{slug}}"'
    update: 'Update {{collection}} "{{slug}}"'
    delete: 'Delete {{collection}} "{{slug}}"'
    uploadMedia: '[skip ci] Upload "{{path}}"'
    deleteMedia: '[skip ci] Delete "{{path}}"'
    openAuthoring: '{{message}}'

local_backend: true
media_folder: "src/assets/images"
public_folder: "/src/assets/images"

collections:
  - name: "realizacje"
    label: "Realizacje"
    folder: "src/content/realizacje"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Tytuł", name: "title", widget: "string" }
      - { label: "Klient", name: "client", widget: "string" }
      - { label: "Data", name: "date", widget: "datetime" }
      - { label: "Kategoria", name: "category", widget: "select", options: ["Konferencja", "Gala", "Koncert", "Event Firmowy"] }
      - { label: "Zdjęcie główne", name: "featured_image", widget: "image" }
      - { label: "Galeria", name: "gallery", widget: "list", field: { label: "Zdjęcie", name: "image", widget: "image" } }
      - { label: "Opis", name: "description", widget: "markdown" }
      - { label: "Wyzwanie", name: "challenge", widget: "text" }
      - { label: "Rozwiązanie", name: "solution", widget: "text" }
      - { label: "Wyniki", name: "results", widget: "text", required: false }

  - name: "ustawienia"
    label: "Ustawienia strony"
    files:
      - label: "Informacje o firmie"
        name: "site"
        file: "src/content/ustawienia/site.yml"
        fields:
          - { label: "Nazwa firmy", name: "company_name", widget: "string" }
          - { label: "Slogan", name: "tagline", widget: "string" }
          - { label: "Opis firmy", name: "description", widget: "text" }
          - { label: "Email", name: "email", widget: "string" }
          - { label: "Telefon", name: "phone", widget: "string" }
          - { label: "Adres", name: "address", widget: "text" }
          - { label: "Social Media", name: "social", widget: "object", fields: [
              { label: "Facebook", name: "facebook", widget: "string", required: false },
              { label: "Instagram", name: "instagram", widget: "string", required: false },
              { label: "LinkedIn", name: "linkedin", widget: "string", required: false }
            ]}
```

### **Krok 4.3: Utworzenie strony administracyjnej CMS**

Utwórz plik `public/admin/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Panel Administracyjny - kapitanie</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Decap CMS -->
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  
  <script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  </script>
</body>
</html>
```

### **Krok 4.4: Konfiguracja Git Gateway w Cloudflare**

1. W panelu Cloudflare Pages, idź do swojego projektu
2. Przejdź do **"Functions"** > **"Settings"**
3. W sekcji **"Environment variables"** dodaj:
   - **Name:** `GITHUB_TOKEN`
   - **Value:** [Twój GitHub Personal Access Token - instrukcja poniżej]

**Utworzenie GitHub Personal Access Token:**

1. Idź na [github.com/settings/tokens](https://github.com/settings/tokens)
2. Kliknij **"Generate new token"** > **"Generate new token (classic)"**
3. **Note:** `Cloudflare CMS Token`
4. **Expiration:** `No expiration` (lub 1 rok)
5. **Scopes:** Zaznacz:
   - `repo` (pełny dostęp do repositories)
   - `user:email` (dostęp do emaila)
6. Kliknij **"Generate token"**
7. **SKOPIUJ TOKEN** - nie będzie więcej widoczny!

### **Krok 4.5: Konfiguracja Identity dla Decap CMS**

W głównym pliku HTML twojej strony dodaj (będzie w layout):

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

I przed zamknięciem `</body>`:

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

---

## **5. Integracja i Testowanie**

### **Krok 5.1: Commit i push pierwszej wersji**

W terminalu VS Code:

```bash
# Sprawdź status
git status

# Dodaj wszystkie pliki
git add .

# Commit
git commit -m "Initial setup: Add Decap CMS configuration"

# Push do GitHub
git push origin main
```

### **Krok 5.2: Sprawdzenie deployu w Cloudflare**

1. Idź do panelu Cloudflare Pages
2. Sprawdź status buildu - powinien być "Success"
3. Kliknij na URL swojej strony (np. `kapitanie-website.pages.dev`)

### **Krok 5.3: Testowanie Decap CMS**

1. Przejdź na `twoja-strona.pages.dev/admin/`
2. Spróbuj się zalogować przez GitHub
3. Sprawdź czy widzisz panel CMS z konfiguracją

### **Krok 5.4: Konfiguracja Identity w Cloudflare (jeśli Netlify Identity nie działa)**

Jako alternatywa, użyj GitHub OAuth bezpośrednio:

W `public/admin/config.yml` zmień backend na:

```yaml
backend:
  name: github
  repo: Przemmoo/kapitanie-website
  branch: main
```

---

## **6. Deployment i Automatyzacja**

### **Krok 6.1: Konfiguracja GitHub Actions (opcjonalne)**

Utwórz plik `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: kapitanie-website
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### **Krok 6.2: Konfiguracja secrets w GitHub**

1. Idź do swojego repository na GitHub
2. **Settings** > **Secrets and variables** > **Actions**
3. Dodaj secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

**Aby uzyskać Cloudflare API Token:**

1. [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **"Create Token"**
3. **"Custom token"**
4. **Permissions:**
   - `Cloudflare Pages:Edit`
   - `Account:Read`
5. **Account Resources:** Include specific account
6. **Zone Resources:** All zones

### **Krok 6.3: Weryfikacja automatyzacji**

1. Zrób jakąś zmianę w kodzie
2. Commit i push:
   ```bash
   git add .
   git commit -m "Test automatycznego wdrożenia"
   git push origin main
   ```
3. Sprawdź w GitHub **Actions** czy workflow się uruchomił
4. Sprawdź w Cloudflare Pages czy strona się zaktualizowała

---

## **🎉 Podsumowanie**

Po wykonaniu wszystkich kroków będziesz mieć:

✅ **GitHub Repository** - z kodem strony i historią zmian  
✅ **Cloudflare Pages** - hostingu z automatycznym wdrażaniem  
✅ **Decap CMS** - panel do zarządzania treścią  
✅ **Automatyzacja** - każda zmiana w kodzie automatycznie aktualizuje stronę  

### **Przydatne linki:**

- **Twoja strona:** `https://kapitanie-website.pages.dev`
- **Panel CMS:** `https://kapitanie-website.pages.dev/admin/`
- **GitHub Repo:** `https://github.com/Przemmoo/kapitanie-website`
- **Cloudflare Dashboard:** `https://dash.cloudflare.com`

### **Następne kroki:**

1. ✅ **Projekt Astro utworzony** w katalogu `kapitanie/`
2. **Zaprojektuj komponenty** zgodnie z specyfikacją
3. **Dodaj pierwsze treści** przez Decap CMS
4. **Skonfiguruj własną domenę** (jeśli masz)

### **Struktura projektu:**

```
c:\Astro_kapitanie/
├── src/                # Kod źródłowy Astro
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   └── pages/
├── public/             # Pliki statyczne
├── astro.config.mjs    # Konfiguracja Astro
├── package.json        # Zależności Node.js
├── tsconfig.json       # Konfiguracja TypeScript
├── kapitanie.md        # Dokumentacja projektu
├── Plan.md            # Plan rozwoju
├── Setup-Guide.md     # Ten przewodnik
└── README.md          # Opis repozytorium
```

### **Testowanie projektu Astro:**

```bash
# Uruchomienie serwera deweloperskiego
npm run dev

# Build produkcyjny
npm run build

# Podgląd wersji produkcyjnej
npm run preview
```

**Serwer deweloperski:** http://localhost:4321/

---

## **Troubleshooting - Najczęstsze Problemy**

### **Problem: Build fails w Cloudflare**
**Rozwiązanie:** Sprawdź czy `package.json` ma poprawne scripts:
```json
{
  "scripts": {
    "build": "astro build",
    "dev": "astro dev"
  }
}
```

### **Problem: Decap CMS nie łączy się z GitHub**
**Rozwiązanie:** 
1. Sprawdź czy token ma prawidłowe uprawnienia
2. Sprawdź czy repo jest public
3. Sprawdź konfigurację w `config.yml`

### **Problem: Strona nie aktualizuje się**
**Rozwiązanie:**
1. Sprawdź status buildu w Cloudflare
2. Wyczyść cache przeglądarki
3. Sprawdź czy commit dotarł do branch main

### **Problem: 404 na /admin/**
**Rozwiązanie:**
1. Sprawdź czy pliki są w folderze `public/admin/`
2. Sprawdź czy build poprawnie skopiował pliki
3. Sprawdź routing w Astro

---

**Powodzenia z konfiguracją! 🚀**
