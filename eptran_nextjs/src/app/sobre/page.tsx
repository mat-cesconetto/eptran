import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="flex items-center">
        <div className="flex items-center relative m-10 ml-44">
          <div className="w-14 h-14 bg-[#023859] rounded-xl flex items-center justify-center">
            <Image
              src="/Prize.svg"
              width={42}
              height={42}
              alt="sobre"
              className="m-2"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#023859]">Sobre Nós</h1>
      </div>
    </div>
  );
}
