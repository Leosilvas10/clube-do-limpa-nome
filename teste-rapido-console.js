// SCRIPT DE TESTE RÁPIDO - Cole no console do navegador
console.log('🧪 INICIANDO TESTE RÁPIDO DA VSL');

// Função para verificar estado atual
function verificarEstado() {
  console.log('=== ESTADO ATUAL ===');
  console.log('VSL Modal:', document.querySelector('[data-vsl-modal]') ? '✅ ABERTO' : '❌ FECHADO');
  console.log('VTurb Player:', document.querySelector('#vid-686465f756e58ef04d99705b') ? '✅ ENCONTRADO' : '❌ NÃO ENCONTRADO');
  console.log('Form Modal:', document.querySelector('[data-modal="form"]') ? '✅ ABERTO' : '❌ FECHADO');
  
  // Verifica se os elementos estão visíveis
  const vslModal = document.querySelector('[data-vsl-modal]');
  const formModal = document.querySelector('[data-modal="form"]');
  
  if (vslModal) {
    const style = window.getComputedStyle(vslModal);
    console.log('VSL Modal visível:', style.display !== 'none' && style.visibility !== 'hidden' ? '✅ SIM' : '❌ NÃO');
  }
  
  if (formModal) {
    const style = window.getComputedStyle(formModal);
    console.log('Form Modal visível:', style.display !== 'none' && style.visibility !== 'hidden' ? '✅ SIM' : '❌ NÃO');
  }
}

// Função para simular fim do vídeo (múltiplos métodos)
function simularFimVideo() {
  console.log('🎬 Simulando fim do vídeo com TODOS os métodos...');
  
  const vturbPlayer = document.getElementById('vid-686465f756e58ef04d99705b');
  
  if (vturbPlayer) {
    // Método 1: Evento DOM customizado
    console.log('📡 Disparando evento smartplayer:ended...');
    vturbPlayer.dispatchEvent(new CustomEvent('smartplayer:ended', { detail: { ended: true } }));
    
    // Método 2: PostMessage
    console.log('📬 Enviando postMessage...');
    window.postMessage({ type: 'smartplayer:ended', event: 'ended' }, '*');
    
    // Método 3: Se SmartPlayer API existir
    if (window.SmartPlayer && window.SmartPlayer.instances) {
      const instance = window.SmartPlayer.instances['vid-686465f756e58ef04d99705b'];
      if (instance && instance.trigger) {
        console.log('🎯 Disparando via SmartPlayer API...');
        try {
          instance.trigger('ended');
        } catch (e) {
          console.log('❌ Erro na API:', e);
        }
      }
    }
    
    console.log('✅ Todos os métodos de fim de vídeo executados!');
  } else {
    console.log('❌ Player VTurb não encontrado!');
  }
}

// Função para forçar popup
function forcarPopup() {
  console.log('🎯 Forçando abertura do popup...');
  
  // Dispara evento global que a página escuta
  const event = new CustomEvent('open-lead-modal');
  window.dispatchEvent(event);
  
  // Tenta acessar React diretamente (hack)
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    if (btn.textContent && btn.textContent.includes('TESTAR: Forçar Popup')) {
      console.log('🔘 Clicando no botão de teste...');
      btn.click();
    }
  });
}

// Função para verificar logs de React
function verificarLogs() {
  console.log('📋 Verificando logs recentes...');
  // Os logs já devem aparecer no console naturalmente
}

// Executar verificação inicial
verificarEstado();

// Disponibilizar funções globalmente
window.testeVSL = {
  verificarEstado,
  simularFimVideo,
  forcarPopup,
  verificarLogs,
  
  // Ação completa de teste
  testeCompleto: () => {
    console.log('🚀 EXECUTANDO TESTE COMPLETO...');
    verificarEstado();
    setTimeout(() => {
      console.log('⏰ Aguardando 2 segundos...');
      simularFimVideo();
      setTimeout(() => {
        console.log('⏰ Aguardando 1 segundo...');
        verificarEstado();
        if (!document.querySelector('[data-modal="form"]')) {
          console.log('❌ Popup não apareceu, tentando forçar...');
          forcarPopup();
        }
      }, 1000);
    }, 2000);
  }
};

console.log('✅ Funções de teste carregadas!');
console.log('📝 Use: window.testeVSL.testeCompleto() para teste automático');
console.log('📝 Use: window.testeVSL.simularFimVideo() para simular fim do vídeo');
console.log('📝 Use: window.testeVSL.verificarEstado() para ver estado atual');
console.log('📝 Use: window.testeVSL.forcarPopup() para forçar popup');

// Auto-executa teste em 3 segundos
setTimeout(() => {
  console.log('🔄 Auto-executando teste completo...');
  window.testeVSL.testeCompleto();
}, 3000);
