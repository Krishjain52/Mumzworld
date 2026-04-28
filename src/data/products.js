// 15-product mock catalog modelled on real Mumzworld baby SKUs.
// In production this would be a vector index over the actual catalog.
export const PRODUCTS = [
  {
    id: "infacol",
    name: "Infacol Colic Relief Drops 50ml",
    brand: "Infacol",
    price_aed: 32,
    icon: "💧",
    age: "0–12m",
    solves: ["colic", "gas", "wind", "maghas"],
    description:
      "Sugar-free drops given before each feed. Joins small wind bubbles into larger ones that are easier to bring up.",
    review_signal:
      "Most-mentioned colic remedy in reviews from moms with babies under 12 weeks.",
    eta: "Tomorrow before 11am",
  },
  {
    id: "vitane",
    name: "Vitane Colic EZ Oral Drops 30ml",
    brand: "Vitane",
    price_aed: 25,
    icon: "💧",
    age: "0–12m",
    solves: ["colic", "gas"],
    description:
      "Simethicone-based drops, fennel-flavoured. Alternative to Infacol if your baby doesn't take it.",
    review_signal: "Cheaper alternative to Infacol with similar active ingredient.",
    eta: "Tomorrow before 11am",
  },
  {
    id: "biogaia",
    name: "BioGaia Protectis Baby Probiotic Drops 5ml",
    brand: "BioGaia",
    price_aed: 110,
    icon: "🧪",
    age: "0–12m",
    solves: ["colic", "gut_health", "fussiness"],
    description:
      "Lactobacillus reuteri probiotic. Five drops daily. Multiple studies show reduction in colic crying time after 21–28 days of use.",
    review_signal:
      "Recommended by several Dubai pediatricians for breastfed colicky babies.",
    eta: "Tomorrow before 11am",
  },
  {
    id: "drbrowns",
    name: "Dr. Brown's Anti-Colic Options+ Bottle 8oz (2-pack)",
    brand: "Dr. Brown's",
    price_aed: 89,
    icon: "🍼",
    age: "0–6m",
    solves: ["colic", "reflux", "gas", "wind"],
    description:
      "Internal vent system removes air from the milk so baby swallows less wind. Removable vent for easier cleaning once colic resolves.",
    review_signal:
      "Most-recommended bottle in Mumzworld reviews from moms managing reflux. Trade-off: 6 parts to wash.",
    eta: "Same-day if ordered before 2pm",
  },
  {
    id: "comotomo",
    name: "Comotomo Anti-Colic Baby Bottle 250ml (2-pack)",
    brand: "Comotomo",
    price_aed: 145,
    icon: "🍼",
    age: "0–6m",
    solves: ["colic", "bottle_refusal", "breast_to_bottle"],
    description:
      "Soft silicone body that mimics breast feel — useful for breastfed babies who refuse traditional bottles. Dual anti-colic vents.",
    review_signal:
      "Top choice in reviews from moms transitioning from breast to bottle.",
    eta: "Same-day if ordered before 2pm",
  },
  {
    id: "mam",
    name: "MAM Easy Start Anti-Colic Bottle 260ml",
    brand: "MAM",
    price_aed: 65,
    icon: "🍼",
    age: "0–6m",
    solves: ["colic", "gas"],
    description:
      "Vented base reduces colic. Self-sterilising in microwave in 3 minutes. Fewer parts than Dr. Brown's.",
    review_signal:
      "Easier to clean than Dr. Brown's, slightly less effective for severe reflux per review patterns.",
    eta: "Same-day if ordered before 2pm",
  },
  {
    id: "aden_muslin",
    name: "Aden + Anais Muslin Swaddle 4-pack (0.5 TOG)",
    brand: "Aden + Anais",
    price_aed: 195,
    icon: "🧣",
    age: "0–4m",
    solves: ["sleep", "swaddle", "hot_climate"],
    description:
      "100% cotton muslin. Breathable, ideal for Dubai summer with AC at 22–24°C. Large 120cm size for newborn-to-4-months.",
    review_signal: "Recommended by Malaak sleep consultants for GCC climate.",
    eta: "Same-day if ordered before 2pm",
  },
  {
    id: "halo_sleepsack",
    name: "Halo SleepSack Wearable Blanket 1.0 TOG",
    brand: "Halo",
    price_aed: 130,
    icon: "🛏️",
    age: "0–6m",
    solves: ["sleep", "transition_from_swaddle"],
    description:
      "Wearable blanket for when baby outgrows swaddling (~3–4 months). 1.0 TOG works for AC at 20–22°C.",
    review_signal:
      "Most-bought sleep sack on Mumzworld for the swaddle-transition stage.",
    eta: "Same-day if ordered before 2pm",
  },
  {
    id: "babocush",
    name: "Babocush Vibrating Comfort Cushion",
    brand: "Babocush",
    price_aed: 695,
    icon: "🛋️",
    age: "0–6m",
    solves: ["colic", "reflux", "fussiness"],
    description:
      "Vibrating cushion that mimics being held. Heartbeat sound + gentle vibration. Inclined position helps reflux.",
    review_signal:
      "Polarising — works miracles for some, ignored by others. Best as last resort, not first try.",
    eta: "1–2 days",
  },
  {
    id: "yogasleep",
    name: "Yogasleep Hushh Portable White Noise Machine",
    brand: "Yogasleep",
    price_aed: 175,
    icon: "🔊",
    age: "0–24m+",
    solves: ["sleep", "soothing", "travel"],
    description:
      "Three sound options, rechargeable, clip-on. Works for car, stroller, hotel. Genuinely helps newborns sleep.",
    review_signal:
      "Most-recommended white noise machine in newborn-sleep reviews.",
    eta: "Same-day if ordered before 2pm",
  },
  {
    id: "frida_windi",
    name: "Frida Baby Windi Gas + Colic Reliever (10pk)",
    brand: "Frida Baby",
    price_aed: 60,
    icon: "🎈",
    age: "0–6m",
    solves: ["gas", "colic", "constipation"],
    description:
      "Single-use catheter to release trapped gas. Sounds intense — works fast when baby is clearly gas-stuck.",
    review_signal:
      "Polarising in reviews. Many moms wish they'd known about it sooner; some find it unnecessary.",
    eta: "Tomorrow before 11am",
  },
  {
    id: "aptamil_comfort",
    name: "Aptamil Comfort 1 Formula 800g",
    brand: "Aptamil",
    price_aed: 145,
    icon: "🥛",
    age: "0–6m",
    solves: ["colic", "constipation", "formula_intolerance"],
    description:
      "Partially hydrolysed formula for colic & constipation. Discuss with pediatrician before switching formulas — not a DIY decision.",
    review_signal:
      "Frequently mentioned in reflux/colic reviews. Always consult a doctor before changing formula.",
    eta: "Same-day if ordered before 2pm",
  },
  {
    id: "ergobaby",
    name: "Ergobaby Embrace Newborn Carrier",
    brand: "Ergobaby",
    price_aed: 545,
    icon: "🤱",
    age: "0–12m",
    solves: ["colic", "fussiness", "contact_naps"],
    description:
      "Soft-structured carrier for newborns. Contact carrying is one of the most evidence-backed colic remedies (the 'fourth trimester').",
    review_signal:
      "Highest-rated newborn carrier on Mumzworld. Hands free + reduced crying for many colicky babies.",
    eta: "Same-day if ordered before 2pm",
  },
  {
    id: "nuk_teats",
    name: "NUK Anti-Colic Slow Flow Teats (2-pack)",
    brand: "NUK",
    price_aed: 35,
    icon: "🍼",
    age: "0–6m",
    solves: ["colic", "fast_letdown"],
    description:
      "Slow-flow silicone teats with anti-colic valve. Useful if your baby is gulping too fast on a faster teat.",
    review_signal:
      "Often the missing piece when bottles are right but the teat flow is wrong.",
    eta: "Tomorrow before 11am",
  },
  {
    id: "mustela_rash",
    name: "Mustela Diaper Rash Cream 1-2-3 100ml",
    brand: "Mustela",
    price_aed: 75,
    icon: "🧴",
    age: "0–24m+",
    solves: ["diaper_rash", "skin"],
    description:
      "Three active ingredients for prevention, treatment, and barrier. Pediatrician-recommended in GCC.",
    review_signal: "Top diaper-rash cream on Mumzworld by review volume.",
    eta: "Tomorrow before 11am",
  },
];
