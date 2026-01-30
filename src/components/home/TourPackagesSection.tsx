import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Tour package routes for carousel
const tourRoutes = [
  {
    id: "chennai-tirupathi",
    name: "Chennai to Tirupathi",
    image: "/tirupathi.jpg",
  },
  {
    id: "bangalore-tirupathi",
    name: "Bangalore to Tirupathi",
    image: "/tirupathi2.jpg",
  },
  {
    id: "vijayawada-tirupathi",
    name: "Vijayawada to Tirupathi",
    image: "/vijayawada.jpg",
  },
  {
    id: "vizag-araku-road",
    name: "Vizag to Araku",
    image: "/araku.jpg",
  },
  {
    id: "srisailam-package",
    name: "Srisailam Package",
    image: "/srisala.jpg",
  },
];

export function TourPackagesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleSlides = 3;
  const maxSlide = Math.max(0, tourRoutes.length - visibleSlides);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  }, [maxSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="section-padding bg-background">
      <div className="container-editorial">
        <h2 className="font-serif text-2xl lg:text-3xl font-medium text-foreground mb-8">
          Tour Packages
        </h2>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-4"
              style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides + 1.33)}%)` }}
            >
              {tourRoutes.map((route) => (
                <Link
                  key={route.id}
                  to={`/tour-packages?route=${route.id}`}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-11px)] group"
                >
                  <div className="relative h-[220px] lg:h-[280px] rounded-lg overflow-hidden">
                    <img
                      src={route.image}
                      alt={route.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-medium text-lg">{route.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-secondary transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-secondary transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
