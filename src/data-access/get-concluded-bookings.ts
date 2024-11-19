'use server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function getConcludedBookings() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return []
  }

  return prisma.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lte: new Date(), // Datas no passado
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  })
}
