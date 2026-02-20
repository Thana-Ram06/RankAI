import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Pricing } from '../backend';

interface SortingControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  pricingFilters: string[];
  onPricingFilterChange: (pricing: string, checked: boolean) => void;
}

export default function SortingControls({
  sortBy,
  onSortChange,
  pricingFilters,
  onPricingFilterChange,
}: SortingControlsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">Sort By</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top-rated">Top Rated</SelectItem>
            <SelectItem value="most-popular">Most Popular</SelectItem>
            <SelectItem value="free">Free First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Pricing</Label>
        <div className="space-y-3">
          {[
            { value: Pricing.free, label: 'Free' },
            { value: Pricing.freemium, label: 'Freemium' },
            { value: Pricing.paid, label: 'Paid' }
          ].map(({ value, label }) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={value}
                checked={pricingFilters.includes(value)}
                onCheckedChange={(checked) => onPricingFilterChange(value, checked as boolean)}
              />
              <Label htmlFor={value} className="text-sm cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
