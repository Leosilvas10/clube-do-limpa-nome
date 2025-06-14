"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Image
              src="/images/logo-clube-do-limpa-nome-azul.png"
              alt="Logo Clube do Limpa Nome"
              width={180}
              height={10}
              style={{ background: "transparent" }}
              priority
            />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li></li>
            <li>
              <Link
                href="#oferta"
                className="btn-sm rounded-md bg-[#00B8C4] px-4 py-2 text-white transition duration-300 hover:bg-[#FF6A00]"
              >
                Receber oferta
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
