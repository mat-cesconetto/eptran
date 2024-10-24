import { Link } from "lucide-react";
import Image from "next/image";

export default function Conteudo() {
    return (
        <main className="bg-[url('/bg-conteudo.png')] bg-cover "> 

            <div className="flex w-96 bg-white rounded-r-xl h-28 items-center">
                    <Image
                        className="bg-darkBlue-500 rounded-lg h-14 w-14 ml-6 "
                        src="/Image/livros-conteudo.svg"
                        alt="Livro"
                        width={56}
                        height={56}
                    />
                    <h1 className="text-darkBlue-500 font-bold text-5xl pl-4 ">
                        Conteúdo
                    </h1>
            </div>

        {/* div conteudos */}
          <div className="pl-24 pt-20 flex gap-36">


            {/* div 1 */}
                <div className="w-80 border rounded-xl ">
                    <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
                    <div className="bg-white h-24 rounded-b-xl">
                    <h3 className="text-darkBlue-500 font-semibold pl-2 ">Conteúdo EPTRAN</h3>
                    <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
                    </div>
                </div>

            {/* div 2 */}
                <div className="w-80 border rounded-xl ">
                        <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
                        <div className="bg-white h-24 rounded-b-xl">
                        <h3 className="text-darkBlue-500 font-semibold pl-2 ">Conteúdo EPTRAN</h3>
                        <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
                        </div>
                </div>

            {/* div 3 */}
                <div className="w-80 border rounded-xl ">
                        <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
                        <div className="bg-white h-24 rounded-b-xl">
                        <h3 className="text-darkBlue-500 font-semibold pl-2 ">Conteúdo EPTRAN</h3>
                        <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
                        </div>
                </div>

            {/* div 4 */}
                <div className="w-80 border rounded-xl ">
                        <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
                        <div className="bg-white h-24 rounded-b-xl">
                        <h3 className="text-darkBlue-500 font-semibold pl-2 ">Conteúdo EPTRAN</h3>
                        <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
                        </div>
                </div>

            </div>

        {/* div conteudos */}
          <div className="pl-24 pt-20 pb-10 flex gap-36">


            {/* div 5 */}
                <div className="w-80 border rounded-xl ">
                    <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
                    <div className="bg-white h-24 rounded-b-xl">
                    <h3 className="text-darkBlue-500 font-semibold pl-2 ">Conteúdo EPTRAN</h3>
                    <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
                    </div>
                </div>

            {/* div 6 */}
                <div className="w-80 border rounded-xl ">
                        <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
                        <div className="bg-white h-24 rounded-b-xl">
                        <h3 className="text-darkBlue-500 font-semibold pl-2 ">Conteúdo EPTRAN</h3>
                        <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
                        </div>
                </div>

            {/* div 7 */}
                <div className="w-80 border rounded-xl ">
                        <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
                        <div className="bg-white h-24 rounded-b-xl">
                        <h3 className="text-darkBlue-500 font-semibold pl-2 ">Conteúdo EPTRAN</h3>
                        <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
                        </div>
                </div>

            {/* div 8 */}
                <div className="w-80 border rounded-xl ">
                        <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
                        <div className="bg-white h-24 rounded-b-xl">
                        <h3 className="text-darkBlue-500 font-semibold pl-2 ">Conteúdo EPTRAN</h3>
                        <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
                        </div>
                </div>

            </div>

        </main>
    );
}
