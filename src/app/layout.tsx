import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ThemeProvider } from '@/components/provider-theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        template: 'Solana Wallet Analysis Protocal | %s',
        default: 'An Ai powered Solana wallet analysis protocal',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
        other: {
            rel: 'favicon.svg',
            url: '/favicon.svg'
        }
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable}`,
                    'overflow-x-hidden antialiased',
                )}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange>
                    <main className="overflow-hidden md:overflow-visible">
                        {children}
                        <Toaster />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
