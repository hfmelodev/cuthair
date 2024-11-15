'use client'

import type { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteBooking } from '@/actions/delete-booking'
import { formatCurrency } from '@/utils/format-currency'

import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { PhoneItem } from './phone-item'

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
  const [isDialogSheetConfirmed, setIsDialogSheetConfirmed] = useState(false)

  const isConfirmed = isFuture(booking.date)

  const {
    service: { barbershop },
  } = booking

  async function handleCancelBookingOfService() {
    try {
      await deleteBooking({
        bookingId: booking.id,
        serviceId: booking.serviceId,
      })

      setIsDialogSheetConfirmed(false)

      toast.success('Agendamento cancelado com sucesso!')
    } catch (err) {
      console.log(err)

      toast.error('Houve um problema ao cancelar reserva.', {
        description: 'Tente novamente!',
      })
    }
  }

  function handleSheetOpenChange(isOpen: boolean) {
    setIsDialogSheetConfirmed(isOpen)
  }

  return (
    <Sheet open={isDialogSheetConfirmed} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="min-w-full">
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
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        {/* Imagem */}
        <div className="relative mt-6 flex h-44 w-full items-end">
          <Image
            alt={`Mapa da Barbearia ${barbershop.name}`}
            src="/mapa.svg"
            className="rounded-xl object-cover"
            fill
            priority
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações do Agendamento */}
        <div className="mt-6">
          <Badge
            className="w-fit font-bold"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>

          <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {formatCurrency(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-muted-foreground">Data</h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-muted-foreground">Horário</h2>
                <p className="text-sm">
                  {format(booking.date, 'HH:mm', {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-muted-foreground">Barbearia</h2>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          {/* Telefones */}
          <div className="space-y-3">
            {barbershop.phones.map((phone, i) => (
              <PhoneItem key={i} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-12">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            <Dialog>
              {isConfirmed && (
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full font-bold">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>
              )}

              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Cancelar Reserva</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja cancelar esse agendamento?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-3">
                  <DialogClose asChild>
                    <Button variant="secondary" className="w-full">
                      Voltar
                    </Button>
                  </DialogClose>

                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="w-full font-bold"
                      onClick={handleCancelBookingOfService}
                    >
                      Confirmar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
