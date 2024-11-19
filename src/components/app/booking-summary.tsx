import type { Barbershop, BarbershopService } from '@prisma/client'
import { format } from 'date-fns'

import { formatCapitalizedDate } from '@/utils/format-capitalized-date'
import { formatCurrency } from '@/utils/format-currency'

import { Card, CardContent } from '../ui/card'

interface BookingSummaryProps {
  service: Pick<BarbershopService, 'name' | 'price'>
  barbershop: Pick<Barbershop, 'name'>
  selectedDate: Date
}

export function BookingSummary({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) {
  return (
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
          <p className="text-sm">{formatCapitalizedDate(selectedDate)}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-muted-foreground">Horário</h2>
          <p className="text-sm">{format(selectedDate, 'HH:mm')}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-muted-foreground">Barbearia</h2>
          <p className="text-sm">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
