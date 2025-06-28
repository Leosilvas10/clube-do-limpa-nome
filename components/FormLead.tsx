"use client";

import { useState } from "react";
import { submitFormData, redirectToWhatsApp, type FormData } from "../utils/formService";

export default function FormLead() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
    setPhone(value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData: FormData = {
      NOME: (form.elements.namedItem("name") as HTMLInputElement).value,
      TELEFONE: phone,
      "E-MAIL": (form.elements.namedItem("email") as HTMLInputElement).value,
    };

    try {
      // Envia dados para webhook do Make.com com fallbacks
      const result = await submitFormData(formData);

      if (result.success) {
        // Dispara o Pixel de Lead
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead");
        }

        setSuccess(true);
        
        // Redireciona para WhatsApp após 1.8 segundos
        setTimeout(() => {
          redirectToWhatsApp();
        }, 1800);
      } else {
        // Mesmo com falha, permite o redirecionamento mas mostra aviso
        setError("Houve um problema ao enviar seus dados, mas entraremos em contato!");
        setSuccess(true);
        
        setTimeout(() => {
          redirectToWhatsApp();
        }, 2500);
      }
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      setError("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-[#0B0B0B]/90 p-8 shadow-xl ring-1 ring-white/10 backdrop-blur-md">
      <h3 className="text-center text-xl sm:text-2xl font-semibold text-white mb-8">
        Receba o contato de um dos nossos especialistas
      </h3>
      <form className="mx-auto max-w-[400px] space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-1 block text-sm font-medium text-indigo-200/65"
            htmlFor="name"
          >
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-[#00B5BF] focus:ring-[#00B5BF]"
            placeholder="Seu nome completo"
            required
          />
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium text-indigo-200/65"
            htmlFor="phone"
          >
            Telefone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            className="form-input w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-[#00B5BF] focus:ring-[#00B5BF]"
            placeholder="(99) 90000-0000"
            required
          />
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium text-indigo-200/65"
            htmlFor="email"
          >
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-[#00B5BF] focus:ring-[#00B5BF]"
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="btn w-full rounded-md bg-[#00B5BF] px-4 py-2 text-[#F4F4F4] font-semibold transition duration-300 hover:bg-[#FF6A00] hover:text-white"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Registrar"}
          </button>
        </div>
        {success && !error && (
          <p className="mt-4 text-green-400 text-center text-base font-semibold">
            Cadastro realizado com sucesso! Aguarde, você será direcionado para o WhatsApp...
          </p>
        )}
        {error && (
          <p className="mt-4 text-yellow-400 text-center text-sm">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
