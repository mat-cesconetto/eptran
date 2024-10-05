import Image from "next/image";
import NavBar from "../components/ui/navbar";
import GridSection from "./gridselection";
import Solicitacao from "./solicitacao";
import Footer from "../components/ui/footer";

const sections = [
  {
    title: "Gerenciamento da Conta",
    items: [
      "Como Recuperar Senha",
      "Alterar Região de Residência",
      "Alterar Escola",
      "Como recuperar a senha",
    ],
  },
  {
    title: "Problemas",
    items: [
      "Erro ao entrar no jogo",
      "Problema na visualização de conteúdo",
      "Restrição de conteúdo",
    ],
  },
  {
    title: "Privacidade e Proteção de Dados",
    items: ["Solicitar dados da conta", "Exclusão da conta"],
  },
];

export default function Home() {
  return (
    <>
      <body className="bg-neutral-100">
        <NavBar />
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl bg-[#023859] mt-10 p-4 sm:p-6 lg:p-10">
            <h1 className="text-white text-2xl sm:text-3xl font-black">
              Perguntas Frequentes
            </h1>
            <h3 className="text-white max-w-md mt-4">
              Encontre aqui as principais soluções para suas dúvidas e problemas
              mais frequentes.
            </h3>

            <div className="mt-10">
              <GridSection sections={sections} />
            </div>
          </div>
        </div>
        <div className="mt-10 w-full text-center">
          <h1 className="text-[#023859] text-4xl font-bold my-11">
            Precisa de Mais Ajuda?
          </h1>
          <h2 className="text-[#023859] text-3xl font-bold">
            Envie uma Solicitação
          </h2>
          <h3 className="text-xl my-10 text-black">
            Não importa se é um problema técnico ou um surto,
            <br />
            estamos aqui para ajudar
          </h3>
        </div>

        <Solicitacao />

        <Footer />
      </body>
    </>
  );
}
