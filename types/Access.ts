// src/types/Access.ts

export interface Access {
    id: number; // ID do acesso
    userId: number; // ID do usuário que fez o acesso
    date: Date; // Data do acesso
    user: {
        escolaridade: string; // Escolaridade do usuário
    };
}
export interface AccessRepository {
    getWeeklyAccessData(): Promise<Access[]>; // Método para obter os dados de acessos semanais
}

// Defina o tipo para o array de acessos
export interface AccessData {
    label: string;
    data: number[]; // ou 'unknown' se você não souber o tipo exato
    backgroundColor: string;
}

