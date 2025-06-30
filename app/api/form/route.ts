import { NextRequest, NextResponse } from 'next/server';

// Usa a URL do .env.local!
const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL as string;

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
  // Recebe os dados enviados no body
  const { nome, email, whatsapp } = await req.json();

  if (!nome || !email || !whatsapp) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
  }

  try {
    // Monta o payload no formato esperado pelo Apps Script
    const payload = {
      NOME: nome,
      TELEFONE: whatsapp,
      "E-MAIL": email,
      timestamp: new Date().toISOString(),
      source: "website"
    };

    // Envia o payload para o Apps Script
    const googleRes = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    const resultText = await googleRes.text();
    let resultData;
    try {
      resultData = JSON.parse(resultText);
    } catch {
      resultData = resultText;
    }

    if (!googleRes.ok) {
      return NextResponse.json({ success: false, error: resultData }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: resultData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
