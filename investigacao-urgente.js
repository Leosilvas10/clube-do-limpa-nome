/**
 * INVESTIGAÇÃO URGENTE - POR QUE NÃO ESTÁ SALVANDO?
 * Cole no console e teste o formulário
 */

console.log('🚨 INVESTIGAÇÃO: POR QUE NÃO SALVA NA PLANILHA?');
console.log('=' .repeat(60));

// 1. Verificar se a função está sendo chamada
let originalSubmitFormData = null;

// Interceptar a função submitFormData
if (typeof window !== 'undefined') {
  // Procurar a função original
  const scripts = document.querySelectorAll('script');
  let foundFunction = false;
  
  // Interceptar imports
  const originalImport = window.import || (() => {});
  
  // Monitorar todas as chamadas de função
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const [url, options] = args;
    
    console.log('\n🌐 FETCH INTERCEPTADO:');
    console.log('📍 URL:', url);
    
    if (url && typeof url === 'string') {
      if (url.includes('hook.eu2.make.com')) {
        console.log('🎯 MAKE.COM DETECTADO!');
        if (options && options.body) {
          console.log('📦 Dados para Make.com:', options.body);
        }
      }
      
      if (url.includes('script.google.com')) {
        console.log('🎯 GOOGLE APPS SCRIPT DETECTADO!');
        if (options && options.body) {
          console.log('📦 Dados para Google:', options.body);
        }
      }
    }
    
    const result = await originalFetch.apply(this, args);
    
    if (url && typeof url === 'string' && url.includes('script.google.com')) {
      console.log('📊 Google Apps Script Response Status:', result.status);
      
      // Tentar ler a resposta
      try {
        const clone = result.clone();
        const text = await clone.text();
        console.log('📝 Google Response Text:', text);
      } catch (e) {
        console.log('📝 Não foi possível ler a resposta do Google');
      }
    }
    
    return result;
  };
}

// 2. Verificar variáveis de ambiente
console.log('\n🔧 VERIFICANDO CONFIGURAÇÕES...');

// Simular verificação das URLs
const makeUrl = 'https://hook.eu2.make.com/rmwbrabaeggfya9z432htt0siqiwnl52';
const googleUrl = 'https://script.google.com/macros/s/AKfycbxLHsfD2Sd_VS7add9L84A15d4_5Y9kG8FWrDTwcRKLM0OidVbGAZ_sixDWkmJ9KD9_pg/exec';

console.log('✅ Make.com URL:', makeUrl);
console.log('✅ Google URL:', googleUrl);

// 3. Função de teste MANUAL
window.testeManualGoogle = async function(dados) {
  console.log('\n🧪 TESTE MANUAL GOOGLE APPS SCRIPT');
  console.log('📦 Dados a enviar:', dados);
  
  try {
    // Método 1: FormData
    console.log('\n📤 Tentativa 1: FormData');
    const formData = new FormData();
    formData.append('NOME', dados.NOME);
    formData.append('TELEFONE', dados.TELEFONE);
    formData.append('E-MAIL', dados['E-MAIL']);
    formData.append('timestamp', new Date().toISOString());
    formData.append('source', 'teste_manual_urgente');
    
    const response1 = await fetch(googleUrl, {
      method: 'POST',
      body: formData,
    });
    
    console.log('📊 FormData Status:', response1.status);
    
    if (response1.ok) {
      console.log('✅ FormData: SUCESSO!');
      console.log('📋 Verifique a planilha agora!');
      return true;
    }
    
    // Método 2: URLSearchParams
    console.log('\n📤 Tentativa 2: URLSearchParams');
    const params = new URLSearchParams();
    params.append('NOME', dados.NOME);
    params.append('TELEFONE', dados.TELEFONE);
    params.append('E-MAIL', dados['E-MAIL']);
    params.append('timestamp', new Date().toISOString());
    params.append('source', 'teste_manual_urgente');
    
    const response2 = await fetch(googleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    
    console.log('📊 URLSearchParams Status:', response2.status);
    
    if (response2.ok) {
      console.log('✅ URLSearchParams: SUCESSO!');
      console.log('📋 Verifique a planilha agora!');
      return true;
    }
    
    console.log('❌ Ambos os métodos falharam');
    return false;
    
  } catch (error) {
    console.error('💥 Erro no teste manual:', error);
    return false;
  }
};

// 4. Interceptar console.log para capturar logs do formService
const originalConsoleLog = console.log;
console.log = function(...args) {
  const message = args.join(' ');
  
  // Destacar logs importantes
  if (message.includes('submitFormData') || 
      message.includes('Make.com') || 
      message.includes('Google') ||
      message.includes('envio duplo') ||
      message.includes('Iniciando envio')) {
    originalConsoleLog('🔥 [CAPTURADO]', ...args);
  } else {
    originalConsoleLog.apply(this, args);
  }
};

console.log('\n✅ INVESTIGAÇÃO CONFIGURADA!');
console.log('📋 AGORA FAÇA ISSO:');
console.log('1. Preencha o formulário no site');
console.log('2. Observe os logs que aparecem');
console.log('3. OU execute: testeManualGoogle({NOME: "Seu Nome", TELEFONE: "(11) 99999-9999", "E-MAIL": "seu@email.com"})');
console.log('\n🔍 Vamos descobrir onde está o problema!');
