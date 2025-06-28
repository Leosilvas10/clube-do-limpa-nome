// components/cta.tsx

"use client";

interface CtaProps {
  onCTAClick?: () => void;
}

export default function Cta({ onCTAClick }: CtaProps) {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-[#00141A] to-[#00141A]/80 flex flex-col items-center">
      <div className="max-w-2xl w-full px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Pronto para limpar seu nome?
        </h2>
        <p className="text-lg text-indigo-200/80 mb-8">
          Fale agora com um especialista e descubra como é fácil mudar de vida pagando pouco por dia.
        </p>
        <button
          onClick={() => {
            if (onCTAClick) {
              console.log('CTA: clique detectado, abrindo modal!');
              onCTAClick();
            } else {
              console.warn('CTA: onCTAClick não definido!');
            }
          }}
          className="btn group w-full max-w-xs rounded-md bg-[#00B5BF] px-6 py-3 text-center text-[#F4F4F4] font-semibold text-lg transition duration-300 hover:bg-[#FF6A00] hover:text-white inline-block"
        >
          <span className="relative inline-flex items-center justify-center">
            Receber Oferta Agora
            <span className="ml-1 tracking-normal transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}
