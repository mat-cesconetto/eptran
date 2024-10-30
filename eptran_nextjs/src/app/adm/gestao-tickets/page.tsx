"use client";

import Image from "next/image";
import { useState } from "react";
import { useTickets } from '@/hooks/useTicket'; // adjust path as needed
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Trash, SquarePen, Search } from "lucide-react";
import { Status } from "@/@types/Status";
import { useRouter } from "next/navigation";

const priorityColors = {
  'Alta': "bg-red-200 text-red-600",
  'Média': "bg-yellow-200 text-yellow-600",
  'Baixa': "bg-blue-200 text-blue-700",
  'Nenhuma': "bg-gray-300 text-gray-800",
};

const statusColors = {
  'Em andamento': "bg-orange-200 text-orange-500",
  'Em aberto': "bg-green-200 text-green-600",
  'Resolvido': "bg-blue-200 text-blue-700",
  'Cancelado': "bg-gray-300 text-gray-800",
};

export default function Gerenciamento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const router = useRouter();

const handleOpenTicket = (ticketId: number) => {
  router.push(`/adm/gestao-tickets/ticket/${ticketId}`); // Redireciona para a página do ticket com o ID correspondente
};
  
  const {
    tickets,
    ticketsError,
    finalizarTicket,
  } = useTickets();

  if (ticketsError) {
    return <div className="text-red-500">Error loading tickets</div>;
  }

  if (!tickets) {
    return <div>Loading...</div>;
  }

  const getPriorityColor = (priority: string) => {
    return priorityColors[priority as keyof typeof priorityColors] || "bg-gray-300 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || "bg-gray-300 text-gray-800";
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && ticket.status === Status.EM_ABERTO) ||
      (statusFilter === "inactive" && ticket.status === Status.PENDENTE) ||
      (statusFilter === "completed" && ticket.status === Status.FINALIZADO);

    return matchesStatus;
  });

  const handleDeleteTicket = async (ticketId: number) => {
    try {
      await finalizarTicket(ticketId);
    } catch (error) {
      console.error('Failed to delete ticket:', error);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 pt-24 text-black">
      <div className="pb-5 flex gap-5">
        <div>
          <Image
            src="/ticket-8-svgrepo-com.svg"
            width={50}
            height={50}
            alt="perfil"
          />
        </div>
        <div className="text-darkBlue-500 text-4xl font-bold pt-2">
          <h1>Gestão de Ticket</h1>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Procurar"
            className="pl-8 w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="text-darkBlue-500 font-bold w-full md:w-auto">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent className="text-darkBlue-500 font-bold">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Em Aberto</SelectItem>
            <SelectItem value="inactive">Em Andamento</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-darkBlue-500 font-bold">ID</TableHead>
              <TableHead className="text-darkBlue-500 font-bold">Usuário</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">Assunto</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">Prioridade</TableHead>
              <TableHead className="pl-7 hidden md:table-cell text-darkBlue-500 font-bold">Status</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">Data da Criação</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 border-darkBlue-500 border-2">
                      <AvatarImage src={ticket.usuarioFotoPerfil || "/salsicha.svg"} alt={ticket.usuarioNome} />
                      <AvatarFallback>{ticket.usuarioNome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {ticket.usuarioNome}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{ticket.assunto}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className={`px-4 py-2 rounded-full font-semibold ${getPriorityColor(ticket.prioridade)}`}>
                    {ticket.prioridade}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(ticket.email)}`}>
                    {ticket.status}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenTicket(ticket.id)}>
  <SquarePen className="mr-2 h-4 w-4" />
  <Button variant="ghost" className="p-0">Abrir Ticket</Button>
</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteTicket(ticket.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <Button variant="ghost" className="p-0">Excluir</Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}