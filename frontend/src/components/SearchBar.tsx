import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Input } from './ui/input';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ 
  placeholder = 'What do you want to do?', 
  onSearch,
  defaultValue = '',
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate({ to: '/search', search: { q: query.trim() } });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-4 py-6 text-base rounded-2xl border-border bg-card shadow-sm focus:shadow-md transition-shadow"
        />
      </div>
    </form>
  );
}
