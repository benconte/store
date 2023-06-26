import Navbar from '@/components/navbar/Navbar'
import '../globals.css'
import { Footer } from '@/components/home'
import { Auth } from '@/components/auth'

export const metadata = {
    title: 'Product-Store',
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
