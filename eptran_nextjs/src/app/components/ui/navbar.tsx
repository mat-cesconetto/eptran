"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@nextui-org/react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useAuth();
  console.log("Usuário autenticado:", isAuthenticated); // Adicione este log


  return (
    <div className="relative h-32 w-full bg-[#023859] flex items-center justify-between shadow-2xl px-4 sm:px-10">
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="flex-shrink-0">
        <Link href={"../"}>
          <Image
            src="/logo.svg"
            width={100}
            height={100}
            alt="imagem logo"
            className="m-4 sm:m-10"
          />
        </Link>
      </div>
      <div className="hidden sm:flex md:flex lg:flex justify-center items-center flex-grow text-white font-bold text-lg">
        <NavLink href="/atividades">Atividades</NavLink>
        <NavLink href="/conquistas">Conquistas</NavLink>
        <NavLink href="/sobre">Sobre nós</NavLink>
        <NavLink href="/fale-conosco">Fale Conosco</NavLink>
      </div>
      <div className="flex-shrink-0">
        <div className="flex-shrink-0">
          {isAuthenticated ? (
            <Image
              src="/user.svg"
              width={57}
              height={57}
              alt="imagem usuario"
              className="m-4 sm:m-10"
            />
          ) : (
            <div>
              <Link href="/login">
                <Button className="bg-white text-[#023859] text-sm px-8 py-2 rounded mr-8">
                  Login
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="border-white border-2 bg-transparent text-sm text-white px-6 py-2 rounded">
                  Cadastro
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#023859] z-50 flex items-center justify-center md:hidden">
          <div className="absolute top-4 left-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center py-4 text-white">
            <NavLink href="/atividades" mobile>
              Atividades
            </NavLink>
            <NavLink href="/conquistas" mobile>
              Conquistas
            </NavLink>
            <NavLink href="/sobre" mobile>
              Sobre nós
            </NavLink>
            <NavLink href="/fale-conosco" mobile>
              Fale Conosco
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  mobile = false,
}) => (
  <Link
    href={href}
    className={`
        relative mx-4 group
        ${mobile ? "py-2 text-2xl" : ""}
    `}
  >
    {children}
    <div className="absolute left-0 bottom-[-6px] w-full h-[3px] bg-white scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></div>
  </Link>
);

export default NavBar;
