import { AlertTriangle, Phone } from "lucide-react";

export default function RedFlagBanner() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-orange-700/40 bg-gradient-to-br from-orange-950/60 to-red-950/40">
      <div className="flex items-start gap-3 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
        <div className="flex-1">
          <h4 className="font-serif text-base text-orange-50">
            Please call a doctor — not a product question
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-orange-100/80">
            We're not recommending anything to buy for this. Trust your gut.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="tel:800342"
              className="inline-flex items-center gap-1.5 rounded-full bg-orange-900/60 px-3 py-1.5 text-xs text-orange-50 transition hover:bg-orange-800/70"
            >
              <Phone className="h-3 w-3" />
              DHA · 800 342
            </a>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-900/40 px-3 py-1.5 text-xs text-orange-100/80">
              Mediclinic · NMC · Aster pediatric ER · 24/7
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
