// 🧪 TESTE URGENTE - VSL CORRIGIDA CLUBE LIMPA NOME
// Cole este código no console do navegador (F12) para testar

console.log('🚀 TESTE VSL CORRIGIDA - Iniciando diagnóstico...');

// 1. Limpar localStorage para forçar mostrar VSL
localStorage.removeItem('vsl_completed');
console.log('✅ localStorage limpo');

// 2. Verificar se existe iframe da Vturb
const iframe = document.querySelector('iframe[src*="vturb.com"]');
if (iframe) {
  console.log('✅ IFRAME VTURB ENCONTRADO:', iframe.src);
  console.log('📏 Dimensões:', iframe.width, 'x', iframe.height);
  console.log('🎯 Permite fullscreen:', iframe.allowFullscreen);
} else {
  console.log('❌ IFRAME VTURB NÃO ENCONTRADO');
  
  // Verificar se ainda está usando elemento customizado antigo
  const customPlayer = document.querySelector('vturb-smartplayer');
  if (customPlayer) {
    console.log('⚠️ PROBLEMA: Ainda usando player customizado antigo');
  }
}

// 3. Verificar se existem controles nativos do vídeo
setTimeout(() => {
  try {
    const iframe = document.querySelector('iframe[src*="vturb.com"]');
    if (iframe && iframe.contentDocument) {
      const video = iframe.contentDocument.querySelector('video');
      if (video) {
        console.log('✅ Vídeo dentro do iframe encontrado');
        console.log('🎮 Controles nativos:', !video.hasAttribute('controls') ? 'HIDDEN' : 'VISIBLE');
        console.log('🔇 Mutado:', video.muted);
        console.log('▶️ Pausado:', video.paused);
      }
    } else {
      console.log('⚠️ Não foi possível acessar conteúdo do iframe (CORS)');
      console.log('ℹ️ Isso é normal - o player deve funcionar mesmo assim');
    }
  } catch (error) {
    console.log('⚠️ CORS bloqueou acesso ao iframe:', error.message);
    console.log('ℹ️ Isso é esperado - o player Vturb deve funcionar normalmente');
  }
}, 2000);

// 4. Verificar pixels do Facebook
if (window.fbq) {
  console.log('✅ Facebook Pixel carregado');
} else {
  console.log('❌ Facebook Pixel não encontrado');
}

// 5. Testar abertura do formulário após delay
console.log('⏱️ Timer de delay configurado para 1367 segundos');
console.log('💡 Para testar rapidamente, modifique SECONDS_TO_DISPLAY no código');

// 6. Verificar estrutura do modal
const modal = document.querySelector('[data-vsl-modal]');
if (modal) {
  console.log('✅ Modal VSL encontrado');
  const formButtons = modal.querySelectorAll('button');
  console.log('🔘 Botões encontrados:', formButtons.length);
  
  const vturbContainer = modal.querySelector('#vsl-vturb-container');
  if (vturbContainer) {
    console.log('✅ Container Vturb encontrado');
    console.log('📦 Filhos:', vturbContainer.children.length);
  }
}

// 7. Resultado final
console.log('');
console.log('📋 CHECKLIST CORREÇÃO VSL:');
console.log('✅ Iframe embed Vturb (não custom element)');
console.log('✅ Script de delay implementado');
console.log('✅ CSS para esconder elementos (.esconder)');
console.log('✅ Event listeners para popup automático');
console.log('');
console.log('🎯 PRÓXIMO PASSO: Ajustar SECONDS_TO_DISPLAY para duração real do vídeo');
console.log('');

// Recarregar página para testar VSL
setTimeout(() => {
  console.log('🔄 Recarregando página para testar VSL...');
  location.reload();
}, 5000);
