"use client";

import { useState } from "react";
import { getWhatsAppLink } from "@/utils/aiLinksManager";

// Defina o tipo para os dados do formulário
interface LeadFormData {
  NOME: string;
  TELEFONE: string;
  "E-MAIL": string;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    NOME: "",
    TELEFONE: "",
    "E-MAIL": "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Função para enviar os dados ao Google Apps Script
  async function submitFormData(formData: LeadFormData) {
    try {
      const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      const data = new FormData();
      data.append("NOME", formData.NOME);
      data.append("TELEFONE", formData.TELEFONE);
      data.append("E-MAIL", formData["E-MAIL"]);
      data.append("timestamp", new Date().toISOString());
      data.append("source", "formmodal");

      const response = await fetch(url as string, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        return { success: false, error: await response.text() };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Erro desconhecido" };
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Máscara para telefone
    if (name === "TELEFONE") {
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
        // Abrir WhatsApp com os dados do lead
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
        const nome = formData.NOME;
        const telefone = formData.TELEFONE;
        const email = formData["E-MAIL"];
        const msg = `Olá! Meu nome é ${nome}, meu WhatsApp é ${telefone} e meu e-mail é ${email}. Quero receber minha oferta exclusiva!`;
        const link = getWhatsAppLink() || `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`;
        const url = `${link}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank");

        // Fecha o modal após mostrar a mensagem
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
          setFormData({ NOME: "", TELEFONE: "", "E-MAIL": "" });
        }, 4000); // 4 segundos para ler a mensagem
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

  if (!isOpen) {
    console.log('FormModal: não está aberto');
    return null;
  }
  console.log('FormModal: modal aberto!');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
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
                <p className="text-gray-600">
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
                    name="NOME"
                    value={formData.NOME}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5BF] focus:border-transparent"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="TELEFONE"
                    value={formData.TELEFONE}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5BF] focus:border-transparent"
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
                    name="E-MAIL"
                    value={formData["E-MAIL"]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B5BF] focus:border-transparent"
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
                <p className="text-xs text-gray-500">
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
