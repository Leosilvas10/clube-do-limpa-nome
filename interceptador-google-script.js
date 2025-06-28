// INTERCEPTADOR DE REQUISIÇÕES - Google Apps Script
// Execute este código no console do browser antes de enviar formulários

console.log('🎯 INTERCEPTADOR DE REQUISIÇÕES ATIVADO');

// Interceptar todas as requisições fetch
const originalFetch = window.fetch;
window.fetch = function(...args) {
    const [url, config] = args;
    
    // Se for uma requisição para o Google Apps Script
    if (url && url.includes('script.google.com')) {
        console.log('🚀 INTERCEPTADO: Requisição para Google Apps Script');
        console.log('🔗 URL:', url);
        console.log('⚙️ Configuração:', config);
        
        if (config && config.body) {
            try {
                const dados = JSON.parse(config.body);
                console.log('📋 DADOS ENVIADOS:', dados);
            } catch (e) {
                console.log('📋 DADOS RAW:', config.body);
            }
        }
        
        // Executar a requisição original e interceptar a resposta
        return originalFetch.apply(this, args).then(response => {
            console.log('📊 RESPOSTA STATUS:', response.status);
            console.log('📊 RESPOSTA OK:', response.ok);
            
            // Clonar a resposta para poder ler o conteúdo
            const clonedResponse = response.clone();
            clonedResponse.text().then(text => {
                console.log('📝 RESPOSTA CONTEÚDO:', text);
            }).catch(err => {
                console.log('❌ Erro ao ler resposta:', err);
            });
            
            return response;
        }).catch(error => {
            console.error('💥 ERRO NA REQUISIÇÃO:', error);
            throw error;
        });
    }
    
    // Para outras requisições, executar normalmente
    return originalFetch.apply(this, args);
};

console.log('✅ Interceptador ativado! Agora envie um formulário para ver os logs detalhados.');
console.log('📌 Todas as requisições para Google Apps Script serão interceptadas e logadas.');

// Função adicional para testar a URL atual do .env
function testarUrlAtualDoEnv() {
    // Tentar acessar as variáveis de ambiente do Next.js
    const urlScript = process?.env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (urlScript) {
        console.log('🔗 URL encontrada no processo:', urlScript);
        
        if (urlScript.includes('AKfycbxuS0fTnh3fW-boD9oInxtN7WpFhRNvZgU1_VxUdLzxylhf9GxVL0tG6znK5lWP83jgA')) {
            console.log('✅ URL está atualizada com a nova versão');
        } else {
            console.log('⚠️ URL parece ser a versão antiga');
        }
    } else {
        console.log('❌ Não foi possível acessar a URL do .env no browser');
        console.log('💡 Isso é normal - as variáveis de ambiente são processadas no servidor');
    }
}

testarUrlAtualDoEnv();
