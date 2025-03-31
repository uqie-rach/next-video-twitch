import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import './globals.css'
import { nunitoSans } from '@/lib/fonts'
import { ThemeProvider } from '@/components/provider/theme-provider'

export const metadata: Metadata = {
  title: 'StreamIt | Stream, Watch, Share',
  description: 'StreamIt | Stream, Watch, Share',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${nunitoSans.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="video-theme"
          >
            <Toaster theme='light' position='bottom-center' />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
