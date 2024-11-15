'use client'

import type { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const isConfirmed = isFuture(booking.date)

  return (
    <Card className="min-w-[90%]">
      <CardContent className="flex justify-between p-0">
        {/* Esquerda */}
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge
            className="w-fit font-bold"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>
          <h3 className="font-semibold">{booking.service.name}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-xs">{booking.service.barbershop.name}</p>
          </div>
        </div>

        {/* Direita */}
        <div className="flex flex-col items-center justify-center border-l px-9 py-3">
          <p className="text-sm capitalize">
            {format(booking.date, 'MMMM', { locale: ptBR })}
          </p>
          <strong className="text-2xl">
            {format(booking.date, 'dd', { locale: ptBR })}
          </strong>
          <p className="text-sm">
            {format(booking.date, 'HH:mm', { locale: ptBR })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
