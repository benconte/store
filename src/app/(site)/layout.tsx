import Navbar from '@/components/navbar/Navbar'
import '../globals.css'
import { Footer } from '@/components/home'
import { Auth } from '@/components/auth'

export const metadata = {
    title: 'Store-Shopping',
    description: 'E-commerce shopping site.',
}

export default function SiteLayout({
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
