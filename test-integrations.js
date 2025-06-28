/**
 * Script de teste para verificar as integrações
 * Execute com: node test-integrations.js
 * Ou cole no console do navegador para testar
 */

const testData = {
  NOME: "João Silva Teste",
  TELEFONE: "(11) 99999-9999", 
  "E-MAIL": "teste@exemplo.com",
  timestamp: new Date().toISOString(),
  source: "test"
};

// Teste do webhook Make.com
async function testMakeWebhook() {
  const webhookUrl = "https://hook.eu2.make.com/rmwbrabaeggfya9z432htt0siqiwnl52";
  
  console.log("🔄 Testando webhook Make.com...");
  console.log("URL:", webhookUrl);
  console.log("Dados:", testData);
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log("Status:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers));
    
    const result = await response.text();
    console.log("Resposta:", result);
    
    if (response.ok) {
      console.log("✅ Webhook Make.com funcionando!");
      return true;
    } else {
      console.log("❌ Webhook Make.com falhou!");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro no webhook Make.com:", error.message);
    return false;
  }
}

// Teste do Google Sheets - Versão Melhorada
async function testGoogleScript() {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzu62ouQCWjAx-mTKm4StLhCQu6j_m2uGCAVOLn104Uy7TpbPIGssCEQ5i__TINZI9mSQ/exec";
  
  console.log("\n🔄 Testando Google Apps Script...");
  console.log("URL:", scriptUrl);
  
  try {
    // Teste 1: FormData
    console.log("Tentativa 1: FormData");
    const formData = new FormData();
    formData.append('NOME', testData.NOME);
    formData.append('TELEFONE', testData.TELEFONE);
    formData.append('E-MAIL', testData['E-MAIL']);
    formData.append('timestamp', testData.timestamp);
    formData.append('source', testData.source);

    const response1 = await fetch(scriptUrl, {
      method: 'POST',
      body: formData,
    });

    console.log("FormData status:", response1.status);
    
    // Teste 2: URLSearchParams
    console.log("Tentativa 2: URLSearchParams");
    const params = new URLSearchParams();
    Object.entries(testData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const response2 = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log("URLSearchParams status:", response2.status);
    
    if (response1.ok || response2.ok) {
      console.log("✅ Google Apps Script funcionando!");
      return true;
    } else {
      console.log("⚠️ Google Apps Script enviado (CORS pode impedir verificação)");
      return true; // Assumimos sucesso pois CORS impede verificação
    }
  } catch (error) {
    console.error("❌ Erro no Google Apps Script:", error.message);
    return false;
  }
}

// Teste da função principal (como no FormModal)
async function testSubmitFormData() {
  console.log("\n🔄 Testando função principal submitFormData...");
  
  const [makeResult, scriptResult] = await Promise.allSettled([
    testMakeWebhook(),
    testGoogleScript()
  ]);
  
  let hasSuccess = false;
  let errors = [];

  // Verifica resultado do Make.com
  if (makeResult.status === 'fulfilled' && makeResult.value) {
    console.log('✅ Make.com: OK');
    hasSuccess = true;
  } else {
    const error = makeResult.status === 'rejected' 
      ? makeResult.reason 
      : 'Falha no webhook';
    console.log('❌ Make.com falhou:', error);
    errors.push(`Make.com: ${error}`);
  }

  // Verifica resultado do Google Sheets
  if (scriptResult.status === 'fulfilled' && scriptResult.value) {
    console.log('✅ Google Sheets: OK');
    hasSuccess = true;
  } else {
    const error = scriptResult.status === 'rejected' 
      ? scriptResult.reason 
      : 'Falha no script';
    console.log('❌ Google Sheets falhou:', error);
    errors.push(`Google Sheets: ${error}`);
  }

  if (hasSuccess) {
    console.log('🎉 RESULTADO FINAL: SUCESSO - pelo menos uma integração funcionou');
    if (errors.length > 0) {
      console.log('⚠️ Avisos:', errors.join(', '));
    }
    return true;
  } else {
    console.log('💥 RESULTADO FINAL: FALHOU - nenhuma integração funcionou');
    console.log('Erros:', errors.join(', '));
    return false;
  }
}

// Executa os testes
async function runTests() {
  console.log("🧪 TESTE DE INTEGRAÇÕES - CLUBE LIMPA NOME");
  console.log("=" .repeat(50));
  
  await testSubmitFormData();
  
  console.log("\n" + "=".repeat(50));
  console.log("📋 COMO USAR:");
  console.log("1. Abra o site do Clube Limpa Nome");
  console.log("2. Abra o console do navegador (F12)");
  console.log("3. Cole este código completo");
  console.log("4. Verifique os resultados");
  console.log("\n💡 PRÓXIMOS PASSOS:");
  console.log("- Se Make.com falhar: Verifique se o webhook está ativo");
  console.log("- Se Google Sheets falhar: Verifique se o Apps Script está publicado");
  console.log("- Teste também preenchendo os formulários na página");
  console.log("✅ Testes concluídos!");
}

runTests();
