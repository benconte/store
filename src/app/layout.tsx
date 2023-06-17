import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/home'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Store-Shopping',
  description: 'E-commerce shopping site.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar>
          {children}
        </Navbar>
        <Footer />
      </body>
    </html>
  )
}
