import { Link } from "react-router-dom";

// Popular destinations grid for Andhra Pradesh
const destinations = [
  { id: "visakhapatnam", name: "VISAKHAPATNAM", image: "/vishak2.jpg" },
  { id: "vijayawada", name: "VIJAYAWADA", image: "/vijay2.jpg" },
  { id: "orvakallu", name: "ORVAKALLU", image: "/orvukalu2.jpg" },
  { id: "dwaraka-tirumala", name: "DWARAKA TIRUMALA", image: "/dwaraka.webp" },
  { id: "chittor", name: "CHITTOR", image: "/chitoor.jpg" },
  { id: "araku", name: "ARAKU", image: "/araku2.jpg" },
  { id: "konaseema", name: "KONASEEMA", image: "/konaseema2.jpg" },
  { id: "nellore", name: "NELLORE", image: "/nellore2.jpg" },
];

export function PopularDestinations() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-editorial">
        <div className="mb-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-medium text-foreground mb-2">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground">
            We love to tell our successful & beautiful destination places.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/tour-packages?destination=${destination.id}`}
              className="group relative h-[180px] lg:h-[220px] rounded-lg overflow-hidden"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                <h3 className="text-white font-medium text-sm lg:text-base">
                  {destination.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
