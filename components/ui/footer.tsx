import Image from "next/image";
import Link from "next/link";
import FooterIllustration from "@/public/images/footer-illustration.svg";

export default function Footer() {
  return (
    <footer className="pt-8">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Ilustração decorativa */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>

        {/* Conteúdo centralizado e responsivo */}
        <div className="flex flex-col items-center py-8 text-sm text-indigo-200/65 text-center space-y-2">
          {/* Linha 1: Links lado a lado no desktop, empilhados no mobile */}
          <div className="flex flex-col sm:flex-row sm:gap-6 items-center justify-center">
            <Link
              href="/termos-de-uso"
              className="text-[#3cb6e3] underline hover:text-[#2596be] transition mb-1 sm:mb-0"
            >
              Termos de Uso
            </Link>
            <a
              href="/cartao-cnpj-o-meu-credito-ltda.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3cb6e3] underline hover:text-[#2596be] transition"
            >
              Ver Cartão CNPJ
            </a>
          </div>
          {/* Linha 2: Nome da empresa e CNPJ */}
          <div className="text-xs text-indigo-200/65 mt-1">
            O MEU CREDITO LTDA – CNPJ: 43.932.982/0001-62
          </div>
          {/* Linha 3: Endereço */}
          <div className="text-xs text-indigo-200/65 mt-1">
            Q A3, nº 1B, Cond. Edla Costa, Cruz das Almas-BA, CEP 44.380-000
          </div>
          {/* Linha 4: Copyright */}
          <div className="text-xs text-indigo-200/65 mt-2">
            © 2025 Clube Limpa Nome. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
