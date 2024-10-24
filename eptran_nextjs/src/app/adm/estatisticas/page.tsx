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
  { nome: "Escola Sesi", value: 113 },
  { nome: "E.E.B. GAG", value: 215 },
  { nome: "Colégio Santo Antônio", value: 15 },
  { nome: "E.E.M. Celso Ramos", value: 12 },
  { nome: "Bom Jesus", value: 36 },
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
                        {escolas.nome}
                      </span>
                    </span>
                    <span className="text-lg font-bold text-[#0A305A]">
                      {escolas.value}
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

        <div className=" w-96 h-80 rounded-2xl border-2">8</div>

        {/* gráfico 9 */}

        <div className=" w-96 h-80 rounded-2xl border-2">9</div>

        {/* gráfico 10 */}

        <div className=" w-96 h-80 rounded-2xl border-2">10</div>
      </div>
    </main>
  );
}
