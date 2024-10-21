import { Button } from "@nextui-org/react"
import React from "react"

interface AwardProps {
  title: string
  description: string
  status: string // "emProgresso" | "resgatar" | "resgatado"
}

const Award: React.FC<AwardProps> = ({ title, description, status }) => {
  const getButtonStyles = () => {
    switch (status) {
      case "emProgresso":
        return "bg-white text-black border border-black"
      case "resgatar":
        return "bg-[#00BF63] text-white"
      case "resgatado":
        return "bg-[#00BF63] text-white border border-white"
      default:
        return ""
    }
  }

  const getButtonText = () => {
    switch (status) {
      case "emProgresso":
        return "Em Progresso"
      case "resgatar":
        return "Resgatar"
      case "resgatado":
        return "Resgatado"
      default:
        return ""
    }
  }

  const getCardStyles = () => {
    if (status === "resgatado") {
      return "bg-[#00BF63] text-white"
    }
    return "bg-white text-black"
  }

  return (
    <div className={`w-full sm:w-64 md:w-72 lg:w-[355px] h-auto sm:h-[460px] rounded-2xl border-2 border-solid shadow-lg ${getCardStyles()}`}>
      <div className="w-full bg-white rounded-t-xl h-32 sm:h-2/5 shadow-xl"></div>
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 text-center mt-4 sm:mt-6">
        <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
        <hr className="h-px my-2 border-0 dark:bg-gray-700" />
        <p className="text-sm sm:text-base">{description}</p>
      </div>
      <div className="mt-4 sm:mt-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10 pb-4 sm:pb-0">
        <Button className={`w-full ${getButtonStyles()}`}>
          {getButtonText()}
        </Button>
      </div>
    </div>
  )
}

export default Award