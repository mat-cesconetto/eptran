"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useState } from "react";

const escolas = [
  { nomeEscola: "Escola Sesi", valorEscola: 113 },
  { nomeEscola: "E.E.B. GAG", valorEscola: 215 },
  { nomeEscola: "Colégio Santo Antônio", valorEscola: 15 },
  { nomeEscola: "E.E.M. Celso Ramos", valorEscola: 12 },
  { nomeEscola: "Bom Jesus", valorEscola: 36 },
];

const estados = [
  { nomeEstado: "Santa Catarina", valorEstado: 113 },
  { nomeEstado: "Paraná", valorEstado: 215 },
  { nomeEstado: "Rio Grande do Sul", valorEstado: 15 },
  { nomeEstado: "Bahia", valorEstado: 12 },
  { nomeEstado: "São Paulo", valorEstado: 36 },
];

const cidades = [
  { nomeCidade: "Joinville", valorCidade: 113 },
  { nomeCidade: "Blumenau", valorCidade: 215 },
  { nomeCidade: "Barra do Sul", valorCidade: 15 },
  { nomeCidade: "Criciúma", valorCidade: 12 },
  { nomeCidade: "Anta Gorda", valorCidade: 36 },
];

const bairros = [
  { nomeBairro: "Centro", valorBairro: 113 },
  { nomeBairro: "Bucarein", valorBairro: 215 },
  { nomeBairro: "Santo Antônio", valorBairro: 15 },
  { nomeBairro: "América", valorBairro: 12 },
  { nomeBairro: "Vila Nova", valorBairro: 36 },
];

export default function Estatisticas() {
  const [userFilter, setUserFilter] = useState("all");

  return (
    <main className="min-h-screen p-4 md:p-8 lg:pl-72 pt-24 text-black">
      <div className="mt-24 py-5 flex gap-5 ">
        <div>
          <Image
            src="/ticket-8-svgrepo-com.svg"
            width={50}
            height={50}
            alt="perfil"
          />
        </div>
        <div className="text-darkBlue-500 text-4xl font-bold pt-2">
          <h1>Gestão de Gráficos</h1>
        </div>
      </div>

      <div className="w-full items-end justify-end flex">
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className=" text-darkBlue-500 font-bold w-full md:w-auto">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="text-darkBlue-500 font-bold">
            <SelectItem value="all">Masculino</SelectItem>
            <SelectItem value="active">Feminino</SelectItem>
            <SelectItem value="inactive">Não declarado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* div principal 1 */}

      <div className="w-full h-full mt-10 flex justify-between">
        {/* gráfico 1 */}

        <div className=" w-96 h-80 rounded-2xl border-2">
          <div className="mt-10 ml-12">
            <Image
              src="/Image/users-svgrepo-com.svg"
              width={100}
              height={20}
              alt="perfil"
            />
          </div>

          <h1 className="mt-6 ml-12 font-bold text-darkBlue-500 text-5xl">
            113.007k
          </h1>

          <p className="ml-12 flex font-semibold text-darkBlue-200">
            <p className="mr-1 text-fonte-verde font-semibold">+9,07k</p> nos
            últimos 7 dias
          </p>

          <h1 className="mt-4 ml-12 font-bold text-darkBlue-500 text-xl">
            Acessos Totais
          </h1>
        </div>

        {/* gráfico 2 */}

        <div className="w-96 h-80 rounded-2xl border-2">
          <div className="align-middle text-center">
            <h2 className="mt-10 font-bold text-darkBlue-500 text-2xl">
              Principais escolas
            </h2>

            <div className="max-w-md mx-auto p-8 py-6">
              <ol className="list-none space-y-3">
                {escolas.map((escolas, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg"
                  >
                    <span className="flex items-center">
                      <span className="text-lg font-bold text-[#0A305A] mr-4">
                        {index + 1}.
                      </span>
                      <span className="text-lg font-bold text-[#0A305A]">
                        {escolas.nomeEscola}
                      </span>
                    </span>
                    <span className="text-lg font-bold text-[#0A305A]">
                      {escolas.valorEscola}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* gráfico 3 */}

        <div className=" w-96 h-80 rounded-2xl border-2">
        </div>
      </div>
      {/* div principal 2 */}

      <div className="w-full h-full mt-10 flex justify-between">
        {/* gráfico 4 */}

        <div className="w-[62.5%] h-96 border-2 rounded-2xl">4</div>

        {/* gráfico 5 */}

        <div className="w-96 h-96 border-2 rounded-2xl">5</div>
      </div>

      {/* div principal 3 */}

      <div className="w-full h-full mt-10 flex justify-between">
        {/* gráfico 6 */}

        <div className="w-[48%] h-96 border-2 rounded-2xl">6</div>

        {/* gráfico 7 */}

        <div className="w-[48%] h-96 border-2 rounded-2xl">7</div>
      </div>

      {/* div principal 4 */}

      <div className="w-full h-full mt-10 flex justify-between">
        {/* gráfico 8 */}

        <div className="w-96 h-80 rounded-2xl border-2">
          <div className="align-middle text-center">
            <h2 className="mt-10 font-bold text-darkBlue-500 text-2xl">
              Acessos por estado
            </h2>

            <div className="max-w-md mx-auto p-8 py-6">
              <ol className="list-none space-y-3">
                {estados.map((estados, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg"
                  >
                    <span className="flex items-center">
                      <span className="text-lg font-bold text-[#0A305A] mr-4">
                        {index + 1}.
                      </span>
                      <span className="text-lg font-bold text-[#0A305A]">
                        {estados.nomeEstado}
                      </span>
                    </span>
                    <span className="text-lg font-bold text-[#0A305A]">
                      {estados.valorEstado}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
    
        

        {/* gráfico 9 */}

        <div className="w-96 h-80 rounded-2xl border-2">
          <div className="align-middle text-center">
            <h2 className="mt-10 font-bold text-darkBlue-500 text-2xl">
            Acessos por cidade
            </h2>

            <div className="max-w-md mx-auto p-8 py-6">
              <ol className="list-none space-y-3">
                {cidades.map((cidades, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg"
                  >
                    <span className="flex items-center">
                      <span className="text-lg font-bold text-[#0A305A] mr-4">
                        {index + 1}.
                      </span>
                      <span className="text-lg font-bold text-[#0A305A]">
                        {cidades.nomeCidade}
                      </span>
                    </span>
                    <span className="text-lg font-bold text-[#0A305A]">
                      {cidades.valorCidade}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>



        {/* gráfico 10 */}

        <div className="w-96 h-80 rounded-2xl border-2">
          <div className="align-middle text-center">
            <h2 className="mt-10 font-bold text-darkBlue-500 text-2xl">
            Acessos por bairro
            </h2>

            <div className="max-w-md mx-auto p-8 py-6">
              <ol className="list-none space-y-3">
                {bairros.map((bairros, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg"
                  >
                    <span className="flex items-center">
                      <span className="text-lg font-bold text-[#0A305A] mr-4">
                        {index + 1}.
                      </span>
                      <span className="text-lg font-bold text-[#0A305A]">
                        {bairros.nomeBairro}
                      </span>
                    </span>
                    <span className="text-lg font-bold text-[#0A305A]">
                      {bairros.valorBairro}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
