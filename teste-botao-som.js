// Teste para verificar se o botão de som do VSL está funcionando
// Execute este script no console do navegador com o VSL aberto

console.log('🧪 INICIANDO TESTE DO BOTÃO DE SOM VSL');

// Função para testar o botão de som
function testarBotaoSom() {
  const botaoSom = document.querySelector('[data-mute-button]');
  const video = document.querySelector('video');
  
  if (!botaoSom) {
    console.error('❌ Botão de som não encontrado!');
    return false;
  }
  
  if (!video) {
    console.error('❌ Vídeo não encontrado!');
    return false;
  }
  
  console.log('✅ Botão de som encontrado:', botaoSom);
  console.log('✅ Vídeo encontrado:', video);
  
  // Testa se o botão está visível
  const styles = window.getComputedStyle(botaoSom);
  const isVisible = styles.display !== 'none' && styles.visibility !== 'hidden' && styles.opacity !== '0';
  
  console.log('👁️ Botão visível:', isVisible);
  console.log('🎯 Z-index do botão:', styles.zIndex);
  console.log('👆 Pointer events:', styles.pointerEvents);
  
  // Testa se o botão está clicável
  const rect = botaoSom.getBoundingClientRect();
  const isInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
  
  console.log('📍 Posição do botão:', {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    inViewport: isInViewport
  });
  
  // Testa o estado do vídeo
  console.log('🔊 Vídeo mutado:', video.muted);
  console.log('▶️ Vídeo pausado:', video.paused);
  
  // Simula clique no botão
  console.log('🖱️ Simulando clique no botão...');
  const estadoAnterior = video.muted;
  
  try {
    botaoSom.click();
    
    setTimeout(() => {
      const estadoAtual = video.muted;
      const funcionou = estadoAnterior !== estadoAtual;
      
      console.log('📊 Resultado do teste:');
      console.log('  Estado anterior:', estadoAnterior ? 'Mutado' : 'Com som');
      console.log('  Estado atual:', estadoAtual ? 'Mutado' : 'Com som');
      console.log('  Botão funcionou:', funcionou ? '✅ SIM' : '❌ NÃO');
      
      if (funcionou) {
        console.log('🎉 TESTE PASSOU! O botão de som está funcionando corretamente.');
      } else {
        console.error('💥 TESTE FALHOU! O botão de som não está funcionando.');
      }
    }, 100);
    
  } catch (error) {
    console.error('💥 Erro ao clicar no botão:', error);
  }
  
  return true;
}

// Testa se existe algum elemento sobrepondo o botão
function testarSobreposicao() {
  const botaoSom = document.querySelector('[data-mute-button]');
  if (!botaoSom) return;
  
  const rect = botaoSom.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const elementoNoTopo = document.elementFromPoint(centerX, centerY);
  
  console.log('🎯 Elemento no centro do botão:', elementoNoTopo);
  console.log('🔍 É o próprio botão?', elementoNoTopo === botaoSom || botaoSom.contains(elementoNoTopo));
  
  if (elementoNoTopo !== botaoSom && !botaoSom.contains(elementoNoTopo)) {
    console.warn('⚠️ ATENÇÃO: Outro elemento pode estar cobrindo o botão!');
    console.log('🚫 Elemento sobrepondo:', elementoNoTopo);
  }
}

// Executa os testes
setTimeout(() => {
  testarBotaoSom();
  testarSobreposicao();
}, 1000);

console.log('📝 Para executar o teste manualmente, digite: testarBotaoSom()');
