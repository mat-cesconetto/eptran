import Link from "next/link"; 
import React from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdKeyboardAlt } from "react-icons/md";




const SideBar: React.FC = () => {
  return (
    <div className="w-[250px] h-screen border-b bg-[#003966]">
      <div className="flex flex-col px-6 py-10 space-y-3 justify-center text-center items-center">
        <h1 className="w-full font-bold text-2xl">Configurações</h1>
        <hr className="w-full " />
      </div>
      <div className="flex-col flex space-y-6">
        <SideLink href="configuracao/dados" icon={<FaUser />}>Dados</SideLink>
        <SideLink href="/outra-atividade" icon={<RiLockPasswordFill />}>Privacidade</SideLink>
        <SideLink href="/mais-atividades" icon={<MdKeyboardAlt />}>Acessibilidade</SideLink>
      </div>
    </div>
  );
};

interface SideLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode; 
}

const SideLink: React.FC<SideLinkProps> = ({ href, children, icon }) => (
  <Link href={href} className="relative flex items-center mx-4 w-fit text-lg font-medium group ml-10">
    <span className="mr-4"> 
      {icon}
    </span>
    {children}
    <div className="absolute left-0 bottom-[-6px] w-full h-[3px] bg-white scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></div>
  </Link>
);

export default SideBar;
