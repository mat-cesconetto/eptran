import { FastifyRequest, FastifyReply } from 'fastify';
import { RegisterUserService } from '../services/RegisterUserService';
import { CadastroProps } from '../types/types';

class RegisterUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Desestrutura as propriedades do corpo da requisição
        const { 
            nome_usuario, 
            cep_usuario, 
            cidade_usuario, 
            email_usuario, 
            senha_usuario, 
            escolaridade_usuario, 
            rua_usuario, 
            data_nascimento_usuario, 
            sexo_usuario, 
            escola_usuario, 
            estado_usuario 
        } = request.body as CadastroProps; // Assegura que o body seja do tipo CadastroProps

        // Log para verificar os dados recebidos
        console.log("Dados recebidos:", {
            nome_usuario,
            cep_usuario,
            cidade_usuario,
            email_usuario,
            senha_usuario,
            escolaridade_usuario,
            rua_usuario,
            data_nascimento_usuario,
            sexo_usuario,
            escola_usuario,
            estado_usuario,
        });

        const registerService = new RegisterUserService();

        // Chama o serviço de registro passando todos os dados necessários
        const register = await registerService.register({
            nome_usuario,
            cep_usuario,
            cidade_usuario,
            email_usuario,
            senha_usuario,
            escolaridade_usuario,
            rua_usuario,
            data_nascimento_usuario,
            sexo_usuario,
            escola_usuario,
            estado_usuario,
            adm: false // Define o valor padrão para adm como false
        });

        // Responde com o registro criado
        reply.send(register);
    }
}

export { RegisterUserController };
