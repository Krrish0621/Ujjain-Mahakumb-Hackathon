"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MapPin, Clock, User } from "lucide-react"

interface BookingData {
  name: string
  age: string
  gender: string
  ghat: string
  date: string
  timeSlot: string
  tokenId: string
  bookingTime: string
}

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<BookingData | null>(null)

  useEffect(() => {
    const safeParse = <T,>(value: string | null): T | null => {
      if (!value) return null
      try {
        return JSON.parse(value) as T
      } catch (err) {
        console.error("[v0] Failed to parse currentBooking:", (err as Error).message)
        try {
          localStorage.removeItem("currentBooking")
        } catch {}
        return null
      }
    }

    const raw = typeof window !== "undefined" ? localStorage.getItem("currentBooking") : null
    const parsed = safeParse<BookingData>(raw)
    if (parsed) setBooking(parsed)
  }, [])

  const handleDownload = () => {
    if (!booking) return

    const content = `
ShipraSetu - Simhastha 2028
Booking Confirmation

Token ID: ${booking.tokenId}
Name: ${booking.name}
Age: ${booking.age}
Gender: ${booking.gender}
Ghat: ${booking.ghat}
Date: ${booking.date}
Time: ${booking.timeSlot}

Please arrive 15 minutes before your scheduled time.
    `

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ShipraSetu-Token-${booking.tokenId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>No booking data found. Please make a booking first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your ghat slot has been successfully reserved</p>
        </div>

        <Card className="ghat-card mb-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-green-600">Token ID: {booking.tokenId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-semibold">Pilgrim Name</p>
                  <p className="text-gray-600">{booking.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-semibold">Ghat</p>
                  <p className="text-gray-600">{booking.ghat}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-gray-600">{booking.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-gray-600">{booking.timeSlot}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-semibold">Important:</p>
              <p className="text-yellow-700">Please arrive 15 minutes before your scheduled time</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Token
          </Button>
        </div>
      </div>
    </div>
  )
}
