'use client'
import { useUser } from "@/hooks/useUserData";

export default function Home() {
  const { userName, isLoading, userEmail } = useUser();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const handleClick = () => {
    console.log(userName);
    console.log(userEmail);
  }

  return (
    <div>
      <h1>Bem-vindo, {userName || "Usuário"}</h1>
      <pre>{JSON.stringify({ userName, userEmail }, null, 2)}</pre>
      <button onClick={handleClick}>
        clique
      </button>
    </div>
  );
}