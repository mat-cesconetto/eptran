"use client";

import React from "react";

export default function Suporte() {
  return (
    <main className="w-full min-h-screen p-4 lg:pl-72 lg:pt-36">
      <h1 className="text-darkBlue-500 font-bold text-2xl md:text-3xl mb-4 lg:pl-10 lg:pt-10">
        Ticket de USUARIO
      </h1>
      <hr className="bg-darkBlue-500 w-auto my-4 border-1 border-darkBlue-500 rounded-full lg:ml-10 lg:mr-28" />

      <div className="lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-28 mt-6">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">DETALHES</h2>
          <hr className="bg-darkBlue-400 w-auto my-2 border-1 border-darkBlue-500 rounded-full lg:mr-20" />
          <br />
          <h3 className="font-semibold text-darkBlue-500 text-md">Nome</h3>
          <input
            type="text"
            value="Henrique Ataide"
            className="text-gray-400 h-10 w-full mt-2 px-2 bg-transparent"
            readOnly
          />
          <h3 className="pt-6 font-semibold text-darkBlue-500 text-md">
            Email
          </h3>
          <input
            type="email"
            value="Henrique45Ataide@gmail.com"
            className="text-gray-400 h-10 w-full mt-2 px-2 bg-transparent"
            readOnly
          />
          <h3 className="font-semibold text-darkBlue-500 text-md pt-6">
            ASSUNTO
          </h3>
          <input
            type="text"
            className="text-gray-400 h-10 w-full mt-2 px-2 bg-transparent"
            value="Estou com problema ao entrar no jogo"
            id="Assunto"
            disabled
          />
          <h3 className="pt-6 font-semibold text-darkBlue-500 text-md">
            DESCRIÇÃO
          </h3>
          <input
            className="text-gray-400 h-10 w-full mt-2 px-2 bg-transparent"
            name="descricao"
            id="Descricao"
            value="Não consigo acessar o jogo por algum motivo"
            disabled
          />
          <h3 className="mt-5 font-semibold text-darkBlue-500 text-md">
            ANEXOS
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <input type="image" alt="anexo 1" className="w-16 h-16 border" />
            <input type="image" alt="anexo 2" className="w-16 h-16 border" />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-darkBlue-500 text-md">
                CRIAÇÃO DO TICKET
              </h3>
              <p className="mt-2 w-full px-2 font-semibold">24/07/2024</p>
            </div>
            <div>
              <h3 className="font-semibold text-darkBlue-500 text-md">
                STATUS
              </h3>
              <input
                type="text"
                name="status"
                id="status"
                value="Em Andamento"
                className="mt-2 w-full px-2 text-black font-semibold bg-transparent"
                readOnly
              />
            </div>
            <div>
              <h3 className="font-semibold text-darkBlue-500 text-md">
                PRIORIDADE
              </h3>
              <select
                name=""
                id=""
                className="mt-2 w-full px-2 font-semibold bg-transparent border border-gray-300 rounded"
              >
                <option value="nenhum">Nenhuma</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-1 mt-8 lg:mt-0">
          <h2 className="text-xl font-semibold">RESPOSTA</h2>
          <hr className="bg-darkBlue-400 w-full my-2 border-1 border-darkBlue-500 rounded-full lg:mr-20" />
          <br />
          <h3 className="font-semibold text-darkBlue-500 text-md">
            RESPOSTA AO TICKET
          </h3>
          <textarea
            className="border-2 border-darkBlue-300 rounded-md mt-2 resize-none p-3 w-full h-48"
            name="descricao"
            id="Descricao"
            placeholder="Insira sua resposta"
          ></textarea>
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4 sm:gap-9">
            <button className="bg-white border-darkBlue-500 border-2 rounded-md px-10 h-12 text-darkBlue-500 font-bold hover:bg-gray-200 w-full sm:w-auto">
              CANCELAR
            </button>
            <button className="bg-darkBlue-500 border-darkBlue-500 border-2 rounded-md px-14 h-12 text-white font-bold hover:bg-slate-400 w-full sm:w-auto">
              ENVIAR
            </button>
          </div>
          <div>
            <div className="mt-28 flex flex-col sm:flex-row justify-end gap-4 sm:gap-9">
              <button className="mt-20 bg-red-400 border-red-400 border-2 rounded-md px-4 sm:px-20 lg:px-80 h-12 text-white font-bold hover:bg-red-200 w-full sm:w-auto">
                FINALIZAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
