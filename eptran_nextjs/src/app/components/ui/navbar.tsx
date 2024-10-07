'use client'

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="h-32 w-full bg-neutral-100 flex items-center justify-between shadow-2xl px-4 sm:px-10">
            <Image
                src='/logo-eptran.svg'
                width={100}
                height={100}
                alt="imagem logo"
                className="m-4 sm:m-10"
            />
            <div className="hidden md:flex justify-between max-w-[616px] text-blue-950 font-bold text-lg">
                <NavLink href="/atividade">Atividades</NavLink>
                <NavLink href="/conquistas">Conquistas</NavLink>
                <NavLink href="/sobre">Sobre nós</NavLink>
                <NavLink href="/fale_conosco">Fale Conosco</NavLink>
            </div>
            <div className="hidden md:block">
                <Image
                    src='/Male User.svg'
                    width={57}
                    height={57}
                    alt="imagem usuario"
                    className="m-4 sm:m-10"
                />
            </div>
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-blue-950"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-32 left-0 right-0 bg-neutral-100 h-full md:hidden">
                    <div className="flex flex-col items-center py-4 text-blue-950">
                        <NavLink href="/atividade" mobile>Atividades</NavLink>
                        <NavLink href="/conquistas" mobile>Conquistas</NavLink>
                        <NavLink href="/sobre" mobile>Sobre nós</NavLink>
                        <NavLink href="/fale_conosco" mobile>Fale Conosco</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, mobile = false }) => (
    <Link href={href} className={`
        relative m-4 group
        ${mobile ? 'py-2' : ''}
    `}>
        {children}
        <div className="absolute left-0 bottom-[-6px] w-full h-[3px] bg-black scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></div>
    </Link>
);

export default NavBar;