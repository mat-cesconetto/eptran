"use client";

import { TbUserSquareRounded } from "react-icons/tb";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

const users = [
  {
    id: "23222",
    name: "José Silva",
    email: "jose.silva@gmail.com",
    gender: "♂",
    birthdate: "11/12/2024",
    location: "JOINVILLE/SC",
    school: "E.E.B GAG",
    grade: "3º EM",
  },
  // Add more user objects here...
];

export default function Gerenciamento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");

  return (
    <main className=" min-h-screen p-4 md:p-8 lg:pl-72 pt-24 text-black">
      <div className="mt-24 py-5 flex gap-5 ">
        <div>
          <TbUserSquareRounded size={56} color="#023859" />
        </div>
        <div className="text-darkBlue-500 text-4xl font-bold pt-3">
          <h1>Gestão de Usuários</h1>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
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
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Todos os Usuários" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Usuários</SelectItem>
            <SelectItem value="active">Usuários Ativos</SelectItem>
            <SelectItem value="inactive">Usuários Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead className="hidden md:table-cell">E-mail</TableHead>
              <TableHead className="hidden md:table-cell">Gênero</TableHead>
              <TableHead className="hidden md:table-cell">Nascimento</TableHead>
              <TableHead className="hidden md:table-cell">
                Cidade/Estado
              </TableHead>
              <TableHead className="hidden md:table-cell">Escola</TableHead>
              <TableHead className="hidden md:table-cell">
                Escolaridade
              </TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/image/salsicha.png" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.gender}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.birthdate}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.location}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.school}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.grade}
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
                      <DropdownMenuItem>
                        <SquarePen className="mr-2 h-4 w-4" />
                        <span>Editar Usuário</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Excluir Usuário</span>
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
