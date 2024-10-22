"use client"

import Footer from "../components/ui/footer"
import Image from "next/image"
import ProgressBar from "./progressbar"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Award from "./award"

const awardsData = [
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "emProgresso" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatar" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatado" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatado" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "emProgresso" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatar" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatado" },
  { title: "Nome Conquista", description: "Descrição da conquista explicando detalhadamente como a conquista-la", status: "resgatado" },
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userFilter, setUserFilter] = useState("all")

  const filteredAwards = awardsData.filter((award) => {
    const matchesFilter =
      userFilter === "all" || award.status === userFilter
    const matchesSearch = award.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-6 md:pt-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-14 h-14 bg-[#023859] rounded-xl mr-4">
              <Image
                src="/Prize.svg"
                width={42}
                height={42}
                alt="sobre"
                className="m-2"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#023859]">
              Conquistas
            </h1>
          </div>
          <ProgressBar percentage={100} />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-10">
          <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
            <Search className="absolute text-gray-500 left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Procurar"
              className="pl-10 w-full sm:w-80 border-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="w-full sm:w-auto">
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

      <div className="flex flex-wrap justify-between w-screen sm:justify-start gap-4 sm:gap-16 px-4 sm:px-8 md:px-16 lg:px-32 py-6 sm:py-10">
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
  )
}