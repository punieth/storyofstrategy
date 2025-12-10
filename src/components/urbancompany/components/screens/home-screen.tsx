"use client"

import { Home, Calendar, MapPin, User } from "lucide-react"

interface HomeScreenProps {
  onNavigate: (screen: string, property?: string) => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-4">
        <h1 className="text-xl font-bold text-gray-900">Good Evening, Kamal 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Your Homes in India</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Bengaluru Card - Make clickable to navigate to booking */}
        <button
          onClick={() => onNavigate("booking", "Bengaluru")}
          className="w-full text-left bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Bengaluru Apartment</h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <MapPin size={12} /> Indiranagar, Bangalore
              </p>
            </div>
            <div className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">2 Services</div>
          </div>
          <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs">
            <p className="text-gray-900 font-semibold">AC Service Tomorrow 9AM</p>
            <p className="text-gray-700 mt-1">Technician: Rahul Kumar</p>
          </div>
        </button>

        {/* Coorg Villa Card - Make clickable to navigate to booking */}
        <button
          onClick={() => onNavigate("booking", "Coorg")}
          className="w-full text-left bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Coorg Villa</h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <MapPin size={12} /> Madikeri, Coorg
              </p>
            </div>
            <div className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">1 Service</div>
          </div>
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs">
            <p className="text-blue-900 font-semibold">Pest Control Scheduled Friday</p>
            <p className="text-blue-700 mt-1">Assigned Contact: Mom</p>
          </div>
        </button>

        {/* CTA Button */}
        <button
          onClick={() => onNavigate("booking")}
          className="w-full bg-black text-white font-semibold py-3 rounded-xl mt-4 shadow-md hover:shadow-lg transition"
        >
          Book a New Service
        </button>
      </div>

      {/* Bottom Navigation - Added with consistent styling */}
      <div className="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 p-2 text-black" onClick={() => onNavigate("home")}>
          <Home size={20} />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("history")}>
          <Calendar size={20} />
          <span className="text-xs font-semibold">Bookings</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("properties")}>
          <MapPin size={20} />
          <span className="text-xs font-semibold">Properties</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("profile")}>
          <User size={20} />
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </div>
    </div>
  )
}
