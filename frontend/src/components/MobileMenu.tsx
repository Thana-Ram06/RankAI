import { Link } from '@tanstack/react-router';
import ThemeToggle from './ThemeToggle';
import LoginButton from './LoginButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />
      <div className="fixed right-0 top-16 bottom-0 w-64 bg-card border-l border-border z-50 md:hidden animate-slide-in-right">
        <div className="flex flex-col gap-4 p-6">
          <Link 
            to="/categories" 
            onClick={onClose}
            className="text-base text-foreground hover:text-primary transition-colors py-2"
          >
            Categories
          </Link>
          <Link 
            to="/admin" 
            onClick={onClose}
            className="text-base text-foreground hover:text-primary transition-colors py-2"
          >
            Submit Tool
          </Link>
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <ThemeToggle />
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  );
}
