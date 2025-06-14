"use client";

import { useState, useRef, useEffect } from "react";
import type { StaticImageData } from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import SecondaryIllustration from "@/public/images/secondary-illustration.svg";

interface ModalVideoProps {
  thumb: string | StaticImageData; // <-- ajuste aqui
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  video: string;
  videoWidth: number;
  videoHeight: number;
}

const whatsappNumber = "+557581158083";
const whatsappMessage = encodeURIComponent(
  "Olá! Tenho interesse em limpar meu nome."
);
const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /[^\d]/g,
  ""
)}/?text=${whatsappMessage}`;

function formatTime(seconds: number) {
  const d = Math.floor(seconds / (24 * 60 * 60));
  const h = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${d.toString().padStart(2, "0")}d `
    + `${h.toString().padStart(2, "0")}:`
    + `${m.toString().padStart(2, "0")}:`
    + `${s.toString().padStart(2, "0")}`;
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

  // Timer de 30 dias em segundos
  const [timer, setTimer] = useState(30 * 24 * 60 * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (modalOpen && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    if (!modalOpen) {
      setTimer(30 * 24 * 60 * 60); // Reseta ao fechar o modal
    }
    return () => clearInterval(interval);
  }, [modalOpen, timer]);

  return (
    <div className="relative">
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
        onClick={() => {
          setModalOpen(true);
        }}
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
        <span className="pointer-events-none absolute p-2.5 before:absolute before:inset-0 before:rounded-full before:bg-gray-950 before:duration-300 group-hover:before:scale-110">
          <span className="relative flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
            >
              <path
                fill="url(#pla)"
                fillRule="evenodd"
                d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm3.5-10-5-3.5v7l5-3.5Z"
                clipRule="evenodd"
              />
              <defs>
                <linearGradient
                  id="pla"
                  x1={10}
                  x2={10}
                  y1={0}
                  y2={20}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6366F1" />
                  <stop offset={1} stopColor="#6366F1" stopOpacity=".72" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-medium leading-tight text-gray-300">
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
              className="aspect-video max-h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 flex flex-col items-center justify-center"
            >
              <video
                ref={videoRef}
                width={videoWidth}
                height={videoHeight}
                loop
                controls
              >
                <source src={video} type="video/mp4" />
                Seu navegador não suporta o vídeo.
              </video>

              {/* Oferta por tempo limitado e timer */}
              <div className="w-full flex flex-col items-center mt-8">
                <span className="text-[#FF6A00] font-bold text-lg uppercase mb-2 tracking-wide">
                  OFERTAS POR TEMPO LIMITADO
                </span>
                <span className="text-2xl font-mono font-bold text-[#00B5BF] mb-4">
                  {formatTime(timer)}
                </span>
                <a
                  className="btn group w-full max-w-xs rounded-md bg-[#00B5BF] px-6 py-2 text-center text-[#F4F4F4] font-semibold transition duration-300 hover:bg-[#FF6A00] hover:text-white"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-flex items-center justify-center">
                    Fale com um especialista no WhatsApp
                    <span className="ml-1 tracking-normal transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </a>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}