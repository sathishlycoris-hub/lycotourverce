// ============================================
// PACKAGE SERVICE - Simplified for Tour Packages
// API-Ready service layer for package operations
// ============================================

import { tourPackages, packageCategories } from '@/data/tourPackages';
import type {
  TourPackageEnhanced,
  PackageFilters,
  SearchResult,
  BookingPricing,
} from '@/types/booking';

// Convert data package to enhanced type
function enhancePackage(pkg: typeof tourPackages[0]): TourPackageEnhanced {
  return {
    id: pkg.id,
    name: pkg.name,
    route: pkg.route,
    description: pkg.description,
    image: pkg.image,
    duration: pkg.duration,
    departureDate: pkg.departureDate,
    departureTime: pkg.departureTime,
    arrivalTime: pkg.arrivalTime,
    categories: pkg.categories,
    pricePerPerson: pkg.pricePerPerson,
    maxPassengers: pkg.maxPassengers,
    availableSlots: pkg.availableSlots,
    highlights: pkg.highlights,
    itinerary: pkg.itinerary,
    included: pkg.included,
    excluded: pkg.excluded,
    cancellationPolicy: pkg.cancellationPolicy,
    gallery: pkg.gallery,
  };
}

// ============================================
// PACKAGE FETCHING
// ============================================

/**
 * Fetch all packages with optional filters
 */
export async function fetchPackages(filters?: PackageFilters): Promise<SearchResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...tourPackages];

  // Apply destination filter
  if (filters?.destination) {
    const search = filters.destination.toLowerCase();
    filtered = filtered.filter(pkg =>
      pkg.name.toLowerCase().includes(search) ||
      pkg.route.toLowerCase().includes(search) ||
      pkg.description.toLowerCase().includes(search)
    );
  }

  // Apply category filter
  if (filters?.category && filters.category.toLowerCase() !== 'all') {
    const category = filters.category.toUpperCase();
    filtered = filtered.filter(pkg =>
      pkg.categories.some(c => c.toUpperCase() === category)
    );
  }

  const enhanced = filtered.map(enhancePackage);

  return {
    packages: enhanced,
    totalCount: enhanced.length,
  };
}

/**
 * Fetch a single package by ID
 */
export async function fetchPackageById(id: string): Promise<TourPackageEnhanced | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const pkg = tourPackages.find(p => p.id === id);
  return pkg ? enhancePackage(pkg) : null;
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<string[]> {
  return packageCategories;
}

// ============================================
// AVAILABILITY
// ============================================

/**
 * Check available slots for a package
 */
export function getPackageAvailability(packageId: string): number {
  const pkg = tourPackages.find(p => p.id === packageId);
  return pkg?.availableSlots || 0;
}

// ============================================
// PRICING
// ============================================

/**
 * Calculate pricing for booking
 */
export function calculatePricing(
  pricePerPerson: number,
  passengersCount: number
): BookingPricing {
  const subtotal = pricePerPerson * passengersCount;
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gst;

  return {
    passengersCount,
    pricePerPerson,
    subtotal,
    gst,
    grandTotal,
  };
}
