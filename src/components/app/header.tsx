import { MenuIcon, Scissors } from 'lucide-react'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Sheet, SheetTrigger } from '../ui/sheet'
import { SidebarSheet } from './sidebar-sheet'

export function Header() {
  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-center gap-1">
          <Scissors className="text-primary" />
          <strong>CutHair</strong>
        </div>

        {/* Abre uma aba da esquerda para direita */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}
