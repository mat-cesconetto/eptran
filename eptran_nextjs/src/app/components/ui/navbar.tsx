"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useAuth();

  return (
    <div className="relative h-32 w-full bg-[#023859] flex items-center justify-between shadow-2xl px-4 sm:px-10">
      {/* Botão para menu mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg /* SVG for close icon */ />
          ) : (
            <svg /* SVG for menu icon */ />
          )}
        </button>
      </div>

      {/* Logo */}
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

      {/* Links da barra de navegação para telas maiores */}
      <div className="hidden md:flex justify-center items-center flex-grow text-white font-bold text-lg">
        <NavLink href="/atividades">Atividades</NavLink>
        <NavLink href="/conquistas">Conquistas</NavLink>
        <NavLink href="/sobre">Sobre nós</NavLink>
        <NavLink href="/fale-conosco">Fale Conosco</NavLink>
      </div>

      {/* Dropdown e Botões de Login/Cadastro */}
      <div className="hidden md:flex flex-shrink-0">
        {isAuthenticated ? (
          <Dropdown>
            <DropdownTrigger>
              <Image
                src="/user.svg"
                width={57}
                height={57}
                alt="imagem usuario"
                className="m-4 sm:m-10 cursor-pointer"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Settings" className="p-4 w-80 rounded-lg flex flex-wrap">
              <DropdownItem key="greeting" className="font-semibold text-[#023859] w-80">
                <div>
                  <h1 className="text-[#000000] text-xl mr-2">Olá,</h1>
                  <h1 className="text-[#023859] text-xl max-w-full whitespace-normal">
                    João Pedro Espindola Sezerino
                  </h1>
                </div>
              </DropdownItem>
              <DropdownItem key="conta" className="text-[#000000] text-sm mt-2">
                Minha Conta
              </DropdownItem>
              <DropdownItem key="divider1" className="py-0">
                <hr className="mb-2 border-[#023859]" />
              </DropdownItem>
              <DropdownItem key="account" className="text-[#023859] text-sm">
                Dados pessoais
              </DropdownItem>
              <DropdownItem key="privacy" className="text-[#023859] text-sm">
                Privacidade
              </DropdownItem>
              <DropdownItem key="achievements" className="text-[#023859] text-sm">
                Minhas Conquistas
              </DropdownItem>
              <DropdownItem key="serviços" className="text-[#000000] text-sm">
                Serviços
              </DropdownItem>
              <DropdownItem key="divider2" className="py-0">
                <hr className="mb-2 border-[#023859]" />
              </DropdownItem>
              <DropdownItem key="accessibility" className="text-[#023859] text-sm">
                Acessibilidade
              </DropdownItem>
              <DropdownItem key="logout" className="text-danger text-sm" color="danger">
                Sair da conta
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div>
            <Link href="/login">
              <Button className="bg-white text-[#023859] text-sm px-8 py-2 rounded mr-8">Login</Button>
            </Link>
            <Link href="/cadastro">
              <Button className="border-white border-2 bg-transparent text-sm text-white px-6 py-2 rounded">Cadastro</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#023859] z-50 flex items-center justify-center md:hidden">
          <div className="absolute top-4 left-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              {/* Ícone para fechar o menu */}
              <svg /* SVG for close icon */ />
            </button>
          </div>
          <div className="flex flex-col items-center py-4 text-white">
            <NavLink href="/atividades" mobile>Atividades</NavLink>
            <NavLink href="/conquistas" mobile>Conquistas</NavLink>
            <NavLink href="/sobre" mobile>Sobre nós</NavLink>
            <NavLink href="/fale-conosco" mobile>Fale Conosco</NavLink>
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

const NavLink: React.FC<NavLinkProps> = ({ href, children, mobile = false }) => (
  <Link
    href={href}
    className={`relative mx-4 group ${mobile ? "py-2 text-2xl" : ""}`}
  >
    {children}
    <div className="absolute left-0 bottom-[-6px] w-full h-[3px] bg-white scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></div>
  </Link>
);

export default NavBar;