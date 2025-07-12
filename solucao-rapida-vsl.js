// 🚨 SOLUÇÃO RÁPIDA - VSL NÃO ABRE AUTOMATICAMENTE

console.log('🚀 EXECUTANDO SOLUÇÃO RÁPIDA PARA VSL...');

// 1. LIMPAR COMPLETAMENTE O LOCALSTORAGE
console.log('🧹 Limpando localStorage...');
localStorage.clear();

// 2. VERIFICAR SE EXISTE FUNÇÃO DE ABERTURA
if (window.forceOpenVSL && typeof window.forceOpenVSL === 'function') {
  console.log('✅ Função forceOpenVSL encontrada, executando...');
  window.forceOpenVSL();
} else {
  console.log('⚠️ Função forceOpenVSL não encontrada, tentando método alternativo...');
}

// 3. MÉTODO ALTERNATIVO - DISPARAR EVENTO
try {
  // Encontrar botão de debug se existir
  const debugButton = Array.from(document.querySelectorAll('button')).find(btn => 
    btn.textContent.includes('FORÇAR VSL')
  );
  
  if (debugButton) {
    console.log('🔘 Clicando no botão de debug...');
    debugButton.click();
  } else {
    console.log('❌ Botão de debug não encontrado');
  }
} catch (e) {
  console.log('❌ Erro ao clicar no botão:', e);
}

// 4. MÉTODO DIRETO - MANIPULAR ESTADO DO REACT
setTimeout(() => {
  // Procurar elemento do modal e forçar exibição
  const modals = document.querySelectorAll('[data-vsl-modal]');
  if (modals.length > 0) {
    console.log('🎯 Modal VSL encontrado, forçando exibição...');
    modals.forEach(modal => {
      modal.style.display = 'flex';
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
      modal.classList.remove('hidden');
    });
  } else {
    console.log('❌ Modal VSL não encontrado no DOM');
  }
}, 1000);

// 5. VERIFICAR CONSOLE PARA LOGS DE DEBUG
console.log('📋 CHECKLIST DE VERIFICAÇÃO:');
console.log('1. Abra as Ferramentas do Desenvolvedor (F12)');
console.log('2. Vá na aba Console');
console.log('3. Procure por logs que começam com "🔍 DEBUG"');
console.log('4. Se não encontrar logs, há problema no código React');
console.log('5. Se encontrar "VSL já foi vista", o localStorage estava sujo');

// 6. RECARREGAR PÁGINA APÓS 3 SEGUNDOS
console.log('🔄 Recarregando página em 3 segundos...');
setTimeout(() => {
  location.reload();
}, 3000);
