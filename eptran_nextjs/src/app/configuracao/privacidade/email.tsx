import { Button } from "@nextui-org/react"

const RedefinirEmail: React.FC = () => {
  return (
    <form action="" className="flex flex-col w-full">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="email-antigo" className="text-sm sm:text-base md:text-lg text-[#003966] font-bold mb-1 block">
            E-MAIL ANTIGO
          </label>
          <input
            type="email"
            id="email-antigo"
            name="email-antigo"
            placeholder="emaildousuario@gmail.com"
            className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full lg:w-2/3"
          />
        </div>
        <div>
          <label htmlFor="email-novo" className="text-sm sm:text-base md:text-lg text-[#003966] font-bold mb-1 block">
            E-MAIL NOVO
          </label>
          <input
            type="email"
            id="email-novo"
            name="email-novo"
            placeholder="emaildousuario@gmail.com"
            className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full lg:w-2/3"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="bg-[#003966] text-white w-full lg:w-2/5 h-11 rounded-md font-semibold text-base sm:text-lg mt-6 mb-3"
      >
        REDEFINIR E-MAIL
      </Button>
    </form>
  )
}

export default RedefinirEmail