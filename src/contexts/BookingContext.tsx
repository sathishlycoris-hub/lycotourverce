// ============================================
// BOOKING CONTEXT - Simplified for Tour Packages
// Global state management for booking flow
// ============================================

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type {
  BookingState,
  BookingStep,
  TourPackageEnhanced,
  PassengerInfo,
  ContactInfo,
  Booking,
  BookingStatus,
} from '@/types/booking';
import { savePendingBooking, getPendingBooking, clearPendingBooking } from '@/services/storageService';

// ============================================
// INITIAL STATE
// ============================================

const initialState: BookingState = {
  selectedPackage: null,
  passengersCount: 1,
  passengers: [],
  contactInfo: {
    name: '',
    mobile: '',
    email: '',
    state: '',
    gstin: '',
  },
  currentStep: 'details',
  booking: null,
  bookingStatus: null,
};

// ============================================
// ACTION TYPES
// ============================================

type BookingAction =
  | { type: 'SET_PACKAGE'; payload: TourPackageEnhanced }
  | { type: 'SET_PASSENGERS_COUNT'; payload: number }
  | { type: 'SET_PASSENGERS'; payload: PassengerInfo[] }
  | { type: 'UPDATE_PASSENGER'; payload: { index: number; field: keyof PassengerInfo; value: any } }
  | { type: 'SET_CONTACT_INFO'; payload: Partial<ContactInfo> }
  | { type: 'SET_STEP'; payload: BookingStep }
  | { type: 'SET_BOOKING'; payload: Booking }
  | { type: 'SET_BOOKING_STATUS'; payload: BookingStatus }
  | { type: 'RESET_BOOKING' }
  | { type: 'INITIALIZE_PASSENGERS' }
  | { type: 'LOAD_STATE'; payload: Partial<BookingState> };

// ============================================
// REDUCER
// ============================================

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_PACKAGE':
      return {
        ...state,
        selectedPackage: action.payload,
      };

    case 'SET_PASSENGERS_COUNT':
      return {
        ...state,
        passengersCount: action.payload,
        passengers: [], // Reset passengers when count changes
      };

    case 'SET_PASSENGERS':
      return { ...state, passengers: action.payload };

    case 'UPDATE_PASSENGER': {
      const { index, field, value } = action.payload;
      const updated = [...state.passengers];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...state, passengers: updated };
    }

    case 'SET_CONTACT_INFO':
      return {
        ...state,
        contactInfo: { ...state.contactInfo, ...action.payload },
      };

    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'SET_BOOKING':
      return { ...state, booking: action.payload };

    case 'SET_BOOKING_STATUS':
      return { ...state, bookingStatus: action.payload };

    case 'INITIALIZE_PASSENGERS': {
      // Only initialize if we don't have passengers or count changed
      if (state.passengers.length === state.passengersCount) {
        return state; // Already initialized
      }

      const passengers: PassengerInfo[] = [];
      for (let i = 0; i < state.passengersCount; i++) {
        passengers.push({
          id: `passenger_${i}`,
          name: '',
          gender: '',
          age: '',
        });
      }

      return { ...state, passengers };
    }

    case 'RESET_BOOKING':
      return {
        ...initialState,
      };

    case 'LOAD_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ============================================
// CONTEXT
// ============================================

interface BookingContextType {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  // Helper actions
  setPackage: (pkg: TourPackageEnhanced) => void;
  setPassengersCount: (count: number) => void;
  initializePassengers: () => void;
  updatePassenger: (index: number, field: keyof PassengerInfo, value: any) => void;
  setContactInfo: (info: Partial<ContactInfo>) => void;
  setStep: (step: BookingStep) => void;
  setBooking: (booking: Booking) => void;
  setBookingStatus: (status: BookingStatus) => void;
  resetBooking: () => void;
  saveDraft: () => void;
  loadDraft: () => boolean;
}

const BookingContext = createContext<BookingContextType | null>(null);

// ============================================
// PROVIDER
// ============================================

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Helper actions
  const setPackage = useCallback((pkg: TourPackageEnhanced) => {
    dispatch({ type: 'SET_PACKAGE', payload: pkg });
  }, []);

  const setPassengersCount = useCallback((count: number) => {
    dispatch({ type: 'SET_PASSENGERS_COUNT', payload: count });
  }, []);

  const initializePassengers = useCallback(() => {
    dispatch({ type: 'INITIALIZE_PASSENGERS' });
  }, []);

  const updatePassenger = useCallback((index: number, field: keyof PassengerInfo, value: any) => {
    dispatch({ type: 'UPDATE_PASSENGER', payload: { index, field, value } });
  }, []);

  const setContactInfo = useCallback((info: Partial<ContactInfo>) => {
    dispatch({ type: 'SET_CONTACT_INFO', payload: info });
  }, []);

  const setStep = useCallback((step: BookingStep) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const setBooking = useCallback((booking: Booking) => {
    dispatch({ type: 'SET_BOOKING', payload: booking });
  }, []);

  const setBookingStatus = useCallback((status: BookingStatus) => {
    dispatch({ type: 'SET_BOOKING_STATUS', payload: status });
  }, []);

  const resetBooking = useCallback(() => {
    dispatch({ type: 'RESET_BOOKING' });
    clearPendingBooking();
  }, []);

  const saveDraft = useCallback(() => {
    if (state.selectedPackage) {
      savePendingBooking({
        packageId: state.selectedPackage.id,
        passengersCount: state.passengersCount,
        passengers: state.passengers,
        contactInfo: state.contactInfo,
        savedAt: new Date().toISOString(),
      });
    }
  }, [state]);

  const loadDraft = useCallback((): boolean => {
    const draft = getPendingBooking();
    if (draft) {
      dispatch({
        type: 'LOAD_STATE',
        payload: {
          passengersCount: draft.passengersCount,
          passengers: draft.passengers,
          contactInfo: draft.contactInfo,
        },
      });
      return true;
    }
    return false;
  }, []);

  // Auto-save draft on state changes
  useEffect(() => {
    if (state.currentStep === 'booking') {
      saveDraft();
    }
  }, [state.passengers, state.contactInfo, saveDraft, state.currentStep]);

  const value: BookingContextType = {
    state,
    dispatch,
    setPackage,
    setPassengersCount,
    initializePassengers,
    updatePassenger,
    setContactInfo,
    setStep,
    setBooking,
    setBookingStatus,
    resetBooking,
    saveDraft,
    loadDraft,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useBookingContext() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
}
