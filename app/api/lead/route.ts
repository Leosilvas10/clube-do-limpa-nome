import { NextRequest, NextResponse } from 'next/server';

// Troque pela URL do seu Webhook Make.com ou Google Sheets!
const WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL!; // ou qualquer URL que deseja

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Aqui envia os dados para o webhook externo!
  const webhookRes = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!webhookRes.ok) {
    return NextResponse.json({ success: false, error: "Falha ao enviar para o webhook." }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Lead enviado para o webhook!" });
}

export async function GET() {
  return NextResponse.json({ status: "API lead ativa" });
}
