'use client'
import Image from "next/image";
import { useState } from "react";
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
import { useUsers } from "@/hooks/useUsers";
import UserRow from "./UserRow";

export default function Gerenciamento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { users, isLoading, isLoggedOut, totalPages } = useUsers(currentPage);

  // Filtro de busca e gênero
  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender =
      userFilter === "all" || user.sexo.toLowerCase() === userFilter;

    return matchesSearchTerm && matchesGender;
  });

  if (isLoading) return <div>Loading...</div>;
  if (isLoggedOut) return <div>Você não está autenticado.</div>;

  return (
    <main className="min-h-screen p-4 md:p-8 pt-24 text-black">
      <div className="pb-5 flex gap-5">
        <div>
          <Image src="/user-svgrepo-com.svg" width={50} height={50} alt="perfil" />
        </div>
        <div className="text-darkBlue-500 text-4xl font-bold pt-2">
          <h1>Gestão de Usuários</h1>
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
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="text-darkBlue-500 font-bold w-full md:w-auto ">
            <SelectValue placeholder="Todos os Usuários" />
          </SelectTrigger>
          <SelectContent className="text-darkBlue-500 font-bold">
            <SelectItem value="all">Todos os Usuários</SelectItem>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="feminino">Feminino</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-darkBlue-500 font-bold">ID</TableHead>
              <TableHead className="text-darkBlue-500 font-bold">Usuário</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">E-mail</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">Gênero</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">Nascimento</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">Cidade/Estado</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">Escola</TableHead>
              <TableHead className="hidden md:table-cell text-darkBlue-500 font-bold">Escolaridade</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <UserRow
                key={user.id}
                user={{
                  id: String(user.id),
                  name: user.nome,
                  email: user.email,
                  gender: user.sexo,
                  birthdate: new Date(user.data_nasc).toLocaleDateString(),
                  location: `${user.cidade}/${user.estado}`,
                  school: user.escola,
                  grade: user.escolaridade
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </main>
  );
}
