'use client'

import type { Barbershop, BarbershopService, Booking } from '@prisma/client'
import { isPast, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { createBooking } from '@/actions/create-booking'
import { getBooking } from '@/actions/get-bookings'
import { formatCurrency } from '@/utils/format-currency'
import { TIME_LIST } from '@/utils/time-list'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Card, CardContent } from '../ui/card'
import { Dialog, DialogContent } from '../ui/dialog'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import { BookingSummary } from './booking-summary'
import { SingInDialog } from './sing-in-dialog'

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

function getTimeList(bookings: Booking[]) {
  return TIME_LIST.filter((time) => {
    // Divide o horário no formato "HH:mm" em horas e minutos
    const hour = Number(time.split(':')[0])
    const minutes = Number(time.split(':')[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))

    if (timeIsOnThePast) {
      return false
    }

    // Verifica se existe uma reserva no horário atual (hora e minutos)
    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour && // Compara a hora da reserva com a hora do horário atual
        booking.date.getMinutes() === minutes, // Compara os minutos da reserva com os minutos do horário atual
    )

    if (hasBookingOnCurrentTime) {
      return false
    }

    return true
  })
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  // Estado que monitora o dia selecionado
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)

  // Estado que monitora a hora/minuto selecionado
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  // Estado que monitora os agendamentos de um dia
  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  // Estado que monitora a abertura e fechamento do Sheet
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  // Estado que monitora se o usuário está logado
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

  // Busca as informações do usuário logado
  const { data } = useSession()

  function handleUserSignInForBooking() {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }

    return setSignInDialogIsOpen(true)
  }

  useEffect(() => {
    async function fetch() {
      if (!selectedDay) return

      const bookings = await getBooking({
        date: selectedDay,
        serviceId: service.id,
      })

      setDayBookings(bookings)
    }

    fetch()
  }, [selectedDay, service.id])

  function handleBookingSheetOpenChange() {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return

    return set(selectedDay, {
      hours: Number(selectedTime.split(':')[0]),
      minutes: Number(selectedTime.split(':')[1]),
    })
  }, [selectedDay, selectedTime])

  async function handleCreateBooking() {
    try {
      if (!selectedDate) return

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })

      handleBookingSheetOpenChange()

      toast.success('Reserva realizada com sucesso!')
    } catch (err) {
      console.log(err)

      toast.error('Houve um erro em realizar a reserva.', {
        description: 'Tente novamente!',
      })
    }
  }

  function isDayDisabled(date: Date, disabledDays: number[]) {
    // Verifica se o dia da semana está na lista de dias desabilitados
    const day = date.getDay() // 0 é domingo, 6 é sábado
    return disabledDays.includes(day)
  }

  const disabledDaysOfWeek = [0, 6] // Desabilita apenas domingo e sábado

  const timeList = useMemo(() => {
    if (!selectedDay) return []

    return getTimeList(dayBookings)
  }, [selectedDay, dayBookings])

  return (
    <>
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
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>

            <div className="flex items-center justify-between">
              <strong className="text-primary">
                {formatCurrency(Number(service.price))}
              </strong>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  className="font-bold"
                  size="sm"
                  onClick={handleUserSignInForBooking}
                >
                  Reservar
                </Button>

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
                      fromDate={new Date()} // Desabilita os dias passados
                      disabled={(date) =>
                        isDayDisabled(date, disabledDaysOfWeek)
                      } // Passa os dias desabilitados
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
                    <div className="flex gap-3 overflow-x-auto border-b p-5 text-center scrollbar-none">
                      {timeList.length > 0 ? (
                        timeList.map((time, i) => (
                          <Button
                            key={i}
                            variant={
                              selectedTime === time ? 'default' : 'outline'
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="mx-auto text-xs text-muted-foreground">
                          Não há mais reservas para esse dia.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Informações da Reserva */}
                  {selectedDate && (
                    <BookingSummary
                      barbershop={barbershop}
                      service={service}
                      selectedDate={selectedDate}
                    />
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

      <Dialog open={signInDialogIsOpen} onOpenChange={setSignInDialogIsOpen}>
        <DialogContent className="w-[90%]">
          <SingInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
