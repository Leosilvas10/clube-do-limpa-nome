"use client";

import { useState, useEffect, useRef } from "react";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function HeroHome() {
  // 15 minutos em segundos
  const INITIAL_TIME = 15 * 60;
  const [timer, setTimer] = useState(INITIAL_TIME);
  const [waiting, setWaiting] = useState(false);

  // Controle do vídeo travado
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Travar vídeo: sem pausar, sem avançar, sem retroceder
  useEffect(() => {
    const handlePrevent = (e: Event) => {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.addEventListener("pause", handlePrevent);
      videoEl.addEventListener("seeking", handlePrevent);
      videoEl.addEventListener("seeked", handlePrevent);
      videoEl.addEventListener("ended", handlePrevent);
      videoEl.addEventListener("contextmenu", (e) => e.preventDefault());
      videoEl.addEventListener("mousedown", handlePrevent);
      videoEl.addEventListener("touchstart", handlePrevent);
    }

    return () => {
      if (videoEl) {
        videoEl.removeEventListener("pause", handlePrevent);
        videoEl.removeEventListener("seeking", handlePrevent);
        videoEl.removeEventListener("seeked", handlePrevent);
        videoEl.removeEventListener("ended", handlePrevent);
        videoEl.removeEventListener("contextmenu", (e) => e.preventDefault());
        videoEl.removeEventListener("mousedown", handlePrevent);
        videoEl.removeEventListener("touchstart", handlePrevent);
      }
    };
  }, []);

  // Tentar dar play com áudio após interação do usuário
  useEffect(() => {
    const tryPlay = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
    };
    window.addEventListener("click", tryPlay, { once: true });
    window.addEventListener("touchstart", tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });
    return () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-20">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              Recupere seu nome e tenha fôlego financeiro em até 15 dias.
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Saia da inadimplência e volte a ter crédito por menos de R$3,23/dia com um método único que já transformou milhares de vidas.
              </p>
              {/* Esconde os CTAs no mobile, mostra apenas em sm+ */}
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center hidden sm:block">
                {/* BOTÃO CONTRATAR COTA */}
                <div data-aos="fade-up" data-aos-delay={600}>
                  <a
                    className="btn w-full flex items-center justify-center rounded-md bg-[#00B5BF] px-6 py-2 text-[#F4F4F4] font-semibold transition duration-300 hover:bg-[#FF6A00] hover:text-white sm:w-auto"
                    href="#oferta"
                  >
                    Contratar Cota
                    <span className="ml-1 tracking-normal transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso para ativar o som */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#FF6A00]/10 border border-[#FF6A00] rounded px-4 py-2 text-[#FF6A00] text-sm font-semibold shadow-sm">
              ⚠️ Ative o som do seu dispositivo para ouvir o vídeo completo.
            </div>
          </div>

          {/* Video direto na hero */}
          <div className="flex justify-center mb-8">
            <video
              ref={videoRef}
              width={1104}
              height={576}
              autoPlay
              playsInline
              tabIndex={-1}
              style={{ pointerEvents: "none", userSelect: "none", borderRadius: 16, boxShadow: "0 4px 32px #0002" }}
              onContextMenu={(e) => e.preventDefault()}
              onPause={() => {
                if (videoRef.current) videoRef.current.play();
              }}
              onSeeking={() => {
                if (videoRef.current) videoRef.current.currentTime = 0;
              }}
              poster="/images/homem-preocupado.png"
            >
              <source src="/videos/vsl-clube-v2.mp4" type="video/mp4" />
              Seu navegador não suporta o vídeo.
            </video>
          </div>

          {/* Oferta por tempo limitado e timer */}
          <div className="w-full flex flex-col items-center mt-8">
            <span className="text-[#FF6A00] font-bold text-lg uppercase mb-2 tracking-wide">
              OFERTAS POR TEMPO LIMITADO
            </span>
            <span className="text-3xl font-mono font-bold text-[#00B5BF] mb-4 border-2 border-[#FF6A00] px-8 py-2 rounded">
              {waiting ? "Aguarde 01:00" : formatTime(timer)}
            </span>
            <a
              className="btn w-full flex items-center justify-center rounded-md bg-[#00B5BF] px-6 py-2 text-[#F4F4F4] font-semibold transition duration-300 hover:bg-[#FF6A00] hover:text-white max-w-xs"
              href="#oferta"
            >
              Adquirir Consórcio
              <span className="ml-1 tracking-normal transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
