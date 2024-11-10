import { SearchIcon } from 'lucide-react'
import Image from 'next/image'

import { BarberShopItem } from '@/components/app/barbershop-item'
import { BookingItem } from '@/components/app/booking-item'
import { Header } from '@/components/app/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { quickSearchOptions } from '@/constants/search'
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
        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant="secondary">
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
                priority
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* Imagem */}
        <div className="relative h-36 w-full">
          <Image
            alt="Agende nos melhores com CutHair"
            src="/banner-home.svg"
            className="rounded-xl object-cover"
            fill
            priority
          />
        </div>

        {/* Agendamento */}
        <BookingItem />

        {/* Recomendados */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xs font-bold uppercase text-muted-foreground">
            Recomendados
          </h1>

          <div className="flex gap-4 overflow-x-auto scrollbar-none">
            {/* Enviando os dados da barbearia como propriedade */}
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
    </div>
  )
}
