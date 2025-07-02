// 🚨 FORÇA RECARREGAMENTO DO PLAYER VTURB

console.log('🔄 FORÇANDO RECARREGAMENTO DO PLAYER VTURB...');

// 1. Limpar tudo relacionado ao VTurb
const container = document.getElementById('vsl-vturb-container');
if (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  console.log('🧹 Container limpo');
}

// 2. Remover script antigo
const oldScript = document.getElementById('vturb-script');
if (oldScript) {
  oldScript.remove();
  console.log('🗑️ Script antigo removido');
}

// 3. Recriar player
if (container) {
  // Criar elemento do player
  const player = document.createElement('vturb-smartplayer');
  player.id = 'vid-686465f756e58ef04d99705b';
  player.style.display = 'block';
  player.style.margin = '0 auto';
  player.style.width = '100%';
  player.setAttribute('data-start-at', '0');
  
  container.appendChild(player);
  console.log('✅ Player criado:', player.id);
  
  // Adicionar script
  const script = document.createElement('script');
  script.src = 'https://scripts.converteai.net/373f60ba-0f5e-4a3d-9d10-14b049d4eb9b/players/686465f756e58ef04d99705b/v4/player.js';
  script.async = true;
  script.id = 'vturb-script';
  script.onload = () => {
    console.log('✅ Script carregado com sucesso!');
    
    // Aguardar player inicializar
    setTimeout(() => {
      const loadedPlayer = document.getElementById('vid-686465f756e58ef04d99705b');
      if (loadedPlayer) {
        console.log('✅ Player inicializado!');
        
        // Verificar se tem vídeo
        const video = loadedPlayer.querySelector('video');
        if (video) {
          console.log('✅ VÍDEO CARREGADO COM SUCESSO!');
          console.log('🎯 Player funcionando corretamente');
        } else {
          console.log('⚠️ Vídeo ainda não encontrado, aguardando...');
        }
      }
    }, 2000);
  };
  
  script.onerror = () => {
    console.log('❌ ERRO ao carregar script VTurb');
    console.log('🌐 Verificar conectividade de internet');
    console.log('🔗 Verificar se URL do script está correta');
  };
  
  document.head.appendChild(script);
  console.log('📜 Script adicionado ao head');
} else {
  console.log('❌ Container não encontrado');
}

console.log('⏱️ Aguardando carregamento...');
