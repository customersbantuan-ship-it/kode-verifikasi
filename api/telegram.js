const TELEGRAM_API = 'https://api.telegram.org';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return response.status(500).json({ error: 'Telegram is not configured' });
  }

  const event = request.body?.event;
  if (event !== 'reference_confirmation') {
    return response.status(400).json({ error: 'Unsupported event' });
  }

  try {
    const telegramResponse = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: 'Status: pengguna mengonfirmasi kode referensi di halaman Live Tracking.',
      }),
    });

    if (!telegramResponse.ok) {
      return response.status(502).json({ error: 'Telegram notification failed' });
    }

    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: 'Telegram notification failed' });
  }
}
