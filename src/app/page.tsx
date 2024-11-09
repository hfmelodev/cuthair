import { SearchIcon } from 'lucide-react'
import Image from 'next/image'

import { BarberShopItem } from '@/components/app/barbershop-item'
import { Footer } from '@/components/app/footer'
import { Header } from '@/components/app/header'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const barbershops = await prisma.barbershop.findMany()
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        {/* Texto */}
        <div>
          <h2 className="text-xl font-bold">Olá, Hilquias!</h2>
          <p>Sábado, 09 de Novembro.</p>
        </div>

        {/* Busca */}
        <div className="flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Busca rápida */}
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant="secondary">
            <Image src="/tesoura.svg" width={16} height={16} alt="Cabelo" />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/bigode.svg" width={16} height={16} alt="Barba" />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/gilete.svg" width={16} height={16} alt="Acabamento" />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/tesoura.svg" width={16} height={16} alt="Cabelo" />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/bigode.svg" width={16} height={16} alt="Barba" />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/gilete.svg" width={16} height={16} alt="Acabamento" />
            Acabamento
          </Button>
        </div>

        {/* Imagem */}
        <div className="relative h-36 w-full">
          <Image
            alt="Agende nos melhores com CutHair"
            src="/banner-home.svg"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamento */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xs font-bold uppercase text-muted-foreground">
            Agendamentos
          </h1>
          <Card>
            <CardContent className="flex justify-between p-0">
              {/* Esquerda */}
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="w-fit font-bold">Confirmado</Badge>
                <h3 className="font-semibold">Corte de Cabelo</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />
                  </Avatar>
                  <p className="text-xs">Barbearia Vintage</p>
                </div>
              </div>

              {/* Direita */}
              <div className="flex flex-col items-center justify-center border-l px-9 py-3">
                <p className="text-sm">Novembro</p>
                <strong className="text-2xl">09</strong>
                <p className="text-sm">14:30</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recomendados */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xs font-bold uppercase text-muted-foreground">
            Recomendados
          </h1>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {/* Enviado os dados da barbearia como propriedade */}
            {barbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        {/* Populares */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xs font-bold uppercase text-muted-foreground">
            Populares
          </h1>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {/* Enviado os dados da barbearia como propriedade */}
            {popularBarbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
