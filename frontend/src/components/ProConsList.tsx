import { Check, X } from 'lucide-react';

interface ProsConsListProps {
  pros: string[];
  cons: string[];
}

export default function ProConsList({ pros, cons }: ProsConsListProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Pros</h3>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Cons</h3>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2">
              <X size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
