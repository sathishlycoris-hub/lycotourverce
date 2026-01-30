import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Nature
import sunset from "@/assets/sunset.jpeg";
import caption from "@/assets/caption.jpg";
import fallTrail from "@/assets/falltrial.jpeg";

// Heritage
import templeJpg from "@/assets/temple.jpg";
import templePng from "@/assets/temple.png";
import gandikota from "@/assets/gandikota.webp";
import overall from "@/assets/overall.jpg";

// Beach
import beach from "@/assets/beach.jpg";
import destinationValley from "@/assets/destination-valley.jpg";

// Culture
import festival from "@/assets/festival.jpg";
import cousin from "@/assets/cousin.jpg";
import village from "@/assets/village.png";


const galleryImages = [
  {
    id: 1,
    src: sunset,
    alt: "Mountain landscape at sunrise",
    category: "Nature",
  },
  {
    id: 2,
    src: templeJpg,
    alt: "Ancient temple architecture",
    category: "Heritage",
  },
  {
    id: 3,
    src: templePng,
    alt: "Traditional festival celebration",
    category: "Culture",
  },
  {
    id: 4,
    src: beach,
    alt: "Pristine beach coastline",
    category: "Beach",
  },
  {
    id: 5,
    src: festival,
    alt: "Local artisan at work",
    category: "Culture",
  },
  {
    id: 6,
    src: gandikota,
    alt: "Wildlife in natural habitat",
    category: "Wildlife",
  },
  {
    id: 7,
    src: caption,
    alt: "Valley at golden hour",
    category: "Nature",
  },
  {
    id: 8,
    src: overall,
    alt: "Historic monument",
    category: "Heritage",
  },
  {
    id: 9,
    src: cousin,
    alt: "Traditional cuisine",
    category: "Culture",
  },
  {
    id: 10,
    src: fallTrail,
    alt: "Forest trail",
    category: "Nature",
  },
  {
    id: 11,
    src: destinationValley,
    alt: "Fishing boats at harbor",
    category: "Beach",
  },
  {
    id: 12,
    src: village,
    alt: "Rural village scene",
    category: "Culture",
  },
];

const categories = ["All", "Nature", "Heritage", "Culture", "Beach", "Wildlife"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary section-padding">
        <div className="container-editorial text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
            Visual Stories
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
            Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A visual journey through the extraordinary destinations and moments
            we've captured.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border sticky top-16 lg:top-20 bg-background z-30">
        <div className="container-editorial">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setLightboxImage(image)}
                className={cn(
                  "relative overflow-hidden rounded-lg group cursor-pointer",
                  index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                )}
              >
                <div className={cn(
                  "w-full",
                  index % 5 === 0 ? "aspect-square" : "aspect-[4/3]"
                )}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs uppercase tracking-wider text-white/80">
                      {image.category}
                    </span>
                    <p className="text-sm text-white font-medium line-clamp-1">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            <p className="text-sm opacity-80">{lightboxImage.category}</p>
            <p className="font-medium">{lightboxImage.alt}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
