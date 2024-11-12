import { BarberShopItem } from '@/components/app/barbershop-item'
import { Header } from '@/components/app/header'
import { Search } from '@/components/app/search'
import { prisma } from '@/lib/prisma'

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const barbershops = await prisma.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  })

  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        <Search />

        <h2 className="text-xs font-bold uppercase text-muted-foreground">{`Resultados para "${searchParams.search}"`}</h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
