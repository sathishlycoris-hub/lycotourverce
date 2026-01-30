import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import heroLandscape from "@/assets/hero-landscape.jpg";
import heroBeach from "@/assets/hero-beach.jpg";
import heroTemple from "@/assets/gandikota.webp";

const heroSlides = [
 {
    image: heroBeach,
    alt: "Tropical beach paradise at sunset",
  },
  {
    image: heroTemple,
    alt: "Ancient temple ruins in misty jungle",
  },
  {
    image: heroLandscape,
    alt: "Scenic landscape with mountains and valley",
  },
   
  
  
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide && !isTransitioning
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-editorial text-center text-primary-foreground">
        <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 animate-fade-in opacity-90">
          Discover Extraordinary Places
        </p>
        < h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium mb-6 animate-fade-in-up max-w-4xl mx-auto text-balance leading-tight">
          Where Every Journey Becomes a Story
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-delay-1 opacity-90 leading-relaxed">
          Explore hidden destinations, immerse in rich cultures, and create memories 
          that last a lifetime with Lyco Tourism.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <Button variant="hero" size="xl" asChild>
            <Link to="/explore">
              Explore Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="heroOutline" size="xl" asChild>
            <Link to="/stories">Read Stories</Link>
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-foreground w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
