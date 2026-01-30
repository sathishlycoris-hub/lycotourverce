import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { destinations, categories } from "@/data/destinations";
import { ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const filteredDestinations = activeCategory === "all"
    ? destinations
    : destinations.filter(
        (d) => d.category.toLowerCase() === activeCategory.toLowerCase()
      );

  const setCategory = (category: string) => {
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary section-padding">
        <div className="container-editorial text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
            Discover
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
            Explore Places
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Journey through our curated collection of extraordinary destinations, 
            each offering unique experiences and cultural richness.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-16 lg:top-20 bg-background z-30">
        <div className="container-editorial">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <button
              onClick={() => setCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              All Places
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding">
        <div className="container-editorial">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No destinations found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destination/${destination.id}`}
                  className="group card-editorial"
                >
                  <div className="image-zoom h-[250px] lg:h-[280px]">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs uppercase tracking-wider text-accent font-medium mb-2">
                      {destination.category}
                    </span>
                    <h2 className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                      {destination.name}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
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
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Explore;
