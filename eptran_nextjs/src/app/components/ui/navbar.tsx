"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSpecialPage, setIsSpecialPage] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if the current page is the special page that needs different styling
    setIsSpecialPage(pathname === '/jogos/caca')
  }, [pathname])

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
      <div className={`${isSpecialPage ? 'md:flex' : 'hidden md:flex'} justify-center items-center flex-grow text-white font-bold text-lg`}>
        <NavLink href="/atividades">Atividades</NavLink>
        <NavLink href="/conquistas">Conquistas</NavLink>
        <NavLink href="/sobre">Sobre nós</NavLink>
        <NavLink href="/fale-conosco">Fale Conosco</NavLink>
      </div>
      <div className="flex-shrink-0">
        <Link href={"/login"}>
          <Image
            src="/user.svg"
            width={57}
            height={57}
            alt="imagem usuario"
            className="m-4 sm:m-10"
          />
        </Link>
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
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  mobile?: boolean
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
)

export default NavBar