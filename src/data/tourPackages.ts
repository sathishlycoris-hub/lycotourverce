// Andhra Pradesh Tour Packages Data - Simplified for Package Booking

export interface TourPackage {
  id: string;
  name: string;
  route: string;
  description: string;
  image: string;
  duration: string;
  departureDate: string;
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

export interface PopularDestination {
  id: string;
  name: string;
  image: string;
}

// Popular destinations for homepage grid
export const popularDestinations: PopularDestination[] = [
  { id: "visakhapatnam", name: "VISAKHAPATNAM", image: "/vishak2.jpg" },
  { id: "vijayawada", name: "VIJAYAWADA", image: "/vijay2.jpg" },
  { id: "orvakallu", name: "ORVAKALLU", image: "/orvukalu2.jpg" },
  { id: "dwaraka-tirumala", name: "DWARAKA TIRUMALA", image: "/dwaraka.webp" },
  { id: "chittor", name: "CHITTOR", image: "/chitoor.jpg" },
  { id: "araku", name: "ARAKU", image: "/araku2.jpg" },
  { id: "konaseema", name: "KONASEEMA", image: "/konaseema.jpg" },
  { id: "nellore", name: "NELLORE", image: "/nellore2.jpg" },
];

// Tour package categories for filter
export const packageCategories = [
  "ALL",
  "TIRUPATHI",
  "ARAKU",
  "PAPIKONDALU",
  "DAILY",
  "VIZAG CITY TOUR",
  "SRISAILAM",
  "PILGRIMAGE",
  "ADVENTURE",
  "NATURE",
];

// Sample tour packages
export const tourPackages: TourPackage[] = [
  {
    id: "vizag-araku-road",
    name: "Visakhapatnam - Araku Valley Adventure",
    route: "Vizag → Araku → Vizag",
    description: "Experience the breathtaking beauty of Araku Valley, nestled in the Eastern Ghats. This day trip takes you through scenic coffee plantations, ancient caves, and vibrant tribal villages. Witness the mesmerizing Dhimsa dance and savor authentic tribal cuisine.",
    image: "/vishak2.jpg",
    duration: "1 Day",
    departureDate: "Every Day",
    departureTime: "07:00 AM",
    arrivalTime: "09:00 PM",
    categories: ["ARAKU", "DAILY", "NATURE", "ADVENTURE"],
    pricePerPerson: 1710,
    maxPassengers: 42,
    availableSlots: 28,
    highlights: [
      "Padmapuram Gardens - Beautiful landscaped gardens",
      "Tribal Museum - Learn about indigenous cultures",
      "Ananthagiri Coffee Plantations - Fresh coffee aroma",
      "Galikonda View Point - Panoramic valley views",
      "Borra Caves - Million year old limestone caves",
      "Tribal Dhimsa Dance - Traditional performance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Araku Valley Day Trip",
        description: "A complete day exploring the scenic Araku Valley",
        activities: [
          "07:00 AM - Departure from Vizag",
          "09:30 AM - Breakfast at Ananthagiri",
          "10:30 AM - Coffee Plantation visit",
          "12:00 PM - Galikonda View Point",
          "01:00 PM - Lunch at Araku",
          "02:30 PM - Tribal Museum tour",
          "03:30 PM - Padmapuram Gardens",
          "05:00 PM - Borra Caves exploration",
          "07:00 PM - Dhimsa Dance show",
          "09:00 PM - Return to Vizag",
        ],
      },
    ],
    included: [
      "Non A/C Hitech Coach Transportation",
      "Packed Breakfast",
      "Mineral Water",
      "Vegetarian Lunch",
      "Evening Tea & Snacks",
      "Dhimsa Dance Show",
      "Tour Guide",
    ],
    excluded: [
      "Entry Tickets to Borra Caves",
      "Camera Charges",
      "Personal Expenses",
      "Tips and Gratuities",
    ],
    cancellationPolicy: "Free cancellation up to 48 hours before departure. 50% refund for cancellations within 24-48 hours. No refund for cancellations within 24 hours.",
    gallery: ["/vishak2.jpg", "/araku.jpg", "/araku2.jpg"],
  },
  {
    id: "araku-rail-cum-road",
    name: "Araku Rail Cum Road Experience",
    route: "Vizag → Araku (Train) → Vizag (Road)",
    description: "Experience the iconic Araku Valley train journey through 58 tunnels and breathtaking Eastern Ghats scenery. One of Asia's most scenic rail routes, this trip combines train adventure with road exploration of Borra Caves and coffee plantations.",
    image: "/araku.jpg",
    duration: "1 Day",
    departureDate: "Daily (Except Tuesdays)",
    departureTime: "05:45 AM",
    arrivalTime: "09:00 PM",
    categories: ["ARAKU", "DAILY", "ADVENTURE"],
    pricePerPerson: 2100,
    maxPassengers: 50,
    availableSlots: 35,
    highlights: [
      "Scenic Train Journey through 58 tunnels",
      "Eastern Ghats panoramic views",
      "Highest railway station in South India",
      "Borra Caves exploration",
      "Coffee Plantation visit",
      "Tribal village experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Train to Araku & Road Return",
        description: "Experience the best of both worlds - scenic train and comfortable road travel",
        activities: [
          "05:45 AM - Board train at Vizag Railway Station",
          "10:30 AM - Arrive Araku, breakfast",
          "11:30 AM - Tribal Museum visit",
          "01:00 PM - Lunch at Araku",
          "02:30 PM - Coffee Plantation tour",
          "04:00 PM - Borra Caves visit",
          "06:00 PM - Depart by road",
          "09:00 PM - Arrive Vizag",
        ],
      },
    ],
    included: [
      "Train Tickets (Reserved)",
      "AC Road Transport Return",
      "Breakfast & Lunch",
      "Mineral Water",
      "Tour Guide",
    ],
    excluded: [
      "Entry Tickets",
      "Camera Charges",
      "Personal Expenses",
    ],
    cancellationPolicy: "Free cancellation up to 72 hours before departure. 50% refund for cancellations within 48-72 hours. No refund for later cancellations.",
    gallery: ["/araku.jpg", "/araku2.jpg"],
  },
  {
    id: "tirupathi-darshan",
    name: "Tirupathi Balaji Darshan Package",
    route: "Chennai → Tirupathi → Chennai",
    description: "Embark on a divine pilgrimage to Lord Venkateswara Temple at Tirumala, one of the most visited religious sites in the world. Experience spiritual bliss with special darshan arrangements and comfortable travel.",
    image: "/tirupathi2.jpg",
    duration: "1 Day",
    departureDate: "Daily",
    departureTime: "04:00 AM",
    arrivalTime: "10:00 PM",
    categories: ["TIRUPATHI", "PILGRIMAGE", "DAILY"],
    pricePerPerson: 2500,
    maxPassengers: 45,
    availableSlots: 20,
    highlights: [
      "Lord Venkateswara Darshan",
      "Special Entry tickets included",
      "Tirumala Hill Drive",
      "Prasadam included",
      "AC Comfortable Coach",
      "Experienced driver & guide",
    ],
    itinerary: [
      {
        day: 1,
        title: "Tirupathi Pilgrimage",
        description: "Complete spiritual journey to Tirumala",
        activities: [
          "04:00 AM - Departure from Chennai",
          "07:30 AM - Breakfast stop",
          "09:00 AM - Arrive Tirupathi",
          "10:00 AM - Tirumala Hill ascent",
          "11:00 AM - Special Darshan",
          "01:00 PM - Prasadam & Lunch",
          "03:00 PM - Temple premises visit",
          "05:00 PM - Depart for Chennai",
          "10:00 PM - Arrive Chennai",
        ],
      },
    ],
    included: [
      "AC Sleeper Coach",
      "Special Darshan Tickets",
      "Prasadam",
      "Breakfast",
      "Tour Coordinator",
    ],
    excluded: [
      "Lunch & Dinner",
      "Personal Expenses",
      "VIP Darshan upgrades",
    ],
    cancellationPolicy: "Free cancellation up to 48 hours before departure. 50% refund within 24-48 hours. No refund within 24 hours.",
    gallery: ["/tirupathi2.jpg", "/tirupathi.jpg"],
  },
  {
    id: "srisailam-package",
    name: "Srisailam Jyotirlinga Darshan",
    route: "Hyderabad → Srisailam → Hyderabad",
    description: "Visit the sacred Srisailam temple, home to one of the 12 Jyotirlingas. Located amidst the Nallamala forest, this pilgrimage offers spiritual enlightenment combined with natural beauty including the dam, ropeway, and forest drive.",
    image: "/srisala.jpg",
    duration: "1 Day",
    departureDate: "Every Saturday & Sunday",
    departureTime: "05:00 AM",
    arrivalTime: "09:00 PM",
    categories: ["SRISAILAM", "PILGRIMAGE"],
    pricePerPerson: 1950,
    maxPassengers: 40,
    availableSlots: 25,
    highlights: [
      "Mallikarjuna Jyotirlinga Temple",
      "Bhramaramba Devi Temple",
      "Srisailam Dam viewpoint",
      "Ropeway ride (optional)",
      "Nallamala Forest drive",
      "Pathala Ganga (river)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Srisailam Spiritual Journey",
        description: "Complete darshan of Srisailam temples and sightseeing",
        activities: [
          "05:00 AM - Departure from Hyderabad",
          "08:00 AM - Breakfast en route",
          "10:00 AM - Arrive Srisailam",
          "10:30 AM - Mallikarjuna Darshan",
          "12:00 PM - Bhramaramba Devi Darshan",
          "01:00 PM - Lunch",
          "02:30 PM - Srisailam Dam visit",
          "04:00 PM - Ropeway to Pathala Ganga",
          "06:00 PM - Return journey",
          "09:00 PM - Arrive Hyderabad",
        ],
      },
    ],
    included: [
      "AC Transport",
      "Breakfast",
      "Ropeway Tickets",
      "Tour Guide",
    ],
    excluded: [
      "Darshan Tickets",
      "Lunch & Dinner",
      "Personal Expenses",
    ],
    cancellationPolicy: "Full refund up to 72 hours before departure. 50% refund within 24-72 hours.",
    gallery: ["/srisala.jpg", "/srisailam.avif"],
  },
  {
    id: "papikondalu-tour",
    name: "Papikondalu Boat Cruise",
    route: "Rajahmundry → Papikondalu → Bhadrachalam",
    description: "Embark on a mesmerizing boat cruise through the magnificent Papikondalu hills along the Godavari River. Witness spectacular gorge formations, pristine waterfalls, and experience the untouched beauty of tribal Andhra.",
    image: "/papikondalu.jpg",
    duration: "2 Days / 1 Night",
    departureDate: "Every Friday",
    departureTime: "07:00 AM",
    arrivalTime: "06:00 PM (Next Day)",
    categories: ["PAPIKONDALU", "ADVENTURE", "NATURE"],
    pricePerPerson: 4500,
    maxPassengers: 30,
    availableSlots: 18,
    highlights: [
      "Godavari River Cruise",
      "Papikondalu Hills panorama",
      "Perantapalli tribal village",
      "Overnight houseboat stay",
      "Sunrise over the gorge",
      "Traditional tribal cuisine",
    ],
    itinerary: [
      {
        day: 1,
        title: "River Journey & Tribal Village",
        description: "Begin the cruise and explore tribal culture",
        activities: [
          "07:00 AM - Board boat at Rajahmundry",
          "08:00 AM - Breakfast on boat",
          "10:00 AM - Papikondalu gorge views",
          "12:00 PM - Lunch on boat",
          "02:00 PM - Perantapalli village visit",
          "04:00 PM - Tribal dance performance",
          "06:00 PM - Arrive at houseboat resort",
          "08:00 PM - Dinner & bonfire",
        ],
      },
      {
        day: 2,
        title: "Sunrise & Return Journey",
        description: "Experience sunrise and complete the cruise",
        activities: [
          "05:30 AM - Sunrise viewing",
          "07:00 AM - Breakfast",
          "08:00 AM - Boat departs",
          "12:00 PM - Lunch on boat",
          "03:00 PM - Arrive Bhadrachalam",
          "04:00 PM - Bhadrachalam Temple visit",
          "06:00 PM - End of tour",
        ],
      },
    ],
    included: [
      "Deluxe Boat Cruise",
      "All Meals (2 Breakfast, 2 Lunch, 1 Dinner)",
      "Overnight Houseboat Stay",
      "Tea & Snacks",
      "Tribal Dance Show",
      "Tour Guide",
    ],
    excluded: [
      "Return Transport from Bhadrachalam",
      "Alcoholic Beverages",
      "Personal Expenses",
      "Temple Donations",
    ],
    cancellationPolicy: "Full refund up to 7 days before departure. 50% refund within 3-7 days. No refund within 3 days.",
    gallery: ["/papikondalu.jpg", "/konaseema.jpg", "/konaseema2.jpg"],
  },
  {
    id: "vizag-city-tour",
    name: "Visakhapatnam City Heritage Tour",
    route: "Vizag City Round Trip",
    description: "Discover the charm of Vizag - the City of Destiny. From pristine beaches to ancient temples, submarine museum to hilltop views, this comprehensive city tour covers all major attractions of India's cleanest city.",
    image: "/beach.jpg",
    duration: "1 Day",
    departureDate: "Daily",
    departureTime: "08:00 AM",
    arrivalTime: "06:00 PM",
    categories: ["VIZAG CITY TOUR", "DAILY"],
    pricePerPerson: 899,
    maxPassengers: 45,
    availableSlots: 32,
    highlights: [
      "Ramakrishna Beach & Kali Temple",
      "INS Kurusura Submarine Museum",
      "Kailasagiri Hill - Ropeway",
      "Ross Hill Church",
      "Simhachalam Temple",
      "Tenneti Park sunset view",
    ],
    itinerary: [
      {
        day: 1,
        title: "Vizag City Exploration",
        description: "Complete tour of Visakhapatnam's top attractions",
        activities: [
          "08:00 AM - Pickup from hotel",
          "08:30 AM - Simhachalam Temple",
          "10:00 AM - Kailasagiri Hill & Ropeway",
          "12:00 PM - Lunch",
          "01:30 PM - INS Kurusura Museum",
          "03:00 PM - Ramakrishna Beach",
          "04:00 PM - Ross Hill Church",
          "05:00 PM - Tenneti Park sunset",
          "06:00 PM - Drop at hotel",
        ],
      },
    ],
    included: [
      "AC Vehicle",
      "Driver cum Guide",
      "Mineral Water",
    ],
    excluded: [
      "Entry Tickets",
      "Ropeway Tickets",
      "Meals",
      "Personal Expenses",
    ],
    cancellationPolicy: "Free cancellation up to 24 hours before departure.",
    gallery: ["/beach.jpg", "/vishak2.jpg"],
  },
];

// Indian states for booking form
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
