"use client";

import Footer from "../components/ui/footer";
import Image from "next/image";
import ProgressBar from "./progressbar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Award from "./award";

const awardsData = [
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "emProgresso" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatar" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatado" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatado" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "emProgresso" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatar" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatado" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatado" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");

  const filteredAwards = awardsData.filter((award) => {
    const matchesFilter =
      userFilter === "all" || award.status === userFilter;
    const matchesSearch = award.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });


  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center p-4 sm:p-10 sm:ml-44">
          <div className="flex items-center justify-center w-14 h-14 bg-[#023859] rounded-xl mr-4">
            <Image
              src="/Prize.svg"
              width={42}
              height={42}
              alt="sobre"
              className="m-2"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#023859]">
            Conquistas
          </h1>
        </div>
        <ProgressBar percentage={100} />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center p-4 sm:p-10 sm:ml-44 relative">
          <Search className="absolute text-gray-500 left-11" />
          <Input
            type="text"
            placeholder="Procurar"
            className="pl-8 w-full md:w-80 border-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mr-10 p-10">
          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="emProgresso">Em Progresso</SelectItem>
              <SelectItem value="resgatar">Resgatar</SelectItem>
              <SelectItem value="resgatado">Resgatados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap w-full p-10 ml-44 mr-10 gap-24">
        {filteredAwards.map((award, index) => (
          <Award
            key={index}
            title={award.title}
            description={award.description}
            status={award.status}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
