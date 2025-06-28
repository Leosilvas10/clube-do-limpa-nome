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
                Nome limpo em menos tempo
              </h3>
              <p className="text-indigo-200/65">
                Negociamos e agilizamos o processo de retirada das restrições com o apoio jurídico certo. Você não está mais sozinho nessa.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Parcelas que cabem no seu bolso
              </h3>
              <p className="text-indigo-200/65">
                Pagando menos de R$ 3,23 por dia, você pode dar o primeiro passo para sair do sufoco — sem comprometer seu orçamento.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Acompanhamento jurídico completo
              </h3>
              <p className="text-indigo-200/65">
                Nossos especialistas acompanham cada etapa do processo, garantindo que seus direitos sejam respeitados e que sua jornada seja segura.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Transparência total no processo
              </h3>
              <p className="text-indigo-200/65">
                Saiba exatamente o que está acontecendo. Cada etapa, cada documento, cada movimento — tudo visível pra você.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Acordos com condições exclusivas
              </h3>
              <p className="text-indigo-200/65">
                Tenha acesso a negociações especiais com empresas e instituições, disponíveis apenas para membros do nosso clube.
              </p>
            </article>

            <article>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                Liberdade para sonhar de novo
              </h3>
              <p className="text-indigo-200/65">
                Com o nome limpo, o crédito volta, as oportunidades aparecem, e você pode retomar seus planos com tranquilidade.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
