'use client';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTickets } from '@/hooks/useTicket';
import type { Ticket, ResponderTicket } from '@/@types/Tickets';

export default function TicketDetails() {
    const params = useParams();
    const router = useRouter();
    const { getTicketById, respondToTicket } = useTickets();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [responseText, setResponseText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTicket() {
            try {
                if (params.id) {
                    setIsLoading(true);
                    const { data, error } = await getTicketById(Number(params.id)); // Await the call
        
                    if (error) {
                        setError('Ticket não encontrado');
                    } else if (data) {
                        setTicket(data);
                    } else {
                        setError('Erro ao carregar o ticket');
                    }
                }
            } catch (err) {
                setError('Erro ao carregar o ticket');
                console.error('Erro:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTicket();
    }, [params.id, getTicketById]);

    const handleResponse = async () => {
        if (!ticket) return;

        try {
            const resposta: ResponderTicket = { resposta: responseText };
            await respondToTicket(ticket.id, resposta);
            alert('Resposta enviada com sucesso!');
            router.push('/adm/gestao-tickets');
            router.refresh();
        } catch (err) {
            console.error('Erro ao enviar resposta:', err);
            alert('Erro ao enviar resposta. Tente novamente.');
        }
    };

    if (isLoading) return <div className="p-4">Carregando...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!ticket) return <div className="p-4">Ticket não encontrado</div>;

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">{ticket.descricao}</h1>
            <p className="mb-6">{ticket.descricao}</p>
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Resposta</h2>
                <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Insira sua resposta"
                    className="w-full p-2 border rounded-md min-h-[100px]"
                />
                <button
                    onClick={handleResponse}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    disabled={!responseText.trim()}
                >
                    Enviar Resposta
                </button>
            </div>
        </main>
    );
}
