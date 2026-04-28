import { buildSystemPrompt } from "./systemPrompt.js";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

/**
 * Calls Groq's chat completion API with our triage system prompt.
 *
 * Uses JSON mode (response_format: { type: "json_object" }) so we get back
 * a guaranteed-parseable JSON string. If parsing still fails we surface a
 * structured error rather than crash the UI.
 *
 * @param {string} userMessage - The mom's latest message
 * @param {Array} history - Prior conversation turns
 * @returns {Promise<Object>} Parsed response matching the schema in systemPrompt
 */
export async function callGroq(userMessage, history = []) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const model = import.meta.env.VITE_GROQ_MODEL || DEFAULT_MODEL;

  if (!apiKey || apiKey === "gsk_your_groq_key_here") {
    throw new Error(
      "Missing Groq API key. Copy .env.example to .env and add your key from https://console.groq.com/keys"
    );
  }

  // Flatten history into the chat-completion message format.
  // Assistant messages are stored as parsed JSON payloads in our app state,
  // so we re-serialize them when sending back to the model.
  const messages = [
    { role: "system", content: buildSystemPrompt() },
    ...history.map((m) => ({
      role: m.role,
      content: m.role === "user" ? m.text : JSON.stringify(m.payload),
    })),
    { role: "user", content: userMessage },
  ];

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      // JSON mode guarantees parseable output. Hugely reduces malformed-JSON
      // failures vs. relying on the model to follow "respond with JSON only".
      response_format: { type: "json_object" },
      temperature: 0.4, // Low-ish: we want consistency, not creativity
      max_tokens: 1200,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Groq API error (${response.status}): ${errorBody.slice(0, 200)}`
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Groq returned an empty response.");
  }

  // Strip any accidental code fences before parsing (Llama models occasionally
  // ignore the JSON-mode hint and wrap output in ```json ... ```).
  const cleaned = content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      `Couldn't parse the model's response as JSON. Raw output: ${cleaned.slice(0, 200)}`
    );
  }
}
