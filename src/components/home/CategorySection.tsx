import { Link } from "react-router-dom";
import { categories } from "@/data/destinations";

export function CategorySection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-editorial">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-accent mb-3">
            Browse Destinations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
            Explore by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/explore?category=${category.id}`}
              className="group bg-white rounded-xl p-6 text-center border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-medium text-lg text-foreground group-hover:text-primary mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-primary/80">
                {category.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
