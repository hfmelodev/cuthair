import { ChevronLeftIcon, MapPinIcon, MenuIcon, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PhoneItem } from '@/components/app/phone-item'
import { ServiceItem } from '@/components/app/service-item'
import { SidebarSheet } from '@/components/app/sidebar-sheet'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { prisma } from '@/lib/prisma'

interface BarbershopsProps {
  params: {
    id: string
  }
}

export default async function Barbershops({ params }: BarbershopsProps) {
  // Busca uma barbearia no banco pelo Id
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          className="object-cover"
          alt={barbershop.name}
          fill
          priority
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        {/* Abre uma aba da esquerda para direita */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SidebarSheet />
        </Sheet>
      </div>

      {/* Texto */}
      <div className="border-b p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          {barbershop.address}
        </div>

        <div className="flex items-center gap-2">
          <Star className="fill-primary text-primary" size={18} />
          5,0 (889 avaliações)
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2 border-b p-5">
        <h2 className="text-xs uppercase text-muted-foreground">Sobre nós</h2>

        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      {/* Serviços */}
      <div className="space-y-3 border-b p-5">
        <h1 className="text-xs uppercase text-muted-foreground">Serviços</h1>

        {/* Passando os serviços das barbearias como propriedade */}
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={JSON.parse(JSON.stringify(service))}
            barbershop={JSON.parse(JSON.stringify(barbershop))}
          />
        ))}
      </div>

      {/* Contatos */}
      <div className="space-y-3 border-b p-5 pb-12">
        <h1 className="text-xs uppercase text-muted-foreground">Contato</h1>

        {barbershop.phones.map((phone, i) => (
          <PhoneItem key={i} phone={phone} />
        ))}
      </div>
    </div>
  )
}
