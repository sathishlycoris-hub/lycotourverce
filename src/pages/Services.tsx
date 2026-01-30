import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, Users, TreePine, Mic } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Guided Destination Exploration",
    description:
      "Expert-led journeys through remarkable destinations, designed to reveal hidden gems and local insights that transform ordinary visits into extraordinary discoveries.",
    details: [
      "Personalized itinerary planning",
      "Local expert guides",
      "Off-the-beaten-path experiences",
      "Cultural context and storytelling",
    ],
  },
  {
    icon: Users,
    title: "Cultural & Heritage Walks",
    description:
      "Immersive walking experiences through historic districts, ancient monuments, and living heritage sites, bringing history and culture to life through engaging narratives.",
    details: [
      "Architectural heritage tours",
      "Museum and gallery visits",
      "Traditional craft demonstrations",
      "Historical storytelling",
    ],
  },
  {
    icon: TreePine,
    title: "Nature Trails & Eco Experiences",
    description:
      "Sustainable exploration of natural wonders, from pristine forests to mountain trails, designed to minimize environmental impact while maximizing your connection with nature.",
    details: [
      "Guided nature walks",
      "Wildlife observation",
      "Conservation programs",
      "Eco-friendly practices",
    ],
  },
  {
    icon: Mic,
    title: "Local Storytelling & Community Tourism",
    description:
      "Connect with local communities through authentic interactions, traditional ceremonies, and cultural exchanges that support local livelihoods and preserve heritage.",
    details: [
      "Community-based tourism",
      "Local family interactions",
      "Traditional ceremony participation",
      "Artisan community visits",
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary section-padding">
        <div className="container-editorial text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
            What We Offer
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
            Explore With LycoTourism
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our exploration-focused services are designed to connect you with
            authentic destinations, cultures, and communities.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-editorial">
          <div className="space-y-12 lg:space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 lg:pb-16 border-b border-border last:border-0"
              >
                <div className="lg:col-span-1">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="text-sm uppercase tracking-wider text-accent font-medium mb-4">
                    What's Included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-foreground"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Note */}
      {/* <section className="py-8 bg-muted">
        <div className="container-editorial text-center">
          <p className="text-muted-foreground text-sm">
            All services are informational and exploration-focused. Contact us
            to discuss how we can customize your experience.
          </p>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="section-padding bg-muted text-primary-foreground">
        <div className="container-editorial text-center">
          <h2 className="text-primary font-serif text-3xl md:text-4xl font-medium mb-4">
            Start Your Exploration
          </h2>
          <p className="text-primary max-w-xl mx-auto mb-8">
            Have questions about our services? We'd love to help you plan your
            perfect exploration experience.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
