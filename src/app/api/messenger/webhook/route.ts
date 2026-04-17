import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.MESSENGER_VERIFY_TOKEN ?? 'bookworm_verify_token';
const PAGE_ACCESS_TOKEN = process.env.MESSENGER_PAGE_ACCESS_TOKEN ?? '';

/**
 * GET — Facebook webhook verification handshake
 * Facebook sends hub.mode, hub.verify_token, hub.challenge
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

/**
 * POST — Incoming Messenger messages
 * Парсинг хийж, app-ийн мессеж систем рүү дамжуулна
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.object !== 'page') {
    return NextResponse.json({ error: 'Not a page event' }, { status: 400 });
  }

  for (const entry of body.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      if (event.message && !event.message.is_echo) {
        const senderId: string = event.sender.id;
        const text: string = event.message.text ?? '';

        // TODO:
        // 1. senderId-р хэрэглэгч хайна (PostgreSQL-аас)
        // 2. Message-г app-ийн мессеж систем рүү хадгална
        // 3. Socket.io-р хүлээн авагчид broadcast хийнэ
        // 4. Шаардлагатай бол автомат хариу илгээнэ

        console.log(`Messenger message from ${senderId}: ${text}`);

        // Auto reply for demo
        if (PAGE_ACCESS_TOKEN) {
          await sendMessengerReply(senderId, `Таны мессежийг хүлээн авлаа: "${text}"`);
        }
      }
    }
  }

  return NextResponse.json({ status: 'ok' });
}

async function sendMessengerReply(recipientId: string, text: string) {
  await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
    }),
  });
}
