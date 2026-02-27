"use client";

import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { PricingTier } from '@/types/tool';

export default function AdminPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState('');
  const [pricing, setPricing] = useState<PricingTier>('Freemium');
  const [website, setWebsite] = useState('');
  const [tags, setTags] = useState('');
  const [bestFor, setBestFor] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [rating, setRating] = useState(4.5);
  const [submitting, setSubmitting] = useState(false);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUserEmail(result.user.email ?? null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const base = {
        name,
        slug,
        description,
        categories: categories
          .split(',')
          .map((c) => c.trim().toLowerCase())
          .filter(Boolean),
        pricing,
        website,
        rating,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        bestFor: bestFor
          .split('\n')
          .map((b) => b.trim())
          .filter(Boolean),
        pros: pros
          .split('\n')
          .map((p) => p.trim())
          .filter(Boolean),
        cons: cons
          .split('\n')
          .map((c) => c.trim())
          .filter(Boolean),
        rankingScore: rating * 2,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'tools'), base);
      setName('');
      setSlug('');
      setDescription('');
      setCategories('');
      setWebsite('');
      setTags('');
      setBestFor('');
      setPros('');
      setCons('');
    } finally {
      setSubmitting(false);
    }
  };

  if (!userEmail) {
    return (
      <div className="py-16 flex justify-center">
        <div className="surface-card max-w-md w-full p-6 space-y-4 text-center">
          <h1 className="font-serif text-2xl tracking-tight">Admin access</h1>
          <p className="muted text-sm">
            Sign in with Google to add tools to the RankAI directory.
          </p>
          <button
            type="button"
            onClick={signIn}
            className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors w-full"
          >
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-14 md:py-16 flex justify-center">
      <div className="surface-card max-w-2xl w-full p-6 md:p-7 space-y-6">
        <header className="space-y-1">
          <p className="muted text-xs">Signed in as {userEmail}</p>
          <h1 className="font-serif text-2xl tracking-tight">
            Add tool
          </h1>
        </header>

        <form onSubmit={onSubmit} className="space-y-4 text-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
              rows={3}
              required
            />
          </div>

          <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Categories</label>
              <input
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                placeholder="writing, research, productivity"
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Pricing</label>
              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value as PricingTier)}
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
              >
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Website</label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://"
              className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Best for (one per line)</label>
            <textarea
              value={bestFor}
              onChange={(e) => setBestFor(e.target.value)}
              rows={2}
              className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Pros (one per line)</label>
              <textarea
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Cons (one per line)</label>
              <textarea
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Rating</label>
            <input
              type="number"
              step="0.1"
              min={0}
              max={5}
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              className="w-32 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none focus:ring-1 focus:ring-neutral-400/60"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors w-full md:w-auto disabled:opacity-60"
            >
              {submitting ? 'Saving…' : 'Save tool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

