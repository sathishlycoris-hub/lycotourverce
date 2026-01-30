// ============================================
// LOCAL STORAGE SERVICE - Simplified
// For tour package bookings
// ============================================

import type { Booking, PassengerInfo, ContactInfo } from '@/types/booking';

const STORAGE_KEYS = {
  PENDING_BOOKING: 'lyco_pending_booking',
  SESSION_ID: 'lyco_session_id',
  BOOKINGS: 'lyco_bookings',
} as const;

// Generate unique session ID
export function getSessionId(): string {
  let sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }
  return sessionId;
}

// ============================================
// PENDING BOOKING (Draft Recovery)
// ============================================

export interface PendingBookingDraft {
  packageId: string;
  passengersCount: number;
  passengers: PassengerInfo[];
  contactInfo: ContactInfo;
  savedAt: string;
}

export function savePendingBooking(draft: PendingBookingDraft): void {
  localStorage.setItem(STORAGE_KEYS.PENDING_BOOKING, JSON.stringify(draft));
}

export function getPendingBooking(): PendingBookingDraft | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PENDING_BOOKING);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function clearPendingBooking(): void {
  localStorage.removeItem(STORAGE_KEYS.PENDING_BOOKING);
}

// ============================================
// BOOKINGS STORAGE (Simulated DB)
// ============================================

export function getBookings(): Booking[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  const bookings = getBookings();
  const existingIndex = bookings.findIndex(b => b.id === booking.id);
  if (existingIndex >= 0) {
    bookings[existingIndex] = booking;
  } else {
    bookings.push(booking);
  }
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

export function getBookingById(bookingId: string): Booking | null {
  const bookings = getBookings();
  return bookings.find(b => b.id === bookingId) || null;
}

export function updateStoredBooking(booking: Booking): void {
  saveBooking(booking);
}
