import type { Barbershop } from '@prisma/client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface BarberShopItemProps {
  barbershop: Barbershop
}

export function BarberShopItem({ barbershop }: BarberShopItemProps) {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-1">
        {/* Imagem */}
        <div className="relative h-40 w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* Texto */}
        <div className="px-2 py-3">
          <div className="truncate font-semibold">{barbershop.name}</div>
          <p className="truncate text-muted-foreground">{barbershop.address}</p>

          <Button variant="secondary" className="mt-3 w-full font-semibold">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
