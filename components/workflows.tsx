import Image from "next/image";
import WorflowImg02 from "@/public/images/workflow-02.png";
import Spotlight from "@/components/spotlight";

// Imagens atualizadas
import OpcoesDePlanosMao from "@/public/images/opcoes-de-planos-mao.png";
import JusticaProcessoEtapas from "@/public/images/justica-processo-etapas.png";

interface WorkflowsProps {
  onCTAClick?: () => void;
}

export default function Workflows({ onCTAClick }: WorkflowsProps) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Cabeçalho da Seção */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Seu caminho para a liberdade financeira
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Volte a sorrir com seu nome limpo e novas possibilidades
            </h2>
            <p className="text-lg text-indigo-200/65">
              Assine agora e tenha acesso a condições exclusivas, pagamento facilitado e orientação completa para sair da negativação sem burocracia.
            </p>
          </div>

          {/* Cards principais */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">

            {/* CARD 1 - Planos acessíveis */}
            <a className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px hover:after:opacity-20 group-hover:before:opacity-100" href="#0">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                    <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
                  </svg>
                </div>
                <Image src={OpcoesDePlanosMao} width={350} height={288} alt="Opções de planos" />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                      <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                        Planos que cabem no seu bolso
                      </span>
                    </span>
                  </div>
                  <p className="text-indigo-200/65">
                    Pague menos de R$ 3,23 por dia e limpe seu nome sem comprometer suas finanças. Acessível, possível e com resultados reais.
                  </p>
                </div>
              </div>
            </a>

            {/* CARD 2 - Transparência */}
            <a className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px hover:after:opacity-20 group-hover:before:opacity-100" href="#0">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                    <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
                  </svg>
                </div>
                <Image src={WorflowImg02} width={350} height={288} alt="Transparência no processo" />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                      <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                        Segurança e transparência
                      </span>
                    </span>
                  </div>
                  <p className="text-indigo-200/65">
                    Acompanhe seu progresso em tempo real, com clareza em cada etapa e suporte constante. Aqui, você sabe exatamente onde está pisando.
                  </p>
                </div>
              </div>
            </a>

            {/* CARD 3 - Jurídico especializado */}
            <a className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px hover:after:opacity-20 group-hover:before:opacity-100" href="#0">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                    <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
                  </svg>
                </div>
                <Image src={JusticaProcessoEtapas} width={350} height={288} alt="Acompanhamento jurídico" />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                      <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                        Acompanhamento Jurídico Completo
                      </span>
                    </span>
                  </div>
                  <p className="text-indigo-200/65">
                    Seu CPF tratado com seriedade. Receba suporte jurídico especializado e orientação prática do início ao fim da jornada.
                  </p>
                </div>
              </div>
            </a>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
