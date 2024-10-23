import { Link } from "lucide-react";
import Image from "next/image";

export default function Conteudo() {
    return (
        <main>

            <div className="flex">
                    <Image
                        className="bg-darkBlue-500 rounded-lg h-14 w-14 ml-6 mt-20"
                        src="/Image/livros-conteudo.svg"
                        alt="Livro"
                        width={56}
                        height={56}
                    />
                    <h1 className="text-darkBlue-500 font-bold text-5xl pl-4 pt-20">
                        Conteúdo
                    </h1>
            </div>

        {/* div conteudos */}
          <div className="ml-28 mt-20 flex gap-52">


        {/* div 1 */}
            <div className="w-80 h-auto border rounded-xl">
                <div className="bg-gray-200 w-80 h-96 rounded-t-xl">1</div>
                <h3 className="text-darkBlue-500 font-semibold ml-2 mt-3">Conteúdo EPTRAN</h3>
                <p className="text-darkBlue-300 font-semibold text-xs ml-2 mb-3 mt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
            </div>

        {/* div 2 */}
            <div className="w-80 h-auto border rounded-xl">
                <div className="bg-gray-200 w-80 h-96 rounded-t-xl">2</div>
                <h3 className="text-darkBlue-500 font-semibold ml-2 mt-3">Conteúdo EPTRAN</h3>
                <p className="text-darkBlue-300 font-semibold text-xs ml-2 mb-3 mt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
            </div>

        {/* div 3 */}
            <div className="w-80 h-auto border rounded-xl">
                <div className="bg-gray-200 w-80 h-96 rounded-t-xl">3</div>
                <h3 className="text-darkBlue-500 font-semibold ml-2 mt-3">Conteúdo EPTRAN</h3>
                <p className="text-darkBlue-300 font-semibold text-xs ml-2 mb-3 mt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
            </div>

        {/* div 4 */}
            <div className="w-80 h-auto border rounded-xl">
                <div className="bg-gray-200 w-80 h-96 rounded-t-xl">4</div>
                <h3 className="text-darkBlue-500 font-semibold ml-2 mt-3">Conteúdo EPTRAN</h3>
                <p className="text-darkBlue-300 font-semibold text-xs ml-2 mb-3 mt-1 ">Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito</p>
            </div>

        </div>

        </main>
    );
}
