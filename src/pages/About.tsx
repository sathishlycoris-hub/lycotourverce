import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Compass, Users, Leaf } from "lucide-react";
import adventureImg from "@/assets/adven.jpg";
import beachRiseImg from "@/assets/rise.webp";
import hillStationImg from "@/assets/hotel.jpg";
import heritageImg from "@/assets/dream.webp";
import foodCultureImg from "@/assets/food.webp";
import wildlifeGroupImg from "@/assets/traveller.webp";

// ── ADD THIS ARRAY HERE ──
const values = [
  {
    icon: Heart,
    title: "Passion for Discovery",
    description:
      "We believe every journey should ignite curiosity and create lasting memories.",
  },
  {
    icon: Compass,
    title: "Authentic Experiences",
    description:
      "We connect travelers with genuine cultural encounters and local communities.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We prioritize the well-being of local communities and preserve their heritage.",
  },
  {
    icon: Leaf,
    title: "Sustainable Travel",
    description:
      "We champion eco-conscious exploration that protects destinations for generations.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Page Header – You can add a hero background image here if desired */}
      <section className="bg-secondary section-padding">
        <div className="container-editorial text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
            About LycoTourism
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Dedicated to meaningful travel that enriches lives and preserves cultures.
          </p>
        </div>
      </section>

      {/* Mission Section – Replaced placeholder with stunning beach sunrise */}
      <section className="section-padding">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
                Our Mission
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">
                Transforming Travel Into Meaningful Journeys
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At LycoTourism, we believe that travel is more than just visiting new 
                places—it's about connecting with the heart and soul of destinations. 
                We curate experiences that go beyond the surface, allowing travelers 
                to immerse themselves in authentic cultures, traditions, and natural wonders.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded with a passion for discovery and a commitment to sustainable 
                tourism, we work closely with local communities to create experiences 
                that benefit both travelers and the places they visit.
              </p>
              <Button variant="editorial" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://thumbs.dreamstime.com/b/beautiful-sunrise-tropical-paradise-island-beach-landscape-scenic-sunset-sea-coast-golden-sun-blue-sky-pink-clouds-palm-163035091.jpg"
                alt="Tropical beach sunrise – symbolizing new beginnings in travel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section – unchanged, looks solid with Lucide icons */}
      <section className="section-padding bg-secondary">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
              Our Values
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              What Guides Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New: What We Do / Services Section – using uploaded content images */}
      <section className="section-padding">
        <div className="container-editorial">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
              Our Services
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              Experiences We Curate For You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Adventure */}
{/* Adventure */}
<div className="group relative rounded-xl overflow-hidden shadow-lg">
  <img
    src={adventureImg}
    alt="Thrilling paragliding adventure"
    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
    <div>
      <h3 className="text-xl font-bold text-white">Adventure Tours</h3>
      <p className="text-white/80 text-sm mt-1">
        Trekking, camping, safaris & adrenaline activities
      </p>
    </div>
  </div>
</div>

{/* Beach */}
<div className="group relative rounded-xl overflow-hidden shadow-lg">
  <img
    src={beachRiseImg}
    alt="Pristine beach getaway at sunrise"
    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
    <div>
      <h3 className="text-xl font-bold text-white">Beach Getaways</h3>
      <p className="text-white/80 text-sm mt-1">
        Relaxing shores, pristine waters & luxury stays
      </p>
    </div>
  </div>
</div>

{/* Hill Stations */}
<div className="group relative rounded-xl overflow-hidden shadow-lg">
  <img
    src={hillStationImg}
    alt="Scenic misty hill station retreat"
    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
    <div>
      <h3 className="text-xl font-bold text-white">Hill Stations</h3>
      <p className="text-white/80 text-sm mt-1">
        Cool climate, stunning views & peaceful nature
      </p>
    </div>
  </div>
</div>

{/* Heritage */}
<div className="group relative rounded-xl overflow-hidden shadow-lg">
  <img
    src={heritageImg}
    alt="Ancient Indian heritage temple at sunrise"
    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
    <div>
      <h3 className="text-xl font-bold text-white">Heritage Tours</h3>
      <p className="text-white/80 text-sm mt-1">
        Temples, monuments & rich cultural legacy
      </p>
    </div>
  </div>
</div>

{/* Food & Culture */}
<div className="group relative rounded-xl overflow-hidden shadow-lg">
  <img
    src={foodCultureImg}
    alt="Authentic Indian thali cultural dining"
    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
    <div>
      <h3 className="text-xl font-bold text-white">Food & Culture</h3>
      <p className="text-white/80 text-sm mt-1">
        Local cuisine & immersive traditions
      </p>
    </div>
  </div>
</div>

{/* Wildlife */}
<div className="group relative rounded-xl overflow-hidden shadow-lg">
  <img
    src={wildlifeGroupImg}
    alt="Exciting wildlife safari experience"
    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
    <div>
      <h3 className="text-xl font-bold text-white">
        Wildlife & Group Tours
      </h3>
      <p className="text-white/80 text-sm mt-1">
        Safaris, group adventures & expert guidance
      </p>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Vision & CTA – unchanged or lightly enhanced */}
      <section className="section-padding">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
              Our Vision
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">
              A World Where Travel Creates Positive Change
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We envision a future where tourism uplifts communities, preserves 
              cultural heritage, and protects natural environments.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-editorial text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Ready to Explore?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Start your journey of discovery with LycoTourism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/explore">Explore Destinations</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default About;