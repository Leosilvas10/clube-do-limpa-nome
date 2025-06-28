// Teste do VSL - Cole este código no console do navegador (F12)

console.log('🧪 TESTE DO VSL - Iniciando...');

// Limpar localStorage para forçar mostrar VSL
localStorage.removeItem('vsl_completed');
console.log('✅ localStorage limpo');

// Verificar se existe o vídeo
const video = document.querySelector('video');
if (video) {
  console.log('✅ Vídeo encontrado:', video.src);
  console.log('📊 Duração:', video.duration);
  console.log('📍 Tempo atual:', video.currentTime);
  console.log('🔇 Mutado:', video.muted);
  console.log('▶️ Pausado:', video.paused);
} else {
  console.log('❌ Vídeo não encontrado');
}

// Verificar se existem pixels do Facebook
if (window.fbq) {
  console.log('✅ Facebook Pixel carregado');
} else {
  console.log('❌ Facebook Pixel não encontrado');
}

// Recarregar página para testar VSL
setTimeout(() => {
  console.log('🔄 Recarregando página em 3 segundos...');
  location.reload();
}, 3000);
