import { BookOpen } from "lucide-react";
import { KNOWLEDGE_BASE } from "../data/knowledgeBase.js";

export default function SourceCitation({ source }) {
  const article = KNOWLEDGE_BASE.find((k) => k.id === source.id);
  if (!article) return null;
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-rose-950/30 px-3 py-2">
      <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-300/70" />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-rose-100/90">
          {article.title}
        </div>
        <div className="mt-0.5 truncate text-xs italic text-rose-200/50">
          "{source.snippet}"
        </div>
      </div>
    </div>
  );
}
