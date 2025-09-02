import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Waves } from "lucide-react"

type Dict = Awaited<ReturnType<typeof import("../app/[lang]/dictionaries").getDictionary>>

interface NavbarProps {
  lang: "en" | "hi"
  dict: {
    nav: Dict["nav"]
  }
}

export function Navbar({ lang, dict }: NavbarProps) {
  const switchLang = lang === "en" ? "hi" : "en"

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 backdrop-blur-md shadow-md border-b border-orange-200/50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <Link href={`/${lang}`} className="flex items-center space-x-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg kalash-icon">
            <Waves className="h-7 w-7 text-white" />
          </span>
          <div className="flex flex-col">
            <span className="text-2xl font-bold divine-text tracking-wide">ShipraSetu</span>
            <span className="text-xs text-orange-600 font-medium">Sacred Journey 2028</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden gap-8 md:flex">
          <Link
            href={`/${lang}`}
            className="text-sm font-medium text-orange-800 hover:text-orange-600 transition-colors"
          >
            {dict.nav.home}
          </Link>
          <Link
            href={`/${lang}/booking`}
            className="text-sm font-medium text-orange-800 hover:text-orange-600 transition-colors"
          >
            {dict.nav.booking}
          </Link>
          <Link
            href={`/${lang}/alerts`}
            className="text-sm font-medium text-orange-800 hover:text-orange-600 transition-colors"
          >
            {dict.nav.alerts}
          </Link>
          <Link
            href={`/${lang}/lost-found`}
            className="text-sm font-medium text-orange-800 hover:text-orange-600 transition-colors"
          >
            {dict.nav.lostFound}
          </Link>
          <Link
            href={`/${lang}/admin`}
            className="text-sm font-medium text-orange-800 hover:text-orange-600 transition-colors"
          >
            {dict.nav.admin}
          </Link>
        </div>

        {/* Language Switcher */}
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-orange-300 hover:bg-orange-100 bg-orange-50/50 text-orange-800 font-medium"
        >
          <Link href={`/${switchLang}`}>{dict.nav.language}</Link>
        </Button>
      </nav>
    </header>
  )
}
