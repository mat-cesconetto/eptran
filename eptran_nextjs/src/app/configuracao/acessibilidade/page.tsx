import { Slider } from "@nextui-org/slider";
import Image from "next/image";
import { FaVolumeDown } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { MdMusicOff } from "react-icons/md";
import { MdMusicNote } from "react-icons/md";



export default function Home() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-6 md:pt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003966]">
        Acessibilidade
      </h1>
      <hr className="w-full bg-black h-0.5 my-4" />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:pr-10 pt-6 lg:pt-7">
          <h2 className="text-black text-xl sm:text-2xl">Controles</h2>
          <hr className="w-full bg-black h-0.5 my-2" />
          <div className="flex gap-16 justify-center pt-8">
            <Image
              src="/WASD.svg"
              width={200}
              height={200}
              alt="WASD"
              className=""
            />{" "}
            <Image
              src="/Setinhas.svg"
              width={200}
              height={200}
              alt="Setinhas"
              className=""
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-10 pt-6 lg:pt-7">
          <h2 className="text-black text-xl sm:text-2xl">Áudio</h2>
          <hr className="w-full bg-black h-0.5 my-2" />
          <div className="py-6">
            <h2 className="text-[#003966] text-xl font-semibold">SOM</h2>
            <Slider
              aria-label="Volume"
              size="lg"
              color="primary"
              startContent={
                <FaVolumeDown className="text-2xl text-[#003966]" />
              }
              endContent={<FaVolumeUp className="text-2xl text-[#003966]" />}
              className="max-w-md"
              defaultValue={40}
            />
          </div>
          <div className="py-6">
            <h2 className="text-[#003966] text-xl font-semibold">MÚSICA</h2>
            <Slider
              aria-label="Volume"
              size="lg"
              color="primary"
              startContent={
                <MdMusicOff className="text-2xl text-[#003966]" />
              }
              endContent={<MdMusicNote className="text-2xl text-[#003966]" />}
              className="max-w-md"
              defaultValue={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
