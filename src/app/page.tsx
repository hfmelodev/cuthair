import { SearchIcon } from "lucide-react";
import Image from "next/image";

import { Header } from "@/components/app/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        <div>
          <h2 className="text-xl font-bold">Olá, Hilquias!</h2>
          <p>Sábado, 09 de Novembro.</p>
        </div>

        <div className="flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative h-36 w-full">
          <Image
            alt="Agende nos melhores com CutHair"
            src="/banner-home.svg"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
