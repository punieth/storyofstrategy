"use client"

import { ArrowLeft, Plus, MapPin, Home, Calendar, MapPinIcon, User } from "lucide-react"
import { useState } from "react"

interface PropertiesScreenProps {
  onNavigate: (screen: string) => void
}

export default function PropertiesScreen({ onNavigate }: PropertiesScreenProps) {
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [selectedContact, setSelectedContact] = useState<string | null>(null)

  const properties = [
    {
      id: 1,
      name: "Bengaluru Apartment",
      address: "Indiranagar, Bangalore",
      services: 12,
      rating: 4.8,
      lastService: "2 days ago",
      contact: "Dad",
    },
    {
      id: 2,
      name: "Coorg Villa",
      address: "Madikeri, Coorg",
      services: 5,
      rating: 4.9,
      lastService: "1 week ago",
      contact: "Mom",
    },
  ]

  if (showAddProperty) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 p-4 flex items-center gap-3">
          <button onClick={() => setShowAddProperty(false)} className="text-gray-600">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Add Property</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Enter property address"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700">Assign On-Site Contact</label>
            <input
              type="text"
              placeholder="Contact name"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700">Relationship</label>
            <select className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm">
              <option>Parent</option>
              <option>Tenant</option>
              <option>Neighbor</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700">Phone Number</label>
            <input type="tel" placeholder="+91" className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-purple-600" />
              <span className="text-xs text-gray-700">Allow them to chat with partner</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-purple-600" />
              <span className="text-xs text-gray-700">Allow them to reschedule</span>
            </label>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold py-3 rounded-lg mt-4">
            Save Property
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("home")}>
            <Home size={20} />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("history")}>
            <Calendar size={20} />
            <span className="text-xs font-semibold">Bookings</span>
          </button>
          <button
            className="flex flex-col items-center gap-1 p-2 text-purple-600"
            onClick={() => onNavigate("properties")}
          >
            <MapPinIcon size={20} />
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

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div>
          <button onClick={() => onNavigate("home")} className="text-gray-600 mb-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Your Properties</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{prop.name}</h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin size={12} /> {prop.address}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-yellow-600 flex items-center gap-1">★ {prop.rating}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-500">Services</p>
                <p className="font-bold text-gray-900">{prop.services}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-500">On-Site</p>
                <p className="font-bold text-gray-900">{prop.contact}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-500">Last</p>
                <p className="font-bold text-gray-900 text-[10px]">{prop.lastService}</p>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowAddProperty(true)}
          className="w-full border-2 border-dashed border-purple-300 rounded-xl p-4 text-purple-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-purple-50 transition"
        >
          <Plus size={18} /> Add New Property
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("home")}>
          <Home size={20} />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("history")}>
          <Calendar size={20} />
          <span className="text-xs font-semibold">Bookings</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 p-2 text-purple-600"
          onClick={() => onNavigate("properties")}
        >
          <MapPinIcon size={20} />
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
