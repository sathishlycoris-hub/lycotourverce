// ============================================
// HOTELS MOCK DATA
// Static hotels and rooms used by the Hotels UI
// ============================================

export interface Room {
  id: string;
  name: string;
  image: string;
  pricePerNight: number;
  capacity: number; // adults
  size: string; // e.g. "32 m²"
  bed: string; // e.g. "1 King Bed"
  amenities: string[]; // simple keys: wifi, breakfast, ac, tv, pool, parking, bath
  description: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  image: string;
  gallery: string[];
  rating: number; // 0-5
  reviews: number;
  startingPrice: number;
  description: string;
  highlights: string[];
  amenities: string[];
  rooms: Room[];
  relatedPackageIds?: string[]; // optional reference
}

const baseAmenities = ["wifi", "breakfast", "ac", "tv"];

export const hotels: Hotel[] = [
  {
    id: "araku-valley-resort",
    name: "Araku Valley Resort",
    location: "Araku Valley, Andhra Pradesh",
    city: "Araku",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop",
    ],
    rating: 4.6,
    reviews: 412,
    startingPrice: 3200,
    description:
      "Tucked into the misty hills of the Eastern Ghats, this resort blends colonial charm with tribal art. Wake up to coffee plantations and birdsong.",
    highlights: ["Valley views", "Coffee plantation walks", "Tribal cuisine", "Spa & wellness"],
    amenities: [...baseAmenities, "pool", "parking", "spa"],
    rooms: [
      {
        id: "araku-deluxe",
        name: "Deluxe Valley Room",
        image:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&auto=format&fit=crop",
        pricePerNight: 3200,
        capacity: 2,
        size: "28 m²",
        bed: "1 Queen Bed",
        amenities: ["wifi", "breakfast", "ac", "tv"],
        description: "A cozy retreat with floor-to-ceiling windows opening to the valley.",
      },
      {
        id: "araku-suite",
        name: "Plantation Suite",
        image:
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&auto=format&fit=crop",
        pricePerNight: 5400,
        capacity: 3,
        size: "44 m²",
        bed: "1 King Bed + Sofa",
        amenities: ["wifi", "breakfast", "ac", "tv", "bath"],
        description: "Spacious suite with a private balcony overlooking the coffee plantations.",
      },
      {
        id: "araku-family",
        name: "Family Cottage",
        image:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&auto=format&fit=crop",
        pricePerNight: 6800,
        capacity: 4,
        size: "60 m²",
        bed: "2 Queen Beds",
        amenities: ["wifi", "breakfast", "ac", "tv", "parking"],
        description: "Standalone cottage perfect for families, with a private garden patio.",
      },
    ],
  },
  {
    id: "vizag-beach-stay",
    name: "Vizag Beach Stay",
    location: "RK Beach, Visakhapatnam",
    city: "Visakhapatnam",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1200&auto=format&fit=crop",
    ],
    rating: 4.4,
    reviews: 286,
    startingPrice: 2800,
    description:
      "A breezy seafront hotel a short walk from RK Beach. Sunrise rooms, fresh seafood, and easy access to Kailasagiri.",
    highlights: ["Sea-facing rooms", "Walk to beach", "Rooftop dining", "Airport pickup"],
    amenities: [...baseAmenities, "pool", "parking"],
    rooms: [
      {
        id: "vizag-classic",
        name: "Classic Room",
        image:
          "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=1200&auto=format&fit=crop",
        pricePerNight: 2800,
        capacity: 2,
        size: "24 m²",
        bed: "1 Queen Bed",
        amenities: ["wifi", "breakfast", "ac", "tv"],
        description: "Comfortable room with city or partial sea view.",
      },
      {
        id: "vizag-sea-suite",
        name: "Sea-View Suite",
        image:
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&auto=format&fit=crop",
        pricePerNight: 4900,
        capacity: 2,
        size: "38 m²",
        bed: "1 King Bed",
        amenities: ["wifi", "breakfast", "ac", "tv", "bath"],
        description: "Wake up to uninterrupted views of the Bay of Bengal.",
      },
    ],
  },
  {
    id: "godavari-river-lodge",
    name: "Godavari River Lodge",
    location: "Papikondalu, Andhra Pradesh",
    city: "Rajahmundry",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop",
    ],
    rating: 4.3,
    reviews: 198,
    startingPrice: 3600,
    description:
      "Riverside lodge surrounded by the Papi Hills. Bonfires, boat rides, and starlit nights along the Godavari.",
    highlights: ["Riverfront cottages", "Boat tours", "Bonfire nights", "Local cuisine"],
    amenities: [...baseAmenities, "parking"],
    rooms: [
      {
        id: "godavari-cottage",
        name: "Riverside Cottage",
        image:
          "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=1200&auto=format&fit=crop",
        pricePerNight: 3600,
        capacity: 2,
        size: "30 m²",
        bed: "1 Queen Bed",
        amenities: ["wifi", "breakfast", "ac"],
        description: "Wooden cottage steps away from the river.",
      },
      {
        id: "godavari-deluxe",
        name: "Deluxe River Suite",
        image:
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&auto=format&fit=crop",
        pricePerNight: 5200,
        capacity: 3,
        size: "42 m²",
        bed: "1 King Bed",
        amenities: ["wifi", "breakfast", "ac", "tv", "bath"],
        description: "Larger suite with a private deck facing the Godavari.",
      },
    ],
  },
  {
    id: "tirupati-heritage-inn",
    name: "Tirupati Heritage Inn",
    location: "Near Tirumala, Tirupati",
    city: "Tirupati",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?w=1200&auto=format&fit=crop",
    ],
    rating: 4.2,
    reviews: 521,
    startingPrice: 2200,
    description:
      "A peaceful inn close to the temple town with traditional South Indian hospitality.",
    highlights: ["Near Tirumala", "Pure veg restaurant", "Darshan assistance"],
    amenities: [...baseAmenities, "parking"],
    rooms: [
      {
        id: "tirupati-standard",
        name: "Standard Room",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop",
        pricePerNight: 2200,
        capacity: 2,
        size: "22 m²",
        bed: "1 Queen Bed",
        amenities: ["wifi", "breakfast", "ac"],
        description: "Comfortable, simple room for pilgrims and travelers.",
      },
      {
        id: "tirupati-family",
        name: "Family Room",
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&auto=format&fit=crop",
        pricePerNight: 3400,
        capacity: 4,
        size: "34 m²",
        bed: "2 Queen Beds",
        amenities: ["wifi", "breakfast", "ac", "tv"],
        description: "Spacious room for families visiting the temple.",
      },
    ],
  },
];

export const getHotelById = (id: string) => hotels.find((h) => h.id === id);

export const getCities = () => Array.from(new Set(hotels.map((h) => h.city))).sort();
