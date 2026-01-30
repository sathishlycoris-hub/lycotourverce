// ============================================
// USE PACKAGES HOOK
// React Query hook for fetching tour packages
// ============================================

import { useQuery } from '@tanstack/react-query';
import { fetchPackages, fetchPackageById, fetchCategories } from '@/services/packageService';
import type { PackageFilters } from '@/types/booking';

// ============================================
// FETCH ALL PACKAGES
// ============================================

export function usePackages(filters?: PackageFilters) {
  return useQuery({
    queryKey: ['packages', filters],
    queryFn: () => fetchPackages(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ============================================
// FETCH SINGLE PACKAGE
// ============================================

export function usePackage(id: string | undefined) {
  return useQuery({
    queryKey: ['package', id],
    queryFn: () => fetchPackageById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

// ============================================
// FETCH CATEGORIES
// ============================================

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
