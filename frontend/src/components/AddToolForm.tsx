import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X } from 'lucide-react';
import type { Tool } from '../types';
import { Pricing } from '../types';

interface AddToolFormProps {
  onSubmit: (tool: Omit<Tool, 'id'>) => void;
  isPending: boolean;
}

export default function AddToolForm({ onSubmit, isPending }: AddToolFormProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [rating, setRating] = useState('5');
  const [pricing, setPricing] = useState<Pricing>(Pricing.Free);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [bestFor, setBestFor] = useState<string[]>([]);
  const [bestForInput, setBestForInput] = useState('');
  const [pros, setPros] = useState<string[]>([]);
  const [proInput, setProInput] = useState('');
  const [cons, setCons] = useState<string[]>([]);
  const [conInput, setConInput] = useState('');

  const addItem = (value: string, setter: (items: string[]) => void, items: string[]) => {
    if (value.trim() && !items.includes(value.trim())) {
      setter([...items, value.trim()]);
    }
  };

  const removeItem = (index: number, setter: (items: string[]) => void, items: string[]) => {
    setter(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ratingNum = parseInt(rating);
    const rankingScore = ratingNum * 2;

    onSubmit({
      name,
      slug,
      description,
      website,
      rating: ratingNum,
      pricing,
      categories,
      tags,
      bestFor,
      pros,
      cons,
      rankingScore,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Tool Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="tool-name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="website">Website URL *</Label>
          <Input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5) *</Label>
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((r) => (
                <SelectItem key={r} value={r.toString()}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricing">Pricing *</Label>
        <Select value={pricing} onValueChange={(v) => setPricing(v as Pricing)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Pricing.Free}>Free</SelectItem>
            <SelectItem value={Pricing.Freemium}>Freemium</SelectItem>
            <SelectItem value={Pricing.Paid}>Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <Label>Categories</Label>
        <div className="flex gap-2">
          <Input
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem(categoryInput, setCategories, categories);
                setCategoryInput('');
              }
            }}
            placeholder="Add category and press Enter"
          />
          <Button
            type="button"
            onClick={() => {
              addItem(categoryInput, setCategories, categories);
              setCategoryInput('');
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((cat, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {cat}
              <button type="button" onClick={() => removeItem(i, setCategories, categories)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem(tagInput, setTags, tags);
                setTagInput('');
              }
            }}
            placeholder="Add tag and press Enter"
          />
          <Button
            type="button"
            onClick={() => {
              addItem(tagInput, setTags, tags);
              setTagInput('');
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {tag}
              <button type="button" onClick={() => removeItem(i, setTags, tags)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Best For */}
      <div className="space-y-2">
        <Label>Best For</Label>
        <div className="flex gap-2">
          <Input
            value={bestForInput}
            onChange={(e) => setBestForInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem(bestForInput, setBestFor, bestFor);
                setBestForInput('');
              }
            }}
            placeholder="Add audience and press Enter"
          />
          <Button
            type="button"
            onClick={() => {
              addItem(bestForInput, setBestFor, bestFor);
              setBestForInput('');
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {bestFor.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {item}
              <button type="button" onClick={() => removeItem(i, setBestFor, bestFor)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Pros */}
      <div className="space-y-2">
        <Label>Pros</Label>
        <div className="flex gap-2">
          <Input
            value={proInput}
            onChange={(e) => setProInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem(proInput, setPros, pros);
                setProInput('');
              }
            }}
            placeholder="Add pro and press Enter"
          />
          <Button
            type="button"
            onClick={() => {
              addItem(proInput, setPros, pros);
              setProInput('');
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {pros.map((pro, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {pro}
              <button type="button" onClick={() => removeItem(i, setPros, pros)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Cons */}
      <div className="space-y-2">
        <Label>Cons</Label>
        <div className="flex gap-2">
          <Input
            value={conInput}
            onChange={(e) => setConInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem(conInput, setCons, cons);
                setConInput('');
              }
            }}
            placeholder="Add con and press Enter"
          />
          <Button
            type="button"
            onClick={() => {
              addItem(conInput, setCons, cons);
              setConInput('');
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {cons.map((con, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {con}
              <button type="button" onClick={() => removeItem(i, setCons, cons)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Adding Tool...' : 'Add Tool'}
      </Button>
    </form>
  );
}
