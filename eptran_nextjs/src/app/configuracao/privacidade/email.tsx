"use client";

import { useEmail } from "@/hooks/useEmail"
import { Button } from "@nextui-org/react"
import { useState } from "react"

const RedefinirEmail: React.FC = () => {
    const[error, setError] = useState<string | null>(null)
    const { changeEmail } = useEmail()

    const handleEmail = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const emailAntigo = formData.get('emailAntigo')?.toString() || ''
        const emailNovo = formData.get('emailNovo')?.toString() || ''

        try {
            await changeEmail(emailAntigo, emailNovo)
            console.log('deu boa')
        } catch (error:any) {
            setError(error.message || "Houve um erro ao resetar a senha do usuário");
        }

    }


  return (
    <form onSubmit={handleEmail} action="" className="flex flex-col w-full">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="emailAntigo" className="text-sm sm:text-base md:text-lg text-[#003966] font-bold mb-1 block">
            E-MAIL ANTIGO
          </label>
          <input
            type="email"
            id="emailAntigo"
            name="emailAntigo"
            placeholder="emaildousuario@gmail.com"
            className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full lg:w-2/3"
          />
        </div>
        <div>
          <label htmlFor="emailNovo" className="text-sm sm:text-base md:text-lg text-[#003966] font-bold mb-1 block">
            E-MAIL NOVO
          </label>
          <input
            type="email"
            id="emailNovo"
            name="emailNovo"
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
