import VideoThumb from "@/public/images/homem-preocupado.png";
import ModalVideo from "@/components/modal-video";

const whatsappNumber = "+557581158083";
const whatsappMessage = encodeURIComponent(
  "Olá! Tenho interesse em limpar meu nome."
);
const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /[^\d]/g,
  ""
)}/?text=${whatsappMessage}`;

export default function HeroHome() {
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
              Limpar Seu Nome Nunca Foi Tão Fácil:
              Apenas R$3,30/dia Para Mudar de Vida!
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Não adie sua felicidade: limpe seu nome e volte a sonhar pagando pouco por dia
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                {/* BOTÃO CONTRATAR JÁ */}
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
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>

                {/* BOTÃO QUERO ENTENDER */}
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

          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="Homem preocupado"
            video="/videos/vsl-clube.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}