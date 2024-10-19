import RedefinirSenha from "./password"
import RedefinirEmail from "./email"

export default function Home() {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 md:pt-8 lg:pt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003966]">
        Privacidade
      </h1>
      <hr className="w-full bg-black h-0.5 my-4" />
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/2 pt-6 lg:pt-7">
          <h2 className="text-black text-xl sm:text-2xl mb-2">
            REDEFINIÇÃO DE EMAIL
          </h2>
          <hr className="w-full bg-black h-0.5 mb-4" />
          <RedefinirEmail />
        </div>
        <div className="w-full lg:w-1/2 pt-6 lg:pt-7">
          <h2 className="text-black text-xl sm:text-2xl mb-2">
            REDEFINIÇÃO DE SENHA
          </h2>
          <hr className="w-full bg-black h-0.5 mb-4" />
          <RedefinirSenha />
        </div>
      </div>
    </div>
  )
}