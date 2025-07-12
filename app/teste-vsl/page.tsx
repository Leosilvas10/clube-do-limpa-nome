"use client";

import { useState } from "react";
import VSLModal from "@/components/VSLModal";
import FormModal from "@/components/FormModal";

export default function TesteVSL() {
  const [showVSL, setShowVSL] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);

  const handleVSLEnd = () => {
    console.log('🏁 handleVSLEnd chamado na página de teste!');
    setShowVSL(false);
    console.log('📝 Abrindo modal do formulário...');
    setShowFormModal(true);
  };
  
  const handleVSLFormOpen = () => {
    setShowFormModal(true);
  };

  const resetTest = () => {
    setShowVSL(true);
    setShowFormModal(false);
    localStorage.removeItem('vsl_completed');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <VSLModal 
        isOpen={showVSL} 
        onVideoEnd={handleVSLEnd}
        onOpenForm={handleVSLFormOpen}
      />
      
      <FormModal 
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Teste VSL Modal</h1>
        
        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Status Atual</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>VSL Modal:</strong> {showVSL ? '✅ Aberto' : '❌ Fechado'}
              </div>
              <div>
                <strong>Form Modal:</strong> {showFormModal ? '✅ Aberto' : '❌ Fechado'}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Controles de Teste</h2>
            <div className="space-x-4">
              <button
                onClick={() => setShowVSL(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Abrir VSL
              </button>
              <button
                onClick={() => setShowFormModal(true)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Abrir Formulário
              </button>
              <button
                onClick={resetTest}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Reset Teste
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Instruções de Teste</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Abra o console do navegador (F12)</li>
              <li>Clique em "Abrir VSL" para abrir o modal do vídeo</li>
              <li>Observe os logs no console sobre a detecção do player</li>
              <li>Use o botão "TESTE: Simular Fim" para simular o fim do vídeo</li>
              <li>Verifique se o modal do formulário abre automaticamente</li>
              <li>Teste também assistindo o vídeo até o final naturalmente</li>
            </ol>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
            <div className="text-sm text-gray-300">
              <p>Use o console do navegador para ver logs detalhados da detecção do player VTurb.</p>
              <p>Procure por mensagens que começam com emojis como 🔍, ✅, 🎬, 🎯, etc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
