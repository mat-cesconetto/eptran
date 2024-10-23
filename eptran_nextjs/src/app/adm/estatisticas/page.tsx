import Image from "next/image";

export default function Estatisticas () {
    return (
        <main>
        <div className="flex">
            <Image
                className="bg-darkBlue-500 rounded-lg h-14 w-16 ml-80 mt-40"
                src="/Image/information-svgrepo-com.svg"
                alt="Livro"
                width={56}
                height={56}
            />
            <h1 className="text-darkBlue-500 font-bold text-5xl pl-4 pt-40 -mb-96">
                Gestão de Gráficos
            </h1>
            
        </div>
        </main>
    );
}
