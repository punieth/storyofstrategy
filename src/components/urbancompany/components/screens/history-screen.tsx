"use client"

import { ArrowLeft, FileText, CheckCircle2, Clock, AlertCircle, Home, Calendar, MapPin, User } from "lucide-react"
import { useState } from "react"

interface HistoryScreenProps {
  onNavigate: (screen: string) => void
}

export default function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const [selectedProperty, setSelectedProperty] = useState("All")

  const history = [
    {
      id: 1,
      service: "AC Service",
      status: "completed",
      date: "Nov 10, 2024",
      property: "Bengaluru",
    },
    {
      id: 2,
      service: "Pest Control",
      status: "scheduled",
      date: "Nov 15, 2024",
      property: "Coorg",
    },
    {
      id: 3,
      service: "Plumbing Repair",
      status: "cancelled",
      date: "Nov 5, 2024",
      property: "Bengaluru",
    },
    {
      id: 4,
      service: "Deep Cleaning",
      status: "completed",
      date: "Nov 3, 2024",
      property: "Coorg",
    },
  ]

  const statusIcons = {
    completed: <CheckCircle2 size={16} className="text-green-600" />,
    scheduled: <Clock size={16} className="text-blue-600" />,
    cancelled: <AlertCircle size={16} className="text-red-600" />,
  }

  const statusColors = {
    completed: "bg-green-50 text-green-700",
    scheduled: "bg-blue-50 text-blue-700",
    cancelled: "bg-red-50 text-red-700",
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center gap-3">
        <button onClick={() => onNavigate("home")} className="text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Service History</h1>
      </div>

      {/* Filter */}
      <div className="border-b border-gray-200 px-4 py-3 flex gap-2 overflow-x-auto">
        {["All", "Bengaluru", "Coorg"].map((prop) => (
          <button
            key={prop}
            onClick={() => setSelectedProperty(prop)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              selectedProperty === prop ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {prop}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="px-4 py-3 grid grid-cols-3 gap-2 border-b border-gray-200">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-600">Avg Rating</p>
          <p className="font-bold text-purple-900 text-sm">4.8 ⭐</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-600">Total Spent</p>
          <p className="font-bold text-green-900 text-sm">₹12,450</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-600">Next Job</p>
          <p className="font-bold text-blue-900 text-sm">5 days</p>
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {history.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div>{statusIcons[item.status as keyof typeof statusIcons]}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.service}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
              <button className="text-purple-600 hover:text-purple-700">
                <FileText size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{item.property} Property</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[item.status as keyof typeof statusColors]}`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
          </div>
        ))}

        <button className="w-full border-2 border-dashed border-purple-300 rounded-lg p-3 text-purple-600 font-semibold text-sm hover:bg-purple-50 transition">
          Export All Reports as PDF
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 bg-white px-2 py-2 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400" onClick={() => onNavigate("home")}>
          <Home size={20} />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-purple-600" onClick={() => onNavigate("history")}>
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
