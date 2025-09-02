import type React from "react"
import { Noto_Serif, Noto_Sans_Devanagari } from "next/font/google"
import { getDictionary } from "./dictionaries"
import { Navbar } from "@/components/navbar"
import { DataProvider } from "@/contexts/data-context"
import { DiyaIcons } from "@/components/sacred-ui-elements"
import { Suspense } from "react"

// Load fonts using Next.js font system
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-devanagari",
  display: "swap",
})

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "hi" }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: "en" | "hi" }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <html lang={lang} dir="ltr" className={`${notoSerif.variable} ${notoSansDevanagari.variable}`}>
      <body className={`font-serif ${lang === "hi" ? "font-devanagari" : ""}`}>
        <DataProvider>
          <DiyaIcons />
          <Suspense fallback={null}>
            <Navbar lang={lang} dict={dict} />
            <main className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 sacred-ambiance">
              {children}
            </main>
          </Suspense>
        </DataProvider>
      </body>
    </html>
  )
}
