"use client";

import { useState, useEffect, useRef } from "react";

export default function ExitIntentLeadForm() {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("exitIntentLeadShown") === "true") return;

    let hasInteracted = false;
    let exitIntentListener: ((e: MouseEvent) => void) | null = null;

    const activateExitIntent = () => {
      if (exitIntentListener) return;
      exitIntentListener = (e: MouseEvent) => {
        if (e.clientY <= 60) {
          setShowModal(true);
          localStorage.setItem("exitIntentLeadShown", "true");
          window.removeEventListener("mousemove", exitIntentListener!);
        }
      };
      window.addEventListener("mousemove", exitIntentListener);
    };

    const handleFirstMove = () => {
      hasInteracted = true;
      activateExitIntent();
      window.removeEventListener("mousemove", handleFirstMove);
    };

    window.addEventListener("mousemove", handleFirstMove);

    return () => {
      window.removeEventListener("mousemove", handleFirstMove);
      if (exitIntentListener) {
        window.removeEventListener("mousemove", exitIntentListener);
      }
    };
  }, []);

  // Fecha modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    }
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

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

    const form = e.currentTarget;
    const data = {
      NOME: (form.elements.namedItem("name") as HTMLInputElement).value,
      TELEFONE: phone,
      "E-MAIL": (form.elements.namedItem("email") as HTMLInputElement).value,
    };

    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => params.append(key, value));

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzu62ouQCWjAx-mTKm4StLhCQu6j_m2uGCAVOLn104Uy7TpbPIGssCEQ5i__TINZI9mSQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );
      alert("Lead enviado com sucesso!");
      form.reset();
      setPhone("");
      setShowModal(false);
    } catch (error) {
      alert("Erro ao enviar lead.");
    } finally {
      setLoading(false);
    }
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-2xl bg-[#181A20] p-8 shadow-2xl ring-1 ring-white/10"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={() => setShowModal(false)}
          aria-label="Fechar"
        >
          ×
        </button>
        <h3 className="text-center text-xl font-semibold text-white mb-6">
          Antes de sair, receba o contato de um de nossos especialistas!
        </h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-indigo-200/65"
              htmlFor="name-exit"
            >
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              id="name-exit"
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
              htmlFor="phone-exit"
            >
              Telefone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone-exit"
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
              htmlFor="email-exit"
            >
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              id="email-exit"
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
        </form>
      </div>
    </div>
  );
}
