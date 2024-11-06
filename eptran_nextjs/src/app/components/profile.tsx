import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUserData";
import { User, Shield, Trophy, LogOut } from "lucide-react";

interface UserDropdownProps {
  onLogout: () => void;
}

const Profile: React.FC<UserDropdownProps> = ({ onLogout }) => {
  const { userName, userEmail } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Aumentando o tamanho do botão com h-20 e w-20 */}
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Olá, {userName}</p>
            <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Dados pessoais</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Shield className="mr-2 h-4 w-4" />
            <span>Privacidade</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trophy className="mr-2 h-4 w-4" />
            <span>Minhas conquistas</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair da conta</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
