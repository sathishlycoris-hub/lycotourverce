import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function IntroSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-editorial">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
            Welcome to LycoTourism
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
            Discover the Art of Meaningful Travel
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            At Lyco Tourism, we believe that travel is more than visiting places — 
            it's about connecting with cultures, embracing new perspectives, and 
            creating stories worth sharing. Our curated experiences take you beyond 
            the ordinary, into the heart of authentic destinations where traditions 
            thrive and nature inspires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="editorial" size="lg" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
            <Button variant="editorialOutline" size="lg" asChild>
              <Link to="/experiences">Our Experiences</Link>
            </Button>
          </div>  
        </div>
      </div>
    </section>
  );
}
