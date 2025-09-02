"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
  duration?: number
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case "success":
        return "toast-success"
      case "error":
        return "toast-error"
      case "info":
        return "toast-info"
    }
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center space-x-2 ${getStyles()} animate-in slide-in-from-right`}
    >
      {getIcon()}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: "success" | "error" | "info" }>>([])

  const showToast = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const ToastContainer = () => (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}
    </>
  )

  return { showToast, ToastContainer }
}
