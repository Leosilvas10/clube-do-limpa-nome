// 🚨 DEBUG VSL NÃO ABRE - SOLUÇÃO RÁPIDA

console.log('🔍 INVESTIGANDO POR QUE VSL NÃO ABRE...');

// 1. Verificar localStorage
const vslCompleted = localStorage.getItem('vsl_completed');
console.log('📦 localStorage vsl_completed:', vslCompleted);

if (vslCompleted === 'true') {
  console.log('❌ PROBLEMA ENCONTRADO: VSL marcada como já vista');
  console.log('🔧 LIMPANDO localStorage...');
  
  // Limpar todas as chaves relacionadas
  localStorage.removeItem('vsl_completed');
  localStorage.removeItem('vsl_viewed');
  localStorage.removeItem('modal_shown');
  
  // Limpar também chaves do Vturb
  Object.keys(localStorage)
    .filter(k => k.includes('vturb') || k.includes('converteai') || k.includes('vsl'))
    .forEach(k => {
      console.log('🗑️ Removendo:', k);
      localStorage.removeItem(k);
    });
    
  console.log('✅ localStorage limpo!');
} else {
  console.log('✅ localStorage está correto');
}

// 2. Verificar se o componente VSL está presente
const vslModal = document.querySelector('[data-vsl-modal]');
if (vslModal) {
  console.log('✅ Componente VSL Modal encontrado na página');
  console.log('👁️ Visível:', getComputedStyle(vslModal).display !== 'none');
} else {
  console.log('❌ Componente VSL Modal NÃO encontrado');
}

// 3. Verificar timers ativos
console.log('⏱️ Verificando timers...');

// 4. Forçar abertura da VSL (método direto)
console.log('🚀 FORÇANDO ABERTURA DA VSL...');

// Método 1: Disparar evento customizado
try {
  const openVSLEvent = new CustomEvent('force-open-vsl');
  window.dispatchEvent(openVSLEvent);
  console.log('✅ Evento force-open-vsl disparado');
} catch (e) {
  console.log('❌ Erro ao disparar evento:', e);
}

// Método 2: Manipular DOM diretamente
setTimeout(() => {
  // Procurar por modal hidden e mostrar
  const hiddenModals = document.querySelectorAll('[class*="hidden"], [style*="display: none"]');
  hiddenModals.forEach(modal => {
    if (modal.textContent?.includes('Assista ao Vídeo') || modal.textContent?.includes('VSL')) {
      console.log('🎯 Modal VSL encontrado, forçando exibição...');
      modal.style.display = 'flex';
      modal.classList.remove('hidden');
    }
  });
}, 1000);

// 5. Recarregar página após limpeza
console.log('🔄 Recarregando página em 3 segundos...');
setTimeout(() => {
  location.reload();
}, 3000);
