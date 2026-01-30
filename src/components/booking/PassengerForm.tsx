// ============================================
// PASSENGER FORM COMPONENT - Simplified
// Simple form for passenger details (no seats)
// ============================================

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { PassengerInfo, Gender } from '@/types/booking';

interface PassengerFormProps {
  passengers: PassengerInfo[];
  onUpdatePassenger: (index: number, field: keyof PassengerInfo, value: any) => void;
  errors: Record<string, string>;
  disabled?: boolean;
}

export function PassengerForm({
  passengers,
  onUpdatePassenger,
  errors,
  disabled = false,
}: PassengerFormProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="font-serif text-lg font-medium mb-4">Passenger Details</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Please enter details for all {passengers.length} passenger(s)
      </p>
      
      <div className="space-y-6">
        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="p-4 border rounded-lg bg-secondary/20">
            <div className="font-medium text-sm text-primary mb-4">
              Passenger {index + 1}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name */}
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Full Name *
                </label>
                <Input
                  value={passenger.name}
                  onChange={(e) => onUpdatePassenger(index, 'name', e.target.value)}
                  placeholder="Enter full name"
                  disabled={disabled}
                  className={cn(errors[`name_${index}`] && "border-destructive")}
                />
                {errors[`name_${index}`] && (
                  <span className="text-destructive text-xs mt-1 block">
                    {errors[`name_${index}`]}
                  </span>
                )}
              </div>
              
              {/* Gender */}
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Gender *
                </label>
                <Select
                  value={passenger.gender}
                  onValueChange={(v) => onUpdatePassenger(index, 'gender', v as Gender)}
                  disabled={disabled}
                >
                  <SelectTrigger
                    className={cn(errors[`gender_${index}`] && "border-destructive")}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors[`gender_${index}`] && (
                  <span className="text-destructive text-xs mt-1 block">
                    {errors[`gender_${index}`]}
                  </span>
                )}
              </div>
              
              {/* Age */}
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Age *
                </label>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={passenger.age}
                  onChange={(e) => onUpdatePassenger(index, 'age', parseInt(e.target.value) || '')}
                  placeholder="Age"
                  disabled={disabled}
                  className={cn(errors[`age_${index}`] && "border-destructive")}
                />
                {errors[`age_${index}`] && (
                  <span className="text-destructive text-xs mt-1 block">
                    {errors[`age_${index}`]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {passengers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No passengers to add. Please select number of passengers.
        </div>
      )}
    </div>
  );
}
