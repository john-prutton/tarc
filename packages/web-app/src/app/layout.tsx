import type { Metadata } from "next"
import { Space_Grotesk as Font } from "next/font/google"

import { Navbar } from "@/components/layout/navbar"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

import "./globals.css"

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
      <body className={cn(font.className, "flex min-h-svh flex-col")}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
