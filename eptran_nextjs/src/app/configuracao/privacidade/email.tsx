import { Button } from "@nextui-org/react";

const RedefinirEmail: React.FC = () => {
  return (
    <form action="" className="flex flex-col">
      <div className="pt-8 flex flex-col">
        <label className="text-sm sm:text-xl text-[#003966] font-bold mb-1 ">
          E-MAIL ANTIGO
        </label>
        <input
          type="email"
          id="email-antigo"
          name="email-antigo"
          placeholder="emaildousuario@gmail.com"
          className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-2/3 mb-6"
        />
        <label className="text-sm sm:text-xl text-[#003966] font-bold mb-1 ">
          E-MAIL NOVO
        </label>
        <input
          type="email"
          id="email-novo"
          name="email-novo"
          placeholder="emaildousuario@gmail.com"
          className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-2/3 mb-2"
        />
      </div>

      <Button
        type="submit"
        className="bg-[#003966] text-white w-2/5 h-11 rounded-md font-semibold text-base sm:text-lg col-span-full mt-4 sm:mt-6 mb-3"
      >
        REDEFINIR E-MAIL
      </Button>
    </form>
  );
};

export default RedefinirEmail;
