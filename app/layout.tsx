import { Toaster } from "sonner";
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { MantineProvider } from '@mantine/core';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Decisions Platform',
  description: 'El espacio de trabajo conectado donde Se realiza un trabajo mejor y más rápido..',
  manifest: "/manifest.json",
  icons: {
    apple: "/icon.png",
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon-192x192.png",
        href: "/icon-192x192.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon-192x192-dark.png",
        href: "/icon-192x192-dark.png",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
      <MantineProvider>
        {/* <ConvexClientProvider> */}
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="Smart Decisions Platform-theme-2"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        {/* </ConvexClientProvider> */}
      </MantineProvider>
      </body>
    </html>
  )
}
