"use client";

import { useState, useEffect } from "react";
import { 
  getAILinks, 
  addAILink, 
  updateAILink, 
  removeAILink, 
  exportAILinksConfig, 
  importAILinksConfig,
  type AILinkConfig 
} from "../utils/aiLinksManager";

export default function AILinksManager() {
  const [links, setLinks] = useState<AILinkConfig[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState<AILinkConfig | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    isActive: true
  });

  // Carrega links ao montar o componente
  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = () => {
    setLinks(getAILinks());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLink) {
      // Atualizar link existente
      updateAILink(editingLink.id, formData);
      setEditingLink(null);
    } else {
      // Adicionar novo link
      addAILink(formData);
      setShowAddForm(false);
    }
    
    // Reset form
    setFormData({
      name: "",
      url: "",
      description: "",
      isActive: true
    });
    
    loadLinks();
  };

  const handleEdit = (link: AILinkConfig) => {
    setEditingLink(link);
    setFormData({
      name: link.name,
      url: link.url,
      description: link.description || "",
      isActive: link.isActive
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este link?")) {
      removeAILink(id);
      loadLinks();
    }
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateAILink(id, { isActive: !isActive });
    loadLinks();
  };

  const handleExport = () => {
    const config = exportAILinksConfig();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-links-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importAILinksConfig(content)) {
        alert("Configurações importadas com sucesso!");
        loadLinks();
      } else {
        alert("Erro ao importar configurações. Verifique o arquivo.");
      }
    };
    reader.readAsText(file);
  };

  const cancelEdit = () => {
    setEditingLink(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      url: "",
      description: "",
      isActive: true
    });
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciar Links de IA/Automação</h2>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
          >
            Exportar
          </button>
          <label className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm cursor-pointer">
            Importar
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#00B5BF] hover:bg-[#FF6A00] px-4 py-2 rounded text-sm"
          >
            Adicionar Link
          </button>
        </div>
      </div>

      {/* Lista de links */}
      <div className="grid gap-4 mb-6">
        {links.map((link) => (
          <div key={link.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{link.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      link.isActive 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {link.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <p className="text-blue-400 text-sm break-all mb-1">{link.url}</p>
                {link.description && (
                  <p className="text-gray-400 text-sm">{link.description}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Criado: {new Date(link.createdAt).toLocaleDateString('pt-BR')} | 
                  Atualizado: {new Date(link.updatedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleActive(link.id, link.isActive)}
                  className={`px-3 py-1 rounded text-xs ${
                    link.isActive 
                      ? 'bg-yellow-600 hover:bg-yellow-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {link.isActive ? 'Desativar' : 'Ativar'}
                </button>
                <button
                  onClick={() => handleEdit(link)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de adicionar/editar */}
      {showAddForm && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">
            {editingLink ? 'Editar Link' : 'Adicionar Novo Link'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                required
                placeholder="Ex: WhatsApp Principal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                required
                placeholder="https://wa.me/5511999999999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descrição (opcional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                rows={3}
                placeholder="Descrição do link e seu uso"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-sm">Link ativo</label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-[#00B5BF] hover:bg-[#FF6A00] px-6 py-2 rounded"
              >
                {editingLink ? 'Atualizar' : 'Adicionar'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Instruções */}
      <div className="mt-8 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h4 className="font-semibold mb-2">Como usar:</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• <strong>WhatsApp:</strong> Use IDs como "whatsapp" para links principais</li>
          <li>• <strong>Calendly:</strong> Configure links de agendamento</li>
          <li>• <strong>Chatbots:</strong> URLs de chatbots ou assistentes virtuais</li>
          <li>• <strong>Backup:</strong> Use exportar/importar para fazer backup das configurações</li>
          <li>• <strong>Integração:</strong> Links ativos são automaticamente usados nos formulários</li>
        </ul>
      </div>
    </div>
  );
}
