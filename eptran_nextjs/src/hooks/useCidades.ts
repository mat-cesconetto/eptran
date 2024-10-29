import { useState, useEffect } from "react";

export function useCidade(state: string) {
  const [cityName, setCityName] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (state) {
      setIsLoading(true);
      fetch(`http://localhost:3333/cidades/${state}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch cities: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => setCityName(data))
        .catch((error) => console.error("Error fetching cities:", error))
        .finally(() => setIsLoading(false));
    }
  }, [state]);

  return { cityName, isLoading };
}
 