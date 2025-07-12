"use client";

import { useState, useEffect } from "react";
import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Cta from "@/components/cta";
import FormModal from "@/components/FormModal";
import ExitIntentLeadForm from "@/components/ExitIntentLeadForm";
import Faq from "@/components/Faq";
import VSLModal from "@/components/VSLModal";

export default function Home() {
  const [showVSL, setShowVSL] = useState(false);
  const [vslCompleted, setVslCompleted] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    // Remove o forçar modal aberto
    // Escuta evento global para abrir o modal de qualquer lugar
    const openModal = () => setShowFormModal(true);
    window.addEventListener("open-lead-modal", openModal);
    return () => window.removeEventListener("open-lead-modal", openModal);
  }, []);

  useEffect(() => {
    // Verifica se o usuário já viu o VSL
    const hasSeenVSL = localStorage.getItem('vsl_completed') === 'true';
    
    if (!hasSeenVSL) {
      // Mostra o VSL após 2 segundos da página carregar
      const timer = setTimeout(() => {
        setShowVSL(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setVslCompleted(true);
    }
  }, []);

  const handleVSLEnd = () => {
    console.log('🏁 handleVSLEnd chamado na página principal!');
    setShowVSL(false);
    setVslCompleted(true);
    localStorage.setItem('vsl_completed', 'true');
    console.log('📝 Abrindo modal do formulário...');
    setShowFormModal(true); // Abre o modal automaticamente ao finalizar a VSL
  };
  
  const handleVSLFormOpen = () => {
    // Abre o formulário diretamente do VSL
    setShowFormModal(true);
  };

  const handleCTAClick = () => {
    setShowFormModal(true);
  };

  return (
    <>
      {/* VSL Modal */}
      <VSLModal 
        isOpen={showVSL} 
        onVideoEnd={handleVSLEnd}
        onOpenForm={handleVSLFormOpen}
      />
      
      {/* Form Modal */}
      <FormModal 
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
      />
      
      {/* Exit Intent só aparece após VSL */}
      {vslCompleted && <ExitIntentLeadForm />}
      
      <PageIllustration />
      <Hero onReplayVSL={() => setShowVSL(true)} onCTAClick={handleCTAClick} />
      <Features onCTAClick={handleCTAClick} />
      <Workflows onCTAClick={handleCTAClick} />
      <Faq onCTAClick={handleCTAClick} />
      <Cta onCTAClick={handleCTAClick} />
    </>
  );
}
