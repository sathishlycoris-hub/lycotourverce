// ============================================
// HOTEL DETAIL + BOOKING FLOW
// Hotel info, room list, related packages,
// 4-step booking UI (UI only — no persistence)
// ============================================

import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
import {
  MapPin,
  Star,
  Users,
  Wifi,
  Coffee,
  Snowflake,
  Tv,
  Waves,
  Car,
  Bath,
  CalendarIcon,
  Check,
  ChevronRight,
  ArrowLeft,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getHotelById, type Room } from "@/data/hotels";
import { tourPackages } from "@/data/tourPackages";

const amenityIcon: Record<string, { icon: typeof Wifi; label: string }> = {
  wifi: { icon: Wifi, label: "Free Wi-Fi" },
  breakfast: { icon: Coffee, label: "Breakfast" },
  ac: { icon: Snowflake, label: "AC" },
  tv: { icon: Tv, label: "Smart TV" },
  pool: { icon: Waves, label: "Pool" },
  parking: { icon: Car, label: "Parking" },
  bath: { icon: Bath, label: "Bathtub" },
  spa: { icon: Sparkles, label: "Spa" },
};

type Step = 1 | 2 | 3 | 4;

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = id ? getHotelById(id) : undefined;

  const [step, setStep] = useState<Step>(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const [isPaying, setIsPaying] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(1, differenceInCalendarDays(checkOut, checkIn));
  }, [checkIn, checkOut]);

  const subtotal = selectedRoom ? selectedRoom.pricePerNight * (nights || 1) : 0;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const relatedPackages = useMemo(
    () => (tourPackages || []).slice(0, 3),
    []
  );

  if (!hotel) {
    return (
      <Layout>
        <div className="container-editorial pt-32 pb-20 text-center">
          <h1 className="font-serif text-3xl text-primary mb-2">Hotel not found</h1>
          <Button variant="outline" onClick={() => navigate("/hotels")}>
            Back to Hotels
          </Button>
        </div>
      </Layout>
    );
  }

  const goNext = () => {
    if (step === 1 && !selectedRoom) {
      toast.error("Please select a room to continue");
      return;
    }
    if (step === 1 && (!checkIn || !checkOut)) {
      toast.error("Please choose check-in and check-out dates");
      return;
    }
    if (step === 2) {
      if (!guest.name || !guest.email || !guest.phone) {
        toast.error("Please fill all guest details");
        return;
      }
    }
    setStep((s) => (Math.min(4, s + 1) as Step));
  };

  const goBack = () => setStep((s) => (Math.max(1, s - 1) as Step));

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setConfirmed(true);
      toast.success("Booking confirmed!");
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="container-editorial pt-28 pb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/hotels")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> All hotels
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-xl overflow-hidden aspect-[4/3]">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {hotel.city}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-primary mb-3">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {hotel.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-medium text-foreground">{hotel.rating}</span>
                <span>({hotel.reviews} reviews)</span>
              </span>
            </div>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              {hotel.description}
            </p>

            <div>
              <h3 className="font-serif text-lg text-primary mb-3">Highlights</h3>
              <div className="grid grid-cols-2 gap-2">
                {hotel.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-serif text-lg text-primary mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((a) => {
                  const meta = amenityIcon[a];
                  if (!meta) return null;
                  const Icon = meta.icon;
                  return (
                    <span
                      key={a}
                      className="inline-flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {meta.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="container-editorial pb-16">
        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <Stepper step={step} confirmed={confirmed} />

          <div className="mt-6">
            {confirmed ? (
              <ConfirmationView hotel={hotel} room={selectedRoom!} guest={guest} total={total} nights={nights || 1} onClose={() => navigate("/hotels")} />
            ) : (
              <>
                {step === 1 && (
                  <Step1Rooms
                    hotel={hotel}
                    selectedRoom={selectedRoom}
                    onSelect={setSelectedRoom}
                    checkIn={checkIn}
                    setCheckIn={setCheckIn}
                    checkOut={checkOut}
                    setCheckOut={setCheckOut}
                    nights={nights}
                  />
                )}
                {step === 2 && (
                  <Step2Guest guest={guest} setGuest={setGuest} />
                )}
                {step === 3 && (
                  <Step3Review
                    hotel={hotel}
                    room={selectedRoom!}
                    checkIn={checkIn!}
                    checkOut={checkOut!}
                    nights={nights || 1}
                    guest={guest}
                    subtotal={subtotal}
                    taxes={taxes}
                    total={total}
                  />
                )}
                {step === 4 && (
                  <Step4Payment total={total} isPaying={isPaying} onPay={handlePay} />
                )}

                {/* Footer actions */}
                <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                  <Button
                    variant="ghost"
                    onClick={goBack}
                    disabled={step === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  {step < 4 ? (
                    <Button onClick={goNext} variant="editorial">
                      Continue <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      variant="editorial"
                      onClick={handlePay}
                      disabled={isPaying}
                    >
                      <CreditCard className="h-4 w-4 mr-1" />
                      {isPaying ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Related packages */}
      {relatedPackages.length > 0 && (
        <section className="container-editorial pb-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Available in Packages
              </p>
              <h2 className="font-serif text-2xl text-primary">
                Tour packages that include this region
              </h2>
            </div>
            <Link
              to="/tour-packages"
              className="text-sm text-primary link-underline hidden md:inline-block"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPackages.map((p) => (
              <Link
                key={p.id}
                to={`/package/${p.id}`}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-primary mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {p.duration ?? "Multi-day"} · {p.route ?? ""}
                  </p>
                  <p className="font-medium text-primary">
                    ₹{(p.pricePerPerson ?? 0).toLocaleString()}
                    <span className="text-xs text-muted-foreground font-sans"> /person</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

// -------- Stepper --------
function Stepper({ step, confirmed }: { step: Step; confirmed: boolean }) {
  const steps = ["Select Room", "Guest Details", "Review", "Payment"];
  const current = confirmed ? 5 : step;
  return (
    <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
      {steps.map((label, i) => {
        const idx = i + 1;
        const active = current === idx;
        const done = current > idx;
        return (
          <div key={label} className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium",
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : idx}
              </div>
              <span
                className={cn(
                  "text-xs md:text-sm",
                  active ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block h-px w-8 bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// -------- Step 1: Rooms --------
function Step1Rooms({
  hotel,
  selectedRoom,
  onSelect,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  nights,
}: {
  hotel: ReturnType<typeof getHotelById>;
  selectedRoom: Room | null;
  onSelect: (r: Room) => void;
  checkIn: Date | undefined;
  setCheckIn: (d: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (d: Date | undefined) => void;
  nights: number;
}) {
  if (!hotel) return null;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <DatePopover
          label="Check-in"
          value={checkIn}
          onChange={setCheckIn}
          minDate={new Date(new Date().setHours(0, 0, 0, 0))}
        />
        <DatePopover
          label="Check-out"
          value={checkOut}
          onChange={setCheckOut}
          minDate={checkIn ?? new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>
      {nights > 0 && (
        <p className="text-sm text-muted-foreground mb-4">
          {nights} night{nights !== 1 && "s"} selected
        </p>
      )}

      <h3 className="font-serif text-xl text-primary mb-4">Available rooms</h3>
      <div className="space-y-4">
        {hotel.rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;
          return (
            <div
              key={room.id}
              className={cn(
                "grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 p-4 rounded-lg border transition-all",
                isSelected
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-primary/40"
              )}
            >
              <div className="aspect-[4/3] md:aspect-square rounded-md overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-lg text-primary">{room.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {room.size} · {room.bed} ·{" "}
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" /> {room.capacity} guests
                  </span>
                </p>
                <p className="text-sm text-foreground/80 mb-3">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {room.amenities.map((a) => {
                    const meta = amenityIcon[a];
                    if (!meta) return null;
                    const Icon = meta.icon;
                    return (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 text-[11px] bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                      >
                        <Icon className="h-3 w-3" />
                        {meta.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex md:flex-col items-end justify-between md:justify-center md:text-right gap-2">
                <div>
                  <p className="font-serif text-xl text-primary">
                    ₹{room.pricePerNight.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">/night</p>
                </div>
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "editorialOutline"}
                  onClick={() => onSelect(room)}
                >
                  {isSelected ? "Selected" : "Book Now"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DatePopover({
  label,
  value,
  onChange,
  minDate,
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  minDate: Date;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-10",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "MMM d, yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(d) => d < minDate}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// -------- Step 2: Guest --------
function Step2Guest({
  guest,
  setGuest,
}: {
  guest: { name: string; email: string; phone: string };
  setGuest: (g: { name: string; email: string; phone: string }) => void;
}) {
  return (
    <div>
      <h3 className="font-serif text-xl text-primary mb-4">Guest details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground block mb-1">Full name *</label>
          <Input
            value={guest.name}
            onChange={(e) => setGuest({ ...guest, name: e.target.value })}
            placeholder="As on government ID"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Email *</label>
          <Input
            type="email"
            value={guest.email}
            onChange={(e) => setGuest({ ...guest, email: e.target.value })}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Phone *</label>
          <Input
            value={guest.phone}
            onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            placeholder="+91 ..."
          />
        </div>
      </div>
    </div>
  );
}

// -------- Step 3: Review --------
function Step3Review({
  hotel,
  room,
  checkIn,
  checkOut,
  nights,
  guest,
  subtotal,
  taxes,
  total,
}: {
  hotel: ReturnType<typeof getHotelById>;
  room: Room;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  guest: { name: string; email: string; phone: string };
  subtotal: number;
  taxes: number;
  total: number;
}) {
  if (!hotel) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <h3 className="font-serif text-xl text-primary">Review your booking</h3>
        <div className="border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Hotel
          </p>
          <p className="font-medium">{hotel.name}</p>
          <p className="text-sm text-muted-foreground">{hotel.location}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Room
          </p>
          <p className="font-medium">{room.name}</p>
          <p className="text-sm text-muted-foreground">
            {room.bed} · {room.size}
          </p>
        </div>
        <div className="border border-border rounded-lg p-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Check-in
            </p>
            <p className="font-medium">{format(checkIn, "EEE, MMM d, yyyy")}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Check-out
            </p>
            <p className="font-medium">{format(checkOut, "EEE, MMM d, yyyy")}</p>
          </div>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Guest
          </p>
          <p className="font-medium">{guest.name}</p>
          <p className="text-sm text-muted-foreground">
            {guest.email} · {guest.phone}
          </p>
        </div>
      </div>
      <PriceSummary
        nights={nights}
        room={room}
        subtotal={subtotal}
        taxes={taxes}
        total={total}
      />
    </div>
  );
}

// -------- Step 4: Payment --------
function Step4Payment({
  total,
  isPaying,
  onPay,
}: {
  total: number;
  isPaying: boolean;
  onPay: () => void;
}) {
  return (
    <div className="max-w-xl">
      <h3 className="font-serif text-xl text-primary mb-4">Payment</h3>
      <div className="border border-border rounded-lg p-5 bg-secondary/30">
        <p className="text-sm text-muted-foreground mb-4">
          This is a demo payment screen. No real charge will be made.
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">
              Card number
            </label>
            <Input placeholder="4242 4242 4242 4242" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">
                Expiry
              </label>
              <Input placeholder="MM/YY" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">
                CVV
              </label>
              <Input placeholder="123" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm">
          Total payable:{" "}
          <span className="font-serif text-xl text-primary">
            ₹{total.toLocaleString()}
          </span>
        </p>
        {isPaying && (
          <p className="mt-2 text-xs text-muted-foreground">
            Processing your booking...
          </p>
        )}
      </div>
    </div>
  );
}

function PriceSummary({
  nights,
  room,
  subtotal,
  taxes,
  total,
}: {
  nights: number;
  room: Room;
  subtotal: number;
  taxes: number;
  total: number;
}) {
  return (
    <aside className="border border-border rounded-lg p-4 h-fit bg-secondary/30">
      <h4 className="font-serif text-lg text-primary mb-4">Price summary</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>
            ₹{room.pricePerNight.toLocaleString()} × {nights} night
            {nights !== 1 && "s"}
          </span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Taxes & fees (12%)</span>
          <span>₹{taxes.toLocaleString()}</span>
        </div>
        <div className="border-t border-border pt-2 mt-2 flex justify-between font-medium">
          <span>Total</span>
          <span className="font-serif text-lg text-primary">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>
    </aside>
  );
}

// -------- Confirmation --------
function ConfirmationView({
  hotel,
  room,
  guest,
  total,
  nights,
  onClose,
}: {
  hotel: ReturnType<typeof getHotelById>;
  room: Room;
  guest: { name: string; email: string; phone: string };
  total: number;
  nights: number;
  onClose: () => void;
}) {
  if (!hotel) return null;
  return (
    <div className="text-center py-8">
      <div className="h-14 w-14 mx-auto rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
        <Check className="h-7 w-7" />
      </div>
      <h3 className="font-serif text-2xl text-primary mb-2">
        Booking confirmed!
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Thanks {guest.name.split(" ")[0] || "there"} — your stay at{" "}
        <span className="font-medium text-foreground">{hotel.name}</span> is
        confirmed for {nights} night{nights !== 1 && "s"} in the{" "}
        {room.name}. We've sent a confirmation to {guest.email}.
      </p>
      <p className="font-serif text-xl text-primary mb-6">
        Total paid: ₹{total.toLocaleString()}
      </p>
      <Button variant="editorial" onClick={onClose}>
        Browse more hotels
      </Button>
    </div>
  );
}
