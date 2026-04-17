// ============================================
// HOTELS LISTING PAGE
// Search filters + responsive grid of hotel cards
// ============================================

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Star,
  Users,
  Search as SearchIcon,
  Loader2,
  BedDouble,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { hotels, getCities } from "@/data/hotels";

const PAGE_SIZE = 6;

export default function Hotels() {
  const cities = useMemo(() => ["All", ...getCities()], []);
  const [city, setCity] = useState<string>("All");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({ city: "All", q: "" });

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      const matchesCity =
        appliedFilters.city === "All" || h.city === appliedFilters.city;
      const q = appliedFilters.q.trim().toLowerCase();
      const matchesQuery =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q);
      return matchesCity && matchesQuery;
    });
  }, [appliedFilters]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const handleSearch = () => {
    setIsSearching(true);
    setPage(1);
    setTimeout(() => {
      setAppliedFilters({ city, q: query });
      setIsSearching(false);
    }, 600);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary/40 border-b border-border">
        <div className="container-editorial pt-28 pb-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Stays
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              Find your perfect hotel
            </h1>
            <p className="text-muted-foreground">
              Hand-picked stays across our favourite destinations — from misty
              valleys to sun-soaked beaches.
            </p>
          </div>

          {/* Search Card */}
          <div className="mt-8 bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Location */}
              <div className="lg:col-span-1">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Location
                </label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger>
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Check-in */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Check-in
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "MMM d, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Check-out
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "MMM d, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(d) =>
                        d < (checkIn ?? new Date(new Date().setHours(0, 0, 0, 0)))
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Guests
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-10"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {adults} adult{adults !== 1 && "s"}
                      {children > 0 && `, ${children} child${children > 1 ? "ren" : ""}`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4" align="start">
                    <div className="space-y-4">
                      <GuestRow
                        label="Adults"
                        value={adults}
                        min={1}
                        onChange={setAdults}
                      />
                      <GuestRow
                        label="Children"
                        value={children}
                        min={0}
                        onChange={setChildren}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search button */}
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  className="w-full h-10"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <SearchIcon className="h-4 w-4 mr-1" /> Search
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Free text */}
            <div className="mt-3">
              <Input
                placeholder="Search by hotel name or area..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container-editorial py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-primary">
            {isSearching
              ? "Searching..."
              : `${filtered.length} hotel${filtered.length !== 1 ? "s" : ""} found`}
          </h2>
        </div>

        {isSearching ? (
          <LoadingGrid />
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </Layout>
  );
}

function GuestRow({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </Button>
        <span className="w-6 text-center text-sm">{value}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onChange(value + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
}

function HotelCard({ hotel }: { hotel: typeof hotels[number] }) {
  return (
    <Link
      to={`/hotels/${hotel.id}`}
      className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg text-primary leading-tight">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-sm shrink-0">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{hotel.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
          <MapPin className="h-3.5 w-3.5" />
          {hotel.location}
        </p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-serif text-xl text-primary">
              ₹{hotel.startingPrice.toLocaleString()}
              <span className="text-xs text-muted-foreground font-sans"> /night</span>
            </p>
          </div>
          <Button size="sm" variant="editorial">
            View Rooms
          </Button>
        </div>
      </div>
    </Link>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-xl overflow-hidden border border-border"
        >
          <div className="aspect-[4/3] bg-muted animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-8 bg-muted animate-pulse rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 border border-dashed border-border rounded-xl">
      <BedDouble className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="font-serif text-xl text-primary mb-2">No hotels found</h3>
      <p className="text-muted-foreground max-w-sm mx-auto">
        Try changing your location or search terms — we have stays across many
        destinations.
      </p>
    </div>
  );
}
