export interface Material {
    escolaridade: string;
    titulo: string;
    descricao: string;
    materialLink: string;
  }

export interface MateriaisResponse {
    materiaisInfo: Material[]; // Lista de materiais
    totalMateriais: number; // Total de materiais disponíveis
    totalPages: number; // Total de páginas de materiais
    currentPage: number; // Página atual
  }