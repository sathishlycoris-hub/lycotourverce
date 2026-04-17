// ============================================
// BOOKING CONFIRMATION COMPONENT - Simplified
// Success screen with booking details
// ============================================

import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Printer, Calendar, Users, CreditCard } from 'lucide-react';
import type { Booking } from '@/types/booking';
import { Link } from 'react-router-dom';

interface BookingConfirmationProps {
  booking: Booking;
}

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="bg-green-500 text-white p-6 text-center">
        <CheckCircle2 className="h-16 w-16 mx-auto mb-3" />
        <h1 className="text-2xl font-serif font-medium">Booking Confirmed!</h1>
        <p className="mt-2 opacity-90">Your tour package has been successfully booked</p>
      </div>

      {/* Booking ID */}
      <div className="bg-green-50 p-4 text-center border-b">
        <div className="text-sm text-muted-foreground">Booking Reference</div>
        <div className="text-2xl font-mono font-bold text-primary mt-1">
          {booking.id}
        </div>
      </div>

      {/* Booking Details */}
      <div className="p-6 space-y-6">
        {/* Package Info */}
        <div>
          <h2 className="font-serif text-lg font-medium mb-3">{booking.packageName}</h2>
        </div>

        {/* Journey Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Departure</div>
              <div className="font-medium">{booking.departureDate}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Passengers</div>
              <div className="font-medium">{booking.passengersCount} Person(s)</div>
            </div>
          </div>
        </div>

        {/* Passengers List */}
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Passengers</h3>
          <div className="bg-secondary/30 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left py-2 px-3">#</th>
                  <th className="text-left py-2 px-3">Name</th>
                  <th className="text-left py-2 px-3">Gender</th>
                  <th className="text-left py-2 px-3">Age</th>
                </tr>
              </thead>
              <tbody>
                {booking.passengers.map((passenger, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-2 px-3">{idx + 1}</td>
                    <td className="py-2 px-3">{passenger.name}</td>
                    <td className="py-2 px-3">{passenger.gender}</td>
                    <td className="py-2 px-3">{passenger.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Payment Summary</h3>
          </div>
          <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>{booking.pricing.passengersCount} × ₹{booking.pricing.pricePerPerson.toLocaleString()}</span>
              <span>₹{booking.pricing.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>GST (5%)</span>
              <span>₹{booking.pricing.gst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total Paid</span>
              <span className="text-green-600">₹{booking.pricing.grandTotal.toLocaleString()}</span>
            </div>
            {booking.paymentId && (
              <div className="text-xs text-muted-foreground pt-2">
                Payment ID: <span className="font-mono">{booking.paymentId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-4 text-sm">
          <h3 className="font-medium mb-2">Contact Information</h3>
          <div className="text-muted-foreground">
            <p>{booking.contactInfo.name}</p>
            <p>{booking.contactInfo.mobile} | {booking.contactInfo.email}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t p-6 flex gap-3">
        <Button variant="outline" onClick={handlePrint} className="flex-1">
          <Printer className="h-4 w-4 mr-2" />
          Print Ticket
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button asChild className="flex-1 bg-primary">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border-t border-yellow-200 p-4 text-sm">
        <h4 className="font-medium text-yellow-800 mb-2">Important Instructions</h4>
        <ul className="text-yellow-700 space-y-1 list-disc list-inside">
          <li>Please arrive at the departure point 30 minutes before scheduled time</li>
          <li>Carry a valid ID proof for all passengers</li>
          <li>Show this booking confirmation at check-in</li>
          <li>Contact our helpline for any queries: +91-7673946789</li>
        </ul>
      </div>
    </div>
  );
}
