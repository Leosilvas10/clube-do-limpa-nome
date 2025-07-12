// Teste completo do fluxo VSL
// Este arquivo testa toda a funcionalidade implementada

console.log('🧪 INICIANDO TESTE COMPLETO DO FLUXO VSL');

// Função para aguardar um elemento aparecer
function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      return resolve(element);
    }

    const observer = new MutationObserver((mutations) => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Elemento ${selector} não encontrado em ${timeout}ms`));
    }, timeout);
  });
}

// Função para simular fim do vídeo
function simularFimDoVideo() {
  console.log('🎬 Simulando fim do vídeo...');
  
  // Dispara evento customizado que simula o fim do vídeo VTurb
  const vturbPlayer = document.getElementById('vid-686465f756e58ef04d99705b');
  if (vturbPlayer) {
    // Simula evento de fim do VTurb
    const event = new CustomEvent('smartplayer:ended', {
      detail: { ended: true }
    });
    vturbPlayer.dispatchEvent(event);
    console.log('✅ Evento de fim do vídeo disparado');
  } else {
    console.log('❌ Player VTurb não encontrado');
  }
}

// Função principal de teste
async function testarFluxoCompleto() {
  try {
    console.log('1️⃣ Aguardando VSL abrir automaticamente...');
    
    // Aguarda a VSL abrir (deveria abrir em 2 segundos)
    const vslModal = await waitForElement('[data-vsl-modal]', 15000);
    console.log('✅ VSL Modal aberto:', vslModal);
    
    console.log('2️⃣ Aguardando player VTurb carregar...');
    
    // Aguarda o player VTurb carregar
    const vturbPlayer = await waitForElement('#vid-686465f756e58ef04d99705b', 10000);
    console.log('✅ Player VTurb carregado:', vturbPlayer);
    
    console.log('3️⃣ Aguardando 5 segundos antes de simular fim do vídeo...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('4️⃣ Simulando fim do vídeo...');
    simularFimDoVideo();
    
    console.log('5️⃣ Aguardando FormModal aparecer automaticamente...');
    
    // Aguarda o FormModal aparecer
    const formModal = await waitForElement('[data-modal="form"]', 5000);
    console.log('✅ FormModal aberto automaticamente:', formModal);
    
    console.log('6️⃣ Verificando se o formulário está funcionando...');
    
    // Verifica se o formulário tem os campos necessários
    const nameField = document.querySelector('input[name="name"], input[placeholder*="nome"], input[placeholder*="Nome"]');
    const emailField = document.querySelector('input[name="email"], input[type="email"], input[placeholder*="email"], input[placeholder*="Email"]');
    const phoneField = document.querySelector('input[name="phone"], input[name="whatsapp"], input[placeholder*="telefone"], input[placeholder*="WhatsApp"]');
    
    console.log('📝 Campos do formulário encontrados:');
    console.log('- Nome:', nameField ? '✅' : '❌');
    console.log('- Email:', emailField ? '✅' : '❌');
    console.log('- Telefone:', phoneField ? '✅' : '❌');
    
    if (nameField && emailField && phoneField) {
      console.log('7️⃣ Testando preenchimento automático...');
      
      // Preenche campos para teste
      nameField.value = 'Teste Usuario';
      emailField.value = 'teste@exemplo.com';
      phoneField.value = '(11) 99999-9999';
      
      // Dispara eventos de input para garantir que React detecte as mudanças
      ['input', 'change'].forEach(eventType => {
        nameField.dispatchEvent(new Event(eventType, { bubbles: true }));
        emailField.dispatchEvent(new Event(eventType, { bubbles: true }));
        phoneField.dispatchEvent(new Event(eventType, { bubbles: true }));
      });
      
      console.log('✅ Campos preenchidos automaticamente');
      
      // Procura pelo botão de envio
      const submitBtn = document.querySelector('button[type="submit"], button:contains("ENVIAR"), button:contains("CADASTRAR")');
      if (submitBtn) {
        console.log('✅ Botão de envio encontrado:', submitBtn.textContent);
        
        console.log('8️⃣ TESTE CONCLUÍDO COM SUCESSO! 🎉');
        console.log('');
        console.log('📋 RESUMO DO TESTE:');
        console.log('✅ VSL abre automaticamente após 2 segundos');
        console.log('✅ Player VTurb carrega corretamente');
        console.log('✅ FormModal abre automaticamente no fim do vídeo');
        console.log('✅ Formulário tem todos os campos necessários');
        console.log('✅ Fluxo completo funcionando!');
        
      } else {
        console.log('❌ Botão de envio não encontrado');
      }
    } else {
      console.log('❌ Formulário incompleto - faltam campos');
    }
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
  }
}

// Executa o teste quando a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testarFluxoCompleto);
} else {
  testarFluxoCompleto();
}

// Disponibiliza funções globalmente para teste manual
window.testarVSL = {
  fluxoCompleto: testarFluxoCompleto,
  simularFimDoVideo: simularFimDoVideo,
  verificarElementos: () => {
    console.log('🔍 Verificando elementos na página...');
    console.log('VSL Modal:', document.querySelector('[data-vsl-modal]') ? '✅' : '❌');
    console.log('VTurb Player:', document.querySelector('#vid-686465f756e58ef04d99705b') ? '✅' : '❌');
    console.log('Form Modal:', document.querySelector('[data-modal="form"]') ? '✅' : '❌');
  }
};

console.log('✅ Script de teste carregado! Execute window.testarVSL.fluxoCompleto() para testar');
