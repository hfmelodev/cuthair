'use client'

import { Smartphone } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '../ui/button'

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  function handleCopyTextPhone(phone: string) {
    navigator.clipboard.writeText(phone)

    toast.success('Telefone copiado com sucesso!')
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Smartphone size={24} />
        <p>{phone}</p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyTextPhone(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}
