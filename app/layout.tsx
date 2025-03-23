import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { Toaster } from 'sonner'

import { lato } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next Video Twitch',
  description: 'Next Video Twitch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${lato.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="video-theme"
          >
            <Toaster theme='light' position='bottom-center'/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
