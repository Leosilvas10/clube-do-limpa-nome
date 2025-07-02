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

  // Debug: Log mudanças de estado
  useEffect(() => {
    console.log('🔍 DEBUG - showVSL mudou para:', showVSL);
  }, [showVSL]);

  useEffect(() => {
    console.log('🔍 DEBUG - vslCompleted mudou para:', vslCompleted);
  }, [vslCompleted]);

  useEffect(() => {
    // Remove o forçar modal aberto
    // Escuta evento global para abrir o modal de qualquer lugar
    const openModal = () => setShowFormModal(true);
    window.addEventListener("open-lead-modal", openModal);
    return () => window.removeEventListener("open-lead-modal", openModal);
  }, []);

  useEffect(() => {
    // 🚨 CORREÇÃO URGENTE: FORÇA VSL A ABRIR SEMPRE APÓS 2 SEGUNDOS
    console.log('🚀 INICIANDO TIMER DE 2 SEGUNDOS PARA VSL...');
    
    // LIMPA QUALQUER LOCALSTORAGE QUE POSSA ESTAR BLOQUEANDO
    localStorage.removeItem('vsl_completed');
    localStorage.removeItem('vsl_viewed');
    
    // FORÇA ABERTURA DA VSL APÓS 2 SEGUNDOS - SEM VERIFICAÇÕES
    const timer = setTimeout(() => {
      console.log('🚀 ABRINDO VSL AGORA - FORÇADO!');
      setShowVSL(true);
      setVslCompleted(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleVSLEnd = () => {
    setShowVSL(false);
    setVslCompleted(true);
    localStorage.setItem('vsl_completed', 'true');
    setShowFormModal(true); // Abre o modal automaticamente ao finalizar a VSL
  };
  
  const handleVSLFormOpen = () => {
    // Abre o formulário diretamente do VSL
    setShowFormModal(true);
  };

  const handleCTAClick = () => {
    setShowFormModal(true);
  };

  // Debug: Função para forçar abertura da VSL
  const forceOpenVSL = () => {
    console.log('🔧 DEBUG - Forçando abertura da VSL...');
    localStorage.removeItem('vsl_completed');
    setShowVSL(true);
    setVslCompleted(false);
  };

  return (
    <>
      {/* DEBUG: Botão para forçar VSL */}
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
        <button 
          onClick={forceOpenVSL}
          style={{ 
            background: 'red', 
            color: 'white', 
            padding: '10px', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          🚨 FORÇAR VSL
        </button>
      </div>

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

      <div className="flex flex-col min-h-screen overflow-hidden">
        {/* Site header */}
        {/* <Header /> */}

        {/* Page content */}
        <main className="grow">
          {/* Page illustration */}
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>

          {/* Page sections */}
          <Hero onCTAClick={handleCTAClick} showReassistirVSL={vslCompleted} onReassistirVSL={() => setShowVSL(true)} />
          <Workflows />
          <Features />
          <Faq />
          <Cta onCTAClick={handleCTAClick} />
        </main>

        {/* Site footer */}
        {/* <Footer /> */}
      </div>
    </>
  );
}
