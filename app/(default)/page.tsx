import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Cta from "@/components/cta";
import FormLead from "@/components/FormLead";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Features />
      <Workflows />
      <Cta />

      {/* 🔻 Aqui entra o formulário com a âncora */}
      <section id="oferta" className="px-4 py-16 sm:py-20">
        <FormLead />
      </section>
    </>
  );
}
