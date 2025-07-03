# Lokalne użycie CMS - Backup Plan

Jeśli OAuth na produkcji nadal nie działa, można używać CMS lokalnie:

## Krok 1: Włącz lokalny backend

Edytuj `public/admin/config.yml`:
```yaml
local_backend: true
```

## Krok 2: Uruchom localny serwer CMS

```bash
# Zainstaluj dekap-server globalnie
npm install -g @decaporg/decap-server

# Lub uruchom bez instalacji
npx @decaporg/decap-server
```

## Krok 3: Uruchom Astro dev

```bash
npm run dev
```

## Krok 4: Użyj CMS lokalnie

1. Otwórz: http://localhost:4321/admin
2. Kliknij "Work with local repository"
3. Edytuj treści
4. Zmiany będą zapisane lokalnie w plikach
5. Commituj i pushuj zmiany ręcznie

## Alternatywa: Edycja bezpośrednia

Można też edytować pliki bezpośrednio:
- `src/content/realizacje/*.md` - realizacje
- `src/content/ustawienia/site.yaml` - ustawienia strony
- `src/pages/index.astro` - strona główna

## Uwagi

- To rozwiązanie wymaga technicznej wiedzy
- Idealnie do developmentu
- Dla końcowych użytkowników lepiej naprawić OAuth na produkcji
