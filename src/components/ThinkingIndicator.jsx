import { Loader2 } from "lucide-react";

export default function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-3 text-rose-200/50">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="font-serif text-sm italic tracking-wide">
        thinking with you...
      </span>
    </div>
  );
}
