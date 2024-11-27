import { useState, useEffect } from "react";
import axios from "axios";

interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export function useCep(cep: string) {
  const [cepData, setCepData] = useState<CepData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCep = async () => {
      if (cep.length === 8) {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await axios.get<CepData>(`https://viacep.com.br/ws/${cep}/json/`);
          
          if ("erro" in response.data) {
            throw new Error("CEP não encontrado");
          }

          setCepData(response.data);
        } catch (error) {
          console.error("Erro ao buscar dados do CEP:", error);
          setError("Erro ao buscar o CEP. Por favor, tente novamente.");
          setCepData(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCepData(null);
        setError(null);
      }
    };

    fetchCep();
  }, [cep]);

  return { cepData, isLoading, error };
}

