import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/home'
import { ReduxProvider } from '@/redux/provider'
import { Auth } from '@/components/auth'
import ToasterContext from '@/context/ToasterContext'
import { AuthContext } from '@/context/AuthContext'
import HandleAuth from '@/context/HandleAuth'

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
        <ReduxProvider>
          <AuthContext>
            <HandleAuth>
              <ToasterContext />
              {children}
            </HandleAuth>
          </AuthContext>
        </ReduxProvider>
      </body>
    </html>
  )
}
