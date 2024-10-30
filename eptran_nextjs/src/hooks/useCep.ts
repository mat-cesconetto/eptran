// src/hooks/useCep.ts

import { useState, useEffect } from "react";
import axios from "axios";

interface CepData {
  cidade: string;
  bairro: string;
  rua: string;
  estado: string;
}

export function useCep(cep: string) {
  const [cepData, setCepData] = useState<CepData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (cep.length === 8) { // O CEP deve ter 8 dígitos sem o hífen
      setIsLoading(true);
      
      axios
        .get(`http://localhost:3333/location/${cep}`)
        .then((response) => {
          const { localidade, bairro, logradouro, uf } = response.data;
          setCepData({
            cidade: localidade,
            bairro: bairro,
            rua: logradouro,
            estado: uf,
          });
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do CEP:", error);
          setCepData(null);
        })
        .finally(() => setIsLoading(false));
    }
  }, [cep]);

  return { cepData, isLoading };
}
