"use client"

import { ArrowLeft, Share2, Check, Home, Calendar, MapPin, User } from "lucide-react"
import { useState } from "react"

interface CompletionScreenProps {
  onNavigate: (screen: string) => void
}

export default function CompletionScreen({ onNavigate }: CompletionScreenProps) {
  const [sliderValue, setSliderValue] = useState(50)
  const [rating, setRating] = useState(5)

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center gap-3">
        <button onClick={() => onNavigate("timeline")} className="text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Completion Report</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Service Status */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <div className="text-2xl">✓</div>
          <div>
            <p className="font-bold text-green-900 text-sm">AC Deep Cleaning Completed</p>
            <p className="text-xs text-green-700">Today at 4:30 PM</p>
          </div>
        </div>

        {/* Before/After Slider */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700">Before / After</p>
          <div className="bg-gray-200 rounded-lg h-32 overflow-hidden relative cursor-pointer">
            <div
              style={{ width: `${sliderValue}%` }}
              className="bg-gradient-to-r from-orange-300 to-orange-400 h-full absolute left-0"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-full opacity-0 cursor-col-resize absolute"
            />
            <div className="text-xs font-semibold text-white p-2 absolute left-2 top-2">BEFORE</div>
            <div className="text-xs font-semibold text-gray-900 p-2 absolute right-2 top-2">AFTER</div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Slide to compare</span>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700">Work Completed</p>
          {["Filter cleaned", "Drain cleared", "Gas pressure checked", "Fins inspected"].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={16} className="text-green-600" />
              {item}
            </div>
          ))}
        </div>

        {/* Service Summary */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
          <p className="font-semibold text-gray-900">Service Summary</p>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Cost</span>
            <span className="font-bold text-gray-900">₹2,999</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Time Taken</span>
            <span className="font-bold text-gray-900">45 minutes</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Next Service</span>
            <span className="font-bold text-gray-900">In 90 days</span>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700">Rate Service</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="text-2xl cursor-pointer">
                {star <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <textarea
          placeholder="Comment for Technician (optional)"
          className="w-full border border-gray-300 rounded-lg p-2 text-sm h-16 resize-none"
          defaultValue="Excellent service! Very professional and thorough."
        />

        {/* Share Button */}
        <button className="w-full border-2 border-black text-black font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <Share2 size={18} /> Share Report with Contact
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
