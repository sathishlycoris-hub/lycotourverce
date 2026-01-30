import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Star } from "lucide-react";

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find((d) => d.id === id);

  const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-muted rounded-lg p-4">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

  if (!destination) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-editorial text-center">
            <h1 className="font-serif text-3xl font-medium mb-4">
              Destination Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The destination you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/explore">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explore
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

 return (
  <Layout>
    {/* HERO */}
    <section className="relative h-[45vh] min-h-[320px]">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="container-editorial text-primary-foreground">
          <Link
            to="/explore"
            className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>

          <h1 className="text-3xl md:text-4xl font-semibold">
            {destination.name}
          </h1>
          <p className="text-sm opacity-90">{destination.location}</p>
        </div>
      </div>
    </section>

    {/* CONTENT */}
    <section className="section-padding">
      <div className="container-editorial">

        {/* TOP INFO BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <InfoBox label="Transport" value={destination.transport} />
          <InfoBox label="Food" value={destination.food} />
          <InfoBox label="Accommodation" value={destination.accommodation} />
          <InfoBox label="Duration" value={destination.duration} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-10">

            {/* ABOUT */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                About This Tour
              </h2>
              <p className="text-muted-foreground">
                {destination.description}
              </p>
            </section>

            {/* HIGHLIGHTS */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                Trip Highlights
              </h2>
              <ul className="space-y-2">
                {destination.highlights.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-600">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* TOUR PLAN */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Tour Plan
              </h2>

              {destination.itinerary.map((day, i) => (
                <details
                  key={i}
                  className="border rounded-lg p-4 mb-4 open:bg-muted"
                >
                  <summary className="font-medium cursor-pointer">
                    {day.day} – {day.title}
                  </summary>

                  <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
                    {day.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </section>

            {/* INCLUDED */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                What’s Included
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destination.includes.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-600">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* EXCLUDED */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                What’s Excluded
              </h2>
              <ul className="space-y-2">
                {destination.excludes.map((item, i) => (
                  <li key={i} className="flex gap-2 text-muted-foreground">
                    <span className="text-red-500">✖</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside>
          <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-lg space-y-6">
  {/* Price Section */}
  <div className="text-center">
    <p className="text-3xl font-bold text-primary">
      ₹ {destination.price}
      <span className="text-base font-normal text-muted-foreground block mt-1">
        Per Person
      </span>
    </p>
  </div>

  {/* Book Button */}
  <Button 
    className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-6 text-lg rounded-lg transition-all"
  >
    BOOK THIS TOUR
  </Button>

  {/* Divider */}
  <div className="border-t border-dashed border-gray-300 my-4" />

  {/* Enquiry Form */}
  <div>
    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">
      Enquiry Now
    </h4>

    <form className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
        required
      />

      <input
        type="email"
        placeholder="Email ID"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
        required
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
        required
      />

      <input
        type="number"
        placeholder="Approximate Group Size"
        min="1"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
      />

      <input
        type="text"
        placeholder="Preferred Travel Dates (dd/mm/yyyy)"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
      />

      <textarea
        placeholder="Additional Comments"
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
      />

      <Button 
        type="submit"
        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-6 text-lg rounded-lg transition-all mt-2"
      >
        SUBMIT
      </Button>
    </form>
  </div>
</div>
          </aside>

        </div>
      </div>
    </section>
  </Layout>
);

};

export default DestinationDetail;
