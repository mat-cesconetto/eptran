'use client';

import { useForgot } from "@/hooks/useForgot";
import { useState } from "react";

const FormularioForgot: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { forgotPassword } = useForgot();

    const handleForgot = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email')?.toString() || "";

        try {
            await forgotPassword(email);
            console.log('tudo funcionando');
        } catch(error: any) {
            setError(error.message || 'Houve um erro ao resetar a senha do usuário');
        }
    }

    return (
        <form onSubmit={handleForgot} className="grid grid-cols-1 gap-4 w-full">
            <FormField label="Email" type="email" id="email" name="email" />
            <button
                type="submit"
                className="bg-[#003966] text-white w-full h-12 rounded-md font-bold text-base sm:text-lg col-span-full mt-6 sm:mt-10 mb-3"
            >
                Enviar E-mail
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
    );
};

interface FormFieldProps {
    label: string;
    type: string;
    id: string;
    name: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, id, name }) => (
    <div className="flex flex-col">
        <label className="text-sm sm:text-base text-[#003966] font-bold mb-1">{label}</label>
        <input
            type={type}
            id={id}
            name={name}
            className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full"
        />
    </div>
);

export default FormularioForgot;