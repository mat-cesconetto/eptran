import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Trash, SquarePen } from "lucide-react";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  birthdate: string;
  location: string;
  school: string;
  grade: string;
}

const UserRow = ({ user }: { user: User }) => {
  const { deleteUser, isDeleting } = useDeleteUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    const success = await deleteUser(user.id);
    if (success) {
      setIsDialogOpen(false);
      // Adicione uma ação para atualizar a lista de usuários, se necessário
    }
  };

  return (
    <>
      <TableRow key={user.id}>
        <TableCell className="font-medium">{user.id}</TableCell>
        <TableCell>
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2 border-darkBlue-500 border-2">
              <AvatarImage src="/salsicha.svg" alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {user.name}
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
        <TableCell className="hidden md:table-cell">{user.gender}</TableCell>
        <TableCell className="hidden md:table-cell">{user.birthdate}</TableCell>
        <TableCell className="hidden md:table-cell">{user.location}</TableCell>
        <TableCell className="hidden md:table-cell">{user.school}</TableCell>
        <TableCell className="hidden md:table-cell">{user.grade}</TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-darkBlue-500 font-bold">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Excluir Usuário</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Popup de confirmação de exclusão */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmação de Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza de que deseja excluir o usuário {user.name}?</p>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} disabled={isDeleting} variant="destructive">
              {isDeleting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserRow;
