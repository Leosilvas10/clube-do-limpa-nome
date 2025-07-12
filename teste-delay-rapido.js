// 🚀 TESTE RÁPIDO - DELAY 30 SEGUNDOS PARA DEMO

// Cole este código no console do navegador para testar popup rápido
console.log('🧪 INICIANDO TESTE RÁPIDO - Popup em 30 segundos...');

// Força reset do VSL
localStorage.removeItem('vsl_completed');

// Substitui temporariamente o delay para 30 segundos
if (window) {
  window.onload = function () {
    console.log('⏱️ Timer de 30 segundos iniciado...');
    setTimeout(function () {
      console.log('🎯 POPUP DEVE APARECER AGORA!');
      
      // Dispara evento global para abrir formulário
      window.dispatchEvent(new CustomEvent('open-lead-modal'));
      
      // Ou tenta encontrar e executar função do modal
      const openModalEvent = new CustomEvent('open-lead-modal');
      window.dispatchEvent(openModalEvent);
      
      // Backup: tenta encontrar botão na tela
      const formButton = document.querySelector('button[class*="FF6A00"]');
      if (formButton) {
        console.log('✅ Botão encontrado, simulando clique...');
        formButton.click();
      }
      
    }, 30 * 1000); // 30 segundos
  };
}

console.log('✅ Teste configurado! Aguarde 30 segundos...');
console.log('🔄 Recarregando página em 3 segundos...');

setTimeout(() => {
  location.reload();
}, 3000);
