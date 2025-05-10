
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";

interface ErrorAlertProps {
  error: string;
  onClose?: () => void;
}

export function ErrorAlert({ error, onClose }: ErrorAlertProps) {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      {onClose && (
        <X 
          className="h-4 w-4 cursor-pointer absolute top-2 right-2" 
          onClick={onClose}
        />
      )}
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
