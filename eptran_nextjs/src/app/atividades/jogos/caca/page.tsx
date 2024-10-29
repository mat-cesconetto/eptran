'use client'

import Footer from "@/app/components/ui/footer";
import GamePage from "./caça-palavras";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <GamePage />
      </main>
      <Footer />
    </div>
  );
}