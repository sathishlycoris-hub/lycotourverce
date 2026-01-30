import valleyImage from "@/assets/destination-valley.jpg";
import templeImage from "@/assets/destination-temple.jpg";
import beachImage from "@/assets/destination-beach.jpg";
import forestImage from "@/assets/destination-forest.jpg";
import artisanImage from "@/assets/destination-artisan.jpg";
import mountainImage from "@/assets/destination-mountain.jpg";



export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  gallery: string[];
  highlights: string[];
  bestTimeToVisit: string;
  location: string;
  featured: boolean;

   // NEW FIELDS (for uploaded-image layout)
  price: number;
  duration: string;
  transport: string;
  food: string;
  accommodation: string;
  itinerary: {
    day: string;
    title: string;
    details: string[];
  }[];
  includes: string[];
  excludes: string[];
}

export const destinations: Destination[] = [
  {
  id: "serene-valley",
  name: "Serene Valley",
  tagline: "Where mountains meet tranquility",
  description:
    "A hidden paradise nestled between ancient peaks, offering pristine nature and spiritual solace.",
  longDescription:
    "Serene Valley represents the perfect harmony between nature and human spirit...",
  category: "Nature",
  image: valleyImage,
  gallery: [valleyImage, mountainImage, forestImage],
  highlights: [
    "Mountain trekking trails",
    "Traditional village stays",
    "Meditation retreats",
    "Wildlife sanctuary",
  ],
  bestTimeToVisit: "March to June, September to November",
  location: "Northern Highlands",
  featured: true,

  // EXTRA CONTENT (like uploaded image)
  price: 5500,
  duration: "2 Nights / 3 Days",
  transport: "AC Cab / Tempo Traveller",
  food: "Breakfast, Lunch & Dinner",
  accommodation: "Hotel Stay",

  itinerary: [
    {
      day: "Day 1",
      title: "Arrival & Valley Exploration",
      details: [
        "Early morning departure",
        "Reach Serene Valley",
        "Nature walk & meditation",
        "Overnight stay",
      ],
    },
    {
      day: "Day 2",
      title: "Mountain Trails & Village Life",
      details: [
        "Guided trekking",
        "Traditional village visit",
        "Cultural interaction",
      ],
    },
    {
      day: "Day 3",
      title: "Return Journey",
      details: [
        "Breakfast",
        "Checkout & return",
      ],
    },
  ],

  includes: [
    "AC Transportation",
    "Accommodation",
    "Meals",
    "Toll & Parking",
    "Freshup Room",
  ],

  excludes: [
    "Personal Expenses",
    "Travel Insurance",
    "Entry Tickets",
  ],
},

  {
  id: "ancient-temple-trail",
  name: "Ancient Temple Trail",
  tagline: "Walk through centuries of devotion",
  description:
    "A sacred journey through ancient temples and historic pilgrimage routes.",
  longDescription:
    "This trail takes you through some of the most revered temples, showcasing architectural brilliance and spiritual heritage.",
  category: "Heritage",
  image: templeImage,
  gallery: [templeImage, artisanImage, valleyImage],
  highlights: [
    "Ancient Shiva & Vishnu temples",
    "Traditional rituals & ceremonies",
    "Heritage architecture",
    "Pilgrimage experience",
  ],
  bestTimeToVisit: "October to March",
  location: "Central Plateau",
  featured: true,

  price: 4800,
  duration: "1 Night / 2 Days",
  transport: "AC Tempo Traveller",
  food: "Breakfast & Dinner",
  accommodation: "Hotel Stay",

  itinerary: [
    {
      day: "Day 1",
      title: "Temple Visits & Darshan",
      details: [
        "Early departure",
        "Visit major heritage temples",
        "Evening aarti & rituals",
        "Overnight stay",
      ],
    },
    {
      day: "Day 2",
      title: "Morning Darshan & Return",
      details: [
        "Morning prayers",
        "Breakfast",
        "Return journey",
      ],
    },
  ],

  includes: [
    "Transportation",
    "Accommodation",
    "Breakfast & Dinner",
    "Toll & Parking",
  ],

  excludes: [
    "Temple entry tickets",
    "Personal expenses",
    "Travel insurance",
  ],
},
 {
  id: "coastal-paradise",
  name: "Coastal Paradise",
  tagline: "Sun, sand, and endless horizons",
  description:
    "Relax along pristine beaches and vibrant coastal villages.",
  longDescription:
    "Experience golden beaches, calm waves, fishing villages, and breathtaking sunsets.",
  category: "Beach",
  image: beachImage,
  gallery: [beachImage, forestImage, artisanImage],
  highlights: [
    "Golden sandy beaches",
    "Fishing village experience",
    "Sunset views",
    "Fresh seafood",
  ],
  bestTimeToVisit: "November to February",
  location: "Eastern Coast",
  featured: true,

  price: 4200,
  duration: "1 Night / 2 Days",
  transport: "AC Cab",
  food: "Breakfast & Dinner",
  accommodation: "Beachside Resort",

  itinerary: [
    {
      day: "Day 1",
      title: "Beach Arrival & Leisure",
      details: [
        "Morning departure",
        "Beach check-in",
        "Evening leisure & sunset",
      ],
    },
    {
      day: "Day 2",
      title: "Coastal Exploration & Return",
      details: [
        "Beach walk",
        "Breakfast",
        "Return journey",
      ],
    },
  ],

  includes: [
    "Transportation",
    "Accommodation",
    "Meals",
  ],

  excludes: [
    "Water sports",
    "Personal expenses",
  ],
},

 {
  id: "forest-sanctuary",
  name: "Forest Sanctuary",
  tagline: "Into the heart of wilderness",
  description:
    "Explore dense forests rich in wildlife and biodiversity.",
  longDescription:
    "A nature lover’s escape featuring safaris, bird watching, and eco stays.",
  category: "Wildlife",
  image: forestImage,
  gallery: [forestImage, valleyImage, mountainImage],
  highlights: [
    "Wildlife safari",
    "Bird watching",
    "Nature photography",
    "Eco stays",
  ],
  bestTimeToVisit: "June to September",
  location: "Western Forests",
  featured: false,

  price: 6000,
  duration: "2 Nights / 3 Days",
  transport: "AC Jeep / Tempo",
  food: "All Meals",
  accommodation: "Eco Lodge",

  itinerary: [
    {
      day: "Day 1",
      title: "Forest Entry & Safari",
      details: [
        "Arrival",
        "Guided forest walk",
        "Evening safari",
      ],
    },
    {
      day: "Day 2",
      title: "Wildlife Exploration",
      details: [
        "Morning safari",
        "Bird watching",
        "Nature photography",
      ],
    },
    {
      day: "Day 3",
      title: "Return",
      details: ["Breakfast", "Checkout & return"],
    },
  ],

  includes: [
    "Transportation",
    "Accommodation",
    "All meals",
    "Safari permits",
  ],

  excludes: [
    "Camera fees",
    "Personal expenses",
  ],
},

  {
  id: "artisan-village",
  name: "Artisan Village",
  tagline: "Where traditions come alive",
  description:
    "Discover traditional crafts and cultural heritage.",
  longDescription:
    "Meet master artisans and experience ancient craftsmanship firsthand.",
  category: "Culture",
  image: artisanImage,
  gallery: [artisanImage, templeImage, valleyImage],
  highlights: [
    "Craft workshops",
    "Local markets",
    "Cultural performances",
  ],
  bestTimeToVisit: "Year-round",
  location: "Southern Plains",
  featured: true,

  price: 3200,
  duration: "1 Day",
  transport: "AC Cab",
  food: "Lunch",
  accommodation: "Not Included",

  itinerary: [
    {
      day: "Day 1",
      title: "Village & Craft Exploration",
      details: [
        "Morning departure",
        "Craft demonstrations",
        "Local lunch",
        "Cultural show",
      ],
    },
  ],

  includes: [
    "Transportation",
    "Workshop entry",
    "Lunch",
  ],

  excludes: [
    "Shopping expenses",
    "Personal expenses",
  ],
},

  {
  id: "mountain-retreat",
  name: "Mountain Retreat",
  tagline: "Above the clouds, beyond expectations",
  description:
    "High-altitude adventure with panoramic mountain views.",
  longDescription:
    "Ideal for trekkers and adventure seekers looking for thrilling mountain experiences.",
  category: "Adventure",
  image: mountainImage,
  gallery: [mountainImage, valleyImage, forestImage],
  highlights: [
    "Mountain trekking",
    "Rock climbing",
    "Paragliding",
    "Scenic photography",
  ],
  bestTimeToVisit: "April to June, September to October",
  location: "Alpine Region",
  featured: false,

  price: 7200,
  duration: "2 Nights / 3 Days",
  transport: "AC Cab",
  food: "Breakfast & Dinner",
  accommodation: "Mountain Resort",

  itinerary: [
    {
      day: "Day 1",
      title: "Arrival & Acclimatization",
      details: ["Arrival", "Rest & acclimatization"],
    },
    {
      day: "Day 2",
      title: "Adventure Activities",
      details: ["Trekking", "Rock climbing"],
    },
    {
      day: "Day 3",
      title: "Return",
      details: ["Breakfast", "Checkout & return"],
    },
  ],

  includes: [
    "Transportation",
    "Accommodation",
    "Meals",
  ],

  excludes: [
    "Adventure activity charges",
    "Insurance",
  ],
},

];

export const categories = [
  { id: "nature", name: "Nature & Hill Stations", count: "320+ places" },
  { id: "heritage", name: "Heritage & Monuments", count: "180+ sites" },
  { id: "beaches", name: "Beaches & Islands", count: "140+ destinations" },
  { id: "wildlife", name: "Wildlife Sanctuaries", count: "90+ parks" },
  { id: "culture", name: "Cultural & Festivals", count: "200+ experiences" },
  { id: "adventure", name: "Adventure & Trekking", count: "150+ activities" },
];

export const experiences = [
  {
    id: "cultural-immersion",
    title: "Cultural Immersion",
    description: "Live like a local through authentic cultural experiences and traditional ceremonies.",
    image: artisanImage,
  },
  {
    id: "culinary-journey",
    title: "Culinary Journey",
    description: "Taste the region's finest flavors through cooking classes and food trails.",
    image: beachImage,
  },
  {
    id: "eco-adventures",
    title: "Eco Adventures",
    description: "Sustainable exploration of nature reserves and protected wilderness areas.",
    image: forestImage,
  },
  {
    id: "heritage-walks",
    title: "Heritage Walks",
    description: "Guided tours through historic districts and ancient monuments.",
    image: templeImage,
  },
];

export const stories = [
  {
    id: "hidden-waterfalls",
    title: "In Search of Hidden Waterfalls",
    excerpt: "A three-day journey into the heart of the western forests revealed nature's most spectacular secrets.",
    author: "Maya Sharma",
    date: "January 15, 2024",
    readTime: "8 min read",
    category: "Adventure",
    image: forestImage,
  },
  {
    id: "festival-colors",
    title: "The Festival of a Thousand Colors",
    excerpt: "Experiencing the annual harvest celebration that brings together communities in a vibrant display of tradition.",
    author: "Rajan Mehta",
    date: "December 28, 2023",
    readTime: "6 min read",
    category: "Culture",
    image: artisanImage,
  },
  {
    id: "ancient-crafts",
    title: "Keepers of Ancient Crafts",
    excerpt: "Meeting the master artisans who preserve centuries-old traditions in a changing world.",
    author: "Priya Patel",
    date: "November 10, 2023",
    readTime: "10 min read",
    category: "Heritage",
    image: templeImage,
  },
];
