import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

const bebasNeue = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-bebas-neue'
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
});

export const metadata: Metadata = {
    title: 'NEXATHON — Code. Culture. Create.',
    description: 'NEXATHON is a high-impact tech hackathon blending cultural roots with hyper-modern innovation. Register now for 24 hours of hacking, workshops, and more.',
    authors: [{ name: 'Manish' }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${bebasNeue.variable} ${inter.variable} bg-[#0E46A3] text-white texture-overlay`}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
