import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

interface NotificationData {
  type: string;
  data: any;
  error: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: NotificationData = await request.json();
    console.log("Recebendo notificação de falha:", body);

    // Configura o transporte do e-mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Monta o conteúdo do e-mail
    const emailContent = `
      ALERTA: Falha na integração do formulário
      
      Tipo: ${body.type}
      Data/Hora: ${body.timestamp}
      Erro: ${body.error}
      
      Dados do formulário que falharam:
      - Nome: ${body.data.NOME}
      - Telefone: ${body.data.TELEFONE}
      - E-mail: ${body.data['E-MAIL']}
      
      Por favor, verifique a integração com Make.com e Google Sheets.
      
      ---
      Sistema de Notificações - Clube do Limpa Nome
    `;

    // Envia o e-mail de notificação
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🚨 ALERTA: Falha na integração do formulário",
      text: emailContent,
    });

    console.log("Notificação enviada para admin!");
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
    
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
    return new Response(
      JSON.stringify({ ok: false, error: String(error) }),
      { status: 500 }
    );
  }
}
