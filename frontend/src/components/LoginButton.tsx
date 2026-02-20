import { useState } from 'react';
import { Button } from './ui/button';

export default function LoginButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleAuth = async () => {
    setIsLoggingIn(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAuthenticated(!isAuthenticated);
    setIsLoggingIn(false);
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoggingIn}
      variant={isAuthenticated ? 'outline' : 'default'}
      size="sm"
      className="transition-colors"
    >
      {isLoggingIn ? 'Loading...' : isAuthenticated ? 'Logout' : 'Login'}
    </Button>
  );
}
