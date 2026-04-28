import { Sparkles } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "../data/suggestedQueries.js";
import { BABY_PROFILE } from "../data/babyProfile.js";

export default function WelcomeScreen({ onPick }) {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-32">
      <div className="fade-up text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-900/40 bg-rose-950/30 px-3 py-1.5 text-xs text-rose-200/70">
          <Sparkles className="h-3 w-3" />
          <span className="font-mono">3:14 AM · {BABY_PROFILE.location.split(",")[0]}</span>
        </div>
        <h2 className="font-serif text-3xl leading-tight text-rose-50 sm:text-4xl">
          {BABY_PROFILE.parent_name}, what's going on
          <br />
          <span className="italic text-rose-200/80">
            with {BABY_PROFILE.baby_name} tonight?
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-md font-serif text-base leading-relaxed text-rose-100/60">
          Tell me what you're seeing. I'll help you figure out if it's normal,
          if there's something to try, or if it's time to call someone.
        </p>
      </div>

      <div
        className="fade-up mt-10 grid w-full max-w-xl gap-2.5"
        style={{ animationDelay: "0.15s" }}
      >
        {SUGGESTED_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => onPick(q.text)}
            className="group flex items-center justify-between gap-4 rounded-xl border border-rose-900/30 bg-rose-950/20 px-4 py-3.5 text-left transition hover:border-rose-700/50 hover:bg-rose-950/40"
          >
            <span className="font-serif text-[15px] italic text-rose-50/90">
              "{q.text}"
            </span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-rose-300/60">
              {q.label}
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
