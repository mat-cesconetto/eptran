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
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  sexoEstatistica,
  acessosSemanais,
  acessosRegiao,
  acessosIdade,
  escolaridade,
  estados,
  cidades,
  escolas,
  bairros,
} from "./estatisticas";

export default function Estatisticas() {
  const [userFilter, setUserFilter] = useState("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getChartWidth = (defaultWidth: number) => {
    if (isMobile) return window.innerWidth - 32; // Subtracting padding
    if (isTablet) return (window.innerWidth - 48) / 2; // For 2 columns on tablet
    return defaultWidth;
  };

  return (
    <main className="min-h-screen p-4 md:p-8 pt-24 text-black">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">
        <div className="flex items-center gap-5">
          <Image
            src="/alert-square-filled-svgrepo-com.svg"
            width={50}
            height={50}
            alt="perfil"
          />
          <h1 className="text-darkBlue-500 text-2xl md:text-4xl font-bold">
            Gestão de Gráficos
          </h1>
        </div>
        <div className="w-full md:w-auto">
          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="text-darkBlue-500 font-bold w-full md:w-auto">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="text-darkBlue-500 font-bold">
              <SelectItem value="all">Masculino</SelectItem>
              <SelectItem value="active">Feminino</SelectItem>
              <SelectItem value="inactive">Não declarado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* gráfico 1 */}
        <div className="rounded-2xl border-2 p-4">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/Image/users-svgrepo-com.svg"
              width={100}
              height={20}
              alt="perfil"
            />
          </div>
          <h2 className="mt-6 text-center md:text-left font-bold text-darkBlue-500 text-4xl md:text-5xl">
            113.007k
          </h2>
          <p className="text-center md:text-left font-semibold text-darkBlue-200">
            <span className="mr-1 text-fonte-verde font-semibold">+9,07k</span>{" "}
            nos últimos 7 dias
          </p>
          <h3 className="mt-4 text-center md:text-left font-bold text-darkBlue-500 text-xl">
            Acessos Totais
          </h3>
        </div>

        {/* gráfico 2 */}
        <div className="rounded-2xl border-2 p-4">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl text-center">
            Quantidade de alunos por Escola
          </h2>
          <div className="max-w-md mx-auto p-4">
            <ol className="list-none space-y-3">
              {escolas.map((escola, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-lg"
                >
                  <span className="flex items-center">
                    <span className="text-sm md:text-lg font-bold text-[#0A305A] mr-2 md:mr-4">
                      {index + 1}.
                    </span>
                    <span className="text-sm md:text-lg font-bold text-[#0A305A]">
                      {escola.nomeEscola}
                    </span>
                  </span>
                  <span className="text-sm md:text-lg font-bold text-[#0A305A]">
                    {escola.valorEscola}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* gráfico 3 */}
        <div className="rounded-2xl border-2 p-4">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl md:text-3xl text-center">
            Quantidade de alunos por Região
          </h2>
          <div className="flex justify-center">
            <BarChart
              borderRadius={8}
              width={getChartWidth(300)}
              height={250}
              series={acessosRegiao.map((regiao) => ({
                data: regiao.data,
              }))}
              xAxis={[
                {
                  scaleType: "band",
                  data: ["S", "SU", "CO", "N", "NO"],
                  colorMap: {
                    type: "ordinal",
                    colors: [
                      "#ED8598",
                      "#B5EE88",
                      "#CA8DFB",
                      "#8995FA",
                      "#003A7E",
                    ],
                  },
                },
              ]}
              sx={{
                ".MuiChartsAxis-bottom .MuiChartsAxis-line": {
                  display: "none",
                },
                ".MuiChartsAxis-bottom .MuiChartsAxis-tick": {
                  display: "none",
                },
                ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                  fontWeight: "800",
                  fill: "#023859",
                },
                ".MuiChartsAxis-left .MuiChartsAxis-line": { display: "none" },
                ".MuiChartsAxis-left .MuiChartsAxis-tick": { display: "none" },
                ".MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                  fontWeight: "800",
                  fill: "#023859",
                },
              }}
              margin={{ top: 50, bottom: 30, left: 50, right: 10 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
        {/* gráfico 4 */}
        <div className="lg:col-span-2 border-2 rounded-xl p-3">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl md:text-3xl text-center">
            Acessos semanais
          </h2>
          <div className="flex justify-center mt-8">
            <BarChart
              borderRadius={8}
              width={getChartWidth(700)}
              height={320}
              series={acessosSemanais.map((serie) => ({
                data: serie.data,
                label: serie.label,
                color: serie.color,
              }))}
              xAxis={[
                {
                  data: ["SEG", "TER", "QUA", "QUI", "SEX"],
                  scaleType: "band",
                },
              ]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "top", horizontal: "middle" },
                  padding: -5,
                  labelStyle: {
                    fill: "#023859",
                    fontWeight: "Bold",
                    fontSize: 12,
                  },
                },
              }}
              sx={{
                ".MuiChartsAxis-bottom .MuiChartsAxis-line": {
                  display: "none",
                },
                ".MuiChartsAxis-bottom .MuiChartsAxis-tick": {
                  display: "none",
                },
                ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                  fontWeight: "800",
                  fill: "#023859",
                },
                ".MuiChartsAxis-left .MuiChartsAxis-line": { display: "none" },
                ".MuiChartsAxis-left .MuiChartsAxis-tick": { display: "none" },
                ".MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                  fontWeight: "800",
                  fill: "#023859",
                },
              }}
              margin={{ top: 50, bottom: 30, left: 50, right: 10 }}
            />
          </div>
        </div>

        {/* gráfico 5 */}
        <div className="border-2 rounded-2xl p-4">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl md:text-3xl text-center">
            Quantidade de alunos por Gêneros
          </h2>
          <div className="flex justify-center">
            <PieChart
              series={[
                {
                  data: sexoEstatistica,
                  innerRadius: 40,
                  outerRadius: 75,
                  arcLabelMinAngle: 45,
                },
              ]}
              sx={{
                "--ChartsLegend-rootSpacing": "10px",
                "--ChartsLegend-itemWidth": "100px",
              }}
              width={getChartWidth(500)}
              height={300}
              slotProps={{
                legend: {
                  direction: "column",
                  position: { vertical: "middle", horizontal: "right" },

                  labelStyle: {
                    fontWeight: "Bold",
                    fill: "#023859",
                    fontSize: 14,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {/* gráfico 6 */}
        <div className="border-2 rounded-2xl p-4">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl md:text-3xl text-center">
            Escolaridade
          </h2>
          <div className="flex justify-center ">
            <PieChart
              series={[
                {
                  data: escolaridade,
                  innerRadius: 40,
                  outerRadius: 75,
                  arcLabelMinAngle: 45,
                },
              ]}
              sx={{
                "--ChartsLegend-rootSpacing": "10px",
                "--ChartsLegend-itemWidth": "100px",
              }}
              width={getChartWidth(560)}
              height={300}
              slotProps={{
                legend: {
                  padding: -30,
                  direction: "column",
                  position: { vertical: "middle", horizontal: "right" },
                  labelStyle: {
                    fontWeight: "Bold",
                    fill: "#023859",
                    fontSize: 14,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* gráfico 7 */}
        <div className="border-2 rounded-2xl p-4">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl md:text-3xl text-center">
            Quantidade de alunos por Idade
          </h2>
          <div className="flex justify-center">
            <BarChart
              borderRadius={8}
              width={getChartWidth(400)}
              height={300}
              series={acessosIdade.map((idade) => ({
                data: idade.data,
              }))}
              xAxis={[
                {
                  data: ["6+", "11+", "14+", "18+"],
                  scaleType: "band",
                  colorMap: {
                    type: "ordinal",
                    colors: ["#B5EE88", "#CA8DFB", "#8995FA", "#003A7E"],
                  },
                },
              ]}
              sx={{
                ".MuiChartsAxis-bottom .MuiChartsAxis-line": {
                  display: "none",
                },
                ".MuiChartsAxis-bottom .MuiChartsAxis-tick": {
                  display: "none",
                },
                ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                  fontWeight: "800",
                  fill: "#023859",
                },
                ".MuiChartsAxis-left .MuiChartsAxis-line": { display: "none" },
                ".MuiChartsAxis-left .MuiChartsAxis-tick": { display: "none" },
                ".MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                  fontWeight: "800",
                  fill: "#023859",
                },
              }}
              margin={{ top: 50, bottom: 30, left: 50, right: 10 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {/* gráfico 8 */}
        <div className="rounded-2xl border-2 p-4">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl text-center">
            Quantidade de alunos por Estado
          </h2>
          <div className="max-w-md mx-auto p-4">
            <ol className="list-none space-y-3">
              {estados.map((estado, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-lg"
                >
                  <span className="flex items-center">
                    <span className="text-sm md:text-lg font-bold text-[#0A305A] mr-2 md:mr-4">
                      {index + 1}.
                    </span>
                    <span className="text-sm md:text-lg font-bold text-[#0A305A]">
                      {estado.nomeEstado}
                    </span>
                  </span>
                  <span className="text-sm md:text-lg font-bold text-[#0A305A]">
                    {estado.valorEstado}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* gráfico 9 */}
        <div className="rounded-2xl border-2 p-4">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl text-center">
            Quantidade de alunos por Cidade
          </h2>
          <div className="max-w-md mx-auto p-4">
            <ol className="list-none space-y-3">
              {cidades.map((cidade, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-lg"
                >
                  <span className="flex items-center">
                    <span className="text-sm md:text-lg font-bold text-[#0A305A] mr-2 md:mr-4">
                      {index + 1}.
                    </span>
                    <span className="text-sm md:text-lg font-bold text-[#0A305A]">
                      {cidade.nomeCidade}
                    </span>
                  </span>
                  <span className="text-sm md:text-lg font-bold text-[#0A305A]">
                    {cidade.valorCidade}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* gráfico 10 */}
        <div className="rounded-2xl border-2 p-4">
          <h2 className="mt-4 font-bold text-darkBlue-500 text-2xl text-center">
            Quantidade de alunos por Bairro
          </h2>
          <div className="max-w-md mx-auto p-4">
            <ol className="list-none space-y-3">
              {bairros.map((bairro, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-lg"
                >
                  <span className="flex items-center">
                    <span className="text-sm md:text-lg font-bold text-[#0A305A] mr-2 md:mr-4">
                      {index + 1}.
                    </span>
                    <span className="text-sm md:text-lg font-bold text-[#0A305A]">
                      {bairro.nomeBairro}
                    </span>
                  </span>
                  <span className="text-sm md:text-lg font-bold text-[#0A305A]">
                    {bairro.valorBairro}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
