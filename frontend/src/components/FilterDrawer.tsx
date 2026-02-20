import { X } from 'lucide-react';
import SortingControls from './SortingControls';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  pricingFilters: string[];
  onPricingFilterChange: (pricing: string, checked: boolean) => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  sortBy,
  onSortChange,
  pricingFilters,
  onPricingFilterChange,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl z-50 animate-slide-up max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>
          <SortingControls
            sortBy={sortBy}
            onSortChange={onSortChange}
            pricingFilters={pricingFilters}
            onPricingFilterChange={onPricingFilterChange}
          />
        </div>
      </div>
    </>
  );
}
