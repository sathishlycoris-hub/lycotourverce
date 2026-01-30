// ============================================
// BOOKING SERVICE - Simplified for Tour Packages
// Handles booking creation and management
// ============================================

import type {
  Booking,
  BookingStatus,
  BookingPricing,
  PassengerInfo,
  ContactInfo,
  CreateBookingResponse,
  PaymentResponse,
} from '@/types/booking';
import { saveBooking, getBookingById as getStoredBooking, updateStoredBooking, clearPendingBooking } from './storageService';

// ============================================
// BOOKING ID GENERATION
// ============================================

/**
 * Generate unique booking ID
 * Format: LYC-YYYYMMDD-XXXX
 */
export function generateBookingId(): string {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LYC-${datePart}-${randomPart}`;
}

// ============================================
// BOOKING OPERATIONS
// ============================================

interface CreateBookingParams {
  packageId: string;
  packageName: string;
  departureDate: string;
  passengersCount: number;
  passengers: PassengerInfo[];
  contactInfo: ContactInfo;
  pricing: BookingPricing;
}

/**
 * Create a new booking with pending status
 */
export async function createBooking(params: CreateBookingParams): Promise<CreateBookingResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const bookingId = generateBookingId();
  const now = new Date().toISOString();

  const booking: Booking = {
    id: bookingId,
    packageId: params.packageId,
    packageName: params.packageName,
    departureDate: params.departureDate,
    passengersCount: params.passengersCount,
    passengers: params.passengers,
    contactInfo: params.contactInfo,
    pricing: params.pricing,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  // Save to storage
  saveBooking(booking);

  return {
    bookingId,
    status: 'pending',
  };
}

/**
 * Confirm booking after successful payment
 */
export async function confirmBooking(bookingId: string, paymentId: string): Promise<Booking | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const booking = getStoredBooking(bookingId);
  if (!booking) return null;

  const updatedBooking: Booking = {
    ...booking,
    status: 'confirmed',
    paymentId,
    updatedAt: new Date().toISOString(),
  };

  updateStoredBooking(updatedBooking);
  clearPendingBooking();
  
  return updatedBooking;
}

/**
 * Mark booking as failed
 */
export async function failBooking(bookingId: string): Promise<void> {
  const booking = getStoredBooking(bookingId);
  if (!booking) return;

  updateStoredBooking({
    ...booking,
    status: 'failed',
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Get booking by ID
 */
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  return getStoredBooking(bookingId);
}

// ============================================
// PAYMENT SIMULATION
// ============================================

/**
 * Simulate payment processing
 * 90% success rate for testing
 */
export async function processPayment(
  bookingId: string,
  amount: number
): Promise<PaymentResponse> {
  // Simulate payment gateway delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 90% success rate
  const success = Math.random() > 0.1;

  if (success) {
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return {
      success: true,
      paymentId,
    };
  }

  return {
    success: false,
    error: 'Payment declined. Please try again.',
  };
}
