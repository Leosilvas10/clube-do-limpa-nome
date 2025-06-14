import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import * as XLSX from "xlsx";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Recebendo lead:", body);

    // Cria a planilha com os dados recebidos
    const ws = XLSX.utils.json_to_sheet([body]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    // Configura o transporte do e-mail (exemplo com Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Envia o e-mail com a planilha em anexo
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Troque para o e-mail do cliente se quiser
      subject: "Novo lead recebido",
      text: "Segue em anexo a planilha com o novo lead.",
      attachments: [
        {
          filename: "lead.xlsx",
          content: buffer,
        },
      ],
    });

    console.log("E-mail enviado!");
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return new Response(
      JSON.stringify({ ok: false, error: String(error) }),
      { status: 500 }
    );
  }
}