// Utilitário para gerenciar links de automação de IA/Chatbot
export interface AILinkConfig {
  id: string;
  name: string;
  url: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Configurações padrão de links
const DEFAULT_LINKS: AILinkConfig[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Principal',
    url: 'https://wa.me/557582812698',
    description: 'Link principal do WhatsApp para contato',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'calendly',
    name: 'Agendamento Calendly',
    url: 'https://calendly.com/your-link',
    description: 'Link para agendamento de consultas',
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Obtém todos os links configurados
 * @returns Array de configurações de links
 */
export function getAILinks(): AILinkConfig[] {
  if (typeof window === 'undefined') return DEFAULT_LINKS;
  
  try {
    const stored = localStorage.getItem('ai_links_config');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erro ao carregar configurações de links:', error);
  }
  
  // Se não houver configurações salvas, usa os padrões
  saveAILinks(DEFAULT_LINKS);
  return DEFAULT_LINKS;
}

/**
 * Salva configurações de links
 * @param links - Array de configurações para salvar
 */
export function saveAILinks(links: AILinkConfig[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('ai_links_config', JSON.stringify(links));
    console.log('Configurações de links salvas com sucesso');
  } catch (error) {
    console.error('Erro ao salvar configurações de links:', error);
  }
}

/**
 * Adiciona um novo link
 * @param linkData - Dados do novo link
 * @returns Link criado com ID gerado
 */
export function addAILink(linkData: Omit<AILinkConfig, 'id' | 'createdAt' | 'updatedAt'>): AILinkConfig {
  const newLink: AILinkConfig = {
    ...linkData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const currentLinks = getAILinks();
  const updatedLinks = [...currentLinks, newLink];
  saveAILinks(updatedLinks);
  
  return newLink;
}

/**
 * Atualiza um link existente
 * @param id - ID do link a ser atualizado
 * @param updates - Dados para atualizar
 * @returns Link atualizado ou null se não encontrado
 */
export function updateAILink(id: string, updates: Partial<Omit<AILinkConfig, 'id' | 'createdAt'>>): AILinkConfig | null {
  const currentLinks = getAILinks();
  const linkIndex = currentLinks.findIndex(link => link.id === id);
  
  if (linkIndex === -1) {
    console.error(`Link com ID ${id} não encontrado`);
    return null;
  }
  
  const updatedLink: AILinkConfig = {
    ...currentLinks[linkIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  const updatedLinks = [...currentLinks];
  updatedLinks[linkIndex] = updatedLink;
  saveAILinks(updatedLinks);
  
  return updatedLink;
}

/**
 * Remove um link
 * @param id - ID do link a ser removido
 * @returns true se removido com sucesso, false se não encontrado
 */
export function removeAILink(id: string): boolean {
  const currentLinks = getAILinks();
  const filteredLinks = currentLinks.filter(link => link.id !== id);
  
  if (filteredLinks.length === currentLinks.length) {
    console.error(`Link com ID ${id} não encontrado`);
    return false;
  }
  
  saveAILinks(filteredLinks);
  return true;
}

/**
 * Obtém um link específico por ID
 * @param id - ID do link
 * @returns Link encontrado ou null
 */
export function getAILinkById(id: string): AILinkConfig | null {
  const links = getAILinks();
  return links.find(link => link.id === id) || null;
}

/**
 * Obtém todos os links ativos
 * @returns Array de links ativos
 */
export function getActiveAILinks(): AILinkConfig[] {
  return getAILinks().filter(link => link.isActive);
}

/**
 * Obtém o link principal do WhatsApp (compatibilidade com sistema atual)
 * @returns URL do WhatsApp principal
 */
export function getWhatsAppLink(): string {
  const whatsappLink = getAILinkById('whatsapp');
  return whatsappLink?.url || 'https://wa.me/557582812698';
}

/**
 * Atualiza o link do WhatsApp principal
 * @param newUrl - Nova URL do WhatsApp
 * @param message - Mensagem padrão (opcional)
 */
export function updateWhatsAppLink(newUrl: string, message?: string): void {
  const fullUrl = message ? `${newUrl}?text=${encodeURIComponent(message)}` : newUrl;
  
  updateAILink('whatsapp', {
    url: fullUrl,
    description: 'Link principal do WhatsApp para contato'
  });
}

/**
 * Exporta configurações de links para backup
 * @returns String JSON com todas as configurações
 */
export function exportAILinksConfig(): string {
  const links = getAILinks();
  return JSON.stringify({
    exportDate: new Date().toISOString(),
    version: '1.0',
    links
  }, null, 2);
}

/**
 * Importa configurações de links de backup
 * @param configJson - String JSON com configurações
 * @returns true se importado com sucesso
 */
export function importAILinksConfig(configJson: string): boolean {
  try {
    const config = JSON.parse(configJson);
    if (config.links && Array.isArray(config.links)) {
      saveAILinks(config.links);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao importar configurações:', error);
    return false;
  }
}

// Função auxiliar para gerar IDs únicos
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
