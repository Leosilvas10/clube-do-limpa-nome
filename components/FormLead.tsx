export default function FormLead() {
  return (
    <div className="rounded-2xl bg-[#0B0B0B]/90 p-8 shadow-xl ring-1 ring-white/10 backdrop-blur-md">
      {/* Título acima do formulário */}
      <h3 className="text-center text-xl sm:text-2xl font-semibold text-white mb-8">
        Receba o contato de um dos nossos especialistas
      </h3>

      <form className="mx-auto max-w-[400px] space-y-5">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-indigo-200/65"
            htmlFor="name"
          >
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
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
            type="tel"
            className="form-input w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-[#00B5BF] focus:ring-[#00B5BF]"
            placeholder="(DDD) 90000-0000"
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
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
