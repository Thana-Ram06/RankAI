import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useAddTool } from '../hooks/useQueries';
import AddToolForm from '../components/AddToolForm';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner';

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { mutate: addTool, isPending } = useAddTool();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to submit a new tool.
          </p>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  const handleSubmit = (tool: any) => {
    addTool(tool, {
      onSuccess: () => {
        toast.success('Tool added successfully!');
      },
      onError: (error) => {
        toast.error(`Failed to add tool: ${error.message}`);
      },
    });
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

        <AddToolForm onSubmit={handleSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
