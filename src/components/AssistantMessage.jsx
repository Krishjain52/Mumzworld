import { Moon } from "lucide-react";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";
import RedFlagBanner from "./RedFlagBanner.jsx";
import SourceCitation from "./SourceCitation.jsx";

export default function AssistantMessage({ payload }) {
  if (!payload) return null;

  const isRtl = payload.language === "ar";
  const isArabicLike = payload.language === "ar" || payload.language === "arabizi";

  // Resolve product IDs against catalog. If the model hallucinates an ID
  // we silently drop it rather than render something invalid.
  const products = (payload.products || [])
    .map((p) => ({
      product: PRODUCTS.find((x) => x.id === p.id),
      reason: p.reason,
    }))
    .filter((x) => x.product);

  return (
    <div className="group">
      <div className="flex items-center gap-2 pb-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-rose-400/30 to-amber-400/20">
          <Moon className="h-3 w-3 text-rose-200" />
        </div>
        <span className="font-serif text-xs tracking-wide text-rose-200/60">
          mumzworld care
        </span>
        {payload.is_red_flag && (
          <span className="rounded-full bg-orange-900/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-orange-200">
            Escalation
          </span>
        )}
      </div>

      <div
        className={`whitespace-pre-wrap font-serif text-[17px] leading-relaxed text-rose-50/95 ${
          isArabicLike ? "text-right" : ""
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {payload.response_text}
      </div>

      {payload.is_red_flag && <RedFlagBanner />}

      {!payload.is_red_flag &&
        products.map((p, i) => (
          <ProductCard
            key={p.product.id + i}
            product={p.product}
            reason={p.reason}
          />
        ))}

      {payload.sources && payload.sources.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {payload.sources.map((s, i) => (
            <SourceCitation key={s.id + i} source={s} />
          ))}
        </div>
      )}
    </div>
  );
}
