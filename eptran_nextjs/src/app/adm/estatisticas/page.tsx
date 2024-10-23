"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";


const priorityColors = {
    'Alta': "bg-red-200  font-semibold text-red-700",
    'Média': "bg-yellow-200 text-yellow-600 font-semibold",
    'Baixa': "bg-blue-200 text-blue-600 font-semibold",
    'Nenhuma': "bg-gray-300 text-gray-700 font-semibold",
  };
  
  const priorityStatus = {
    'Em andamento': "bg-orange-200 text-orange-600 font-semibold",
    'Em aberto': "bg-green-200 text-green-600 font-semibold",
    'Resolvido': "bg-blue-200 text-blue-600 font-semibold",
    'Cancelado': "bg-gray-300 text-gray-700 font-semibold",
  };

  const users = [
    {
      id: "23222",
      name: "José Silva",
      assunto: "Dificuldade para entrar no jogo",
      prioridade: "Média",
      status: "Em aberto",
      data: "11/12/2024",
    },
  ];

export default function Estatisticas() {

        const [searchTerm, setSearchTerm] = useState("");
        const [userFilter, setUserFilter] = useState("all");
      
        const getPriorityColor = (priority: string) => {
          return (
            priorityColors[priority as keyof typeof priorityColors] ||
            priorityColors["Nenhuma"]
          );
        };
      
        const getPriorityStatus = (priority: string) => {
          return (
            priorityStatus[priority as keyof typeof priorityStatus] ||
            priorityStatus["Cancelado"]
          );
        };
      
        const filteredUsers = users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.includes(searchTerm)
        );
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

        <div className=" w-96 h-80 rounded-2xl border-2">1</div>

        {/* gráfico 2 */}

        <div className=" w-96 h-80 rounded-2xl border-2">2</div>

        {/* gráfico 3 */}

        <div className=" w-96 h-80 rounded-2xl border-2">3</div>

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
