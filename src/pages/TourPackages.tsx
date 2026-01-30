import { useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { usePackages, useCategories } from "@/hooks/usePackages";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { TourPackageEnhanced, PackageFilters } from "@/types/booking";

const TourPackages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  // Search state
  const [searchLocation, setSearchLocation] = useState(searchParams.get("destination") || "");
  const [appliedFilters, setAppliedFilters] = useState<PackageFilters>({});

  // Fetch categories
  const { data: categories = [] } = useCategories();

  // Fetch packages with filters
  const { data: packagesResult, isLoading } = usePackages(appliedFilters);
  const packages = packagesResult?.packages || [];

  // Apply search filters
  const handleSearch = useCallback(() => {
    const filters: PackageFilters = {
      destination: searchLocation.trim() || undefined,
      category: activeCategory !== "all" ? activeCategory : undefined,
    };
    setAppliedFilters(filters);

    // Update URL params
    const params = new URLSearchParams();
    if (searchLocation.trim()) params.set("destination", searchLocation.trim());
    if (activeCategory !== "all") params.set("category", activeCategory);
    setSearchParams(params);
  }, [searchLocation, activeCategory, setSearchParams]);

  // Set category filter
  const setCategory = (category: string) => {
    const newCategory = category.toLowerCase();
    if (newCategory === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", newCategory);
    }
    setSearchParams(searchParams);
    
    // Apply filter with new category
    const filters: PackageFilters = {
      ...appliedFilters,
      category: newCategory !== "all" ? newCategory : undefined,
    };
    setAppliedFilters(filters);
  };

  return (
    <Layout>
      {/* Hero Search */}
      <section className="bg-primary py-8 lg:py-12">
        <div className="container-editorial">
          <h1 className="text-white text-2xl lg:text-3xl font-serif text-center mb-6">
            Tour Packages
          </h1>

          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              {/* Destination Search */}
              <div className="flex-1">
                <label className="text-sm text-muted-foreground block mb-1">
                  Search Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent" />
                  <Input
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Where do you want to go?"
                    className="pl-10"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>

              <Button onClick={handleSearch} className="bg-accent text-white hover:bg-accent/90 px-8">
                <Search className="h-4 w-4 mr-2" />
                SEARCH
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b bg-background overflow-x-auto">
        <div className="container-editorial flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategory(category)}
              className={cn(
                "px-4 py-2 text-sm rounded whitespace-nowrap transition-colors",
                activeCategory.toLowerCase() === category.toLowerCase()
                  ? "bg-primary text-white"
                  : "bg-secondary hover:bg-primary hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Package Grid */}
      <section className="section-padding bg-secondary/30">
        <div className="container-editorial">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading packages...</span>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-serif text-muted-foreground">No packages found</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchLocation("");
                  setCategory("all");
                  setAppliedFilters({});
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default TourPackages;

/* =========================
   PACKAGE CARD - Full Display
========================= */

interface PackageCardProps {
  package: TourPackageEnhanced;
}

function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        {/* Duration badge */}
        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-sm font-medium">
          {pkg.duration}
        </div>
        {/* Available slots badge */}
        {pkg.availableSlots < 10 && pkg.availableSlots > 0 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-xs">
            Only {pkg.availableSlots} left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title & Route */}
        <h3 className="font-serif text-lg font-medium text-primary mb-1 line-clamp-2">
          {pkg.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{pkg.route}</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          {pkg.categories.slice(0, 3).map((cat) => (
            <span key={cat} className="text-xs bg-secondary px-2 py-0.5 rounded">
              {cat}
            </span>
          ))}
        </div>

        {/* Info Row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">{pkg.departureDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">{pkg.departureTime}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {pkg.description}
        </p>

        {/* Highlights Preview */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 text-accent" />
            <span className="line-clamp-1">{pkg.highlights.slice(0, 2).join(' • ')}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="border-t pt-4 mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Starting from</div>
              <div className="text-xl font-bold text-primary">
                ₹{pkg.pricePerPerson.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground">/person</span>
              </div>
            </div>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link to={`/package/${pkg.id}`}>
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
