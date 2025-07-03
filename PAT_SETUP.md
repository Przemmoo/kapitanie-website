# Alternative Solution: Personal Access Token

## Rozwiązanie z Personal Access Token (dla rozwoju)

Jeśli OAuth nadal nie działa, możesz użyć Personal Access Token:

### Krok 1: Utwórz Personal Access Token
1. Idź na: https://github.com/settings/tokens
2. Kliknij "Generate new token" > "Generate new token (classic)"
3. Scope: zaznacz `repo` (full control of private repositories)
4. Skopiuj token

### Krok 2: Użyj w CMS
W `config.yml`:
```yaml
backend:
  name: github
  repo: Przemmoo/kapitanie-website
  branch: main
  # Użyj tego tylko lokalnie - NIE commituj tokenu!
  
# Lokalnie możesz dodać token w localStorage przeglądarki:
# localStorage.setItem('netlifycms-user', JSON.stringify({token: 'TWÓJ_TOKEN'}))
```

### Krok 3: Testuj lokalnie
1. Otwórz konsolę przeglądarki (F12)
2. Wpisz: `localStorage.setItem('netlifycms-user', JSON.stringify({token: 'ghp_YOUR_TOKEN_HERE'}))`
3. Odśwież stronę CMS

**To rozwiązanie tylko do testów lokalnych!**
