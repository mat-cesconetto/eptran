// useTickets.js
import useSWR, { useSWRConfig } from 'swr';
import { useCallback } from 'react'; // Import necessário
import { OpenTicket, ResponderTicket, Ticket, PaginatedTicketsResponse } from '@/@types/Tickets';

const API_URL = 'http://localhost:3333';

export const useTickets = () => {
  const { mutate } = useSWRConfig();

  // Listar tickets
  const { data: ticketsData, error: ticketsError, isLoading: ticketsLoading } = useSWR<PaginatedTicketsResponse>(`${API_URL}/ticket/list`, fetcher);

  // Pegar ticket por ID sem usar useSWR
  const getTicketById = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/ticket/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Ticket não encontrado');
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }, []);

  // Abrir ticket
  const openTicket = useCallback(async (ticketData: OpenTicket) => {
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
  }, [mutate]);

  // Responder ticket
  const respondToTicket = useCallback(async (id: number, responseData: ResponderTicket) => {
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
  }, [mutate]);

  // Finalizar ticket
  const finalizarTicket = useCallback(async (id: number) => {
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
  }, [mutate]);

  return {
    tickets: ticketsData?.tickets,
    totalTickets: ticketsData?.totalTickets,
    totalPages: ticketsData?.totalPages,
    currentPage: ticketsData?.currentPage,
    ticketsError,
    ticketsLoading,
    getTicketById,
    openTicket,
    respondToTicket,
    finalizarTicket,
  };
};

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
});