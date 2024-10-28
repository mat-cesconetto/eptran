import prismaClient from "../prisma";
import { SexoEnum, Prisma, Access, Usuario } from "@prisma/client";

class AccessRepository {
    async logAccess(userId: number) {
        await prismaClient.access.create({
            data: {
                userId: userId,
                date: new Date(),
            }
        });
    }
    // No AccessRepository


    
    async getTotalAccesses() {
        const totalAccesses = await prismaClient.usuario.count();
        return totalAccesses;
    }

    async countAccessesByAgeGroups() {
        const currentDate = new Date();
        
        // Calculate cutoff dates for each age group
        const age18Cutoff = new Date(currentDate);
        age18Cutoff.setFullYear(currentDate.getFullYear() - 18);
        
        const age14Cutoff = new Date(currentDate);
        age14Cutoff.setFullYear(currentDate.getFullYear() - 14);
        
        const age11Cutoff = new Date(currentDate);
        age11Cutoff.setFullYear(currentDate.getFullYear() - 11);
        
        const age6Cutoff = new Date(currentDate);
        age6Cutoff.setFullYear(currentDate.getFullYear() - 6);

        // Get counts for each age group separately
        const [age18Plus, age14to17, age11to13, age6to10, under6] = await Promise.all([
            // 18+
            prismaClient.usuario.count({
                where: {
                    data_nasc: {
                        lte: age18Cutoff,
                    },
                },
            }),
            // 14-17
            prismaClient.usuario.count({
                where: {
                    data_nasc: {
                        gt: age18Cutoff,
                        lte: age14Cutoff,
                    },
                },
            }),
            // 11-13
            prismaClient.usuario.count({
                where: {
                    data_nasc: {
                        gt: age14Cutoff,
                        lte: age11Cutoff,
                    },
                },
            }),
            // 6-10
            prismaClient.usuario.count({
                where: {
                    data_nasc: {
                        gt: age11Cutoff,
                        lte: age6Cutoff,
                    },
                },
            }),
            // Under 6
            prismaClient.usuario.count({
                where: {
                    data_nasc: {
                        gt: age6Cutoff,
                    },
                },
            }),
        ]);

        return {
            mais18: age18Plus,                    // Apenas 18+
            mais14: age14to17,                    // Apenas 14-17
            mais11: age11to13,                    // Apenas 11-13
            mais6: age6to10,                      // Apenas 6-10
            menos6: under6,                       // Menos de 6
            total: age18Plus + age14to17 + age11to13 + age6to10 + under6
        };
    }

    // No AccessRepository
async getTopLocationsByAccess() {
    // Busca top 5 estados
    const topStates = await prismaClient.usuario.groupBy({
        by: ['estado'],
        _count: {
            id: true
        },
        orderBy: {
            _count: {
                id: 'desc'
            }
        },
        take: 5
    });

    // Busca top 5 cidades
    const topCities = await prismaClient.usuario.groupBy({
        by: ['cidade'],
        _count: {
            id: true
        },
        orderBy: {
            _count: {
                id: 'desc'
            }
        },
        take: 5
    });

    // Busca top 5 bairros
    const topNeighborhoods = await prismaClient.usuario.groupBy({
        by: ['bairro'],
        _count: {
            id: true
        },
        orderBy: {
            _count: {
                id: 'desc'
            }
        },
        take: 5
    });

    return {
        estados: topStates.map(state => ({
            estado: state.estado,
            totalAcessos: state._count.id
        })),
        cidades: topCities.map(city => ({
            cidade: city.cidade,
            totalAcessos: city._count.id
        })),
        bairros: topNeighborhoods.map(neighborhood => ({
            bairro: neighborhood.bairro,
            totalAcessos: neighborhood._count.id
        }))
    };
}


    async getTopSchoolsByAccess() {
        const topSchools = await prismaClient.usuario.groupBy({
            by: ['escola'],
            _count: {
                id: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            where: {
                id: {
                    gt: 0
                }
            },
            take: 5
        });

        return topSchools.map(school => ({
            escola: school.escola,
            totalAcessos: school._count?.id ?? 0
        }));
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

    async countAccessesByGender() {
        try {
            const accessesByGender = await prismaClient.usuario.groupBy({
                by: ['sexo'],
                _count: true
            });

            const completeResult: Record<SexoEnum, number> = {
                MASCULINO: 0,
                FEMININO: 0,
                NAO_DECLARAR: 0
            };

            accessesByGender.forEach((result) => {
                if (result.sexo && result._count) {
                    completeResult[result.sexo as SexoEnum] = result._count;
                }
            });

            return completeResult;
        } catch (error) {
            console.error("Erro ao contar acessos por sexo:", error);
            throw new Error('Erro ao contar acessos por sexo');
        }
    }
}

export { AccessRepository };