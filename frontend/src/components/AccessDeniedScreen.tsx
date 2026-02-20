import { Link } from '@tanstack/react-router';
import { ShieldX } from 'lucide-react';
import { Button } from './ui/button';

export default function AccessDeniedScreen() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <ShieldX size={32} className="text-destructive" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-3">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. Only administrators can submit new tools.
        </p>
        <Link to="/">
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
