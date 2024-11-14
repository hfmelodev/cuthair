'use server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface CreateBookingProps {
  serviceId: string

  date: Date
}

export async function createBooking({ serviceId, date }: CreateBookingProps) {
  const user = await getServerSession(authOptions)

  if (!user?.user) {
    throw new Error('Usuário não está autenticado.')
  }

  await prisma.booking.create({
    data: {
      serviceId,
      userId: (user.user as any).id,
      date,
    },
  })
}
