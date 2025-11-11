"use client"

import { ArrowLeft, MessageCircle, Home, Calendar, MapPin, User } from "lucide-react"
import { useState } from "react"

interface TimelineScreenProps {
  onNavigate: (screen: string) => void
}

export default function TimelineScreen({ onNavigate }: TimelineScreenProps) {
  const [showChat, setShowChat] = useState(false)
  const [chatTab, setChatTab] = useState<"household" | "technician">("household")

  const timelineEvents = [
    { stage: "Booked", completed: true, time: "2 hours ago" },
    { stage: "Technician Assigned", completed: true, time: "1 hour ago" },
    { stage: "En Route", completed: true, time: "15 mins ago" },
    { stage: "Work Started", completed: false, time: "In progress" },
    { stage: "Awaiting Approval", completed: false, time: "Pending" },
    { stage: "Completed", completed: false, time: "" },
  ]

  if (showChat) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <button onClick={() => setShowChat(false)} className="text-gray-600">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Chat</h1>
          <div />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 flex">
          <button
            onClick={() => setChatTab("household")}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 ${chatTab === "household" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-600"}`}
          >
            Household
          </button>
          <button
            onClick={() => setChatTab("technician")}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 ${chatTab === "technician" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-600"}`}
          >
            Technician
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex justify-end">
            <div className="bg-purple-600 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-xs text-sm">
              All set for tomorrow 9 AM?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 rounded-2xl rounded-tl-none px-4 py-2 max-w-xs text-sm">
              Yes, all ready. See you tomorrow!
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-3 flex gap-2">
          <input
            type="text"
            placeholder="Type message..."
            className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm"
          />
          <button className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center">→</button>
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
            className="flex flex-col items-center gap-1 p-2 text-gray-400"
            onClick={() => onNavigate("properties")}
          >
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

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center gap-3">
        <button onClick={() => onNavigate("home")} className="text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">AC Service</h1>
          <p className="text-xs text-gray-500">Tomorrow, 9:00 AM</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Timeline */}
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${event.completed ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  {event.completed ? "✓" : index + 1}
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className={`w-0.5 h-8 ${event.completed ? "bg-purple-600" : "bg-gray-300"}`} />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p className={`text-sm font-semibold ${event.completed ? "text-gray-900" : "text-gray-600"}`}>
                  {event.stage}
                </p>
                <p className="text-xs text-gray-500 mt-1">{event.time}</p>
              </div>
              {event.completed && <MessageCircle size={18} className="text-purple-600 mt-1" />}
            </div>
          ))}
        </div>

        {/* Approval Button */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <button className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg text-sm hover:bg-amber-600 transition">
            Approve Extra Work ₹3500
          </button>
        </div>

        {/* Chat Button */}
        <button
          onClick={() => setShowChat(true)}
          className="w-full border-2 border-purple-600 text-purple-600 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-50 transition"
        >
          <MessageCircle size={18} /> Open Chat
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
