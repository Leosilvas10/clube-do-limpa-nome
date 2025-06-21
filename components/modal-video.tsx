"use client";

import { useState, useRef, useEffect } from "react";
import type { StaticImageData } from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import SecondaryIllustration from "@/public/images/secondary-illustration.svg";

interface ModalVideoProps {
  thumb: string | StaticImageData;
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  video: string;
  videoWidth: number;
  videoHeight: number;
}

export default function ModalVideo({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  video,
  videoWidth,
  videoHeight,
}: ModalVideoProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play o vídeo assim que o modal abrir
  useEffect(() => {
    if (modalOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      // Tenta dar play (com áudio) após interação do usuário
      videoRef.current.play().catch(() => {});
    }
  }, [modalOpen]);

  // Bloquear pausar, avançar, retroceder
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
  }, [modalOpen]);

  return (
    <div className="relative">
      {/* Aviso para ativar o som */}
      <div className="flex justify-center mb-4">
        <div className="bg-[#FF6A00]/10 border border-[#FF6A00] rounded px-4 py-2 text-[#FF6A00] text-sm font-semibold shadow-sm">
          ⚠️ Ative o som do seu dispositivo para ouvir o vídeo completo.
        </div>
      </div>

      {/* Secondary illustration */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -z-10 -ml-28 -translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      >
        <Image
          className="md:max-w-none"
          src={SecondaryIllustration}
          width={1165}
          height={1012}
          alt="Secondary illustration"
        />
      </div>

      {/* Video thumbnail */}
      <button
        className="group relative flex items-center justify-center rounded-2xl focus:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200"
        onClick={() => setModalOpen(true)}
        aria-label="Watch the video"
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <figure className="relative overflow-hidden rounded-2xl before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-gray-900 before:via-indigo-500/20 before:to-gray-900">
          <Image
            className="opacity-50 grayscale"
            src={thumb}
            width={thumbWidth}
            height={thumbHeight}
            priority
            alt={thumbAlt}
          />
        </figure>
        {/* Play icon */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-4 md:p-6 before:absolute before:inset-0 before:rounded-full before:bg-transparent">
          <span className="relative flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
              viewBox="0 0 48 48"
              fill="none"
              className="drop-shadow-md"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="#00B5BF"
                strokeWidth="4"
                fill="none"
              />
              <polygon points="20,16 34,24 20,32" fill="#00B5BF" />
            </svg>
            <span className="hidden sm:inline text-sm font-medium leading-tight text-gray-300">
              Clique aqui e veja o que ninguém nunca te contou sobre ter seu nome sujo
              <span className="text-gray-600"></span>
            </span>
          </span>
        </span>
      </button>
      {/* End: Video thumbnail */}

      <Dialog
        initialFocus={videoRef}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 z-99999 bg-black/70 transition-opacity duration-300 ease-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-99999 flex px-4 py-6 sm:px-6">
          <div className="mx-auto flex h-full max-w-6xl items-center">
            <DialogPanel
              transition
              className="aspect-video max-h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <video
                ref={videoRef}
                width={videoWidth}
                height={videoHeight}
                autoPlay
                playsInline
                tabIndex={-1}
                style={{ pointerEvents: "none", userSelect: "none" }}
                onContextMenu={(e) => e.preventDefault()}
                onPause={() => {
                  if (videoRef.current) videoRef.current.play();
                }}
                onSeeking={() => {
                  if (videoRef.current) videoRef.current.currentTime = 0;
                }}
              >
                <source src={video} type="video/mp4" />
                Seu navegador não suporta o vídeo.
              </video>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
