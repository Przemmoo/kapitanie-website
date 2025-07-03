# 🎨 Instrukcja Ikon w Panelu Administratora

## 🚀 Nowa integracja z Lucide Icons

**Od teraz system używa biblioteki Lucide Icons!** Masz dostęp do setek profesjonalnych ikon SVG.

## 📋 Obecnie dostępne ikony w systemie

### 💡 Sekcja "O Nas" - Filary oferty
```yaml
pillars:
  - icon: "lightbulb"     # Żarówka - innowacyjność
  - icon: "mic"           # Mikrofon - nagłośnienie/dźwięk  
  - icon: "monitor"       # Monitor - kompleksowość
  - icon: "audio-lines"   # Equalizer - dźwięk/audio
  - icon: "heart"         # Serce - pasja/zaangażowanie
  - icon: "star"          # Gwiazda - jakość/excellence
  - icon: "settings"      # Tryby - technologia/konfiguracja
```

### 📱 Sekcja "Aplikacja Eventowa" - Funkcje
```yaml
features:
  - icon: "message-circle"  # Czat/komunikacja
  - icon: "calendar"        # Kalendarz/agenda
  - icon: "users"           # Użytkownicy/networking
  - icon: "phone"           # Telefon/kontakt
  - icon: "search"          # Wyszukiwanie
  - icon: "eye"             # Podgląd/śledzenie
  - icon: "home"            # Strona główna
```

### 📞 Sekcja "Kontakt" - Metody kontaktu
```yaml
contact_methods:
  - icon: "phone"     # Telefon
  - icon: "mail"      # Email/poczta
  - icon: "map-pin"   # Lokalizacja/adres
  - icon: "clock"     # Godziny pracy
  - icon: "timer"     # Czas odpowiedzi
  - icon: "home"      # Adres firmy
  - icon: "settings"  # Preferencje kontaktu
```

## 🎯 Popularne ikony do użycia

### 🏢 Biznes & Technologia
- `briefcase` - Teczka/biznes
- `laptop` - Laptop/technologia
- `wifi` - Internet/łączność
- `database` - Baza danych
- `server` - Serwer
- `code` - Kod/programowanie
- `cpu` - Procesor/wydajność

### 🎪 Eventy & Rozrywka
- `music` - Muzyka
- `headphones` - Słuchawki
- `radio` - Radio/transmisja
- `camera` - Kamera/foto
- `video` - Wideo/film
- `theater` - Teatr/scena
- `party-popper` - Impreza/celebracja

### 👥 Ludzie & Komunikacja
- `user` - Pojedynczy użytkownik
- `users` - Grupa użytkowników
- `user-check` - Zweryfikowany użytkownik
- `message-square` - Wiadomość/czat
- `mail` - Email
- `phone-call` - Rozmowa telefoniczna
- `megaphone` - Megafon/promocja

### ⚡ Akcje & Status
- `check` - Potwierdzenie/sukces
- `x` - Anulowanie/błąd
- `alert-circle` - Ostrzeżenie
- `info` - Informacja
- `help-circle` - Pomoc
- `upload` - Wysyłanie
- `download` - Pobieranie

### 🧭 Nawigacja & UI
- `arrow-right` - Strzałka w prawo
- `arrow-left` - Strzałka w lewo
- `arrow-up` - Strzałka w górę
- `arrow-down` - Strzałka w dół
- `chevron-right` - Strzałka ostre prawo
- `plus` - Dodaj/plus
- `minus` - Usuń/minus

## 🔍 Jak znaleźć więcej ikon?

1. **Odwiedź oficjalną stronę:** https://lucide.dev/icons/
2. **Wyszukaj ikonę** według kategorii lub nazwy
3. **Skopiuj nazwę ikony** (np. "message-circle")
4. **Wklej nazwę** w polu "Ikona" w panelu administratora

## ⚙️ Jak dodać nowe ikony?

Jeśli chcesz użyć ikony, której nie ma w obecnej liście:

1. **Znajdź ikonę** na https://lucide.dev/icons/
2. **Skopiuj kod SVG** ikony 
3. **Edytuj plik:** `src/components/LucideIcon.astro`
4. **Dodaj nową ikonę** do obiektu `iconPaths`:

```javascript
const iconPaths: Record<string, string> = {
  // ...istniejące ikony...
  'NAZWA_IKONY': 'KOD_SVG_TUTAJ',
};
```

## ✅ Przykłady użycia

### Sekcja O Nas:
```yaml
pillars:
  - icon: "lightbulb"
    title: "Innowacyjność"
    description: "Najnowsze technologie eventowe"
    
  - icon: "audio-lines"
    title: "Jakość dźwięku"
    description: "Kristalicznie czysty dźwięk"
    
  - icon: "monitor"
    title: "Kompleksowość"
    description: "Pełen zakres usług"
```

### Sekcja Kontakt:
```yaml
contact_methods:
  - icon: "phone"
    title: "Telefon"
    value: "+48 501 181 703"
    link: "tel:+48501181703"
    
  - icon: "mail"
    title: "Email" 
    value: "kontakt@kapitanie.pl"
    link: "mailto:kontakt@kapitanie.pl"
```

## 🛠️ Rozwój systemu

System został zintegrowany z biblioteką Lucide Icons, co oznacza:

✅ **Łatwość użycia** - wystarczy wpisać nazwę ikony  
✅ **Bogata biblioteka** - setki profesjonalnych ikon  
✅ **Spójny design** - wszystkie ikony w jednym stylu  
✅ **Optymalizacja** - ikony SVG ładują się szybko  
✅ **Responsywność** - ikony skalują się na każdym urządzeniu  

---

**Ostatnia aktualizacja:** 3 lipca 2025  
**Wersja systemu:** 2.0 z integracją Lucide Icons