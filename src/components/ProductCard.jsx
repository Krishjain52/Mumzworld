export default function ProductCard({ product, reason }) {
  if (!product) return null;
  return (
    <div className="mt-4 rounded-2xl border border-rose-900/30 bg-gradient-to-br from-rose-950/40 to-amber-950/20 p-4 transition-all hover:border-rose-700/50">
      <div className="flex gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-rose-950/50 text-2xl">
          {product.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <h4 className="truncate font-serif text-base text-rose-50">
              {product.name}
            </h4>
            <span className="shrink-0 font-mono text-sm text-rose-200/80">
              AED {product.price_aed}
            </span>
          </div>
          <p className="mt-1.5 text-sm italic leading-relaxed text-rose-100/70">
            {reason}
          </p>
          <div className="mt-2.5 flex items-center gap-3 text-xs text-rose-200/50">
            <span>{product.brand}</span>
            <span>·</span>
            <span>{product.eta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
