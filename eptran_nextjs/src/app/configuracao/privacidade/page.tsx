import RedefinirSenha from "./password";
import RedefinirEmail from "./email";

export default function Home() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-6 md:pt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003966]">
        Privacidade
      </h1>
      <hr className="w-full bg-black h-0.5 my-4" />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:pr-10 pt-6 lg:pt-7">
          <h2 className="text-black text-xl sm:text-2xl">
            REEDEFINIÇÃO DE EMAIL
          </h2>
          <hr className="w-full bg-black h-0.5 my-2" />
          <RedefinirEmail />
        </div>
        <div className="w-full lg:w-1/2 lg:pr-10 pt-6 lg:pt-7">
          <h2 className="text-black text-xl sm:text-2xl">
            REEDEFINIÇÃO DE SENHA
          </h2>
          <hr className="w-full bg-black h-0.5 my-2" />
          <RedefinirSenha />
        </div>
      </div>
    </div>
  );
}
