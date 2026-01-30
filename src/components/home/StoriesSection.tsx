import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stories } from "@/data/destinations";
import { Button } from "@/components/ui/button";

export function StoriesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
              Travel Stories
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              Tales From the Road
            </h2>
          </div>
          <Button variant="ghost" asChild className="self-start md:self-auto">
            <Link to="/stories">
              All Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <article
              key={story.id}
              className={`group ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <Link to={`/story/${story.id}`} className="block">
                <div className={`image-zoom rounded-lg mb-4 ${
                  index === 0 ? "h-[300px] lg:h-full lg:min-h-[500px]" : "h-[200px]"
                }`}>
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Link>
              <div className={index === 0 ? "lg:absolute lg:bottom-8 lg:left-8 lg:right-8 lg:bg-background/95 lg:backdrop-blur-sm lg:p-6 lg:rounded-lg" : ""}>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="uppercase tracking-wider text-accent font-medium">
                    {story.category}
                  </span>
                  <span>{story.readTime}</span>
                </div>
                <Link to={`/story/${story.id}`}>
                  <h3 className={`font-serif font-medium text-foreground mb-2 group-hover:text-primary transition-colors ${
                    index === 0 ? "text-xl lg:text-2xl" : "text-lg"
                  }`}>
                    {story.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {story.excerpt}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  By {story.author} · {story.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
