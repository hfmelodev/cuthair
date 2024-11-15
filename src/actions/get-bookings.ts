'use server'

import { endOfDay, startOfDay } from 'date-fns'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export async function getBooking({ date, serviceId }: GetBookingsProps) {
  // Consulta ao banco de dados para buscar reservas com uma data específica
  const bookings = await prisma.booking.findMany({
    where: {
      serviceId, // Filtrar pelo serviço específico
      date: {
        lte: endOfDay(date), // Limite superior para a busca: fim do dia
        gte: startOfDay(date), // Limite inferior para a busca: início do dia
      },
    },
  })

  revalidatePath('/barbershops/[id')

  return bookings
}
