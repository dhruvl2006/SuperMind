"use client"

import * as React from "react"
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarToggleProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ isOpen, setIsOpen }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              size="icon"
              className="fixed left-4 top-4 z-50 h-10 w-10 rounded-full p-0 md:left-6 md:top-6"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <ChevronsLeft className="h-4 w-4" />
              ) : (
                <ChevronsRight className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{isOpen ? "Close Sidebar" : "Open Sidebar"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

SidebarToggle.displayName = "SidebarToggle"

