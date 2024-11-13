'use server'

import { prisma } from '@/lib/prisma'

interface CreateBookingProps {
  serviceId: string
  userId: string
  date: Date
}

export async function createBooking({
  serviceId,
  userId,
  date,
}: CreateBookingProps) {
  await prisma.booking.create({
    data: {
      serviceId,
      userId,
      date,
    },
  })
}
