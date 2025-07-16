# Wymagania projektowe: Endpoint obsługi formularza kontaktowego

## Cel
Stworzenie i wdrożenie endpointu API, który odbiera dane z formularza kontaktowego na stronie kapitanie.com (hostowanej na Cloudflare), a następnie wysyła wiadomość e-mail na wskazany adres (przekierowanie na Gmail).

## Założenia
- Strona hostowana na Cloudflare Pages.
- Domena: kapitanie.com (routing mailowy na Gmail).
- Formularz kontaktowy wysyła dane przez fetch (POST) do endpointu.
- Backend nie jest hostowany na własnym serwerze, preferowane rozwiązanie serverless/cloud.

## Wymagania funkcjonalne
1. Endpoint przyjmuje żądania POST z danymi formularza (JSON):
   - Imię, nazwisko, email, telefon, firma, rodzaj wydarzenia, data, liczba gości, usługi, opis wydarzenia, akceptacja polityki.
2. Walidacja danych po stronie backendu (wymagane pola, poprawność emaila).
3. Wysyłka e-maila z danymi formularza na adres docelowy (np. kontakt@kapitanie.com).
4. Odpowiedź JSON: sukces/błąd, komunikat dla użytkownika.
5. Ochrona przed spamem (np. rate limit, honeypot, reCAPTCHA v3).

## Wymagania techniczne
- Endpoint dostępny pod `/api/contact` lub podobnym.
- Rozwiązanie serverless kompatybilne z Cloudflare Pages (np. Cloudflare Workers, Pages Functions).
- Wysyłka maila przez API (brak własnego SMTP):
  - [Resend](https://resend.com/)
- Kod w JavaScript/TypeScript.
- Sekrety (API Key) przechowywane w zmiennych środowiskowych Cloudflare.

## Przykładowy flow
1. Użytkownik wypełnia formularz i klika "Wyślij".
2. JS wysyła fetch POST na `/api/contact` z danymi.
3. Endpoint waliduje dane i wysyła e-mail przez wybrane API (np. Resend).
4. Endpoint zwraca status (sukces/błąd), JS wyświetla odpowiedni komunikat.

## Dodatkowe wymagania
- Logowanie błędów (np. do konsoli lub narzędzia typu Sentry).
- Możliwość łatwej zmiany adresu docelowego.
- Możliwość rozbudowy o dodatkowe pola w przyszłości.

## Propozycja API do wysyłki maili
- **Resend** – bardzo proste API, darmowy plan, dobre wsparcie dla Cloudflare Workers/Pages Functions, nie wymaga własnego SMTP.
- Alternatywy: Mailgun, SendGrid, MailChannels (wszystkie mają gotowe SDK do Node.js/JS).

## Przykładowe linki
- Resend: https://resend.com/docs/send-with-api
- Cloudflare Pages Functions: https://developers.cloudflare.com/pages/functions/

---

**Następny krok:**
- Stworzyć endpoint `/api/contact` jako Pages Function (np. `functions/api/contact.js`).
- Skonfigurować Resend (lub inne API) i dodać klucz do Cloudflare.
- Zmodyfikować JS w formularzu, by wysyłał fetch na ten endpoint.
