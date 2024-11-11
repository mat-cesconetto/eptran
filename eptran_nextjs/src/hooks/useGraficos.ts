import useSWR from 'swr';

const API_URL = 'http://localhost:3333';
const fetcher = (url: string) => fetch(url).then(res => {
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
});

// Hook para acessos semanais
export const useWeeklyAccesses = () => {
    const { data, error } = useSWR(`${API_URL}/stats/accesses/weekly`, fetcher);
    return { data, error };
};

// Hook para total de acessos
export const useTotalAccesses = () => {
    const { data, error } = useSWR(`${API_URL}/stats/accesses/total`, fetcher);
    return { data, error };
};

// Hook para acessos por top escolas
export const useTopSchoolsAccesses = () => {
    const { data, error } = useSWR(`${API_URL}/stats/accesses/top-escolas`, fetcher);
    return { data, error };
};

// Hook para acessos por sexo
export const useAccessesByGender = () => {
    const { data, error } = useSWR(`${API_URL}/stats/accesses/sexo`, fetcher);
    return { data, error };
};

// Hook para acessos por idade
export const useAccessesByAge = () => {
    const { data, error } = useSWR(`${API_URL}/stats/accesses/idade`, fetcher);
    return { data, error };
};

// Hook para acessos por localização
export const useAccessesByLocation = () => {
    const { data, error } = useSWR(`${API_URL}/stats/accesses/location`, fetcher);
    return { data, error };
};
