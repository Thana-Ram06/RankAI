import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`flex-1 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
