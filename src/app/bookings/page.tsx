import { BookingItem } from '@/components/app/booking-item'
import { Header } from '@/components/app/header'
import { getConcludedBookings } from '@/data-access/get-concluded-bookings'
import { getConfirmedBookings } from '@/data-access/get-confirmed-bookings'

export default async function Bookings() {
  const confirmedLoggedInUserBookings = await getConfirmedBookings()

  const concludedLoggedInUserBookings = await getConcludedBookings()

  return (
    <>
      <Header />

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedLoggedInUserBookings.length === 0 &&
          confirmedLoggedInUserBookings.length === 0 && (
            <p className="flex items-center justify-center text-sm text-muted-foreground">
              Você não tem agendamentos.
            </p>
          )}

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
