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

        {/* Conteúdo centralizado e institucional */}
        <div className="flex flex-col items-center py-8 text-sm text-indigo-200/65 text-center space-y-2">
          <div className="flex flex-col sm:flex-row sm:gap-6 items-center justify-center">
            <Link
              href="/termos-de-uso"
              className="text-[#3cb6e3] underline hover:text-[#2596be] transition mb-1 sm:mb-0"
            >
              Termos de Uso
            </Link>
          </div>
          {/* Dados institucionais do CNPJ */}
          <div className="text-xs text-indigo-200/65 mt-1">
            O MEU CREDITO LTDA – CNPJ: 43.932.982/0001-62<br />
            Nome Fantasia: Clube Limpa Nome<br />
            Data de abertura: 09/10/2021<br />
            Endereço: Q A3, nº 1B, Cond. Edla Costa, Cruz das Almas-BA, CEP 44.380-000<br />
            Situação cadastral: ATIVA
          </div>
          <div className="text-xs text-indigo-200/65 mt-2">
            © 2025 Clube Limpa Nome. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
