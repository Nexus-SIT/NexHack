import type { Metadata } from 'next';
import { Anton, Oswald, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-anton'
});

const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald'
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains'
});

export const metadata: Metadata = {
    title: 'Nexathon - The Ronin\'s Scroll',
    description: 'A comprehensive Hackathon Management System featuring team formation, QR-based food coupon redemption, and role-based dashboards. Made by Manish.',
    authors: [{ name: 'Manish' }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${anton.variable} ${oswald.variable} ${jetbrainsMono.variable} bg-[#C91B1A] text-[#EFE6D5] texture-overlay`}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
