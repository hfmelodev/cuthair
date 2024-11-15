import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { BookingItem } from '@/components/app/booking-item'
import { Header } from '@/components/app/header'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function Bookings() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return notFound()
  }

  const confirmedLoggedInUserBookings = await prisma.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(), // Datas no futuro
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
      date: 'asc',
    },
  })

  const concludedLoggedInUserBookings = await prisma.booking.findMany({
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

  return (
    <>
      <Header />

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedLoggedInUserBookings.length > 0 && (
          <>
            <h2 className="text-xs font-bold uppercase text-muted-foreground">
              Confirmados
            </h2>
            {confirmedLoggedInUserBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}

        {concludedLoggedInUserBookings.length > 0 && (
          <>
            <h2 className="text-xs font-bold uppercase text-muted-foreground">
              Finalizados
            </h2>
            {concludedLoggedInUserBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}
