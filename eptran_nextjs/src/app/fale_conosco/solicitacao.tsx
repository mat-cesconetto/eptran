import React from "react";

const Solicitacao: React.FC = () => {
  return (
    <div className="w-full max-w-3xl m-auto p-4">
      <h3 className="text-lg text-[#023859] font-semibold">DETALHES</h3>
      <div className="w-full h-0.5 bg-black mb-4"></div>
      <form className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Assunto */}
        <div className="col-span-1 sm:col-span-2">
          <label className="font-normal mb-2 block" htmlFor="assunto">
            Assunto
          </label>
          <input
            className="w-full h-12 p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Assunto"
            id="assunto"
          />
        </div>
        
        {/* Descrição */}
        <div className="col-span-1 sm:col-span-2">
          <label className="font-normal mb-2 block" htmlFor="descricao">
            Descrição
          </label>
          <textarea
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Descreva o problema"
            id="descricao"
          />
        </div>
      </form>
    </div>
  );
};

export default Solicitacao;
