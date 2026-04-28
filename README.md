# Mumzworld Care · 3 AM Triage Assistant

> An AI prototype for the Mumzworld AI-Native Intern take-home (Track B).

A symptom-aware product recommender for sleep-deprived mothers. Takes a freeform query — in English, Arabic, or Arabizi — and responds with grounded reassurance, 0–2 product recommendations from a mock catalog, cited sources, and a hard refusal protocol on red-flag medical symptoms.

Built for **Layla**, a 31-year-old Dubai mom of a 7-week-old with suspected colic, shopping at 3 AM with one hand while holding a crying baby.

---

## The 60-second pitch

Mumzworld already has the catalog, the blog, and the trust. What it doesn't have is a way to answer the question every distressed mom is *actually* asking — *"is this normal, and is there something I can buy that will help?"* — without sending her to ChatGPT or Reddit. The triage assistant lives at that exact moment.

The killer feature isn't the product recommendations. It's the **refusal**. When a query describes red-flag symptoms (no wet diaper for 12 hours, blood in stool, fever in a newborn), the assistant recommends *zero products* and routes to a pediatrician. That refusal is what makes the recommendations trustworthy on every other query.

---

## Setup (under 5 minutes)

### 1. Get a free Groq API key

Sign up at **[console.groq.com/keys](https://console.groq.com/keys)** — it's free, instant, no credit card.

### 2. Install and run

```bash
# Clone and enter
git clone <your-repo-url> mumzworld-care
cd mumzworld-care

# Install dependencies
npm install

# Add your API key
cp .env.example .env
# Open .env and paste your key after VITE_GROQ_API_KEY=

# Start the dev server
npm run dev
```

Open **http://localhost:5173** — the app launches with the welcome screen and 5 demo queries.

### 3. Try the 5 demo queries (the Loom walkthrough)

Click any of the suggested queries on the welcome screen, or type your own. The five demo queries are designed to exercise different capabilities:

| # | Query | What it demonstrates |
|---|---|---|
| 1 | *"Yousef keeps arching his back during feeds. Is this normal?"* | Reassurance + 1 product + cited source |
| 2 | *"Yusi 3am yebki kteer min el maghas, sho a3mel?"* | **Arabizi** detection + bilingual response |
| 3 | *"Best swaddle for Dubai summer?"* | Hot-climate-aware recommendation |
| 4 | *"He hasn't had a wet diaper in 14 hours, should I worry?"* | **Red-flag refusal** — zero products, pediatrician escalation |
| 5 | *"Difference between Dr. Brown's and MAM bottles for reflux?"* | Comparative reasoning across catalog |

---

## Architecture

```
┌─────────────────┐    ┌──────────────────────┐    ┌─────────────────┐
│  Mom types      │───▶│  Groq Llama 3.3 70B  │───▶│  Structured     │
│  freeform query │    │  + system prompt     │    │  JSON response  │
└─────────────────┘    │  + JSON mode         │    └─────────────────┘
                       │  + grounded corpus   │             │
                       └──────────────────────┘             ▼
                                                  ┌─────────────────┐
                                                  │  Render:        │
                                                  │  · response     │
                                                  │  · products     │
                                                  │  · sources      │
                                                  │  · escalation   │
                                                  └─────────────────┘
```

**One model call per turn.** The system prompt embeds:
- The full mock product catalog (15 SKUs, modelled on real Mumzworld baby items)
- The full knowledge base (5 grounded articles on colic, reflux, sleep, burping, red flags)
- The preset baby profile (Layla + Yousef, 7 weeks, Dubai)
- The red-flag protocol (non-negotiable refusal triggers)
- The response schema (intent / language / is_red_flag / response_text / products / sources / follow_ups)

The model is asked to output **only JSON** — Groq's `response_format: { type: "json_object" }` enforces this at the API level, with a fallback unwrap for code-fenced output just in case.

### Why this architecture

**Why not RAG over a vector DB?** With only 5 articles and 15 products, embedding the full corpus into the system prompt is cheaper, faster, and more accurate than retrieval. RAG matters when your corpus is too big to fit in context. At ~3K tokens, ours isn't.

**Why JSON mode?** Two reasons. (1) It collapses three calls (intent classify → retrieve → generate) into one, halving latency. (2) It forces the model to commit to a structured response that the UI can render predictably — products as cards, sources as citations, red flags as a banner.

**Why preset baby profile?** Because we have 5 hours, not 50. The persona work (see `DISCOVERY.md`) showed that Layla is one specific person at one specific 3 AM moment. Building an interactive profile setup would have stolen time from the actual AI logic. *What I'd build next: a real "Baby Profile" entity tied to the Mumzworld account.*

---

## Folder structure

```
mumzworld-care/
├── README.md                  ← You are here
├── .env.example               ← Copy → .env and add Groq key
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html                 ← Loads Newsreader + Geist fonts
└── src/
    ├── main.jsx               ← React entry
    ├── App.jsx                ← Top-level state, layout, input bar
    ├── index.css              ← Tailwind + ambient animations
    ├── data/
    │   ├── products.js        ← 15-product mock catalog
    │   ├── knowledgeBase.js   ← 5 grounded articles (colic, reflux, sleep…)
    │   ├── babyProfile.js     ← Layla + Yousef preset
    │   └── suggestedQueries.js ← 5 demo queries
    ├── lib/
    │   ├── groqClient.js      ← Groq API call + JSON parsing
    │   └── systemPrompt.js    ← The system prompt (the heart of the prototype)
    └── components/
        ├── ChatView.jsx       ← Scrolling conversation list
        ├── WelcomeScreen.jsx  ← Empty state with demo query chips
        ├── AssistantMessage.jsx ← Main response component
        ├── UserMessage.jsx
        ├── ProductCard.jsx
        ├── RedFlagBanner.jsx  ← The refusal UI
        ├── SourceCitation.jsx ← Inline knowledge-base citations
        └── ThinkingIndicator.jsx
```

---

## Design choices

**Aesthetic: dimly-lit bedside, after midnight.** Deep midnight palette, warm rose accent like a low lamp, literary serif (Newsreader) paired with a clean grotesque (Geist). Soft glows instead of harsh borders. Brightness-friendly for actual 3 AM use. Arabic and Arabizi responses render right-aligned.

**Tone rules in the system prompt:**
- No emojis unless the user uses them first
- No exclamation marks
- No "amazing" or "absolutely" — this is 3 AM, not an Instagram caption
- Max 120 words per response — she is exhausted, brevity is care
- Max 2 products — more is decision fatigue
- Never diagnose. Always: *"this is often associated with…"*, never *"your baby has…"*

---

## What the system prompt does (and why)

The system prompt is the single most important file in this repo. It's where 80% of the prototype's behavior lives. Open `src/lib/systemPrompt.js` to read it in full. Highlights:

- **Language detection + response register matching.** If the user writes Arabizi, the model writes Arabizi back — not formal Arabic. This is critical for Layla's actual behavior (she code-switches in WhatsApp).
- **Red-flag protocol with hard rules.** `is_red_flag=true` → `products` array MUST be empty. The protocol explicitly enumerates AAP-grade red flags so the model isn't guessing.
- **Citation discipline.** Every claim drawn from the knowledge base must appear in the `sources` array. If it can't be cited, it shouldn't be claimed.
- **Catalog grounding.** The model can only recommend from the 15 products in the catalog. Hallucinated product IDs are silently dropped at render time.
- **Persona-aware framing.** The prompt knows Yousef is 7 weeks old, hybrid-fed, in Dubai. Recommendations factor this in (e.g., 0.5 TOG swaddles for Dubai climate, not the UK 2.5 TOG sleep sack).

---

## Limitations & what I'd build next

This is a 5-hour prototype. It is *not* a shipping product. Honest gaps:

1. **No real RAG.** The "knowledge base" is 5 hand-written articles in a JS file. In production you'd RAG over `blog.mumzworld.com` and the actual catalog (250K+ SKUs).
2. **Static baby profile.** The next thing I'd build is an interactive baby-profile setup that personalizes the prompt per account.
3. **No formal evals.** This is Track B (product), not Track A (engineering), so heavy eval rigor isn't graded — but I'd still build a 30-case test set covering the red-flag taxonomy, Arabizi/Arabic queries, out-of-scope queries, and ambiguous symptoms.
4. **Single-turn focus.** Multi-turn works but isn't optimized — I'd add explicit conversation memory of "what we've already tried" to avoid recommending the same product twice.
5. **No real Mumzworld integration.** Product cards link to nothing. In production: deep-link into the Mumzworld PDP, prefilled cart, integrated with Mumz Rewards.

---

## Tooling note

- **Groq** for inference (Llama 3.3 70B Versatile) — free tier, 30x faster than equivalents, JSON mode supported.
- **Vite + React + Tailwind** for the UI — single-file artifact-style simplicity but properly modularized.
- **Lucide React** for icons.
- **Claude (Sonnet 4.7)** as the pair-coding partner during the build. See `SHOW_YOUR_WORK.md` for the timeline.

No other AI tooling, no scraping, no paid APIs.
