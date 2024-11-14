import { Google } from '@mui/icons-material'
import { signIn } from 'next-auth/react'

import { Button } from '../ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

export function SingInDialog() {
  async function handleLoginGoogle() {
    await signIn('google')
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conect-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button
        className="font-bold"
        variant="outline"
        onClick={handleLoginGoogle}
      >
        <Google />
        Google
      </Button>
    </>
  )
}
