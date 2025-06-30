import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({ message: "Lead recebido com sucesso!" });
}

// Se quiser adicionar o método GET para teste:
export async function GET() {
  return NextResponse.json({ message: "API Lead GET funcionando!" });
}