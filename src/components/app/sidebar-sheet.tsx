'use client'

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import { quickSearchOptions } from '@/constants/search'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { SingInDialog } from './sing-in-dialog'

export function SidebarSheet() {
  const { data } = useSession()

  async function handleLogoutUserGoogle() {
    await signOut()
  }

  return (
    <SheetContent className="overflow-y-auto scrollbar-none">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* Perfil */}
      <div className="flex items-center justify-between gap-2 border-b py-5">
        {!data?.user ? (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>

              {/* Renderiza o componente de login */}
              <DialogContent className="w-[90%]">
                <SingInDialog />
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className="flex items-center gap-2.5">
            <Avatar className="border-2 border-primary">
              <AvatarImage src={data.user.image!} />

              <AvatarFallback>
                <User size={20} />
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        )}
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
          <SheetClose key={i} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  height={18}
                  width={18}
                  priority
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {/* Deslogar */}
      <div className="flex flex-col gap-2 border-b py-5">
        <Button variant="ghost" onClick={handleLogoutUserGoogle}>
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}
