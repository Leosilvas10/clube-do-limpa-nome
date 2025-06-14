import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";

const whatsappNumber = "+557581158083";
const whatsappMessage = encodeURIComponent(
  "Olá! Tenho interesse em limpar meu nome."
);
const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /[^\d]/g,
  ""
)}/?text=${whatsappMessage}`;

export default function Cta() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-linear-to-r from-transparent via-gray-800/50 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-8 font-nacelle text-3xl font-semibold text-transparent md:text-4xl"
              data-aos="fade-up"
            >
              Chegou a hora de limpar seu nome e recuperar sua liberdade!
            </h2>

            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              {/* Botão Primário atualizado */}
              <div data-aos="fade-up" data-aos-delay={400}>
                <a
                  className="btn group mb-4 w-full rounded-md bg-[#00B5BF] px-6 py-2 text-center text-[#F4F4F4] transition duration-300 hover:bg-[#FF6A00] hover:text-white sm:mb-0 sm:w-auto"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-flex items-center">
                    contratar já
                    <span className="ml-1 tracking-normal transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </a>
              </div>

              {/* Botão Secundário mantido */}
              <div data-aos="fade-up" data-aos-delay={600}>
                <a
                  className="btn relative w-full flex items-center rounded-md bg-gradient-to-b from-gray-800 to-gray-800/60 px-6 py-2 text-[#F4F4F4] transition duration-300 hover:bg-[#00394D] hover:text-white sm:ml-4 sm:w-auto"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contratar Cota
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}