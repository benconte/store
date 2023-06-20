import Navbar from '@/components/navbar/Navbar'
import '../globals.css'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/home'
import { Auth } from '@/components/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Cart-Store',
    description: 'E-commerce shopping site.',
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar>
                <Auth />
                {children}
            </Navbar>
            <Footer />
        </>
    )
}
