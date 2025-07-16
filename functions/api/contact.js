// Cloudflare Pages Function: Kontakt - obsługa formularza i wysyłka maila przez Resend
// Plik: functions/api/contact.js

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    // Walidacja wymaganych pól
    const requiredFields = [
      'firstName', 'lastName', 'email', 'eventType', 'message', 'privacy'
    ];
    for (const field of requiredFields) {
      if (!body[field] || (typeof body[field] === 'string' && !body[field].trim())) {
        return new Response(JSON.stringify({ success: false, message: `Brak pola: ${field}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    // Prosta walidacja emaila
    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return new Response(JSON.stringify({ success: false, message: 'Niepoprawny email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Przygotowanie treści maila do firmy
    const mailText = `Nowe zapytanie z formularza kontaktowego kapitanie.com\n\nImię: ${body.firstName}\nNazwisko: ${body.lastName}\nEmail: ${body.email}\nTelefon: ${body.phone || '-'}\nFirma: ${body.company || '-'}\nRodzaj wydarzenia: ${body.eventType}\nData: ${body.eventDate || '-'}\nLiczba gości: ${body.guestCount || '-'}\nUsługi: ${(body.services && Array.isArray(body.services)) ? body.services.join(', ') : '-'}\n\nOpis wydarzenia:\n${body.message}\n\nAkceptacja polityki: ${body.privacy ? 'TAK' : 'NIE'}`;

    // Przygotowanie treści potwierdzenia dla użytkownika
    const confirmText = `Dziękujemy za wysłanie zapytania przez formularz kapitanie.com!\n\nOtrzymaliśmy Twoje zgłoszenie i wkrótce się skontaktujemy.\n\nPodsumowanie zgłoszenia:\nImię: ${body.firstName}\nNazwisko: ${body.lastName}\nEmail: ${body.email}\nTelefon: ${body.phone || '-'}\nFirma: ${body.company || '-'}\nRodzaj wydarzenia: ${body.eventType}\nData: ${body.eventDate || '-'}\nLiczba gości: ${body.guestCount || '-'}\nUsługi: ${(body.services && Array.isArray(body.services)) ? body.services.join(', ') : '-'}\n\nOpis wydarzenia:\n${body.message}\n\n---\nTo jest automatyczne potwierdzenie. Prosimy nie odpowiadać na tę wiadomość.`;

    // Wysyłka przez Resend API
    const RESEND_API_KEY = env.RESEND_API_KEY;
    const TO_EMAIL = env.CONTACT_EMAIL || 'kontakt@kapitanie.com';
    const FROM_EMAIL = env.RESEND_FROM_EMAIL || 'noreply@kapitanie.com';

    // 1. Mail do firmy z Reply-To ustawionym na maila osoby zgłaszającej
    const emailPayload = {
      from: `Kapitanie <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: 'Nowe zapytanie z formularza kapitanie.com',
      text: mailText,
      reply_to: body.email
    };

    const resendResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    if (!resendResp.ok) {
      const err = await resendResp.text();
      return new Response(JSON.stringify({ success: false, message: 'Błąd wysyłki maila', error: err }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Mail potwierdzający do osoby zgłaszającej
    const confirmPayload = {
      from: `Kapitanie <${FROM_EMAIL}>`,
      to: [body.email],
      subject: 'Potwierdzenie zgłoszenia - kapitanie.com',
      text: confirmText
    };

    // Wysyłka potwierdzenia, ale nie blokuje odpowiedzi dla użytkownika jeśli się nie uda
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(confirmPayload)
    });

    return new Response(JSON.stringify({ success: true, message: 'Wiadomość wysłana!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: 'Błąd serwera', error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
