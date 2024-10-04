import prismaClient from "../prisma"; // Importando o Prisma Client

class AccessRepository {

    async logAccess(userId: number) {
        await prismaClient.access.create({
            data: {
                userId: userId, // O ID do usuário que está acessando
                date: new Date(), // Adicione a data do acesso
            }
        });
    }

    async getWeeklyAccessesByEducation() {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const accesses = await prismaClient.access.findMany({
            where: {
                date: {
                    gte: sevenDaysAgo,
                },
            },
            include: {
                user: {
                    select: {
                        escolaridade: true,
                    },
                },
            },
        });
        
        const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const accessByEducationAndDay = {
            ENSINO_FUNDAMENTAL_I: new Array(7).fill(0),
            ENSINO_FUNDAMENTAL_II: new Array(7).fill(0),
            ENSINO_MEDIO: new Array(7).fill(0),
            OUTROS: new Array(7).fill(0),
        };

        // Agrupa os acessos por escolaridade e dia da semana
        accesses.forEach((access) => {
            const accessDay = new Date(access.date).getDay(); // Obtém o índice do dia da semana
            const escolaridade = (access.user?.escolaridade || 'OUTROS') as keyof typeof accessByEducationAndDay; // Faz o casting
            accessByEducationAndDay[escolaridade][accessDay] += 1; // Incrementa o número de acessos para o dia e escolaridade
        });

        return (Object.keys(accessByEducationAndDay) as Array<keyof typeof accessByEducationAndDay>).map(escolaridade => ({
            escolaridade,
            accessesByDay: daysOfWeek.map((day, index) => ({
                day,
                accesses: accessByEducationAndDay[escolaridade][index], // Agora escolaridade é corretamente tipada
            })),
        }));
    }
}

export { AccessRepository };
