'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'

interface DeleteBookingsProps {
  bookingId: string
  serviceId: string
}

export async function deleteBooking({
  bookingId,
  serviceId,
}: DeleteBookingsProps) {
  await prisma.booking.delete({
    where: {
      serviceId,
      id: bookingId,
    },
  })
}

revalidatePath('/barbershops/[id')
