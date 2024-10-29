import { Link } from "lucide-react";
import Image from "next/image";

export default function Conteudo() {
    return (
        <main>
            <div className="flex">
                <Image
                    className="bg-darkBlue-500 rounded-lg h-14 w-16 ml-80 mt-40"
                    src="/Image/film-camera-svgrepo-com.svg"
                    alt="Livro"
                    width={56}
                    height={56}
                />
                <h1 className="text-darkBlue-500 font-bold text-5xl pl-4 pt-40 -mb-96">
                    Gestão de Vídeos
                </h1>
            </div>

            <div className="ml-72 pt-0.5 p-8">
                <div className="w-full flex space-x-8 mt-10 justify-between">
                    <div className="relative">
                        <div className="absolute flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 mt-2.5 text-darkBlue-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="procurar"
                            className="font-bold block items-center p-2 ps-10 w-80 text-sm bg-gray-100 shadow-md rounded-lg"
                            placeholder="Procurar"
                        />
                    </div>

                    <div className="grid grid-cols-7">
                        <div>
                            <select
                                className="text-darkBlue-500 block font-semibold p-2 text-sm bg-gray-100 shadow-md rounded-lg mb-6 cursor-pointer"
                                name="selecionar"
                            >
                                <option
                                    className="text-darkBlue-500 font-bold"
                                    value="selecionar"
                                    defaultValue={"selecionar"}
                                >
                                    Ensino Médio
                                </option>
                                <option
                                    className="text-darkBlue-500 font-bold"
                                    value=""
                                >
                                    Ensino Fundamental
                                </option>
                                <option
                                    className="text-darkBlue-500 font-bold"
                                    value=""
                                >
                                    Séries Iniciais
                                </option>
                            </select>
                        </div>

                        <div>
                            <select
                                className="text-darkBlue-500 block font-semibold p-2 text-sm bg-gray-100 shadow-md rounded-lg mb-6 cursor-pointer ml-14"
                                name="selecionar"
                            >
                                <option
                                    className="text-darkBlue-500 font-bold"
                                    value="selecionar"
                                    defaultValue={'selecionar'}
                                >
                                    Mais recentes
                                </option>
                                <option
                                    className="text-darkBlue-500 font-bold"
                                    value=""
                                >
                                    Mais antigos
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="w-72">
                        <button className="font-semibold w-56 h-10 mt-1 shadow-xl flex items-center bg-darkBlue-500 text-white px-5 rounded-md">
                            <Image
                                className="w-7 mr-3"
                                src="/Image/circulo.svg"
                                alt="Adicionar"
                                width={28}
                                height={28}
                            />
                            Adicionar Vídeo
                        </button>
                    </div>
                </div>

                <div className="w-full rounded-xl mt-16">
                    <div className="flex justify-between">


                        {/* Primeira Div */}
                        <div className="rounded-xl w-72 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl w-full"
                                src="/Image/carros.png"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
                                    Vídeo Educativo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
                                    3:02
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Segunda Div */}
                        <div className="rounded-xl w-72 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl w-full"
                                src="/Image/carros.png"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
                                    Vídeo Educativo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
                                    3:02
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Terceira Div */}
                        <div className="rounded-xl w-72 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl w-full"
                                src="/Image/carros.png"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
                                    Vídeo Educativo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
                                    3:02
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Quarta Div */}
                        <div className="rounded-xl w-72 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl w-full"
                                src="/Image/carros.png"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
                                    Vídeo Educativo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
                                    3:02
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full rounded-xl mt-16">
                    <div className="flex justify-between">


                        {/* Primeira Div */}
                        <div className="rounded-xl w-72 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl w-full"
                                src="/Image/carros.png"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
                                    Vídeo Educativo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
                                    3:02
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Segunda Div */}
                        <div className="rounded-xl w-72 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl w-full"
                                src="/Image/carros.png"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
                                    Vídeo Educativo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
                                    3:02
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Terceira Div */}
                        <div className="rounded-xl w-72 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl w-full"
                                src="/Image/carros.png"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
                                    Vídeo Educativo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
                                    3:02
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Quarta Div */}
                        <div className="rounded-xl w-72 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl w-full"
                                src="/Image/carros.png"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
                                    Vídeo Educativo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
                                    3:02
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
