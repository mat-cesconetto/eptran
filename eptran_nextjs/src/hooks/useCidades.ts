import { useState, useEffect } from "react";

export function useCidade(state: string) {
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (state) {
      setIsLoading(true);

      const url = `http://localhost:3333/location/cidades/${state}`;
      console.log("Fetching cities from URL:", url);

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch cities: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          const cityNamesArray = data.map((city: { nome: string }) => city.nome);
          setCityNames(cityNamesArray);
        })
        .catch((error) => console.error("Error fetching cities:", error))
        .finally(() => setIsLoading(false));
    }
  }, [state]);

  return { cityNames, isLoading };
}
