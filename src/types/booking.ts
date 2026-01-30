// ============================================
// BOOKING SYSTEM TYPE DEFINITIONS
// Tour Package Booking - Simplified
// ============================================

// Booking Status Enum
export type BookingStatus = 
  | 'pending'     // Booking created, awaiting payment
  | 'paid'        // Payment received
  | 'confirmed'   // Booking confirmed
  | 'failed'      // Payment/booking failed
  | 'cancelled';  // Booking cancelled

// Gender Type
export type Gender = 'Male' | 'Female' | 'Other';

// ============================================
// TOUR PACKAGE TYPES
// ============================================

export interface TourPackageEnhanced {
  id: string;
  name: string;
  route: string;
  description: string;
  image: string;
  duration: string; // e.g., "1 Day", "2 Days / 1 Night"
  departureDate: string; // Fixed departure date (display only)
  departureTime: string;
  arrivalTime: string;
  categories: string[];
  pricePerPerson: number;
  maxPassengers: number;
  availableSlots: number;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  cancellationPolicy: string;
  gallery: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

// ============================================
// PASSENGER & CONTACT INFO
// ============================================

export interface PassengerInfo {
  id: string;
  name: string;
  gender: Gender | '';
  age: number | '';
  email?: string;
  phone?: string;
}

export interface ContactInfo {
  name: string;
  mobile: string;
  email: string;
  state: string;
  gstin?: string;
}

// ============================================
// BOOKING ENTITY
// ============================================

export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  departureDate: string;
  passengersCount: number;
  passengers: PassengerInfo[];
  contactInfo: ContactInfo;
  pricing: BookingPricing;
  status: BookingStatus;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingPricing {
  passengersCount: number;
  pricePerPerson: number;
  subtotal: number;
  gst: number;
  grandTotal: number;
}

// ============================================
// FILTER & SEARCH TYPES
// ============================================

export interface PackageFilters {
  destination?: string;
  category?: string;
}

export interface SearchResult {
  packages: TourPackageEnhanced[];
  totalCount: number;
}

// ============================================
// BOOKING FLOW STATE
// ============================================

export type BookingStep = 
  | 'details'   // Package details view
  | 'booking'   // Passenger details form
  | 'payment'   // Payment processing
  | 'confirm';  // Confirmation

export interface BookingState {
  // Package selection
  selectedPackage: TourPackageEnhanced | null;
  
  // Passengers
  passengersCount: number;
  
  // Passenger details
  passengers: PassengerInfo[];
  contactInfo: ContactInfo;
  
  // Flow control
  currentStep: BookingStep;
  
  // Booking result
  booking: Booking | null;
  bookingStatus: BookingStatus | null;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateBookingResponse {
  bookingId: string;
  status: BookingStatus;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  error?: string;
}
