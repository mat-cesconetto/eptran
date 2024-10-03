import { FastifyInstance } from "fastify";
import { BlacklistTokenRepository } from "../repositories/blackListedTokenRepository";
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository";

class tokenController {
    private blackListedTokenRepository: BlacklistTokenRepository;
    private refreshTokenRepository: RefreshTokenRepository;
    private fastify: FastifyInstance; // Instância do Fastify para usar o JWT

    constructor(fastify: FastifyInstance) {
        this.blackListedTokenRepository = new BlacklistTokenRepository();
        this.refreshTokenRepository = new RefreshTokenRepository();
        this.fastify = fastify;

    }
    
    async delete({token: }) {
        
    }
}