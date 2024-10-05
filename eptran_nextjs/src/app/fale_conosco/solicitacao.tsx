import React from "react";
import { Button } from "@nextui-org/react";

const Solicitacao: React.FC = () => {
  return (
    <div className="w-full max-w-3xl m-auto p-4">
      <h3 className="text-lg text-[#023859] font-semibold">DETALHES</h3>
      <div className="w-full h-0.5 bg-black mb-4"></div>
      <form className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-1 sm:col-span-2">
          <label
            className="font-semibold mb-2 block text-blue-950"
            htmlFor="assunto"
          >
            ASSUNTO
          </label>
          <input
            className="w-full p-2 border border-blue-900 rounded-md h-12"
            type="text"
            placeholder="Assunto"
            id="assunto"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label
            className="font-semibold mb-2 block text-blue-950"
            htmlFor="descricao"
          >
            DESCRIÇÃO
          </label>
          <textarea
            rows={4}
            className="w-full p-2 border border-blue-900 rounded-md"
            placeholder="Descreva o problema"
            id="descricao"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label
            className="font-semibold mb-2 block text-blue-950"
            htmlFor="anexos"
          >
            ANEXOS
          </label>
          <div className="relative w-full p-4 border-dotted h-36 border-2 border-blue-900 rounded-md flex flex-col items-center justify-center space-y-2">
            <p className="text-blue-900 text-center font-bold">
              / ADICIONE OU SOLTE OS ARQUIVOS AQUI
            </p>
            <input
              type="file"
              id="anexos"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple
            />
          </div>
        </div>
      </form>
      <div className="w-full mt-6 text-center">
        <Button className="bg-[#023859] text-white font-bold w-52 h-12 rounded-md bordeer-0 mb-40">
          ENVIAR
        </Button>
      </div>
    </div>
  );
};

export default Solicitacao;
