"use client";

import { useState, useEffect } from "react";
import { getWhatsAppLink } from "@/utils/aiLinksManager";

interface LeadFormData {
  nome: string;
  whatsapp: string;
  email: string;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    nome: "",
    whatsapp: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Função para enviar dados para o endpoint interno Next.js
  async function submitFormData(data: LeadFormData) {
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          whatsapp: data.whatsapp,
        }),
      });

      if (!response.ok) {
        return { success: false, error: await response.text() };
      }

      const result = await response.json();
      if (result.success) {
        return { success: true };
      } else {
        return { success: false, error: result.error || "Erro desconhecido" };
      }
    } catch (error: any) {
      return { success: false, error: error.message || "Erro desconhecido" };
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Máscara para telefone/whatsapp
    if (name === "whatsapp") {
      const phoneValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4})/, "$1-$2")
        .slice(0, 15);
      setFormData({ ...formData, [name]: phoneValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitFormData(formData);

      if (result.success) {
        setShowSuccess(true);
        
        // Dispara pixel de Lead do Facebook
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_name: "Form Submitted - Clube Limpa Nome",
            value: 97,
            currency: "BRL"
          });
        }

        // *** REMOVIDO O REDIRECIONAMENTO AUTOMÁTICO PARA WHATSAPP AQUI ***

        setTimeout(() => {
          onClose();
          setShowSuccess(false);
          setFormData({ nome: "", whatsapp: "", email: "" });
        }, 4000);
      } else {
        console.error("Erro ao enviar formulário:", result.error);
        alert("Erro ao enviar formulário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" data-modal="form">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
          type="button"
        >
          ×
        </button>

        <div className="p-6">
          {!showSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🎯 Receba Sua Oferta Exclusiva
                </h2>
                <p className="text-gray-900">
                  Preencha seus dados e receba acesso imediato ao método que já transformou milhares de vidas
                </p>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5BF] focus:border-transparent text-gray-900"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5BF] focus:border-transparent text-gray-900"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5BF] focus:border-transparent text-gray-900"
                    placeholder="seu@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00B5BF] hover:bg-[#FF6A00] text-white font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "🚀 RECEBER OFERTA AGORA"}
                </button>
              </form>

              {/* Garantia */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-900">
                  🔒 Seus dados estão seguros conosco
                </p>
              </div>
            </>
          ) : (
            /* Tela de sucesso */
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Dados Enviados com Sucesso!
              </h3>
              <p className="text-gray-600 mb-4 text-lg font-medium">
                Iremos entrar em contato com você pelo WhatsApp
              </p>
              <p className="text-sm text-gray-500">
                Este modal será fechado automaticamente...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
