import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { BarberShopItem } from '@/components/app/barbershop-item'
import { BookingItem } from '@/components/app/booking-item'
import { Header } from '@/components/app/header'
import { Search } from '@/components/app/search'
import { Button } from '@/components/ui/button'
import { quickSearchOptions } from '@/constants/search'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const barbershops = await prisma.barbershop.findMany()
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  const session = await getServerSession(authOptions)

  const fetchLoggedInUserBookings = session?.user
    ? await prisma.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(), // Datas no futuro
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: 'asc',
        },
      })
    : []

  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        {/* Texto */}
        <div>
          {session?.user && (
            <h2 className="text-xl font-bold">Olá, {session?.user?.name}!</h2>
          )}

          <p>Sábado, 09 de Novembro.</p>
        </div>

        {/* Busca */}

        <Search />

        {/* Busca rápida */}
        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="gap-2"
              variant="secondary"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                  priority
                />
                {option.title}
              </Link>
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

        {/* Agendamentos */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase text-muted-foreground">
            Agendamentos
          </h2>

          <div className="flex gap-3 overflow-x-auto scrollbar-none">
            {fetchLoggedInUserBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>

        {/* Recomendados */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase text-muted-foreground">
            Recomendados
          </h2>

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
