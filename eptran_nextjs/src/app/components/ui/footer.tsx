import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#023859] text-white py-8 z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Leia Mais</h2>
            <ul className="space-y-2">
              <li>
                <Link href="" className="text-sm hover:underline">
                  Abrir Ticket
                </Link>
              </li>
              <li>
                <Link href="" className="text-sm hover:underline">
                  Material
                </Link>
              </li>
              <li>
                <Link href="" className="text-sm hover:underline">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="" className="text-sm hover:underline">
                  Jogos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Sobre Nós</h2>
            <ul className="space-y-2">
              <li>
                <Link href="" className="text-sm hover:underline">
                  Equipe Site
                </Link>
              </li>
              <li>
                <Link href="" className="text-sm hover:underline">
                  Equipe Eptran
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contato</h2>
            <ul className="space-y-2">
              <li>
                <Link href="" className="text-sm hover:underline">
                  +55 (47) XXXXX - XXXXX
                </Link>
              </li>
              <li>
                <Link href="" className="text-sm hover:underline">
                  +55 (47) YYYYY - YYYYY
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Social</h2>
            <div className="flex space-x-4">
              <Image
                src="/bxl-facebook.svg"
                width={12}
                height={12}
                alt="Facebook"
              />
              <Image
                src="/bxl-twitter.svg"
                width={24}
                height={24}
                alt="Twitter"
              />
              <Image
                src="/instagram-logo.svg"
                width={20}
                height={20}
                alt="Instagram"
              />
              <Image
                src="/youtube-logo.svg"
                width={22}
                height={22}
                alt="YouTube"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Image
              src="/logo.svg"
              width={195}
              height={98}
              alt="Logo"
              className="max-w-full h-auto"
            />
            <Image
              src="/prefeitura.svg"
              width={183}
              height={66}
              alt="Prefeitura"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm">
            © 2024 Eptran, Inc. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
