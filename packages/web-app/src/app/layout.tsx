import type { Metadata } from "next"
import { Space_Grotesk as Font } from "next/font/google"

import "./globals.css"

import { Navbar } from "@/components/layout/navbar"
import { cn } from "@/lib/utils"

const font = Font({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TARC"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          font.className,
          "flex min-h-svh flex-col [&>main]:flex-1"
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
