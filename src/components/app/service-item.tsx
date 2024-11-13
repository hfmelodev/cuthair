'use client'

import type { Barbershop, BarbershopService } from '@prisma/client'
import { format, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { createBooking } from '@/actions/create-booking'
import { formatCurrency } from '@/utils/format-currency'
import { TIME_LIST } from '@/utils/time-list'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Card, CardContent } from '../ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  // Estado que monitora o dia selecionado
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)

  // Estado que monitora a hora/minuto selecionado
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  // Busca as informações do usuário logado
  const { data } = useSession()

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    try {
      if (!selectedDay || !selectedTime) return

      // Separa a hora e o minuto. Ex: ["09":"00"]
      const hour = Number(selectedTime.split(':')[0])
      const minute = Number(selectedTime.split(':')[1])

      const fullSelectedDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: fullSelectedDate,
      })

      toast.success('Reserva realizada com sucesso!')
    } catch (err) {
      console.log(err)

      toast.error('Houve um erro em realizar a reserva.', {
        description: 'Tente novamente!',
      })
    }
  }

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
        <div className="w-full space-y-3">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>

          <div className="flex items-center justify-between">
            <strong className="text-primary">
              {formatCurrency(Number(service.price))}
            </strong>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" className="font-bold" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent className="px-0">
                <SheetHeader className="border-b px-5 pb-5">
                  <SheetTitle className="text-left">Fazer Reserva</SheetTitle>
                </SheetHeader>

                {/* Calendário */}
                <div className="border-b py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize',
                      },
                      cell: {
                        width: '100%',
                      },
                      button: {
                        width: '100%',
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                      },
                      caption: {
                        textTransform: 'capitalize',
                      },
                    }}
                  />
                </div>

                {/* Horários */}
                {selectedDay && (
                  <div className="flex gap-3 overflow-x-auto border-b p-5 scrollbar-none">
                    {TIME_LIST.map((time, i) => (
                      <Button
                        key={i}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Informações da Reserva */}
                {selectedDay && selectedTime && (
                  <Card className="m-5">
                    <CardContent className="space-y-3 p-3">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm font-bold">
                          {formatCurrency(Number(service.price))}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-muted-foreground">Data</h2>
                        <p className="text-sm">
                          {format(selectedDay, "d 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-muted-foreground">
                          Horário
                        </h2>
                        <p className="text-sm">{selectedTime}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-muted-foreground">
                          Barbearia
                        </h2>
                        <p className="text-sm">{barbershop.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <SheetFooter className="m-5 mt-5">
                  <SheetClose>
                    <Button
                      onClick={handleCreateBooking}
                      className="mt-auto w-full font-bold"
                      type="submit"
                      disabled={!setSelectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
