"use client"

import { useState, useRef, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { SidebarToggle } from "@/components/sidebar-toggle"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} ref={sidebarRef} />
      <main className="flex flex-1 flex-col">
        <SidebarToggle isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} ref={toggleRef} />
        <ChatInterface />
      </main>
    </div>
  )
}

