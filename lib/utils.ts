import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add new utility functions below
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

