"use client";

export default function TermosDeUso() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f8fafc]">
      {/* Faixa azul escuro do topo, com padding extra para garantir visibilidade */}
      <section className="w-full bg-[#0b2238] flex flex-col items-center px-4 pt-8 pb-20">
        <div className="flex flex-col items-center gap-2 max-w-3xl w-full">
          <h1 className="text-white text-3xl font-bold leading-tight text-center">
            TERMO DE USO – CLUBE LIMPA NOME
          </h1>
          <p className="text-[#b7e0ef] text-base text-center">
            Última atualização: 16/06/2025
          </p>
        </div>
      </section>

      {/* Card branco centralizado dos termos, com margem negativa menor para não sobrepor o topo */}
      <section className="w-full flex justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg -mt-10 mb-12 px-6 py-10">
          <p className="mb-6 text-gray-700">
            Bem-vindo ao <span className="font-semibold text-[#003046]">Clube Reconquista</span>, uma plataforma que oferece planos acessíveis para auxiliar pessoas com restrições no nome a reconquistar sua liberdade financeira por meio de processos administrativos e judiciais devidamente fundamentados.
          </p>
          <p className="mb-8 text-gray-700">
            Ao acessar ou contratar nossos serviços, você declara que leu, entendeu e concorda com estes Termos de Uso.
          </p>

          <hr className="my-6 border-[#003046]" />

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">1. OBJETIVO</h2>
          <ul className="list-disc pl-5 text-gray-800 mb-4">
            <li>Análise de CPF nos órgãos de proteção ao crédito;</li>
            <li>Acompanhamento jurídico para ações judiciais de retirada do nome dos birôs de crédito;</li>
            <li>Participação mensal em contemplações (por sorteio e lance) com possibilidade de quitar ou negociar dívidas com o valor contemplado;</li>
            <li>Suporte e garantia de atendimento por até 12 meses.</li>
          </ul>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">2. DA CONTRATAÇÃO</h2>
          <ul className="list-disc pl-5 text-gray-800 mb-4">
            <li>Preenchimento de formulário;</li>
            <li>Análise de viabilidade;</li>
            <li>Envio e aceite do contrato via assinatura digital;</li>
            <li>Pagamento da primeira parcela via link seguro.</li>
          </ul>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">3. DOS SERVIÇOS PRESTADOS</h2>
          <ul className="list-disc pl-5 text-gray-800 mb-4">
            <li>Realizar a análise completa do CPF junto aos órgãos de proteção ao crédito;</li>
            <li>Identificar débitos negativados e preparar a estratégia de atuação;</li>
            <li>Acionar juridicamente os credores, quando cabível, solicitando a exclusão do nome do cliente nos birôs;</li>
            <li>Acompanhar o cliente por até 12 meses.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Observação:</span> O Clube Reconquista não se responsabiliza pela quitação da dívida, mas sim pela exclusão do nome do cliente nos órgãos de proteção ao crédito, mediante ação jurídica, quando legalmente cabível.
          </p>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">4. OBRIGAÇÕES DO CONTRATANTE</h2>
          <ul className="list-disc pl-5 text-gray-800 mb-4">
            <li>Fornecer dados verdadeiros e atualizados;</li>
            <li>Manter contato ativo com nossa equipe de atendimento e jurídico;</li>
            <li>Realizar os pagamentos dentro dos prazos estabelecidos;</li>
            <li>Enviar todos os documentos solicitados para análise e movimentação processual.</li>
          </ul>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">5. DOS PRAZOS</h2>
          <ul className="list-disc pl-5 text-gray-800 mb-4">
            <li>O prazo médio para retirada do nome é de até 45 dias úteis após o início da ação judicial.</li>
            <li>O Clube Reconquista oferece suporte e acompanhamento por 12 meses, a contar da assinatura do contrato.</li>
          </ul>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">6. DAS CONTEMPLAÇÕES</h2>
          <p className="text-gray-700 mb-4">
            O plano inclui a participação mensal em contemplações, por sorteio e lance, com o objetivo de oferecer recursos extras para negociação ou liquidação de débitos.
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Importante:</span> A contemplação não é garantida e depende de regras internas, número de participantes e valores disponíveis no mês vigente.
          </p>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">7. LIMITAÇÃO DE RESPONSABILIDADE</h2>
          <ul className="list-disc pl-5 text-gray-800 mb-4">
            <li>A quitação total ou parcial das dívidas;</li>
            <li>O fim de cobranças extrajudiciais por parte dos credores;</li>
            <li>Aprovação de crédito imediato após a retirada do nome.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Nos comprometemos exclusivamente com o processo de retirada do nome dos órgãos de proteção ao crédito, conforme o plano contratado e legislação vigente.
          </p>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">8. POLÍTICA DE CANCELAMENTO</h2>
          <ul className="list-disc pl-5 text-gray-800 mb-4">
            <li>O contratante pode solicitar o cancelamento em até 7 dias corridos após o pagamento inicial, com reembolso integral.</li>
            <li>Após esse prazo, os valores pagos não são reembolsáveis, uma vez que os serviços jurídicos e administrativos são iniciados imediatamente após a contratação.</li>
          </ul>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">9. PRIVACIDADE E PROTEÇÃO DE DADOS</h2>
          <p className="text-gray-700 mb-4">
            Todos os dados informados pelo contratante são protegidos conforme a LGPD (Lei Geral de Proteção de Dados Pessoais) e usados exclusivamente para a prestação dos serviços contratados.
          </p>

          <h2 className="font-bold text-[#003046] text-lg mt-6 mb-2">10. DISPOSIÇÕES FINAIS</h2>
          <p className="text-gray-700 mb-4">
            Este Termo poderá ser atualizado a qualquer momento, sem aviso prévio, sendo responsabilidade do contratante consultar a versão mais recente no site oficial.
          </p>
          <p className="text-gray-700 mb-4">
            Em caso de dúvidas, entre em contato pelo nosso atendimento:<br />
            <span className="font-semibold">WhatsApp:</span> 75 98110-1505<br />
            <span className="font-semibold">E-mail:</span> suporte@clubelimpanome.com.br
          </p>
        </div>
      </section>
    </main>
  );
}
