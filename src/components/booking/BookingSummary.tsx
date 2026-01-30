// ============================================
// BOOKING SUMMARY COMPONENT - Simplified
// Shows pricing breakdown and contact form
// ============================================

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, User, Phone, Mail, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { indianStates } from '@/data/tourPackages';
import type { BookingPricing, ContactInfo } from '@/types/booking';

interface BookingSummaryProps {
  pricing: BookingPricing;
  contactInfo: ContactInfo;
  onContactChange: (info: Partial<ContactInfo>) => void;
  showGstin: boolean;
  onShowGstinChange: (show: boolean) => void;
  agreeTerms: boolean;
  onAgreeTermsChange: (agree: boolean) => void;
  errors: Record<string, string>;
  onSubmit: () => void;
  submitLabel: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export function BookingSummary({
  pricing,
  contactInfo,
  onContactChange,
  showGstin,
  onShowGstinChange,
  agreeTerms,
  onAgreeTermsChange,
  errors,
  onSubmit,
  submitLabel,
  isLoading = false,
  disabled = false,
}: BookingSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6 sticky top-24">
      <h2 className="font-serif text-lg font-medium mb-4">Booking Summary</h2>

      {/* Pricing Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            {pricing.passengersCount} Passenger(s) × ₹{pricing.pricePerPerson.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm border-t pt-2">
          <span className="text-muted-foreground">Subtotal:</span>
          <span>₹{pricing.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">GST (5%):</span>
          <span>₹{pricing.gst.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Grand Total</span>
          <span className="text-primary">₹{pricing.grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Contact Details Form */}
      <div className="border-t pt-4 mt-4">
        <h3 className="font-medium mb-4">Contact Details</h3>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label className="text-sm">NAME *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={contactInfo.name}
                onChange={(e) => onContactChange({ name: e.target.value })}
                placeholder="Full Name"
                disabled={disabled}
                className={cn("pl-10", errors.contactName && "border-destructive")}
              />
            </div>
            {errors.contactName && (
              <span className="text-destructive text-xs">{errors.contactName}</span>
            )}
          </div>

          {/* Mobile */}
          <div>
            <Label className="text-sm">MOBILE NO *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={contactInfo.mobile}
                onChange={(e) => onContactChange({ mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                placeholder="10-digit Mobile"
                disabled={disabled}
                className={cn("pl-10", errors.contactMobile && "border-destructive")}
              />
            </div>
            {errors.contactMobile && (
              <span className="text-destructive text-xs">{errors.contactMobile}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm">EMAIL ID *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) => onContactChange({ email: e.target.value })}
                placeholder="Email Address"
                disabled={disabled}
                className={cn("pl-10", errors.contactEmail && "border-destructive")}
              />
            </div>
            {errors.contactEmail && (
              <span className="text-destructive text-xs">{errors.contactEmail}</span>
            )}
          </div>

          {/* State */}
          {/* <div>
            <Label className="text-sm">STATE *</Label>
            <Select
              value={contactInfo.state}
              onValueChange={(v) => onContactChange({ state: v })}
              disabled={disabled}
            >
              <SelectTrigger className={cn(errors.contactState && "border-destructive")}>
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.contactState && (
              <span className="text-destructive text-xs">{errors.contactState}</span>
            )}
          </div> */}

          {/* GSTIN Toggle */}
          {/* <div className="flex items-center gap-2">
            <Checkbox
              checked={showGstin}
              onCheckedChange={(checked) => onShowGstinChange(!!checked)}
              disabled={disabled}
            />
            <Label className="text-sm cursor-pointer">ADD GSTIN (optional)</Label>
          </div>

          {showGstin && (
            <Input
              value={contactInfo.gstin || ''}
              onChange={(e) => onContactChange({ gstin: e.target.value.toUpperCase() })}
              placeholder="Enter GSTIN"
              disabled={disabled}
              maxLength={15}
            />
          )} */}

          {/* Terms Agreement */}
          <div className="flex items-start gap-2">
            <Checkbox
              checked={agreeTerms}
              onCheckedChange={(checked) => onAgreeTermsChange(!!checked)}
              disabled={disabled}
              className="mt-0.5"
            />
            <Label className="text-sm cursor-pointer">
              I agree to the{' '}
              <a href="#" className="text-primary underline hover:no-underline">
                Terms & Conditions
              </a>
            </Label>
          </div>
          {errors.terms && (
            <span className="text-destructive text-xs">{errors.terms}</span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={onSubmit}
        disabled={disabled || isLoading}
        className="w-full mt-6 bg-accent hover:bg-accent/90 text-white py-3"
      >
        {isLoading ? 'Processing...' : submitLabel}
      </Button>
    </div>
  );
}
