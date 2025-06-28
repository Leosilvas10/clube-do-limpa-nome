import AILinksManager from "../../components/AILinksManager";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Painel Administrativo - Clube do Limpa Nome
          </h1>
          <p className="text-gray-400">
            Gerencie configurações e integrações do sistema
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Seção de Links de IA */}
          <AILinksManager />
          
          {/* Seção de Status das Integrações */}
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Status das Integrações</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <h3 className="font-semibold text-green-400 mb-2">✅ Make.com Webhook</h3>
                <p className="text-sm text-gray-300">
                  URL: {process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL || 'Não configurado'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Integração principal para Google Sheets
                </p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Google Apps Script</h3>
                <p className="text-sm text-gray-300">Configurado como fallback</p>
                <p className="text-xs text-gray-500 mt-2">
                  Usado quando Make.com falha
                </p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <h3 className="font-semibold text-blue-400 mb-2">📧 Notificações</h3>
                <p className="text-sm text-gray-300">
                  Email: {process.env.EMAIL_USER ? 'Configurado' : 'Não configurado'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Alertas de falhas por email
                </p>
              </div>
            </div>
          </div>
          
          {/* Seção de Logs Recentes */}
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Logs e Monitoramento</h2>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <p className="text-sm text-gray-300 mb-2">
                ℹ️ Para visualizar logs detalhados, verifique:
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4">
                <li>• Console do navegador (F12) para logs do frontend</li>
                <li>• Vercel Dashboard para logs do servidor</li>
                <li>• Make.com para logs de execução do webhook</li>
                <li>• LocalStorage "failed_leads" para dados salvos localmente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
