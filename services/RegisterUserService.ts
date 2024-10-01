import prismaClient from "../src/prisma";
import { CadastroProps } from "../types/types";

class RegisterUserService {
    async register(userData: CadastroProps) {
        // Desestrutura as propriedades do userData
        const { 
            nome_usuario, 
            email_usuario, 
            senha_usuario, 
            cep_usuario, 
            rua_usuario, 
            cidade_usuario, 
            estado_usuario, 
            escola_usuario, 
            data_nascimento_usuario, 
            escolaridade_usuario, 
            sexo_usuario 
        } = userData;

        // Validação dos campos obrigatórios
        if (!email_usuario || !nome_usuario || !senha_usuario || !cep_usuario || !rua_usuario || !cidade_usuario || !estado_usuario || !escola_usuario || !escolaridade_usuario || !sexo_usuario) {
            throw new Error("Preencha todos os campos obrigatórios");
        }

        // Cria o registro no banco de dados
        const register = await prismaClient.cadastro.create({
            data: {
                nome_usuario,
                email_usuario,
                senha_usuario, // Adiciona a senha
                cep_usuario,
                rua_usuario,
                cidade_usuario,
                estado_usuario,
                escola_usuario,
                data_nascimento_usuario, // Pode ser undefined
                escolaridade_usuario,
                sexo_usuario,
                adm: false // Define o valor padrão para adm como false
            }
        });

        return register;
    }
}

export { RegisterUserService };
