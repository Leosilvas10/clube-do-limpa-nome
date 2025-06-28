/**
 * SCRIPT DE DEBUG COMPLETO
 * Cole no console do navegador (F12) para diagnosticar problemas
 */

console.log('🔍 INICIANDO DIAGNÓSTICO COMPLETO...');
console.log('=' .repeat(60));

// Verificar variáveis de ambiente
function verificarConfiguracoes() {
  console.log('\n📋 1. VERIFICANDO CONFIGURAÇÕES...');
  
  // Simular leitura das variáveis (no browser não temos acesso direto)
  const expectedVars = {
    'MAKE_WEBHOOK': 'https://hook.eu2.make.com/rmwbrabaeggfya9z432htt0siqiwnl52',
    'GOOGLE_SCRIPT': 'https://script.google.com/macros/s/AKfycbxLHsfD2Sd_VS7add9L84A15d4_5Y9kG8FWrDTwcRKLM0OidVbGAZ_sixDWkmJ9KD9_pg/exec'
  };
  
  console.log('✅ URLs esperadas:');
  Object.entries(expectedVars).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
}

// Testar Make.com webhook
async function testarMakeWebhook() {
  console.log('\n🔄 2. TESTANDO MAKE.COM WEBHOOK...');
  
  const webhookUrl = 'https://hook.eu2.make.com/rmwbrabaeggfya9z432htt0siqiwnl52';
  const dadosTeste = {
    NOME: 'Debug Make Test',
    TELEFONE: '(11) 98765-4321',
    'E-MAIL': 'debug.make@test.com',
    timestamp: new Date().toISOString(),
    source: 'debug_make'
  };
  
  try {
    console.log('📤 Enviando para Make.com...');
    console.log('URL:', webhookUrl);
    console.log('Dados:', dadosTeste);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dadosTeste)
    });
    
    console.log('📊 Status Make.com:', response.status);
    console.log('📊 Headers:', Object.fromEntries(response.headers));
    
    if (response.ok) {
      const result = await response.text();
      console.log('✅ Make.com: FUNCIONANDO');
      console.log('📝 Resposta:', result);
      return true;
    } else {
      console.log('❌ Make.com: FALHOU');
      console.log('💥 Status:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Make.com: ERRO');
    console.error('💥 Erro:', error);
    return false;
  }
}

// Testar Google Apps Script
async function testarGoogleScript() {
  console.log('\n🔄 3. TESTANDO GOOGLE APPS SCRIPT...');
  
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxLHsfD2Sd_VS7add9L84A15d4_5Y9kG8FWrDTwcRKLM0OidVbGAZ_sixDWkmJ9KD9_pg/exec';
  const dadosTeste = {
    NOME: 'Debug Google Test',
    TELEFONE: '(11) 12345-6789',
    'E-MAIL': 'debug.google@test.com',
    timestamp: new Date().toISOString(),
    source: 'debug_google'
  };
  
  console.log('📤 Enviando para Google Apps Script...');
  console.log('URL:', scriptUrl);
  console.log('Dados:', dadosTeste);
  
  try {
    // Teste 1: FormData
    console.log('\n📤 Tentativa 1: FormData');
    const formData = new FormData();
    Object.entries(dadosTeste).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response1 = await fetch(scriptUrl, {
      method: 'POST',
      body: formData,
    });

    console.log('📊 Status FormData:', response1.status);
    
    // Teste 2: URLSearchParams
    console.log('\n📤 Tentativa 2: URLSearchParams');
    const params = new URLSearchParams();
    Object.entries(dadosTeste).forEach(([key, value]) => {
      params.append(key, value);
    });

    const response2 = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log('📊 Status URLSearchParams:', response2.status);
    
    // Teste 3: JSON
    console.log('\n📤 Tentativa 3: JSON');
    const response3 = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosTeste),
    });

    console.log('📊 Status JSON:', response3.status);
    
    if (response1.ok || response2.ok || response3.ok) {
      console.log('✅ Google Apps Script: FUNCIONANDO');
      console.log('📝 Pelo menos um método funcionou');
      return true;
    } else {
      console.log('❌ Google Apps Script: PROBLEMAS');
      console.log('💥 Todos os métodos falharam');
      return false;
    }
    
  } catch (error) {
    console.log('❌ Google Apps Script: ERRO');
    console.error('💥 Erro:', error);
    return false;
  }
}

// Testar função submitFormData (como no site)
async function testarSubmitFormData() {
  console.log('\n🔄 4. TESTANDO FUNÇÃO SUBMITFORMDATA...');
  
  // Simular a função submitFormData
  const dadosTeste = {
    NOME: 'Debug FormData Test',
    TELEFONE: '(11) 55555-5555',
    'E-MAIL': 'debug.form@test.com',
    timestamp: new Date().toISOString(),
    source: 'debug_form'
  };
  
  console.log('📤 Simulando submitFormData...');
  console.log('Dados:', dadosTeste);
  
  try {
    const [makeResult, scriptResult] = await Promise.allSettled([
      testarMakeWebhook(),
      testarGoogleScript()
    ]);
    
    console.log('\n📊 RESULTADO DA INTEGRAÇÃO DUPLA:');
    
    let sucessos = 0;
    let erros = [];

    if (makeResult.status === 'fulfilled' && makeResult.value) {
      console.log('✅ Make.com: OK');
      sucessos++;
    } else {
      console.log('❌ Make.com: FALHOU');
      erros.push('Make.com falhou');
    }

    if (scriptResult.status === 'fulfilled' && scriptResult.value) {
      console.log('✅ Google Sheets: OK');
      sucessos++;
    } else {
      console.log('❌ Google Sheets: FALHOU');
      erros.push('Google Sheets falhou');
    }

    console.log(`\n🎯 RESULTADO: ${sucessos}/2 integrações funcionando`);
    
    if (sucessos === 0) {
      console.log('💥 PROBLEMA GRAVE: Nenhuma integração funcionou!');
      console.log('🔧 Erros encontrados:', erros.join(', '));
    } else if (sucessos === 1) {
      console.log('⚠️ PROBLEMA PARCIAL: Apenas uma integração funcionou');
      console.log('🔧 Erros encontrados:', erros.join(', '));
    } else {
      console.log('🎉 TUDO FUNCIONANDO: Ambas integrações OK!');
    }
    
    return sucessos > 0;
    
  } catch (error) {
    console.error('💥 Erro na simulação:', error);
    return false;
  }
}

// Verificar localStorage
function verificarLocalStorage() {
  console.log('\n📱 5. VERIFICANDO LOCALSTORAGE...');
  
  const keys = ['failed_leads', 'vsl_completed', 'ai_links_config'];
  
  keys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      console.log(`📦 ${key}:`, JSON.parse(value));
    } else {
      console.log(`📦 ${key}: não encontrado`);
    }
  });
}

// Verificar console errors
function verificarErros() {
  console.log('\n🚨 6. VERIFICANDO ERROS...');
  
  // Interceptar erros
  const originalError = console.error;
  const errors = [];
  
  console.error = function(...args) {
    errors.push(args);
    originalError.apply(console, args);
  };
  
  setTimeout(() => {
    console.error = originalError;
    
    if (errors.length > 0) {
      console.log('🚨 Erros encontrados:');
      errors.forEach((error, index) => {
        console.log(`${index + 1}.`, error);
      });
    } else {
      console.log('✅ Nenhum erro no console');
    }
  }, 1000);
}

// Executar todos os testes
async function executarDiagnosticoCompleto() {
  verificarConfiguracoes();
  verificarErros();
  
  const makeOK = await testarMakeWebhook();
  const googleOK = await testarGoogleScript();
  const formOK = await testarSubmitFormData();
  
  verificarLocalStorage();
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DO DIAGNÓSTICO:');
  console.log('=' .repeat(60));
  
  console.log(`Make.com Webhook: ${makeOK ? '✅ OK' : '❌ FALHOU'}`);
  console.log(`Google Apps Script: ${googleOK ? '✅ OK' : '❌ FALHOU'}`);
  console.log(`Função submitFormData: ${formOK ? '✅ OK' : '❌ FALHOU'}`);
  
  console.log('\n🔧 RECOMENDAÇÕES:');
  
  if (!makeOK) {
    console.log('❌ Make.com: Verifique se o webhook está ativo no Make.com');
  }
  
  if (!googleOK) {
    console.log('❌ Google Sheets: Verifique Apps Script e permissões');
  }
  
  if (!formOK) {
    console.log('❌ Formulário: Problema na integração dupla');
  }
  
  if (makeOK && googleOK && formOK) {
    console.log('🎉 TUDO OK! O problema pode estar no formulário do site');
    console.log('💡 Verifique se está preenchendo os campos corretamente');
  }
  
  console.log('\n📋 PRÓXIMOS PASSOS:');
  console.log('1. Verifique sua planilha: https://docs.google.com/spreadsheets/d/1BQOstmp15usMlksWeTPEwB3boGV9YfhNoGMvduySDjs/edit');
  console.log('2. Se não aparecer dados, há problema nas integrações');
  console.log('3. Se aparecer dados, o problema é no formulário do site');
}

// Auto-executar
executarDiagnosticoCompleto();
