"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaBars, FaTimes, FaBook } from "react-icons/fa";
import { BsCameraReelsFill, BsFillInfoSquareFill } from "react-icons/bs";
import { IoTicketSharp } from "react-icons/io5";

const SideBarBafo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed bottom-4 right-4 z-20 p-2 bg-[#003966] text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`
    fixed top-0 left-0 min-h-screen bg-[#003966] transition-all duration-300 ease-in-out z-10
    ${isOpen ? "w-[250px]" : "w-0 lg:w-[250px]"}
    lg:relative overflow-y-auto
      `}
      >
        <div className="flex flex-col px-6 py-10 space-y-3 justify-center text-center items-center">
          <h1 className="w-full font-bold text-white text-2xl">
            Administrador
          </h1>
          <hr className="w-full" />
        </div>
        <div className="flex-col flex space-y-6">
          <SideLink href="./gestao-conteudo" icon={<FaBook />}>
            Conteudo
          </SideLink>
          <SideLink href="./gestao-videos" icon={<BsCameraReelsFill />}>
            Videos
          </SideLink>
          <SideLink href="./estatisticas" icon={<BsFillInfoSquareFill />}>
            Estatísticas
          </SideLink>
          <SideLink href="./gestao-usuario" icon={<FaUser />}>
            Usuários
          </SideLink>
          <SideLink href="./gestao-tickets" icon={<IoTicketSharp />}>
            Suporte
          </SideLink>
        </div>
      </div>
    </>
  );
};

interface SideLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const SideLink: React.FC<SideLinkProps> = ({ href, children, icon }) => (
  <Link
    href={href}
    className="relative flex items-center mx-4 w-fit text-lg text-white font-medium group ml-10"
  >
    <span className="mr-4">{icon}</span>
    {children}
    <div className="absolute left-0 bottom-[-6px] w-full h-[3px] bg-white scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></div>
  </Link>
);

export default SideBarBafo;
