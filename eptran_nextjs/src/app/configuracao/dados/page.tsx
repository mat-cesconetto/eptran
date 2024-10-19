'use client'

import { Button } from "@nextui-org/react";
import AlterData from "../../components/ui/form-alter";
import Photo from "../../components/ui/photo";
import School from "../../components/ui/school";
import { useState } from "react";
import { useAlter } from "@/hooks/useAlterUserData";

export default function Home() {
  const [alterDataForm, setAlterDataForm] = useState({});
  const [schoolForm, setSchoolForm] = useState({});
  const { alterUser, isLoading, error } = useAlter();

  // Função que captura os dados de ambos os forms
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Combine os dados dos formulários
    const updates = {
      ...alterDataForm,
      ...schoolForm,
    };

    try {
      await alterUser(updates);
      console.log("Dados alterados com sucesso");
      // Aqui você pode adicionar lógica para indicar que a atualização foi bem-sucedida
    } catch (error) {
      console.error("Erro ao alterar dados:", error);
      // Lidar com o erro (ex: mostrar mensagem para o usuário)
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-6 md:pt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003966]">
        Dados Pessoais
      </h1>
      <hr className="w-full bg-black h-0.5 my-4" />

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-10 pt-6 lg:pt-7">
            <h2 className="text-black text-xl sm:text-2xl">DADOS PESSOAIS</h2>
            <hr className="w-full bg-black h-0.5 my-2" />
            <AlterData onFormChange={setAlterDataForm} />
          </div>
          <div className="w-full lg:w-1/2 lg:pl-10 pt-6 lg:pt-7">
            <h2 className="text-black text-xl sm:text-2xl">FOTO</h2>
            <hr className="w-full bg-black h-0.5 my-2" />
            <Photo />
            <h2 className="text-black text-xl sm:text-2xl mt-8 lg:mt-10">
              ESCOLARIDADE
            </h2>
            <hr className="w-full bg-black h-0.5 my-2" />
            <School onFormChange={setSchoolForm} />
            <div className="mt-10 lg:mt-14 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white text-[#003966] font-bold w-full sm:w-1/3 rounded-md h-10 border border-[#003966]"
                type="button"
                onClick={() => {
                  setAlterDataForm({});
                  setSchoolForm({});
                }}
              >
                Cancelar
              </Button>
              <Button
                className="bg-[#003966] text-white font-bold w-full sm:w-1/3 rounded-md h-10"
                type="submit"
                disabled={isLoading} // Desabilita o botão enquanto está carregando
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {error && <p className="text-red-500">{error.message}</p>} {/* Exibe mensagem de erro se houver */}
    </div>
  );
}
