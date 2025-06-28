/**
 * DEBUG MODE - INTERCEPTADOR DE FORMULÁRIOS
 * Cole este código no console ANTES de preencher o formulário
 * Vai interceptar e monitorar todo o processo
 */

console.log('🔍 MODO DEBUG ATIVADO');
console.log('🎯 Agora preencha qualquer formulário no site e veja os logs detalhados');
console.log('=' .repeat(60));

// Interceptar a função submitFormData original
if (window.originalSubmitFormData) {
  console.log('⚠️ Debug já estava ativo, reativando...');
}

// Salvar referência original se existir
window.originalSubmitFormData = window.submitFormData;

// Função de debug que substitui a original
window.debugSubmitFormData = async function(data) {
  console.log('\n🚀 FORMULÁRIO SUBMETIDO!');
  console.log('📅 Timestamp:', new Date().toLocaleString());
  console.log('📊 Dados recebidos:', data);
  
  // Verificar se os dados estão corretos
  console.log('\n🔍 VALIDANDO DADOS...');
  if (!data.NOME || data.NOME.trim() === '') {
    console.error('❌ ERRO: Campo NOME está vazio!');
  } else {
    console.log('✅ Nome:', data.NOME);
  }
  
  if (!data.TELEFONE || data.TELEFONE.trim() === '') {
    console.error('❌ ERRO: Campo TELEFONE está vazio!');
  } else {
    console.log('✅ Telefone:', data.TELEFONE);
  }
  
  if (!data['E-MAIL'] || data['E-MAIL'].trim() === '') {
    console.error('❌ ERRO: Campo E-MAIL está vazio!');
  } else {
    console.log('✅ E-mail:', data['E-MAIL']);
  }
  
  // Adicionar dados extras se não existirem
  const enrichedData = {
    ...data,
    timestamp: data.timestamp || new Date().toISOString(),
    source: data.source || 'website_debug'
  };
  
  console.log('\n📦 Dados enriquecidos:', enrichedData);
  
  // Testar Make.com
  console.log('\n🔄 TESTANDO MAKE.COM...');
  const makeUrl = 'https://hook.eu2.make.com/rmwbrabaeggfya9z432htt0siqiwnl52';
  
  try {
    const makeResponse = await fetch(makeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(enrichedData)
    });
    
    console.log('📊 Make.com Status:', makeResponse.status);
    
    if (makeResponse.ok) {
      console.log('✅ Make.com: SUCESSO');
      try {
        const makeResult = await makeResponse.json();
        console.log('📝 Make.com Response:', makeResult);
      } catch {
        console.log('📝 Make.com: Resposta recebida (sem JSON)');
      }
    } else {
      console.log('❌ Make.com: FALHOU');
      console.log('💥 Status:', makeResponse.status, makeResponse.statusText);
    }
  } catch (makeError) {
    console.log('❌ Make.com: ERRO');
    console.error('💥 Erro:', makeError);
  }
  
  // Testar Google Apps Script
  console.log('\n🔄 TESTANDO GOOGLE APPS SCRIPT...');
  const googleUrl = 'https://script.google.com/macros/s/AKfycbxLHsfD2Sd_VS7add9L84A15d4_5Y9kG8FWrDTwcRKLM0OidVbGAZ_sixDWkmJ9KD9_pg/exec';
  
  try {
    // Teste com FormData
    const formData = new FormData();
    formData.append('NOME', enrichedData.NOME);
    formData.append('TELEFONE', enrichedData.TELEFONE);
    formData.append('E-MAIL', enrichedData['E-MAIL']);
    formData.append('timestamp', enrichedData.timestamp);
    formData.append('source', enrichedData.source);
    
    const googleResponse = await fetch(googleUrl, {
      method: 'POST',
      body: formData,
    });
    
    console.log('📊 Google Apps Script Status:', googleResponse.status);
    
    if (googleResponse.ok) {
      console.log('✅ Google Apps Script: SUCESSO');
      try {
        const googleResult = await googleResponse.text();
        console.log('📝 Google Response:', googleResult);
      } catch {
        console.log('📝 Google: Resposta recebida');
      }
    } else {
      console.log('❌ Google Apps Script: FALHOU');
      console.log('💥 Status:', googleResponse.status, googleResponse.statusText);
    }
  } catch (googleError) {
    console.log('❌ Google Apps Script: ERRO');
    console.error('💥 Erro:', googleError);
  }
  
  // Testar URLs de processo.env
  console.log('\n🔍 VERIFICANDO VARIÁVEIS DE AMBIENTE...');
  
  // No browser, não temos acesso direto ao process.env, mas podemos verificar se as funções estão usando as URLs corretas
  console.log('📋 URLs esperadas:');
  console.log('  Make.com:', makeUrl);
  console.log('  Google:', googleUrl);
  
  console.log('\n📱 VERIFICANDO LOCALSTORAGE...');
  const failedLeads = localStorage.getItem('failed_leads');
  if (failedLeads) {
    console.log('💾 Leads em falha no localStorage:', JSON.parse(failedLeads));
  } else {
    console.log('💾 Nenhum lead em falha no localStorage');
  }
  
  console.log('\n🎯 DEBUG CONCLUÍDO!');
  console.log('📋 Verifique sua planilha: https://docs.google.com/spreadsheets/d/1BQOstmp15usMlksWeTPEwB3boGV9YfhNoGMvduySDjs/edit');
  console.log('💡 Se nenhum dado apareceu, há problema nas integrações');
  
  // Retornar resultado simulado
  return {
    success: true,
    message: 'Debug concluído - verifique logs acima'
  };
};

// Interceptar chamadas fetch para monitorar requisições
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const [url, options] = args;
  
  // Verificar se é uma chamada para nossas integrações
  if (typeof url === 'string' && (
    url.includes('hook.eu2.make.com') || 
    url.includes('script.google.com')
  )) {
    console.log('\n🌐 INTERCEPTANDO FETCH...');
    console.log('📍 URL:', url);
    console.log('⚙️ Options:', options);
    
    if (options && options.body) {
      console.log('📦 Body:', options.body);
    }
  }
  
  // Chamar fetch original
  return originalFetch.apply(this, args);
};

// Interceptar console.log para capturar logs do formService
const originalLog = console.log;
console.log = function(...args) {
  // Se a mensagem contém palavras-chave das nossas integrações, destacar
  const message = args.join(' ');
  if (message.includes('Make.com') || message.includes('Google') || message.includes('webhook') || message.includes('script')) {
    originalLog('🔥 [INTERCEPTADO]', ...args);
  } else {
    originalLog.apply(this, args);
  }
};

console.log('\n✅ DEBUG MODE ATIVO!');
console.log('📋 Agora preencha o formulário e veja os logs detalhados');
console.log('🔄 Para desativar, recarregue a página');
