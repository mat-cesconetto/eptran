import { Escolaridade } from "./Escolaridade";
import { Estados } from "./Estados";
import { Sexo } from "./Sexo";

interface User {
    nome: string;
    email: string;
    senha: string;
    cep: string;
    rua: string;
    cidade: string;
    estado: Estados;
    escola: string;
    data_nasc: string;
    escolaridade: Escolaridade;
    sexo: Sexo;
  }
  