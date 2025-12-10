"use client"

import { ArrowLeft, Mail, Phone, MapPin, LogOut, Home, Calendar, MapPinIcon, User } from "lucide-react"

interface ProfileScreenProps {
  onNavigate: (screen: string) => void
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center gap-3">
        <button onClick={() => onNavigate("home")} className="text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Header */}
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
            P
          </div>
          <h2 className="text-xl font-bold text-gray-900">Kamal Singh</h2>
          <p className="text-sm text-gray-500 mt-1">NRI Homeowner</p>
          <p className="text-xs text-gray-400 mt-1">Member since Nov 2022</p>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Contact Information</h3>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-black" />
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm font-semibold text-gray-900">kamalsingh@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-black" />
            <div>
              <p className="text-xs text-gray-600">Phone</p>
              <p className="text-sm font-semibold text-gray-900">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-black" />
            <div>
              <p className="text-xs text-gray-600">Current Location</p>
              <p className="text-sm font-semibold text-gray-900">Dubai, UAE</p>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
          <h3 className="text-sm font-bold text-gray-900">Subscription</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Premium Plan</span>
            <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-xs text-gray-600">Renewal Date: Dec 31, 2025</p>
        </div>

        {/* Properties Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Properties</h3>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white p-2 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">2</p>
              <p className="text-xs text-gray-600">Active Properties</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-xs text-gray-600">Total Services</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900 px-1">Settings</h3>
          <button className="w-full bg-gray-50 rounded-lg p-3 text-left hover:bg-gray-100 transition">
            <p className="text-sm font-semibold text-gray-900">Edit Profile</p>
          </button>
          <button className="w-full bg-gray-50 rounded-lg p-3 text-left hover:bg-gray-100 transition">
            <p className="text-sm font-semibold text-gray-900">Notification Preferences</p>
          </button>
          <button className="w-full bg-gray-50 rounded-lg p-3 text-left hover:bg-gray-100 transition">
            <p className="text-sm font-semibold text-gray-900">Payment Methods</p>
          </button>
          <button className="w-full bg-gray-50 rounded-lg p-3 text-left hover:bg-gray-100 transition">
            <p className="text-sm font-semibold text-gray-900">Privacy & Security</p>
          </button>
        </div>

        {/* Logout Button */}
        <button className="w-full border-2 border-red-300 text-red-600 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 transition mt-4">
          <LogOut size={18} /> Log Out
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
          <MapPinIcon size={20} />
          <span className="text-xs font-semibold">Properties</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-black" onClick={() => onNavigate("profile")}>
          <User size={20} />
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </div>
    </div>
  )
}
