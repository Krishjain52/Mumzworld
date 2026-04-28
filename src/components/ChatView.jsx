import { useRef, useEffect } from "react";
import UserMessage from "./UserMessage.jsx";
import AssistantMessage from "./AssistantMessage.jsx";
import ThinkingIndicator from "./ThinkingIndicator.jsx";

export default function ChatView({ messages, isLoading, error }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <main
      ref={scrollRef}
      className="relative z-10 mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-6 pb-32"
    >
      <div className="space-y-8 pt-4">
        {messages.map((msg) => (
          <div key={msg.id} className="fade-up">
            {msg.role === "user" ? (
              <UserMessage text={msg.text} />
            ) : (
              <AssistantMessage payload={msg.payload} />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="fade-up">
            <ThinkingIndicator />
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-orange-900/40 bg-orange-950/30 p-4 text-sm text-orange-100">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
