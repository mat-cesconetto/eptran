// types.ts
export interface Response {
    text: string;
    correct: boolean;
  }
  
  export interface Question {
    questao: string;
    imagem: string;
    respostas: Response[];
  }
  