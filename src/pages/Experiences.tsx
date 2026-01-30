import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/destinations";
import { ArrowRight, Compass, Utensils, TreePine, Building } from "lucide-react";
import culturalImage from "@/assets/temple.webp";
import culinaryImage from "@/assets/food.jpg";
import ecoImage from "@/assets/eco.jpg";
import heritageImage from "@/assets/culinary.jpg";

const experienceDetails = [
  {
    id: "cultural-immersion",
    icon: Building,
    title: "Cultural Immersion",
    subtitle: "Live Like a Local",
    description:
      "Experience authentic cultural encounters through traditional ceremonies, local festivals, and community interactions. Our cultural immersion programs connect you with families and artisans who share their heritage, traditions, and way of life.",
    features: [
      "Traditional ceremony participation",
      "Local family homestays",
      "Artisan workshops",
      "Festival celebrations",
    ],
    image: culturalImage,
  },
  {
    id: "culinary-journey",
    icon: Utensils,
    title: "Culinary Journeys",
    subtitle: "Taste the Culture",
    description:
      "Discover the soul of destinations through their cuisine. From street food trails to cooking classes with local chefs, our culinary experiences take you on a delicious journey through flavors, ingredients, and cooking traditions.",
    features: [
      "Cooking classes with local chefs",
      "Food market explorations",
      "Traditional recipe workshops",
      "Farm-to-table experiences",
    ],
    image: culinaryImage,
  },
  {
    id: "eco-adventures",
    icon: TreePine,
    title: "Eco Adventures",
    subtitle: "Connect with Nature",
    description:
      "Explore pristine wilderness areas while supporting conservation efforts. Our eco-adventures are designed to minimize environmental impact while maximizing your connection with nature and wildlife.",
    features: [
      "Wildlife safaris",
      "Nature conservation programs",
      "Sustainable trekking",
      "Bird watching expeditions",
    ],
    image: ecoImage,
  },
  {
    id: "heritage-walks",
    icon: Compass,
    title: "Heritage Walks",
    subtitle: "Walk Through History",
    description:
      "Journey through time with guided explorations of historic sites, ancient monuments, and architectural wonders. Our heritage walks bring history to life through engaging storytelling and expert insights.",
    features: [
      "Archaeological site visits",
      "Architectural tours",
      "Historical storytelling",
      "Museum experiences",
    ],
    image: heritageImage,
  },
];


const Experiences = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary section-padding">
        <div className="container-editorial text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
            Our Experiences
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
            Explore With LycoTourism
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Curated experiences that connect you with culture, nature, and
            heritage in meaningful ways.
          </p>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="section-padding">
        <div className="container-editorial">
          <div className="space-y-16 lg:space-y-24">
            {experienceDetails.map((experience, index) => (
              <div
                key={experience.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <experience.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm uppercase tracking-wider text-accent mb-2">
                    {experience.subtitle}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
                    {experience.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {experience.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {experience.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-foreground"
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="editorialOutline" asChild>
                    <Link to="/contact">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Note */}
      <section className="section-padding bg-secondary">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4">
              Tailored to Your Journey
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All our experiences are designed to be informative and immersive.
              Whether you're seeking cultural enrichment, culinary adventures,
              or nature exploration, we craft each experience to match your
              interests and travel style.
            </p>
            <Button variant="editorial" asChild>
              <Link to="/contact">Plan Your Experience</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experiences;
