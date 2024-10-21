import { FastifyInstance } from "fastify";

export async function locationRoutes( fastify: FastifyInstance ) {

    fastify.get('/estados', async (request, reply) => {
        try {
          const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1');
          const estados = await response.json();
          reply.send(estados);
        } catch (error) {
          reply.code(500).send({ error: 'Erro ao buscar estados.' });
        }
      });

      fastify.get<{ Params: { uf: string } }>('/cidades/:uf', async (request, reply) => {
        const { uf } = request.params; // Agora o TypeScript sabe que uf é uma string
      
        try {
          const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`);
          const cidades = await response.json();
          reply.send(cidades);
        } catch (error) {
          reply.code(500).send({ error: 'Erro ao buscar cidades.' });
        }
      });
      fastify.get<{ Params: { cep: string } }>('/:cep', async (request, reply) => {
        const { cep } = request.params; // Agora o TypeScript sabe que uf é uma string
      
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          reply.send(data);
        } catch (error) {
          reply.code(500).send({ error: 'Erro ao buscar informações.' });
        }
      });

      fastify.get('/bairros/joinville', async (request, reply) => {
        try {
          reply.send(bairrosArray);
        } catch (error) {
          reply.code(500).send({ error: 'Erro ao buscar bairros.' });
        }
      });


      enum BairrosJoinville {
        NOVA_BRASILIA = 'Nova Brasília',
        SAO_MARCOS = 'São Marcos',
        VILA_NOVA = 'Vila Nova',
        GLORIA = 'Glória',
        COSTA_E_SILVA = 'Costa e Silva',
        SANTO_ANTONIO = 'Santo Antônio',
        AMERICA = 'América',
        CENTRO = 'Centro',
        ATIRADORES = 'Atiradores',
        ANITA_GARIBALDI = 'Anita Garibaldi',
        FLORESTA = 'Floresta',
        ITINGA = 'Itinga',
        ITAUM = 'Itaum',
        JARIVATUBA = 'Jarivatuba',
        FATIMA = 'Fátima',
        GUANABARA = 'Guanabara',
        BUCAREIN = 'Bucarein',
        BOA_VISTA = 'Boa Vista',
        SAGUACU = 'Saguaçu',
        IRIRIU = 'Iririú',
        BOM_RETIRO = 'Bom Retiro',
        AVENTUREIRO = 'Aventureiro',
        JARDIM_SOFIA = 'Jardim Sofia',
        MORRO_DO_MEIO = 'Morro do Meio',
        ZONA_INDUSTRIAL_1 = 'Zona Industrial 1',
        PIRABEIRABA = 'Pirabeiraba',
        RIO_BONITO = 'Rio Bonito',
        JARDIM_IRIRIU = 'Jardim Iririú',
        COMASA = 'Comasa',
        ADHEMAR_GARCIA = 'Adhemar Garcia',
        PARANAGUA_MIRIM = 'Paranaguá Mirim',
        JOAO_COSTA = 'João Costa',
        BOEHMERWALDT = 'Boehmerwaldt',
        PETROPOLIS = 'Petrópolis',
        ESPINHEIROS = 'Espinheiros',
        JARDIM_PARAISO = 'Jardim Paraíso',
        VILA_CUBATAO = 'Vila Cubatão',
        ZONA_INDUSTRIAL_2 = 'Zona Industrial 2',
        PARQUE_GUARANI = 'Parque Guarani',
        ULYSSES_GUIMARAES = 'Ulysses Guimarães',
        DONA_FRANCISCA = 'Dona Francisca',
        PROFIPO = 'Profipo'
      }
      
      const bairrosArray = Object.values(BairrosJoinville); // Transforma o enum em array de strings
      
      
      
}