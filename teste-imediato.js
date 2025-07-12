// 🚨 TESTE IMEDIATO - VSL DEVE ABRIR EM 2 SEGUNDOS

console.log('🧪 TESTE ATIVADO - MONITORANDO VSL...');
console.log('');
console.log('📋 CHECKLIST:');
console.log('1. ✅ Página carregada');
console.log('2. ⏱️ Aguardando 2 segundos...');
console.log('3. 🎯 VSL deve abrir automaticamente');
console.log('');

// Contador visual
let segundos = 0;
const contador = setInterval(() => {
  segundos++;
  console.log(`⏰ ${segundos} segundo(s) decorrido(s)...`);
  
  if (segundos >= 3) {
    clearInterval(contador);
    
    // Verificar se VSL abriu
    const modal = document.querySelector('[data-vsl-modal]');
    if (modal && modal.style.display !== 'none') {
      console.log('✅ SUCCESS: VSL ABRIU CORRETAMENTE!');
      console.log('🎉 O problema foi resolvido!');
    } else {
      console.log('❌ PROBLEMA: VSL NÃO ABRIU');
      console.log('🔧 Clique no botão vermelho "FORÇAR VSL" no canto superior direito');
    }
  }
}, 1000);

// Limpeza preventiva
localStorage.clear();
console.log('🧹 localStorage limpo completamente');
