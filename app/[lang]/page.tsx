import { getDictionary } from "./dictionaries"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Bell, Search, Shield, Waves } from "lucide-react"
import Link from "next/link"
import { LiveStatusSection } from "@/components/live-status-section"
import { RouteGuidance } from "@/components/route-guidance"

export default async function HomePage({
  params,
}: {
  params: { lang: "en" | "hi" }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <div className="min-h-screen spiritual-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl kalash-icon">
              <Waves className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold divine-text mb-4 px-4">{dict.home.title}</h1>
            <p className="text-lg md:text-xl deep-saffron-text max-w-4xl mx-auto px-4 font-medium">
              {dict.home.subtitle}
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
            <Link href={`/${lang}/booking`} className="w-full">
              <Button className="w-full h-16 text-sm md:text-base sacred-button px-4 py-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
                <span className="text-center leading-tight">{dict.home.bookSlot}</span>
              </Button>
            </Link>

            <Link href={`/${lang}/alerts`} className="w-full">
              <Button
                variant="outline"
                className="w-full h-16 text-sm md:text-base border-orange-300 hover:bg-orange-100 bg-orange-50/70 deep-saffron-text font-medium px-4 py-3"
              >
                <Bell className="w-5 h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
                <span className="text-center leading-tight">{dict.home.viewAlerts}</span>
              </Button>
            </Link>

            <Link href={`/${lang}/lost-found`} className="w-full">
              <Button
                variant="outline"
                className="w-full h-16 text-sm md:text-base border-orange-300 hover:bg-orange-100 bg-orange-50/70 deep-saffron-text font-medium px-3 py-3"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
                <span className="text-center leading-tight whitespace-normal">{dict.home.reportLostFound}</span>
              </Button>
            </Link>

            <Link href={`/${lang}/admin`} className="w-full">
              <Button
                variant="outline"
                className="w-full h-16 text-sm md:text-base border-orange-300 hover:bg-orange-100 bg-orange-50/70 deep-saffron-text font-medium px-4 py-3"
              >
                <Shield className="w-5 h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
                <span className="text-center leading-tight">{dict.home.adminLogin}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Real-Time Route Guidance */}
        <RouteGuidance dict={dict.home} />

        {/* Live Status Section */}
        <LiveStatusSection />

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 sacred-features-heading">
            {dict.home.features.title}
          </h2>

          {/* Decorative mandala separator */}
          <div className="flex justify-center mb-8">
            <div className="mandala-separator" aria-hidden="true">
              <svg
                width="80"
                height="20"
                viewBox="0 0 80 20"
                className="text-orange-400"
                role="img"
                aria-label="Separator"
              >
                <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.6" />
                <circle cx="25" cy="10" r="2" fill="currentColor" opacity="0.8" />
                <circle cx="40" cy="10" r="4" fill="currentColor" />
                <circle cx="55" cy="10" r="2" fill="currentColor" opacity="0.8" />
                <circle cx="70" cy="10" r="3" fill="currentColor" opacity="0.6" />
                <path
                  d="M5 10 L15 10 M20 10 L30 10 M35 10 L45 10 M50 10 L60 10 M65 10 L75 10"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="sacred-card">
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <CardTitle className="deep-saffron-text">{dict.home.features.booking.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center deep-saffron-text">
                  {dict.home.features.booking.desc}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader className="text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <CardTitle className="deep-saffron-text">{dict.home.features.alerts.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center deep-saffron-text">
                  {dict.home.features.alerts.desc}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader className="text-center">
                <Search className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <CardTitle className="deep-saffron-text">{dict.home.features.lostFound.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center deep-saffron-text">
                  {dict.home.features.lostFound.desc}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
