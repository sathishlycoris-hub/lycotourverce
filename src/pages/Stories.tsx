import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { stories } from "@/data/destinations";
import { ArrowRight } from "lucide-react";
import falls from "@/assets/falls.jpeg";
import food from "@/assets/food.jpg"
import temple from "@/assets/temple.webp"
import divine from "@/assets/tirupathi.jpg"

const moreStories = [
  {
    id: "mountain-villages",
    title: "Life in the Mountain Villages",
    excerpt: "Discovering the rhythms of daily life in remote highland communities where traditions remain unchanged.",
    author: "Arjun Nair",
    date: "October 5, 2023",
    readTime: "12 min read",
    category: "Culture",
     image: falls,
  },
  {
    id: "coastal-flavors",
    title: "Coastal Flavors: A Culinary Journey",
    excerpt: "From fishermen's catch to traditional recipes, exploring the rich culinary heritage of coastal communities.",
    author: "Anita Kumar",
    date: "September 18, 2023",
    readTime: "7 min read",
    category: "Food",
    image: food,
  },
  {
    id: "temple-architecture",
    title: "Sacred Geometry: Temple Architecture",
    excerpt: "Understanding the mathematical precision and spiritual symbolism behind ancient temple designs.",
    author: "Vikram Singh",
    date: "August 22, 2023",
    readTime: "9 min read",
    category: "Heritage",
    image: temple,
  },
  {
  id: "divine-temple-designs",
  title: "Divine Blueprints: The Spiritual Science of Temples",
  excerpt:
    "Explore how ancient builders infused spirituality, astronomy, and geometry into temple architecture.",
  author: "Ananya Rao",
  date: "September 10, 2023",
  readTime: "8 min read",
  category: "Heritage",
  image: divine,
}

];

const allStories = [...stories, ...moreStories];

const Stories = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary section-padding">
        <div className="container-editorial text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
            Travel Stories
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
            Tales From the Road
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stories, guides, and insights from our journeys through remarkable
            destinations.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="section-padding">
        <div className="container-editorial">
          <article className="group">
            <Link to={`/story/${allStories[0].id}`} className="block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="image-zoom aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={allStories[0].image}
                    alt={allStories[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="uppercase tracking-wider text-accent font-medium">
                      {allStories[0].category}
                    </span>
                    <span>•</span>
                    <span>{allStories[0].readTime}</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4 group-hover:text-primary transition-colors">
                    {allStories[0].title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    {allStories[0].excerpt}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    By {allStories[0].author} · {allStories[0].date}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Read Story
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </div>
      </section>

      {/* All Stories Grid */}
      <section className="section-padding bg-secondary">
        <div className="container-editorial">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
            More Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allStories.slice(1).map((story) => (
              <article key={story.id} className="group">
                <Link to={`/story/${story.id}`} className="block">
                  <div className="image-zoom aspect-[3/2] rounded-lg overflow-hidden mb-4">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="uppercase tracking-wider text-accent font-medium">
                      {story.category}
                    </span>
                    <span>•</span>
                    <span>{story.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {story.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    By {story.author} · {story.date}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Stories;
