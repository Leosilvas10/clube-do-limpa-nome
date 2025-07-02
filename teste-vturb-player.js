// 🎯 TESTE VTURB PLAYER - VERIFICAÇÃO COMPLETA

console.log('🧪 TESTANDO PLAYER VTURB...');

// 1. Verificar se script foi carregado
const script = document.getElementById('vturb-script');
if (script) {
  console.log('✅ Script VTurb encontrado:', script.src);
} else {
  console.log('❌ Script VTurb não encontrado');
}

// 2. Verificar se elemento player foi criado
const player = document.getElementById('vid-686465f756e58ef04d99705b');
if (player) {
  console.log('✅ Player VTurb encontrado:', player.tagName);
  console.log('📏 Dimensões:', player.style.width, player.style.height);
} else {
  console.log('❌ Player VTurb não encontrado');
}

// 3. Verificar se vídeo carregou dentro do player
setTimeout(() => {
  if (player) {
    // Procurar vídeo em diferentes locais
    let video = player.querySelector('video');
    
    if (!video && player.shadowRoot) {
      video = player.shadowRoot.querySelector('video');
      console.log('🔍 Procurando no Shadow DOM...');
    }
    
    if (!video) {
      const iframe = player.querySelector('iframe');
      if (iframe) {
        console.log('🔍 Iframe encontrado dentro do player');
        try {
          if (iframe.contentDocument) {
            video = iframe.contentDocument.querySelector('video');
          }
        } catch (e) {
          console.log('⚠️ CORS limitou acesso ao iframe');
        }
      }
    }
    
    if (video) {
      console.log('✅ VÍDEO ENCONTRADO!');
      console.log('📊 Propriedades do vídeo:');
      console.log('- src:', video.src || video.currentSrc);
      console.log('- duração:', video.duration);
      console.log('- largura:', video.videoWidth);
      console.log('- altura:', video.videoHeight);
      console.log('- controles:', video.controls);
      console.log('- muted:', video.muted);
    } else {
      console.log('❌ VÍDEO NÃO ENCONTRADO');
      console.log('🔧 Possíveis soluções:');
      console.log('1. Aguardar mais tempo para carregamento');
      console.log('2. Verificar se ID do vídeo está correto');
      console.log('3. Verificar conectividade com servidor VTurb');
    }
  }
}, 3000);

// 4. Verificar conectividade com servidor VTurb
fetch('https://scripts.converteai.net/373f60ba-0f5e-4a3d-9d10-14b049d4eb9b/players/686465f756e58ef04d99705b/v4/player.js')
  .then(response => {
    if (response.ok) {
      console.log('✅ Servidor VTurb respondendo corretamente');
    } else {
      console.log('❌ Servidor VTurb retornou erro:', response.status);
    }
  })
  .catch(error => {
    console.log('❌ Erro de conectividade com VTurb:', error);
  });

console.log('⏱️ Aguarde 3 segundos para verificação completa...');
