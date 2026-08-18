export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      clientType,
      countries,
      services,
      budget,
      message,
      consultationDate,
      consultationTime,
      meetingPlatform,
    } = await request.json();

    if (
      !name ||
      !email ||
      !isValidEmail(email) ||
      !clientType ||
      !Array.isArray(countries) ||
      countries.length === 0 ||
      !Array.isArray(services) ||
      services.length === 0 ||
      !message
    ) {
      return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return Response.json({ ok: false, error: 'Server misconfigured' }, { status: 500 });
    }

    const text = [
      '<b>New Consultation Request</b>',
      '─────────────────────────',
      `<b>Name:</b> ${escapeHtml(name)}`,
      `<b>Email:</b> ${escapeHtml(email)}`,
      phone ? `<b>Phone:</b> ${escapeHtml(phone)}` : null,
      `<b>Client type:</b> ${escapeHtml(clientType)}`,
      `<b>Countries:</b> ${escapeHtml(countries.join(', '))}`,
      `<b>Services:</b> ${escapeHtml(services.join(', '))}`,
      budget ? `<b>Budget:</b> ${escapeHtml(budget)}` : null,
      consultationDate ? `<b>Preferred date:</b> ${escapeHtml(consultationDate)}` : null,
      consultationTime ? `<b>Preferred time:</b> ${escapeHtml(consultationTime)}` : null,
      meetingPlatform ? `<b>Meeting platform:</b> ${escapeHtml(meetingPlatform)}` : null,
      '─────────────────────────',
      `<b>Message:</b>\n${escapeHtml(message)}`,
      '─────────────────────────',
      '<i>soleonconllc.com</i>',
    ].filter(Boolean).join('\n');

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Telegram error:', err);
      return Response.json({ ok: false, error: 'Failed to send notification' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return Response.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
