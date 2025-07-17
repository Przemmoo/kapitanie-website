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


    // Zamiana znaków nowej linii na <br> w treści wiadomości
    const formattedMessage = body.message.replace(/\r?\n/g, '<br>');

    // Przygotowanie treści maila do firmy (HTML)
    const mailHtml = `
<div style="font-family: 'Montserrat', Arial, sans-serif; font-style: italic; font-weight: 400; color: #222; font-size: 16px;">
  <div style="margin-bottom: 32px;">
    <div style="font-size: 22px; font-weight: 700; font-style: normal; margin-bottom: 12px;">Nowe zapytanie z formularza kontaktowego kapitanie.com</div>
    <div><b>Imię:</b> ${body.firstName}</div>
    <div><b>Nazwisko:</b> ${body.lastName}</div>
    <div><b>Email:</b> ${body.email}</div>
    <div><b>Telefon:</b> ${body.phone || '-'}</div>
    <div><b>Firma:</b> ${body.company || '-'}</div>
    <div><b>Rodzaj wydarzenia:</b> ${body.eventType}</div>
    <div><b>Data:</b> ${body.eventDate || '-'}</div>
    <div><b>Liczba gości:</b> ${body.guestCount || '-'}</div>
    <div><b>Usługi:</b> ${(body.services && Array.isArray(body.services)) ? body.services.join(', ') : '-'}</div>
    <div style="margin-top: 18px;"><b>Opis wydarzenia:</b><br>${formattedMessage}</div>
  </div>
  <div style="border-top:1px solid #eee; margin: 32px 0 0 0; padding-top: 18px; display: flex; align-items: center; gap: 12px;">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
    <tr>
      <td style="vertical-align:middle; padding-right:12px;">
        <img src="https://kapitanie.com/images/logo_blue_v1_small.png" alt="kapitanie logo" style="height:38px; display:block;" />
      </td>
      <td style="vertical-align:middle;">
        <span style="font-family: 'Montserrat', Arial, sans-serif; font-style: normal; font-size: 32px; font-weight: 900; letter-spacing: -0.02em;">kapitanie</span>
      </td>
    </tr>
  </table>
  </div>
  <div style="margin-top: 6px; font-style: normal; font-size: 13px;">
    tel. +48 501 181 703<br>
  </div>
  <div style="margin-top: 6px; font-style: normal; font-size: 13px;">
    Protech Przemysław Kilan<br>
    ul. Różana 54b/1<br>
    32-020 Wieliczka<br>
    NIP 5741597318
  </div>
</div>`;

    // Przygotowanie treści potwierdzenia dla użytkownika (HTML)
    const confirmHtml = `
<div style="font-family: 'Montserrat', Arial, sans-serif; font-style: italic; font-weight: 400; color: #222; font-size: 16px;">
  <div style="font-size: 20px; font-weight: 700; font-style: normal; margin-bottom: 12px;">Dziękujemy za wysłanie zapytania przez formularz kapitanie.com!</div>
  <div>Otrzymaliśmy Twoje zgłoszenie i wkrótce się skontaktujemy.</div>
  <div style="margin: 24px 0 8px 0; font-weight: 600; font-style: normal;">Podsumowanie zgłoszenia:</div>
  <div><b>Imię:</b> ${body.firstName}</div>
  <div><b>Nazwisko:</b> ${body.lastName}</div>
  <div><b>Email:</b> ${body.email}</div>
  <div><b>Telefon:</b> ${body.phone || '-'}</div>
  <div><b>Firma:</b> ${body.company || '-'}</div>
  <div><b>Rodzaj wydarzenia:</b> ${body.eventType}</div>
  <div><b>Data:</b> ${body.eventDate || '-'}</div>
  <div><b>Liczba gości:</b> ${body.guestCount || '-'}</div>
  <div><b>Usługi:</b> ${(body.services && Array.isArray(body.services)) ? body.services.join(', ') : '-'}</div>
  <div style="margin-top: 18px;"><b>Opis wydarzenia:</b><br>${formattedMessage}</div>
  <div style="margin-top: 32px; color: #888; font-size: 14px;">---<br>To jest automatyczne potwierdzenie. Prosimy nie odpowiadać na tę wiadomość.</div>
  <div style="border-top:1px solid #eee; margin: 32px 0 0 0; padding-top: 18px; display: flex; align-items: center; gap: 12px;">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
    <tr>
      <td style="vertical-align:middle; padding-right:12px;">
        <img src="https://kapitanie.com/images/logo_blue_v1_small.png" alt="kapitanie logo" style="height:38px; display:block;" />
      </td>
      <td style="vertical-align:middle;">
        <span style="font-family: 'Montserrat', Arial, sans-serif; font-style: normal; font-size: 32px; font-weight: 900; letter-spacing: -0.02em;">kapitanie</span>
      </td>
    </tr>
  </table>
  </div>
  <div style="margin-top: 6px; font-style: normal; font-size: 13px;">
    tel. +48 501 181 703<br>
  </div>
  <div style="margin-top: 6px; font-style: normal; font-size: 13px;">
    Protech Przemysław Kilan<br>
    ul. Różana 54b/1<br>
    32-020 Wieliczka<br>
    NIP 5741597318
  </div>
</div>`;

    // Wysyłka przez Resend API
    const RESEND_API_KEY = env.RESEND_API_KEY;
    const TO_EMAIL = env.CONTACT_EMAIL || 'kontakt@kapitanie.com';
    const FROM_EMAIL = env.RESEND_FROM_EMAIL || 'kontakt@kapitanie.com';


    // 1. Mail do firmy z Reply-To ustawionym na maila osoby zgłaszającej (HTML)
    const emailPayload = {
      from: `kapitanie.com <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: 'Nowe zapytanie z formularza kapitanie.com',
      html: mailHtml,
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


    // 2. Mail potwierdzający do osoby zgłaszającej (HTML)
    const confirmPayload = {
      from: `kapitanie.com <${FROM_EMAIL}>`,
      to: [body.email],
      subject: 'Potwierdzenie zgłoszenia - kapitanie.com',
      html: confirmHtml
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
