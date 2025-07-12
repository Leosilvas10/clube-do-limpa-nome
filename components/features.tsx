import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import FeaturesImage from "@/public/images/features.png";

interface FeaturesProps {
  onCTAClick?: () => void;
}

export default function Features({ onCTAClick }: FeaturesProps) {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Benefícios para sua vida
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Dê um fim às restrições e recupere seu poder de escolha
            </h2>
            <p className="text-lg text-indigo-200/65">
              Com o Clube Limpa Nome, você tem o suporte necessário para sair da negativação, limpar seu nome e reconstruir sua liberdade financeira.
            </p>
          </div>

          {/* Benefícios */}
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Nome limpo em tempo recorde
              </h3>
              <p className="text-indigo-200/65">
                Processo imediato: protocolo da ação no mesmo dia e nome 100% limpo em até 7 dias úteis (à vista R$487,00) ou até 15 dias úteis (plano parcelado).
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Parcelamento facilitado de verdade
              </h3>
              <p className="text-indigo-200/65">
                Apenas uma entrada de R$197,00 (Taxa Administrativa) + 5x de R$97,00 (só começa a pagar 30 dias após início do processo). Cabe no seu bolso, sem sufoco.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Acompanhamento jurídico e suporte humanizado
              </h3>
              <p className="text-indigo-200/65">
                Especialistas acompanham cada etapa do processo, com garantia em contrato digital e suporte personalizado do início ao fim.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Transparência total no processo
              </h3>
              <p className="text-indigo-200/65">
                Acompanhe todo o processo em tempo real, com informações claras sobre cada etapa, documento e movimentação. Sem letras miúdas.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Acordos com condições exclusivas
              </h3>
              <p className="text-indigo-200/65">
                Negociações diferenciadas, acordos exclusivos e condições especiais disponíveis apenas para membros do Clube Limpa Nome.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Liberdade para sonhar de novo
              </h3>
              <p className="text-indigo-200/65">
              Com seu nome limpo, o crédito volta, oportunidades reaparecem e você pode retomar seus planos com tranquilidade e segurança.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
