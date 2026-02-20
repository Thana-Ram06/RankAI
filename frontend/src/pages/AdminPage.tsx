import { useState } from 'react';
import AddToolForm from '../components/AddToolForm';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to submit a new tool.
          </p>
          <Button onClick={() => setIsAuthenticated(true)}>
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (tool: any) => {
    toast.success('Tool added successfully!');
    console.log('Tool submitted:', tool);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Submit a New Tool
        </h1>
        <p className="text-muted-foreground mb-8">
          Add a new AI tool to the directory
        </p>

        <AddToolForm onSubmit={handleSubmit} isPending={false} />
      </div>
    </div>
  );
}
