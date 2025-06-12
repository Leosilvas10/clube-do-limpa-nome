import Image from "next/image";
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

        {/* Texto centralizado */}
        <div className="flex justify-center py-8 text-sm text-indigo-200/65 text-center">
          © 2025 Clube Limpa Nome. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
