'use client'

import type { BarbershopService } from '@prisma/client'
import Image from 'next/image'

import { formatCurrency } from '@/utils/format-currency'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface ServiceItemProps {
  service: BarbershopService
}

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-3">
        {/* Imagem */}
        <div className="relative max-h-28 min-h-28 min-w-28 max-w-28">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={service.imageUrl}
            alt={service.name}
            priority
          />
        </div>

        {/* Texto */}
        <div className="w-full space-y-2">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>

          <div className="flex items-center justify-between">
            <strong className="text-primary">
              {formatCurrency(Number(service.price))}
            </strong>

            <Button variant="secondary" className="font-bold" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
