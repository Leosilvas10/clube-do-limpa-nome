// TESTE URGENTE - Nova URL do Google Apps Script
// Execute este código no console do browser quando estiver no site

console.log('🔍 INICIANDO TESTE DA NOVA URL DO GOOGLE APPS SCRIPT');

// Nova URL do Google Apps Script
const novaUrlScript = 'https://script.google.com/macros/s/AKfycbxuS0fTnh3fW-boD9oInxtN7WpFhRNvZgU1_VxUdLzxylhf9GxVL0tG6znK5lWP83jgA/exec';

// Função para testar a nova URL
async function testarNovaUrlScript() {
    const dadosTeste = {
        nome: 'TESTE NOVA URL - ' + new Date().toLocaleString(),
        email: 'teste-nova-url@email.com',
        whatsapp: '85999999999',
        cpf: '123.456.789-00',
        rendaMensal: 'R$ 3.000',
        interesse: 'Renegociação de dívidas',
        observacoes: 'Teste da nova URL do Apps Script'
    };

    console.log('📤 Enviando dados para a nova URL:', novaUrlScript);
    console.log('📋 Dados:', dadosTeste);

    try {
        const response = await fetch(novaUrlScript, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dadosTeste)
        });

        console.log('📊 Status da resposta:', response.status);
        console.log('🌐 Headers da resposta:', Object.fromEntries(response.headers.entries()));

        const resultado = await response.text();
        console.log('📝 Resposta do servidor:', resultado);

        if (response.ok) {
            console.log('✅ SUCESSO! Dados enviados com sucesso para a nova URL');
            console.log('🔍 Verifique agora na planilha se os dados apareceram');
        } else {
            console.log('❌ ERRO! Falha ao enviar dados');
        }

    } catch (error) {
        console.error('💥 ERRO na requisição:', error);
    }
}

// Função para testar se o arquivo .env.local foi atualizado
function verificarUrlAtual() {
    const urlAtual = process?.env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'URL não encontrada';
    console.log('🔗 URL atual no processo:', urlAtual);
    
    if (urlAtual.includes('AKfycbxuS0fTnh3fW-boD9oInxtN7WpFhRNvZgU1_VxUdLzxylhf9GxVL0tG6znK5lWP83jgA')) {
        console.log('✅ URL atualizada corretamente no .env.local');
    } else {
        console.log('⚠️ URL pode não estar atualizada. Reinicie o servidor de desenvolvimento');
    }
}

// Executar testes
console.log('🏃‍♂️ Executando testes...');
verificarUrlAtual();
testarNovaUrlScript();

console.log('📌 Após executar este teste:');
console.log('1. Verifique se apareceu uma linha na planilha com "TESTE NOVA URL"');
console.log('2. Se NÃO aparecer, verifique os logs de "Execuções" no Apps Script');
console.log('3. Se aparecer, então o problema pode ser com o cache do navegador');
