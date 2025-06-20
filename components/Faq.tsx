// components/Faq.tsx
"use client";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
  {
    question: "Eu preciso pagar minha dívida para limpar o nome?",
    answer:
      "Não. A ação judicial garante a retirada do seu nome dos órgãos de restrição, mesmo que a dívida continue existindo.",
  },
  {
    question: "Em quanto tempo meu nome sai do SPC e Serasa?",
    answer:
      "Em média, de 30 a 45 dias úteis após a entrada da ação.",
  },
  {
    question: "Ainda receberei ligações de cobrança?",
    answer:
      "Sim. Como a dívida não é quitada, o credor pode continuar tentando cobrar — mas seu nome estará limpo para crédito, financiamento, cartão, etc.",
  },
  {
    question: "Existe garantia?",
    answer:
      "Sim. Você terá 12 meses de garantia e acompanhamento completo.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 border-b-2 border-cyan-600 inline-block">
        Perguntas Frequentes (FAQ)
      </h2>
      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#161b22] rounded-xl shadow border border-[#222] transition"
          >
            <button
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
            >
              <span className="text-lg font-semibold text-white">{item.question}</span>
              <span className="text-cyan-400 text-2xl">
                {openIndex === idx ? <FiMinus /> : <FiPlus />}
              </span>
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-gray-200 text-base animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
