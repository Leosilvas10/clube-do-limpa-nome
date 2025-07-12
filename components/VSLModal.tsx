"use client";

import { useState, useEffect, useRef } from "react";

interface VSLModalProps {
  isOpen: boolean;
  onVideoEnd: () => void;
  onOpenForm?: () => void;
}

// VTurb player.js embed oficial (não use mais iframe direto)
const VTURB_PLAYER_ID = "vid-687265fd54bc1a7af7bd9d83";
const VTURB_SCRIPT = "https://scripts.converteai.net/373f60ba-0f5e-4a3d-9d10-14b049d4eb9b/players/687265fd54bc1a7af7bd9d83/v4/player.js";

export default function VSLModal({ isOpen, onVideoEnd, onOpenForm }: VSLModalProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  // Carrega player.js no head só 1x por página
  useEffect(() => {
    if (!isOpen) return;
    if (!scriptLoadedRef.current && !document.getElementById('vturb-player-script-loaded')) {
      const s = document.createElement("script");
      s.id = "vturb-player-script-loaded";
      s.src = VTURB_SCRIPT;
      s.async = true;
      document.head.appendChild(s);
      scriptLoadedRef.current = true;
    }
  }, [isOpen]);

  // Monta o elemento custom <vturb-smartplayer> dentro do modal
  useEffect(() => {
    if (isOpen && playerRef.current) {
      // Garante idempotência: só cria se ainda não existir
      if (!document.getElementById(VTURB_PLAYER_ID)) {
        const el = document.createElement("vturb-smartplayer");
        el.id = VTURB_PLAYER_ID;
        el.style.display = "block";
        el.style.margin = "0 auto";
        el.style.width = "100%";
        playerRef.current.appendChild(el);
      }
    } else if (!isOpen && playerRef.current) {
      // Limpa player ao fechar para garantir reload
      playerRef.current.innerHTML = "";
      setVideoEnded(false);
    }
  }, [isOpen]);

  // Fecha com ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onVideoEnd();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onVideoEnd]);

  // Detecta término do vídeo via postMessage do smartplayer
  useEffect(() => {
    if (!isOpen) return;
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        typeof event.data === "object" &&
        (event.data.type === "smartplayer:ended" ||
          event.data.type === "vturb:ended" ||
          event.data.type === "video:ended" ||
          event.data.event === "ended")
      ) {
        setVideoEnded(true);
        onVideoEnd();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isOpen, onVideoEnd]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      data-vsl-modal
    >
      {/* Estilo para o player */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .vturb-container {
            position: relative;
            width: 100%;
            height: 400px;
            background: #000;
            border-radius: 8px;
            overflow: hidden;
          }
          vturb-smartplayer, .vturb-container vturb-smartplayer {
            display: block !important;
            width: 100% !important;
            min-height: 400px;
            border-radius: 8px;
          }
        `,
        }}
      />
      <div className="relative w-full max-w-6xl mx-4 h-full flex flex-col justify-center">
        {/* Botão fechar no canto superior direito */}
        <button
          onClick={onVideoEnd}
          className="absolute top-4 right-4 z-30 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-all duration-300"
          title="Fechar VSL (ESC)"
        >
          ×
        </button>

        {/* Header do modal */}
        <div className="mb-4 text-center relative z-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🎥 Assista ao Vídeo Completo
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Descubra como limpar seu nome de forma definitiva
          </p>
        </div>

        {/* Player VTurb */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl flex-1 max-h-[70vh] vturb-container">
          {/* Aqui entra o smartplayer custom element */}
          <div ref={playerRef} style={{ width: "100%" }} />
        </div>
      </div>

      {/* Instruções principais */}
      <div className="mt-4 text-center relative z-20">
        {videoEnded && (
          <div className="text-green-400 text-lg bg-green-900/20 p-3 rounded-lg">
            ✅ Vídeo concluído! Agora você pode prosseguir.
          </div>
        )}
      </div>

      {/* Botão para fechar (só aparece após vídeo terminar) */}
      {videoEnded && (
        <div className="mt-6 text-center relative z-20 space-y-4">
          {/* CTA principal para abrir formulário */}
          <button
            onClick={() => onOpenForm && onOpenForm()}
            className="bg-[#FF6A00] hover:bg-[#00B5BF] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg shadow-xl"
          >
            🎯 QUERO MINHA OFERTA AGORA!
          </button>

          {/* Botão secundário para continuar sem formulário */}
          <div>
            <button
              onClick={onVideoEnd}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 text-sm"
            >
              Continuar navegando →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
