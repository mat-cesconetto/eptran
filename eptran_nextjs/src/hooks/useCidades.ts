import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCidade(estado: string) {
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (estado) {
        setIsLoading(true);
        setError(null);
        try {
          console.log(`Buscando cidades para o estado: ${estado}`);
          const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
          const cities = response.data.map((city: any) => city.nome);
          console.log(`Cidades encontradas: ${cities.length}`);
          setCityNames(cities);
        } catch (error) {
          console.error('Erro ao buscar cidades:', error);
          setError('Erro ao carregar as cidades. Por favor, tente novamente.');
          setCityNames([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCityNames([]);
      }
    };

    fetchCities();
  }, [estado]);

  return { cityNames, isLoading, error };
}

