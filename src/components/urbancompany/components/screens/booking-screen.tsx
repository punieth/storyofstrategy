"use client"

import { ArrowLeft, Check } from "lucide-react"
import { useState } from "react"

interface BookingScreenProps {
  onNavigate: (screen: string) => void
  selectedProperty?: string
}

export default function BookingScreen({ onNavigate, selectedProperty }: BookingScreenProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedPropertyState, setSelectedPropertyState] = useState(selectedProperty || "Bengaluru")
  const [selectedDate, setSelectedDate] = useState("Tomorrow")

  const services = [
    { id: 1, name: "AC Service", icon: "❄️" },
    { id: 2, name: "Cleaning", icon: "🧹" },
    { id: 3, name: "Plumbing", icon: "🔧" },
    { id: 4, name: "Pest Control", icon: "🦟" },
  ]

  const startStep = selectedProperty ? 1 : 1

  if (step === 1) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 p-4 flex items-center gap-3">
          <button onClick={() => onNavigate("home")} className="text-gray-600">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Select Service</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.name)
                  setStep(selectedProperty ? 3 : 2)
                }}
                className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-purple-500 hover:bg-purple-50 transition"
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <p className="text-sm font-semibold text-gray-900">{service.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("home")}>
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Bookings</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Properties</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Profile</span>
          </button>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 p-4 flex items-center gap-3">
          <button onClick={() => setStep(1)} className="text-gray-600">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Select Property</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {["Bengaluru", "Coorg"].map((prop) => (
            <button
              key={prop}
              onClick={() => {
                setSelectedPropertyState(prop)
                setStep(3)
              }}
              className={`w-full border-2 rounded-xl p-3 text-left transition ${selectedPropertyState === prop ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
            >
              <p className="font-semibold text-gray-900 text-sm">
                {prop} {prop === "Bengaluru" ? "Apartment" : "Villa"}
              </p>
              <p className="text-xs text-gray-500 mt-1">{prop === "Bengaluru" ? "On-Site: Dad" : "On-Site: Mom"}</p>
            </button>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("home")}>
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Bookings</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Properties</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Profile</span>
          </button>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 p-4 flex items-center gap-3">
          <button onClick={() => setStep(selectedProperty ? 1 : 2)} className="text-gray-600">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Choose Date</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {["Tomorrow", "Next Day", "This Weekend", "Next Week"].map((date) => (
            <button
              key={date}
              onClick={() => {
                setSelectedDate(date)
                setStep(4)
              }}
              className={`w-full border-2 rounded-xl p-3 text-left font-semibold transition ${selectedDate === date ? "border-purple-500 bg-purple-50 text-purple-900" : "border-gray-200 text-gray-900"}`}
            >
              {date}
            </button>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("home")}>
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Bookings</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Properties</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xs font-semibold">Profile</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center gap-3">
        <button onClick={() => setStep(3)} className="text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Confirm Booking</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-xs text-gray-600 font-semibold">Service</p>
            <p className="text-sm font-bold text-gray-900">{selectedService}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 font-semibold">Property</p>
            <p className="text-sm font-bold text-gray-900">{selectedPropertyState}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 font-semibold">Date</p>
            <p className="text-sm font-bold text-gray-900">{selectedDate}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
              👤
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Owner</p>
              <p className="text-sm font-bold text-gray-900">You (Punit)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
              🏠
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">On-Site Contact</p>
              <p className="text-sm font-bold text-gray-900">{selectedPropertyState === "Bengaluru" ? "Dad" : "Mom"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">
              🧰
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Professional</p>
              <p className="text-sm font-bold text-gray-900">UC Technician</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate("timeline")}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition"
        >
          <Check size={18} /> Book & Notify Contact
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("home")}>
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <span className="text-xs font-semibold">Bookings</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <span className="text-xs font-semibold">Properties</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </div>
    </div>
  )
}
