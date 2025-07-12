"use client";

import { useState, useEffect } from "react";

interface VSLModalProps {
  isOpen: boolean;
  onVideoEnd: () => void;
  onOpenForm?: () => void;
}

export default function VSLModal({ isOpen, onVideoEnd, onOpenForm }: VSLModalProps) {
  const [videoEnded, setVideoEnded] = useState(false);

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

  // Listener para detectar fim do vídeo via postMessage
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
          .vturb-container iframe {
            border: none !important;
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
          <div
            id="ifr_687265fd54bc1a7af7bd9d83_wrapper"
            style={{ margin: "0 auto", width: "100%" }}
          >
            <div
              style={{ padding: "56.25% 0 0 0", position: "relative" }}
              id="ifr_687265fd54bc1a7af7bd9d83_aspect"
            >
              <iframe
                frameBorder="0"
                allowFullScreen
                src="about:blank"
                id="ifr_687265fd54bc1a7af7bd9d83"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                referrerPolicy="origin"
                onLoad={function (this: HTMLIFrameElement) {
                  this.onload = null;
                  this.src =
                    "https://scripts.converteai.net/373f60ba-0f5e-4a3d-9d10-14b049d4eb9b/players/687265fd54bc1a7af7bd9d83/v4/embed.html" +
                    (window.location.search || "?") +
                    "&vl=" +
                    encodeURIComponent(window.location.href);
                }}
                title="VSL"
              />
            </div>
          </div>
          {/* SDK Script VTurb */}
          <script
            id="vturb-sdk-script"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                if (!document.getElementById('vturb-sdk-script-loaded')) {
                  var s=document.createElement("script");
                  s.id="vturb-sdk-script-loaded";
                  s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
                  s.async=true;
                  document.head.appendChild(s);
                }
              `,
            }}
          />
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