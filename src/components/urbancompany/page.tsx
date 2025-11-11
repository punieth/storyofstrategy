"use client"

import type React from "react"

import { useState } from "react"
import HomeScreen from "./components/screens/home-screen"
import BookingScreen from "./components/screens/booking-screen"
import CompletionScreen from "./components/screens/completion-screen"
import HistoryScreen from "./components/screens/history-screen"
import ProfileScreen from "./components/screens/profile-screen"
import PropertiesScreen from "./components/screens/properties-screen"
import TimelineScreen from "./components/screens/timeline-screen"


type ScreenType = "home" | "properties" | "booking" | "timeline" | "completion" | "history" | "profile"

interface BookingState {
  screen: "booking"
  selectedProperty?: string
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType | BookingState>("home")

  const getScreen = () => {
    const screen = typeof currentScreen === "string" ? currentScreen : currentScreen.screen
    return screen
  }

  const getBookingProperty = () => {
    return typeof currentScreen !== "string" ? currentScreen.selectedProperty : undefined
  }

  const screens: Record<string, React.ReactNode> = {
    home: (
      <HomeScreen
        onNavigate={(s, prop) => setCurrentScreen(prop ? { screen: s as ScreenType, selectedProperty: prop } : s)}
      />
    ),
    properties: <PropertiesScreen onNavigate={(s) => setCurrentScreen(s)} />,
    booking: <BookingScreen onNavigate={(s) => setCurrentScreen(s)} selectedProperty={getBookingProperty()} />,
    timeline: <TimelineScreen onNavigate={(s) => setCurrentScreen(s)} />,
    completion: <CompletionScreen onNavigate={(s) => setCurrentScreen(s)} />,
    history: <HistoryScreen onNavigate={(s) => setCurrentScreen(s)} />,
    profile: <ProfileScreen onNavigate={(s) => setCurrentScreen(s)} />,
  }

  return (
    <div className="bg-white h-full overflow-hidden flex flex-col">
      {screens[getScreen()]}
    </div>
  )
}
