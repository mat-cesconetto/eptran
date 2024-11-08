// NAVBAR - Atualizado

'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useLogout } from '@/hooks/useLogout';
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Profile from "./profile";  // Importe o componente Profile

interface UserDropdownProps {
  onLogout: () => void;
}

const NavBar: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logoutUser, isLoading, error } = useLogout();

  // Função de logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log('Logout realizado com sucesso');
    } catch (err) {
      console.error('Erro ao realizar logout:', err);
      alert(`Erro ao fazer logout: `);
    }
  };

  return (
    <>
      <div className="relative w-full bg-[#023859] flex items-center justify-between shadow-2xl px-4 sm:px-10 py-4 md:h-32">
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-shrink-0">
          <Link href={"../"}>
            <Image
              src="/logo.svg"
              width={100}
              height={100}
              alt="imagem logo"
              className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28"
            />
          </Link>
        </div>

        <div className="hidden md:flex justify-center items-center flex-grow text-white font-bold text-lg">
          <NavLink href="/atividades">Atividades</NavLink>
          <NavLink href="/sobre">Sobre nós</NavLink>
          <NavLink href="/fale-conosco">Fale Conosco</NavLink>
          {isAdmin && <NavLink href="/adm/gestao-conteudo">Administrador</NavLink>}
        </div>

        <div className="flex-shrink-0">
          {isAuthenticated ? (
            // Aqui você insere o novo componente Profile
            <Profile onLogout={handleLogout} />
          ) : (
            <div className="md:hidden">
              <Image
                src="/user.svg"
                width={40}
                height={40}
                alt="User icon"
                className="rounded-full cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              />
            </div>
          )}
        </div>

        <div className="hidden md:flex">
          {!isAuthenticated && <AuthButtons />}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#023859] z-50 flex flex-col items-center justify-start pt-16">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex flex-col items-center py-4 text-white space-y-4">
            <NavLink href="/atividades" mobile>Atividades</NavLink>
            <NavLink href="/sobre" mobile>Sobre nós</NavLink>
            <NavLink href="/fale-conosco" mobile>Fale Conosco</NavLink>
          </div>
          {!isAuthenticated && (
            <div className="mt-8 flex flex-col space-y-4">
              <Link href="/login">
                <Button className="bg-white text-[#023859] text-sm px-8 py-2 rounded w-full">
                  Login
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="border-white border-2 bg-transparent text-sm text-white px-6 py-2 rounded w-full">
                  Cadastro
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
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
    className={`relative group ${mobile ? "text-2xl py-2" : "mx-4"}`}
  >
    {children}
    <div className="absolute left-0 bottom-[-6px] w-full h-[3px] bg-white scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></div>
  </Link>
);

const AuthButtons: React.FC = () => (
  <>
    <Link href="/login">
      <Button variant="testando" className="bg-white text-[#023859] text-sm px-8 py-2 mr-4 rounded">Login</Button>
    </Link>
    <Link href="/cadastro">
      <Button variant="testando2" className="border-white border-2 bg-transparent text-sm text-white px-5 py-2 rounded">
        Cadastro
      </Button>
    </Link>
  </>
);

export default NavBar;
