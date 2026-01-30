import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { usePackage } from "@/hooks/usePackages";
import { useBookingContext } from "@/contexts/BookingContext";
import { calculatePricing } from "@/services/packageService";
import { createBooking, confirmBooking, failBooking } from "@/services/bookingService";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Booking Components
import { PassengerForm } from "@/components/booking/PassengerForm";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { PaymentSimulator } from "@/components/booking/PaymentSimulator";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

import type { BookingStep, Booking } from "@/types/booking";

const PackageBooking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fetch package data
  const { data: pkg, isLoading: isLoadingPackage } = usePackage(id);

  // Get URL params
  const initialPassengers = parseInt(searchParams.get("passengers") || "2");

  // Local state for booking flow
  const [step, setStep] = useState<BookingStep>("details");
  const [passengersCount, setPassengersCount] = useState(initialPassengers);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showInclusions, setShowInclusions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGstin, setShowGstin] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingBookingId, setPendingBookingId] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Booking context for passenger management
  const {
    state,
    initializePassengers,
    updatePassenger,
    setContactInfo,
    setPassengersCount: setContextPassengersCount,
    resetBooking,
  } = useBookingContext();

  // Sync passengers count to context
  useEffect(() => {
    setContextPassengersCount(passengersCount);
  }, [passengersCount, setContextPassengersCount]);

  // Initialize passengers when count changes
  useEffect(() => {
    initializePassengers();
  }, [state.passengersCount, initializePassengers]);

  // Calculate pricing
  const pricing = pkg ? calculatePricing(pkg.pricePerPerson, passengersCount) : null;

  // Loading state
  if (isLoadingPackage) {
    return (
      <Layout>
        <div className="section-padding flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Package not found
  if (!pkg) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-serif">Package not found</h1>
          <Button onClick={() => navigate("/tour-packages")} className="mt-4">
            Back to Packages
          </Button>
        </div>
      </Layout>
    );
  }

  const validatePassengerForm = () => {
    const newErrors: Record<string, string> = {};

    // state.passengers.forEach((p, i) => {
    //   if (!p.name.trim()) newErrors[`name_${i}`] = "Name is required";
    //   else if (!/^[a-zA-Z\s]+$/.test(p.name.trim())) newErrors[`name_${i}`] = "Only letters allowed";
      
    //   if (!p.gender) newErrors[`gender_${i}`] = "Select gender";
      
    //   if (!p.age) newErrors[`age_${i}`] = "Age is required";
    //   else {
    //     const age = typeof p.age === 'number' ? p.age : parseInt(p.age as string);
    //     if (age < 1 || age > 100) newErrors[`age_${i}`] = "Invalid age";
    //   }
    // });

    if (!state.contactInfo.name.trim()) newErrors.contactName = "Name is required";
    if (!state.contactInfo.mobile.trim() || state.contactInfo.mobile.length !== 10) {
      newErrors.contactMobile = "Valid 10-digit mobile required";
    }
    if (!state.contactInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contactInfo.email)) {
      newErrors.contactEmail = "Valid email required";
    }
    // if (!state.contactInfo.state) newErrors.contactState = "Select state";
    if (!agreeTerms) newErrors.terms = "Please agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = async () => {
    if (!validatePassengerForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsProcessing(true);
    try {
      // Create booking with pending status
      const result = await createBooking({
        packageId: pkg.id,
        packageName: pkg.name,
        departureDate: pkg.departureDate,
        passengersCount,
        passengers: state.passengers,
        contactInfo: state.contactInfo,
        pricing: pricing!,
      });

      setPendingBookingId(result.bookingId);
      setStep("payment");
    } catch (error) {
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    if (!pendingBookingId) return;

    try {
      const booking = await confirmBooking(pendingBookingId, paymentId);
      if (booking) {
        setConfirmedBooking(booking);
        setStep("confirm");
        resetBooking();
        toast.success("Booking confirmed successfully!");
      }
    } catch (error) {
      toast.error("Failed to confirm booking");
    }
  };

  const handlePaymentFailure = async () => {
    if (pendingBookingId) {
      await failBooking(pendingBookingId);
    }
    setStep("details");
    setPendingBookingId(null);
    toast.error("Payment failed. Please try again.");
  };

  const handleCancelPayment = () => {
    setStep("booking");
  };

  // Render confirmation screen
  if (step === "confirm" && confirmedBooking) {
    return (
      <Layout>
        <section className="section-padding bg-secondary/30">
          <div className="container-editorial">
            <BookingConfirmation booking={confirmedBooking} />
          </div>
        </section>
      </Layout>
    );
  }

  // Render payment screen
  if (step === "payment" && pricing) {
    return (
      <Layout>
        <section className="section-padding bg-secondary/30">
          <div className="container-editorial">
            <PaymentSimulator
              pricing={pricing}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
              onCancel={handleCancelPayment}
            />
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Package Header with Full Details */}
      <section className="bg-secondary/50 py-6">
        <div className="container-editorial">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-64 lg:h-80">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent px-3 py-1 rounded text-sm font-medium">
                    {pkg.duration}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded text-sm">
                    {pkg.categories[0]}
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-serif font-medium">
                  {pkg.name}
                </h1>
                <p className="text-sm opacity-90 mt-1">{pkg.route}</p>
              </div>
            </div>

            {/* Package Info */}
            <div className="p-6">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-xs text-muted-foreground">Departure</div>
                    <div className="font-medium">{pkg.departureDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-xs text-muted-foreground">Timing</div>
                    <div className="font-medium">{pkg.departureTime} - {pkg.arrivalTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-xs text-muted-foreground">Available Slots</div>
                    <div className="font-medium">{pkg.availableSlots} spots</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="font-serif text-lg font-medium mb-2">About This Tour</h2>
                <p className="text-muted-foreground">{pkg.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h2 className="font-serif text-lg font-medium mb-3">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pkg.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Accordion */}
              <div className="mb-6 border rounded-lg">
                <button
                  onClick={() => setShowItinerary(!showItinerary)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <h2 className="font-serif text-lg font-medium">Itinerary</h2>
                  {showItinerary ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {showItinerary && (
                  <div className="px-4 pb-4 space-y-4">
                    {pkg.itinerary.map((day) => (
                      <div key={day.day} className="border-l-2 border-accent pl-4">
                        <h3 className="font-medium text-primary">Day {day.day}: {day.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{day.description}</p>
                        <ul className="space-y-1">
                          {day.activities.map((activity, i) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Inclusions/Exclusions Accordion */}
              <div className="border rounded-lg">
                <button
                  onClick={() => setShowInclusions(!showInclusions)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <h2 className="font-serif text-lg font-medium">What's Included & Excluded</h2>
                  {showInclusions ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {showInclusions && (
                  <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-green-600 mb-2">Included</h3>
                      <ul className="space-y-1">
                        {pkg.included.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-red-600 mb-2">Not Included</h3>
                      <ul className="space-y-1">
                        {pkg.excluded.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <X className="h-4 w-4 text-red-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Cancellation Policy */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-medium text-amber-800 mb-1">Cancellation Policy</h3>
                <p className="text-sm text-amber-700">{pkg.cancellationPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-editorial">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { key: "details", label: "Package Details" },
              { key: "booking", label: "Passenger Details" },
              { key: "payment", label: "Payment" },
            ].map((s, idx) => (
              <div key={s.key} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step === s.key 
                    ? "bg-primary text-white" 
                    : step === "confirm" || (idx === 0 && step !== "details") || (idx === 1 && step === "payment")
                      ? "bg-green-500 text-white"
                      : "bg-secondary text-muted-foreground"
                )}>
                  {idx + 1}
                </div>
                <span className={cn(
                  "ml-2 text-sm hidden sm:inline",
                  step === s.key ? "font-medium text-primary" : "text-muted-foreground"
                )}>
                  {s.label}
                </span>
                {idx < 2 && <div className="w-8 h-px bg-border mx-4" />}
              </div>
            ))}
          </div>
            {/* <div className="flex flex-col lg:flex-row gap-6"> */}
          <div className="flex flex-col items-center gap-6">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Package Details Step */}
              {step === "details" && (
                <div className="bg-white rounded-lg p-6">
                  <h2 className="font-serif text-lg font-medium mb-6">Select Number of Passengers</h2>
                  
                  {/* Passengers Counter */}
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-muted-foreground">Number of Passengers</span>
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setPassengersCount(Math.max(1, passengersCount - 1))}
                        className="p-3 hover:bg-secondary/50 transition-colors"
                        aria-label="Decrease passengers"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-6 text-lg font-medium min-w-[4rem] text-center">
                        {passengersCount}
                      </span>
                      <button
                        onClick={() => setPassengersCount(Math.min(pkg.availableSlots, passengersCount + 1))}
                        className="p-3 hover:bg-secondary/50 transition-colors"
                        aria-label="Increase passengers"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price Preview */}
                  <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>{passengersCount} × ₹{pkg.pricePerPerson.toLocaleString()}</span>
                      <span>₹{(passengersCount * pkg.pricePerPerson).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>+ GST (5%)</span>
                      <span>₹{Math.round(passengersCount * pkg.pricePerPerson * 0.05).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t mt-2 pt-2">
                      <span>Total</span>
                      <span className="text-primary">
                        ₹{Math.round(passengersCount * pkg.pricePerPerson * 1.05).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep("booking")}
                    className="w-full bg-accent hover:bg-accent/90 py-3"
                    disabled={passengersCount < 1 || passengersCount > pkg.availableSlots}
                  >
                    Continue to Passenger Details
                  </Button>
                </div>
              )}

              {/* Passenger Details Step */}
              {/* {step === "booking" && (
                <PassengerForm
                  passengers={state.passengers}
                  onUpdatePassenger={updatePassenger}
                  errors={errors}
                />
              )} */}

              
              
            </div>

            {/* Sidebar - Summary */}
            <div className="lg:w-1/2">
              {pricing && step === "booking" && (
                <BookingSummary
                  pricing={pricing}
                  contactInfo={state.contactInfo}
                  onContactChange={setContactInfo}
                  showGstin={showGstin}
                  onShowGstinChange={setShowGstin}
                  agreeTerms={agreeTerms}
                  onAgreeTermsChange={setAgreeTerms}
                  errors={errors}
                  onSubmit={handleContinueToPayment}
                  submitLabel="CONTINUE TO PAYMENT"
                  isLoading={isProcessing}
                />
              )}

              {step === "details" && (
                <div className="bg-white rounded-lg p-6 sticky top-24">
                  <h3 className="font-serif text-lg font-medium mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">Departure:</span>
                      <span className="font-medium">{pkg.departureDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">{pkg.availableSlots} slots</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="text-muted-foreground">Price per person</div>
                      <div className="text-2xl font-bold text-primary">
                        ₹{pkg.pricePerPerson.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PackageBooking;
