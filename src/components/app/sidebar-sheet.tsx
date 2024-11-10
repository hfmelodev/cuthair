import { CalendarIcon, HomeIcon, LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { quickSearchOptions } from '@/constants/search'

import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

export function SidebarSheet() {
  return (
    <SheetContent className="overflow-y-auto scrollbar-none">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* Perfil */}
      <div className="flex items-center gap-2 border-b py-5">
        <Avatar className="border-2 border-primary">
          <AvatarImage src="https://github.com/hfmelodev.png" />
        </Avatar>

        <div>
          <p className="font-bold">Hilquias Ferreira Melo</p>
          <p className="text-xs">hilquiasfmelo@gmail.com</p>
        </div>
      </div>

      {/* Início */}
      <div className="flex flex-col gap-2 border-b py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      {/* Opções */}
      <div className="flex flex-col gap-2 border-b py-5">
        {quickSearchOptions.map((option, i) => (
          <Button key={i} className="justify-start gap-2" variant="ghost">
            <Image
              src={option.imageUrl}
              height={18}
              width={18}
              priority
              alt={option.title}
            />
            {option.title}
          </Button>
        ))}
      </div>

      {/* Deslogar */}
      <div className="flex flex-col gap-2 border-b py-5">
        <Button variant="ghost">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}