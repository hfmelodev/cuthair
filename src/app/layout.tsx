import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { Footer } from '@/components/app/footer'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/providers/auth-provider'

const nunito = Nunito({
  subsets: ['latin'], // Defina os subsets das fontes que você precisa
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'CutHair',
  icons: {
    icon: '/scissors.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={nunito.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <div className="flex-1">{children}</div>
            <Footer />
          </AuthProvider>
        </div>
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}
