// Serviço para gerenciar envio de formulários e integrações
export interface FormData {
  NOME: string;
  TELEFONE: string;
  'E-MAIL': string;
  timestamp?: string;
  source?: string;
}

export interface WebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Envia dados do formulário para o webhook do Make.com
 * @param data - Dados do formulário
 * @returns Promise com resultado do envio
 */
export async function sendToMakeWebhook(data: FormData): Promise<WebhookResponse> {
  const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('Webhook URL não configurada');
  }

  try {
    // Adiciona timestamp e fonte dos dados
    const enrichedData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'website'
    };

    console.log('Enviando dados para Make.com:', enrichedData);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(enrichedData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json().catch(() => ({}));
    
    console.log('Resposta do Make.com:', result);
    
    return {
      success: true,
      message: 'Dados enviados com sucesso para Make.com'
    };

  } catch (error) {
    console.error('Erro ao enviar para Make.com:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

/**
 * Envia dados para Google Sheets via Google Apps Script
 * @param data - Dados do formulário
 * @returns Promise com resultado do envio
 */
export async function sendToGoogleScript(data: FormData): Promise<WebhookResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  
  if (!scriptUrl) {
    throw new Error('Google Script URL não configurada');
  }

  try {
    // Prepara os dados no formato esperado pelo Google Apps Script
    const formData = new FormData();
    formData.append('NOME', data.NOME);
    formData.append('TELEFONE', data.TELEFONE);
    formData.append('E-MAIL', data['E-MAIL']);
    formData.append('timestamp', data.timestamp || new Date().toISOString());
    formData.append('source', data.source || 'website');

    console.log('Enviando para Google Script:', {
      nome: data.NOME,
      telefone: data.TELEFONE,
      email: data['E-MAIL']
    });

    // Primeira tentativa: usando FormData
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('✅ Google Sheets: Dados enviados com sucesso via FormData');
        return {
          success: true,
          message: 'Dados enviados com sucesso para Google Sheets'
        };
      }
    } catch (formDataError) {
      console.warn('FormData falhou, tentando URLSearchParams:', formDataError);
    }

    // Segunda tentativa: usando URLSearchParams
    const params = new URLSearchParams();
    params.append('NOME', data.NOME);
    params.append('TELEFONE', data.TELEFONE);
    params.append('E-MAIL', data['E-MAIL']);
    params.append('timestamp', data.timestamp || new Date().toISOString());
    params.append('source', data.source || 'website');

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log('Google Sheets response status:', response.status);
    
    // Com Google Apps Script, nem sempre podemos verificar o response devido ao CORS
    // Vamos assumir sucesso se não houve erro na requisição
    return {
      success: true,
      message: 'Dados enviados para Google Sheets'
    };

  } catch (error) {
    console.error('Erro ao enviar para Google Script:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

/**
 * Redireciona para WhatsApp com mensagem personalizada
 * @param customMessage - Mensagem personalizada (opcional)
 */
export function redirectToWhatsApp(customMessage?: string): void {
  // Importa o gerenciador de links de IA
  const { getWhatsAppLink } = require('./aiLinksManager');
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+557582812698';
  const defaultMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Olá! Tenho interesse em limpar meu nome.';
  
  const message = customMessage || defaultMessage;
  const encodedMessage = encodeURIComponent(message);
  const cleanNumber = whatsappNumber.replace(/[^\d]/g, '');
  
  // Tenta usar o link configurado no aiLinksManager, senão usa o padrão
  let whatsappUrl: string;
  try {
    const configuredLink = getWhatsAppLink();
    if (configuredLink && configuredLink !== 'https://wa.me/557582812698') {
      whatsappUrl = `${configuredLink}?text=${encodedMessage}`;
    } else {
      whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    }
  } catch {
    whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }
  
  console.log('Redirecionando para WhatsApp:', whatsappUrl);
  
  // Abre em nova aba para não perder a página atual
  window.open(whatsappUrl, '_blank');
}

/**
 * Envia notificação para admin em caso de falha
 * @param data - Dados do formulário que falharam
 * @param error - Erro ocorrido
 */
export async function notifyAdminOfFailure(data: FormData, error: string): Promise<void> {
  try {
    await fetch('/api/notify-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'webhook_failure',
        data,
        error,
        timestamp: new Date().toISOString()
      })
    });
  } catch (notifyError) {
    console.error('Erro ao notificar admin:', notifyError);
  }
}

/**
 * Salva dados localmente como fallback final
 * @param data - Dados do formulário
 */
export function saveLocally(data: FormData): void {
  try {
    const localData = JSON.parse(localStorage.getItem('failed_leads') || '[]');
    localData.push({
      ...data,
      timestamp: new Date().toISOString(),
      status: 'failed'
    });
    localStorage.setItem('failed_leads', JSON.stringify(localData));
    console.log('Dados salvos localmente como fallback');
  } catch (error) {
    console.error('Erro ao salvar dados localmente:', error);
  }
}

/**
 * Função principal para envio de formulário - envia para AMBOS webhook e Google Sheets
 * @param data - Dados do formulário
 * @returns Promise com resultado do envio
 */
export async function submitFormData(data: FormData): Promise<WebhookResponse> {
  console.log('Iniciando envio duplo: Make.com + Google Sheets');
  
  // Executa ambos os envios em paralelo
  const [makeResult, scriptResult] = await Promise.allSettled([
    sendToMakeWebhook(data),
    sendToGoogleScript(data)
  ]);
  
  let hasSuccess = false;
  let errors: string[] = [];

  // Verifica resultado do Make.com
  if (makeResult.status === 'fulfilled' && makeResult.value.success) {
    console.log('✅ Make.com webhook enviado com sucesso');
    hasSuccess = true;
  } else {
    const error = makeResult.status === 'rejected' 
      ? makeResult.reason 
      : makeResult.value.error;
    console.warn('❌ Make.com falhou:', error);
    errors.push(`Make.com: ${error}`);
  }

  // Verifica resultado do Google Sheets
  if (scriptResult.status === 'fulfilled' && scriptResult.value.success) {
    console.log('✅ Google Sheets enviado com sucesso');
    hasSuccess = true;
  } else {
    const error = scriptResult.status === 'rejected' 
      ? scriptResult.reason 
      : scriptResult.value.error;
    console.warn('❌ Google Sheets falhou:', error);
    errors.push(`Google Sheets: ${error}`);
  }

  // Se pelo menos um método funcionou, considera sucesso
  if (hasSuccess) {
    // Se apenas um falhou, notifica admin mas continua
    if (errors.length > 0) {
      await notifyAdminOfFailure(data, `Falha parcial: ${errors.join(', ')}`);
    }
    
    return {
      success: true,
      message: 'Dados enviados com sucesso para pelo menos uma integração'
    };
  }

  // Se ambos falharam, salva localmente e notifica
  console.error('❌ Todos os métodos de envio falharam');
  saveLocally(data);
  await notifyAdminOfFailure(data, `Falha total: ${errors.join(', ')}`);
  
  return {
    success: false,
    error: 'Falha em todos os métodos de envio. Dados salvos localmente.'
  };
}
