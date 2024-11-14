'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { useTickets } from '@/hooks/useTicket';
import type { Ticket, ResponderTicket } from '@/@types/Tickets';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react'

export default function TicketDetails() {
  const params = useParams();
  const router = useRouter();
  const { getTicketById, respondToTicket, ticketsLoading, ticketsError } = useTickets();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTicket = useCallback(async () => {
    try {
      if (params.id) {
        setIsLoading(true);
        const { data, error } = await getTicketById(Number(params.id));

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
  }, [getTicketById, params.id]);

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

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  if (isLoading || ticketsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || ticketsError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || ticketsError.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Ticket não encontrado</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Detalhes do Ticket</CardTitle>
          <CardDescription>ID do Ticket: {ticket.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Nome</h3>
              <p>{ticket.usuario.nome}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{ticket.usuario.email}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Descrição</h3>
            <p className="mt-1">{ticket.descricao}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Resposta</h3>
            <Textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Escreva sua resposta aqui..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleResponse} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Resposta'
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}