import React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  isOpen: boolean
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ isOpen }, ref) => {
    const chatHistory = [
      { id: 1, title: "Chat 1" },
      { id: 2, title: "Chat 2" },
      { id: 3, title: "Chat 3" },
      // Add more chat history items as needed
    ]

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-background shadow-lg"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-bold">Chat History</h2>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-2 p-4">
                  {chatHistory.map((chat) => (
                    <Button key={chat.id} variant="ghost" className="w-full justify-start">
                      {chat.title}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> New Chat
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

Sidebar.displayName = "Sidebar"

