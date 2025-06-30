import { NextRequest, NextResponse } from 'next/server';

const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
const makeWebhookURL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  // Verificação das URLs
  if (!scriptURL || !makeWebhookURL) {
    console.error('❌ Erro: Variáveis de ambiente não configuradas');
    return NextResponse.json({
      success: false,
      error: 'Webhook URL ou Google Script URL não configurada no .env.local'
    }, { status: 500 });
  }

  const { nome, email, whatsapp } = await req.json();

  if (!nome || !email || !whatsapp) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
  }

  const payload = {
    NOME: nome,
    TELEFONE: whatsapp,
    "E-MAIL": email,
    timestamp: new Date().toISOString(),
    source: "website"
  };

  let googleSheetsOk = false;
  let makeOk = false;
  let googleError = '';
  let makeError = '';

  // 1. Envia para o Google Sheets
  try {
    const googleRes = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });
    if (googleRes.ok) {
      googleSheetsOk = true;
    } else {
      googleError = await googleRes.text();
    }
  } catch (error: any) {
    googleError = error && error.toString ? error.toString() : 'Erro Google Sheets';
  }

  // 2. Envia para o Make.com Webhook
  try {
    const makeRes = await fetch(makeWebhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (makeRes.ok) {
      makeOk = true;
    } else {
      makeError = await makeRes.text();
    }
  } catch (error: any) {
    makeError = error && error.toString ? error.toString() : 'Erro Make.com';
  }

  // Resultado combinado:
  if (googleSheetsOk || makeOk) {
    // Sucesso em pelo menos um destino
    return NextResponse.json({
      success: true,
      googleSheets: googleSheetsOk,
      make: makeOk,
      googleError,
      makeError,
    });
  }

  // Falha total
  return NextResponse.json({
    success: false,
    googleSheets: false,
    make: false,
    googleError,
    makeError,
    error: "Falha em todos os destinos"
  }, { status: 500 });
}
