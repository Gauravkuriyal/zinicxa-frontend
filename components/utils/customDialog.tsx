import { X } from "lucide-react";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function CustomDialog({
  open,
  onOpenChange,
  children,
}: CustomDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative w-[95vw] max-w-7xl max-h-[90vh] overflow-auto rounded-lg bg-white shadow-xl dark:bg-zinc-900">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded p-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}