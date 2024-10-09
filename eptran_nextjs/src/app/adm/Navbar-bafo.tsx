import React from "react";
import { BookText } from "lucide-react";
import { Video } from "lucide-react";
import { Tickets } from "lucide-react";
import { MessageSquareWarningIcon, CircleUserRound } from "lucide-react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NavBarBafo: React.FC = () => {
    return (
        <div className="bg-white">
        <div className="shadow-2xl fixed w-full h-28 items-center z-50 bg-darkBlue-500 grid grid-cols-4">
          <div className="col-span-1 flex px-10">
            <Link href='../'>
              <Image 
              src="/logo.svg"
              width={112}
              height={10}
              alt="logo-eptran"
              />
            </Link>
          </div>
          <nav className="col-span-2 flex justify-center">
            <a
              href="ensino.html"
              className="hover:underline relative text-lg text-white no-underline font-medium ml-10"
            >
              Atividade
            </a>
            <a
              href="#"
              className="hover:underline relative text-lg text-white no-underline font-medium ml-10"
            >
              Consquistas
            </a>
            <a
              href="sobrenos.html"
              className="hover:underline relative text-lg text-white no-underline font-medium ml-10"
            >
              Sobre Nós
            </a>
            <a
              href="faleConosco.html"
              className="hover:underline relative text-lg text-white no-underline font-medium ml-10"
            >
              Fale Conosco
            </a>
            <a
              href="#"
              className="hover:underline relative text-lg text-white no-underline font-medium ml-10"
            >
              Administrador
            </a>
          </nav>
          <div className="flex justify-end items-start col-span-1 px-5 ">
            <Link href='../'>
            <HiMiniUserCircle  className="w-20 h-16 mr-4"/>
            </Link>
          </div>
        </div>

        <aside className="sidebar fixed top-0 bottom-0 overflow-y-auto p-2 w-60 bg-darkBlue-400">
          <div className="px-4 mt-32 flex justify-center text-white font-bold text-3xl">
            <h1>Admin</h1>
          </div>
          <hr className="w-auto my-4 bg-white  rounded-sm" />
          <div className="grid grid-cols-7 align-middle items-center">
            <BookText color='white'/>
            <p className="text-white p-2 hover:underline col-span-6 text-xl">
              <a href="#">Conteudo</a>
            </p>
            <Video color='white'/>
            <p className="text-white p-2 hover:underline col-span-6 text-xl">
              <a href="#">Vídeos</a>
            </p>
            <MessageSquareWarningIcon color='white'/>
            <p className="text-white p-2 hover:underline col-span-6 text-xl">
              <a href="#">Estatísticas</a>
            </p>
            <UserRound color='white'/>
            <p className="text-white p-2 hover:underline col-span-6 text-xl">
              <a href="#">Usuário</a>
            </p>
            <Tickets color='white'/>
            <p className="text-white p-2 hover:underline col-span-6 text-xl">
              <a href="#">Suporte</a>
            </p>
          </div>
        </aside>
      </div>

    )
}


export default NavBarBafo