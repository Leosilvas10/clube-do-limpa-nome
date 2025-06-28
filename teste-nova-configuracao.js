/**
 * TESTE ESPECÍFICO PARA SUA NOVA CONFIGURAÇÃO
 * Cole este código no console do navegador para testar
 */

console.log('🧪 TESTANDO NOVA CONFIGURAÇÃO DO GOOGLE APPS SCRIPT');
console.log('=' .repeat(60));

// Sua nova URL
const NOVA_URL = 'https://script.google.com/macros/s/AKfycbxLHsfD2Sd_VS7add9L84A15d4_5Y9kG8FWrDTwcRKLM0OidVbGAZ_sixDWkmJ9KD9_pg/exec';

// Dados de teste
const dadosTeste = {
  NOME: 'Teste Leonardo',
  TELEFONE: '(11) 99999-9999',
  'E-MAIL': 'teste.leonardo@email.com',
  timestamp: new Date().toISOString(),
  source: 'teste_nova_configuracao'
};

async function testarNovaConfiguracao() {
  console.log('🔄 Testando nova URL do Google Apps Script...');
  console.log('URL:', NOVA_URL);
  console.log('Dados:', dadosTeste);
  
  try {
    // Teste 1: FormData
    console.log('\n📤 Teste 1: Enviando como FormData');
    const formData = new FormData();
    Object.entries(dadosTeste).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response1 = await fetch(NOVA_URL, {
      method: 'POST',
      body: formData,
    });

    console.log('📊 Status FormData:', response1.status);
    
    // Teste 2: URLSearchParams
    console.log('\n📤 Teste 2: Enviando como URLSearchParams');
    const params = new URLSearchParams();
    Object.entries(dadosTeste).forEach(([key, value]) => {
      params.append(key, value);
    });

    const response2 = await fetch(NOVA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log('📊 Status URLSearchParams:', response2.status);
    
    // Resultado
    if (response1.ok || response2.ok) {
      console.log('\n✅ SUCESSO! Pelo menos um método funcionou');
      console.log('📋 Verifique sua planilha do Google Sheets');
      console.log('🔗 Planilha: https://docs.google.com/spreadsheets/d/1BQOstmp15usMlksWeTPEwB3boGV9YfhNoGMvduySDjs/edit');
      return true;
    } else {
      console.log('\n❌ Ambos os métodos falharam');
      return false;
    }
    
  } catch (error) {
    console.error('\n💥 Erro durante o teste:', error);
    return false;
  }
}

// Teste da integração dupla (como no site real)
async function testarIntegracaoDupla() {
  console.log('\n🔄 Testando integração dupla (Make.com + Google Sheets)...');
  
  const makeUrl = 'https://hook.eu2.make.com/rmwbrabaeggfya9z432htt0siqiwnl52';
  
  try {
    const [makeResult, googleResult] = await Promise.allSettled([
      // Teste Make.com
      fetch(makeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosTeste)
      }),
      
      // Teste Google Sheets
      testarNovaConfiguracao()
    ]);
    
    console.log('\n📊 RESULTADOS DA INTEGRAÇÃO DUPLA:');
    
    let sucessos = 0;
    
    if (makeResult.status === 'fulfilled' && makeResult.value.ok) {
      console.log('✅ Make.com: FUNCIONANDO');
      sucessos++;
    } else {
      console.log('❌ Make.com: FALHOU');
    }
    
    if (googleResult.status === 'fulfilled' && googleResult.value) {
      console.log('✅ Google Sheets: FUNCIONANDO');
      sucessos++;
    } else {
      console.log('❌ Google Sheets: FALHOU');
    }
    
    console.log(`\n🎯 RESULTADO FINAL: ${sucessos}/2 integrações funcionando`);
    
    if (sucessos > 0) {
      console.log('🎉 PARABÉNS! Pelo menos uma integração está funcionando!');
      console.log('📋 Isso significa que os leads não serão perdidos');
    } else {
      console.log('⚠️ Nenhuma integração funcionou. Verifique as configurações.');
    }
    
    return sucessos > 0;
    
  } catch (error) {
    console.error('💥 Erro no teste da integração dupla:', error);
    return false;
  }
}

// Executa todos os testes
async function executarTodosTestes() {
  console.log('🚀 INICIANDO TODOS OS TESTES...\n');
  
  await testarIntegracaoDupla();
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ TESTES CONCLUÍDOS!');
  console.log('\n📋 PRÓXIMOS PASSOS:');
  console.log('1. Verifique sua planilha do Google Sheets');
  console.log('2. Se funcionou, teste preenchendo o formulário no site');
  console.log('3. Execute: npm run dev e acesse http://localhost:3000');
  console.log('\n🔗 Sua planilha: https://docs.google.com/spreadsheets/d/1BQOstmp15usMlksWeTPEwB3boGV9YfhNoGMvduySDjs/edit');
}

// Auto-executa
executarTodosTestes();
