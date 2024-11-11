"use client"

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTopSchoolsAccesses } from "@/hooks/useGraficos"; // Ajuste o caminho conforme necessário

interface Escola {
  escola: string;
  totalAcessos: number;
}

interface SexoEstatistica {
  label: string;
  value: number;
}

interface AcessosSemanais {
  dia: string; // Nome do dia ou rótulo
  totalAcessos: number; // Número de acessos
}

export default function Estatisticas() {
  const [userFilter, setUserFilter] = useState("all");
  const [sexoEstatistica, setSexoEstatistica] = useState<SexoEstatistica[]>([]);
  const [acessosSemanais, setAcessosSemanais] = useState<AcessosSemanais[]>([]);

  // Usar o hook para pegar os dados das escolas
  const { data: escolas = [], error: escolasError } = useTopSchoolsAccesses();

  useEffect(() => {
    async function fetchData() {
      try {
        const sexoResponse = await fetch("/api/sexo");
        const acessosResponse = await fetch("/api/acessos-semanais");

        setSexoEstatistica(await sexoResponse.json());
        setAcessosSemanais(await acessosResponse.json());
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  // Preparar os dados para o gráfico de barras
  const barData = acessosSemanais.map((item) => ({
    dia: item.dia, // Renomeie para algo que o BarChart espera, por exemplo 'dia'
    totalAcessos: item.totalAcessos, // Renomeie para algo que o BarChart espera, por exemplo 'totalAcessos'
  }));

  return (
    <main className="min-h-screen p-4 md:p-8 pt-24 text-black">
      <div className="flex space-x-2">
      <Image
            src="/alert-square-filled-svgrepo-com.svg"
            width={50}
            height={50}
            alt="perfil"
          />
          <h1 className="text-darkBlue-500 text-2xl md:text-4xl font-bold">
          Estaítsticas
        </h1>
      </div>

      {/* Select de filtro */}
      <div className="w-full items-end justify-end flex">
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="text-darkBlue-500 font-bold w-full md:w-auto">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="text-darkBlue-500 font-bold">
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="feminino">Feminino</SelectItem>
            <SelectItem value="naoDeclarado">Não declarado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Renderização dos gráficos e dados */}
      <div className="w-full h-full mt-10 flex justify-between">
        {/* Renderização dinâmica dos gráficos com dados da API */}

        {/* Gráfico Principais Escolas */}
        <div className="w-96 h-80 rounded-2xl border-2">
          <h2 className="mt-10 text-center font-bold text-darkBlue-500 text-2xl">
            Principais Escolas
          </h2>
          <div className="max-w-md mx-auto p-8 py-6">
            <ol className="list-none space-y-3">
              {escolas.map((escola: Escola, index: number) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0A305A] mr-4">
                    {index + 1}.
                  </span>
                  <span className="text-lg font-bold text-[#0A305A]">
                    {escola.escola}
                  </span>
                  <span className="text-lg font-bold text-[#0A305A]">
                    {escola.totalAcessos}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Gráfico de Sexo */}
        <div className="grid border-2 rounded-2xl">
          <h2 className="mt-4 text-center font-bold text-darkBlue-500 text-3xl">
            Sexo
          </h2>
          <div className="max-w-md mx-auto p-8 py-6">
            <Box sx={{ width: "100%", height: "100%" }}>
              <PieChart
                series={[
                  {
                    data: sexoEstatistica,
                    innerRadius: 80,
                    outerRadius: 120,
                    arcLabelMinAngle: 45,
                  },
                ]}
                width={400}
                height={400}
                margin={{ top: 10, bottom: 100, left: 30, right: 30 }}
              />
            </Box>
          </div>
        </div>

        {/* Gráfico de Acessos Semanais */}
        <div className="grid border-2 rounded-2xl">
          <h2 className="mt-4 text-center font-bold text-darkBlue-500 text-3xl">
            Acessos Semanais
          </h2>
          <Box sx={{ width: "100%", height: "100%" }}>
            <BarChart
              series={[
                {
                  data: barData.map((item) => item.totalAcessos), // Obtém apenas os valores numéricos
                  label: "Acessos Semanais",
                },
              ]}
              width={400}
              height={400}
              margin={{ top: 10, bottom: 100, left: 30, right: 30 }}
            />
          </Box>
        </div>
      </div>
    </main>
  );
}
