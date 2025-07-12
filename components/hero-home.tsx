"use client";

import { useState, useEffect } from "react";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface HeroHomeProps {
  onReplayVSL?: () => void;
  onCTAClick?: () => void;
}

export default function HeroHome({ onReplayVSL, onCTAClick }: HeroHomeProps) {
  // 15 minutos em segundos
  const INITIAL_TIME = 15 * 60;
  const [timer, setTimer] = useState(INITIAL_TIME);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    if (!waiting && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (!waiting && timer === 0) {
      setWaiting(true);
      timeout = setTimeout(() => {
        setTimer(INITIAL_TIME);
        setWaiting(false);
      }, 60 * 1000); // espera 1 minuto
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [timer, waiting]);

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Título principal */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-6 border-y text-5xl font-bold text-white [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Recupere seu nome e tenha fôlego{" "}
              <span className="relative inline-flex justify-center whitespace-nowrap bg-gradient-to-r from-blue-500 to-blue-200 bg-clip-text text-transparent">
                financeiro
              </span>{" "}
              em até 7 dias.
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-300"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Saia da inadimplência e volte a ter crédito com um método único, já testado por milhares de brasileiros.
              </p>
            </div>
          </div>

          {/* Área do vídeo substituída por imagem e botão para reassistir */}
          <div className="mx-auto max-w-3xl" data-aos="zoom-y-out" data-aos-delay={600}>
            <div className="relative">
              {/* Imagem de destaque */}
              <div className="relative rounded-2xl bg-gray-900 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]">
                <div className="relative flex items-center justify-center">
                  <img
                    src="/images/homem-preocupado.png"
                    alt="Pessoa preocupada com nome sujo"
                    className="w-full max-w-md rounded-lg"
                  />

                  {/* Overlay com botão para reassistir VSL */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <button
                      onClick={onReplayVSL}
                      className="bg-[#00B5BF] hover:bg-[#FF6A00] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      🎥 Reassistir Vídeo Explicativo
                    </button>
                  </div>
                </div>
              </div>

              {/* Oferta por tempo limitado e timer */}
              <div className="w-full flex flex-col items-center mt-8">
                <span className="text-[#FF6A00] font-bold text-lg uppercase mb-2 tracking-wide">
                  OFERTAS POR TEMPO LIMITADO
                </span>
                <span className="text-3xl font-mono font-bold text-[#00B5BF] mb-4 border-2 border-[#FF6A00] px-8 py-2 rounded">
                  {waiting ? "Aguarde 01:00" : formatTime(timer)}
                </span>
                <button
                  onClick={onCTAClick}
                  className="btn w-full flex items-center justify-center rounded-md bg-[#00B5BF] px-6 py-2 text-[#F4F4F4] font-semibold transition duration-300 hover:bg-[#FF6A00] hover:text-white max-w-xs"
                >
                  Receber Oferta
                  <span className="ml-1 tracking-normal transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
