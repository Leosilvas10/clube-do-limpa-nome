import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Cta from "@/components/cta";
import FormLead from "@/components/FormLead";
import ExitIntentLeadForm from "@/components/ExitIntentLeadForm";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <>
      <ExitIntentLeadForm />
      <PageIllustration />
      <Hero />
      <Features />
      <Workflows />
      <Faq />
      <Cta />
      {/* 🔻 Formulário com padding ajustado */}
      <section id="oferta" className="px-4 py-8 sm:py-10">
        <FormLead />
      </section>
      {/* NÃO coloque <Footer /> aqui! */}
    </>
  );
}
