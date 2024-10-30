import useSWR, { useSWRConfig } from 'swr';
import { OpenTicket, ResponderTicket, Ticket, PaginatedTicketsResponse } from '@/@types/Tickets';

const fetcher = (url: string) => fetch(url).then(res => {
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
});

const API_URL = 'http://localhost:3333';

export const useTickets = () => {
    const { mutate } = useSWRConfig();

    // Listar tickets
    const { data: ticketsData, error: ticketsError } = useSWR<PaginatedTicketsResponse>(`${API_URL}/ticket/list`, fetcher);

    // Pegar ticket por ID
    const getTicketById = (id: number) => {
        const { data, error } = useSWR<Ticket>(`${API_URL}/ticket/${id}`, fetcher);
        return { data, error };
    };

    // Abrir ticket
    const openTicket = async (ticketData: OpenTicket) => {
        const response = await fetch(`${API_URL}/ticket/open`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
            throw new Error('Failed to open ticket');
        }

        const data = await response.json();
        mutate(`${API_URL}/ticket/list`);
        return data;
    };

    // Responder ticket
    const respondToTicket = async (id: number, responseData: ResponderTicket) => {
        const response = await fetch(`${API_URL}/ticket/${id}/responder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(responseData),
        });

        if (!response.ok) {
            throw new Error('Failed to respond to ticket');
        }

        const data = await response.json();
        mutate(`${API_URL}/ticket/${id}`);
        return data;
    };

    // Finalizar ticket
    const finalizarTicket = async (id: number) => {
        const response = await fetch(`${API_URL}/ticket/${id}/finalizar`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to finalize ticket');
        }

        const data = await response.json();
        mutate(`${API_URL}/ticket/${id}`);
        return data;
    };

    return {
        tickets: ticketsData?.tickets,
        totalTickets: ticketsData?.totalTickets,
        totalPages: ticketsData?.totalPages,
        currentPage: ticketsData?.currentPage,
        ticketsError,
        getTicketById,
        openTicket,
        respondToTicket,
        finalizarTicket,
    };
};