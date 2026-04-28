import { useState, useRef, useEffect } from "react";
import { Moon, Heart, RefreshCw } from "lucide-react";
import { callGroq } from "./lib/groqClient.js";
import { BABY_PROFILE } from "./data/babyProfile.js";
import ChatView from "./components/ChatView.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const hasStarted = messages.length > 0;

  async function handleSend(messageText) {
    const text = (messageText || input).trim();
    if (!text || isLoading) return;

    setError(null);
    setInput("");
    const userMsg = { role: "user", text, id: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const payload = await callGroq(text, messages);
      setMessages([
        ...newMessages,
        { role: "assistant", payload, id: Date.now() + 1 },
      ]);
    } catch (e) {
      setError(e.message || "Something went wrong. Try again?");
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleReset() {
    setMessages([]);
    setError(null);
    setInput("");
  }

  return (
    <div className="font-sans relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0608] text-rose-50">
      {/* Ambient bedside-lamp glow */}
      <div
        className="lamp-glow pointer-events-none absolute left-1/2 top-0 h-[700px] w-[700px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(244,114,114,0.18), rgba(251,146,60,0.06) 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(120,53,87,0.25), transparent 70%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-2xl items-center justify-between px-6 pb-4 pt-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400/40 to-amber-400/20 ring-1 ring-rose-300/20">
            <Moon className="h-4 w-4 text-rose-100" />
          </div>
          <div>
            <h1 className="font-serif text-lg leading-none text-rose-50">
              Mumzworld <span className="italic text-rose-200/80">Care</span>
            </h1>
            <p className="mt-1 text-xs text-rose-200/50">
              for the 3am questions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-rose-900/40 bg-rose-950/30 px-3 py-1.5 text-xs text-rose-100/80 sm:flex">
            <Heart className="h-3 w-3 text-rose-300" />
            <span className="font-mono">
              {BABY_PROFILE.baby_name} · {BABY_PROFILE.age_weeks} weeks
            </span>
          </div>
          {hasStarted && (
            <button
              onClick={handleReset}
              className="rounded-full p-2 text-rose-200/50 transition hover:bg-rose-950/40 hover:text-rose-100"
              title="Start over"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      {!hasStarted ? (
        <WelcomeScreen onPick={handleSend} />
      ) : (
        <ChatView
          messages={messages}
          isLoading={isLoading}
          error={error}
        />
      )}

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#0a0608] via-[#0a0608] to-transparent pb-6 pt-12">
        <div className="mx-auto w-full max-w-2xl px-6">
          {hasStarted &&
            messages[messages.length - 1]?.role === "assistant" &&
            !isLoading &&
            messages[messages.length - 1]?.payload?.follow_ups?.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {messages[messages.length - 1].payload.follow_ups
                  .slice(0, 3)
                  .map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="rounded-full border border-rose-900/40 bg-rose-950/20 px-3.5 py-1.5 text-left text-sm text-rose-100/80 transition hover:border-rose-700/60 hover:bg-rose-900/30 hover:text-rose-50"
                    >
                      {q}
                    </button>
                  ))}
              </div>
            )}

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              placeholder={`What's happening with ${BABY_PROFILE.baby_name} tonight?`}
              className="w-full rounded-2xl border border-rose-900/40 bg-rose-950/30 py-4 pl-5 pr-14 font-serif text-[16px] text-rose-50 placeholder-rose-200/30 backdrop-blur-md transition focus:border-rose-700/60 focus:bg-rose-950/50 focus:outline-none disabled:opacity-60"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-500 text-rose-950 transition hover:from-rose-300 hover:to-rose-400 disabled:from-rose-900/40 disabled:to-rose-900/40 disabled:text-rose-200/30"
              aria-label="Send"
            >
              <SendIcon />
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] text-rose-200/30">
            Mumzworld Care isn't a doctor. For anything urgent, call DHA on 800
            342.
          </p>
        </div>
      </div>
    </div>
  );
}

// Inline send icon (avoids one more import)
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
}
