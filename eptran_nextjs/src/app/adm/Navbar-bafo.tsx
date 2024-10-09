"use client";

import React, { useState } from "react";
import {
  BookText,
  Video,
  MessageSquareWarning,
  UserRound,
  Tickets,
  Menu,
  X,
  CircleUserRound,
} from "lucide-react";
import { HiMiniUserCircle } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

export default function NavBarBafo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-white">
      <div className="shadow-xl fixed w-full h-16 md:h-20 lg:h-28 items-center z-50 bg-darkBlue-500 flex justify-between px-4 md:px-6 lg:px-10">
        <div className="flex items-center">
          <Link href="../">
            <Image src="/logo.svg" width={112} height={10} alt="logo-eptran" className="w-24 md:w-28 lg:w-32" />
          </Link>
        </div>
        <div className="hidden md:flex justify-center">
          <Link
            href="../img/ensino.html"
            className="hover:underline text-sm md:text-base lg:text-lg text-white no-underline font-medium ml-2 md:ml-4 lg:ml-10"
          >
            Atividade
          </Link>
          <Link
            href="#"
            className="hover:underline text-sm md:text-base lg:text-lg text-white no-underline font-medium ml-2 md:ml-4 lg:ml-10"
          >
            Consquistas
          </Link>
          <Link
            href="../img/sobrenos.html"
            className="hover:underline text-sm md:text-base lg:text-lg text-white no-underline font-medium ml-2 md:ml-4 lg:ml-10"
          >
            Sobre Nós
          </Link>
          <Link
            href="../img/faleConosco.html"
            className="hover:underline text-sm md:text-base lg:text-lg text-white no-underline font-medium ml-2 md:ml-4 lg:ml-10"
          >
            Fale Conosco
          </Link>
          <Link
            href="#"
            className="hover:underline text-sm md:text-base lg:text-lg text-white no-underline font-medium ml-2 md:ml-4 lg:ml-10"
          >
            Administrador
          </Link>
        </div>
        <div className="flex items-center">
          <button className="md:hidden text-white" onClick={toggleMobileMenu}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-darkBlue-500 z-50 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center">
            <Link href="../img/ensino.html" className="text-white py-2">
              Atividade
            </Link>
            <Link href="#" className="text-white py-2">
              Consquistas
            </Link>
            <Link href="../img/sobrenos.html" className="text-white py-2">
              Sobre Nós
            </Link>
            <Link href="../img/faleConosco.html" className="text-white py-2">
              Fale Conosco
            </Link>
            <Link href="#" className="text-white py-2">
              Administrador
            </Link>
          </nav>
          <div className="flex justify-end items-start col-span-1 px-5 ">
            <Link href='../'>
            <HiMiniUserCircle  className="w-20 h-16 mr-4"/>
            </Link>
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button for Mobile and Tablet */}
      <button
        className="fixed bottom-4 right-4 bg-darkBlue-500 text-white p-2 rounded-full lg:hidden z-50"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar fixed top-0 bottom-0 left-0 overflow-y-auto p-2 w-60 bg-darkBlue-600 transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-4 mt-32 flex justify-center text-white font-bold text-3xl">
          <h1>Admin</h1>
        </div>
        <hr className="w-auto my-4 bg-white rounded-sm" />
        <div className="grid grid-cols-7 align-middle items-center">
          <BookText color="white" />
          <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl">
            <Link href="#">Conteudo</Link>
          </p>
          <Video color="white" />
          <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl">
            <Link href="#">Vídeos</Link>
          </p>
          <MessageSquareWarning color="white" />
          <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl">
            <Link href="#">Estatísticas</Link>
          </p>
          <UserRound color="white" />
          <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl">
            <Link href="#">Usuário</Link>
          </p>
          <Tickets color="white" />
          <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl">
            <Link href="#">Ticket</Link>
          </p>
        </div>
      </aside>
    </div>
  );
}