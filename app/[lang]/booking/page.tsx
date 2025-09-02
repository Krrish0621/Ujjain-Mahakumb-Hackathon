"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

const ghats = [
  { id: 1, name: "Ram Ghat", available: true },
  { id: 2, name: "Triveni Ghat", available: true },
  { id: 3, name: "Mangalnath Ghat", available: false },
  { id: 4, name: "Kal Bhairav Ghat", available: true },
  { id: 5, name: "Dada Nagar Ghat", available: true },
  { id: 6, name: "Shipra Ghat", available: true },
]

const timeSlots = [
  { id: 1, time: "06:00 AM - 08:00 AM", available: true },
  { id: 2, time: "08:00 AM - 10:00 AM", available: true },
  { id: 3, time: "10:00 AM - 12:00 PM", available: false },
  { id: 4, time: "12:00 PM - 02:00 PM", available: true },
  { id: 5, time: "02:00 PM - 04:00 PM", available: true },
  { id: 6, time: "04:00 PM - 06:00 PM", available: true },
]

export default function BookingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    ghat: "",
    date: "",
    timeSlot: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate token ID
    const tokenId = "GH" + Date.now().toString().slice(-6)

    // Store booking data in localStorage for demo
    localStorage.setItem(
      "currentBooking",
      JSON.stringify({
        ...formData,
        tokenId,
        bookingTime: new Date().toISOString(),
      }),
    )

    router.push("/en/confirmation")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Ghat Slot</h1>
          <p className="text-gray-600">Reserve your sacred bathing time</p>
        </div>

        <Card className="ghat-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-orange-500" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ghat">Select Ghat</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, ghat: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a ghat" />
                  </SelectTrigger>
                  <SelectContent>
                    {ghats.map((ghat) => (
                      <SelectItem key={ghat.id} value={ghat.name} disabled={!ghat.available}>
                        {ghat.name} {ghat.available ? "(Available)" : "(Unavailable)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div>
                <Label htmlFor="timeSlot">Select Time Slot</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.time} disabled={!slot.available}>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {slot.time} {slot.available ? "(Available)" : "(Full)"}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Book Slot
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
