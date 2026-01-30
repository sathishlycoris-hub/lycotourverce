import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/button";

export function FeaturedDestinations() {
  const featured = destinations.filter((d) => d.featured).slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
            Featured Destinations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Places That Inspire
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of extraordinary destinations, 
            each offering unique experiences and unforgettable memories.
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/destination/${destination.id}`}
              className={`group card-editorial ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`image-zoom ${index === 0 ? "h-[400px] lg:h-[500px]" : "h-[300px] lg:h-[350px]"}`}>
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 lg:p-8">
                <span className="inline-block text-xs uppercase tracking-wider text-accent font-medium mb-2">
                  {destination.category}
                </span>
                <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base mb-4 line-clamp-2">
                  {destination.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  Explore More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Button variant="editorialOutline" size="lg" asChild>
            <Link to="/explore">
              View All Destinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
