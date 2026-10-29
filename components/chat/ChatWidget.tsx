"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/lib/site";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "I need a business website 🌐",
  "My Wi-Fi keeps disconnecting 📶",
  "Can you build a custom CRM? 📊",
];

const GREETING =
  "Hi, I'm JP 👋 Your friendly tech assistant. Ask me about websites, apps, CRM dashboards, AI automation, or internet and network problems — I'll walk you through it step by step.";

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function TypingBubble() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.04] px-4 py-3">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/80"
          style={{ animationDelay: `${dot * 120}ms` }}
        />
      ))}
      <span className="sr-only">JP is typing</span>
    </div>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hidden = pathname?.startsWith("/admin");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open || fullScreen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [open, fullScreen]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setFullScreen(media.matches);

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open || !fullScreen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, fullScreen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  if (hidden) return null;

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || sending) return;

    const userMessage: ChatMessage = {
      id: makeId(),
      role: "user",
      content: content.slice(0, 2000),
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: body }) => ({
            role,
            content: body,
          })),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "I could not answer that just now.");
      }

      setMessages((current) => [
        ...current,
        { id: makeId(), role: "assistant", content: data.reply! },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : `Something went wrong on my side. Please try again, or email ${site.email}. 🙏`,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {!open && (
        <a
          href={`https://wa.me/${site.phoneHref.replace(/\D/g, "")}?text=${encodeURIComponent(
            "Hi JP Technology, I'd like to discuss a project."
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with JP Technology on WhatsApp"
          className="group fixed bottom-20 right-4 z-[95] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-10px_rgba(37,211,102,0.65)] transition-transform duration-200 hover:scale-105 hover:bg-[#1ebe5b] sm:bottom-24 sm:right-6"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/25" />
          <FaWhatsapp size={23} aria-hidden="true" />
        </a>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the JP Technology AI chat"
          className="group fixed bottom-4 right-4 z-[95] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_16px_40px_-10px_rgba(255,77,31,0.65)] transition-transform duration-200 hover:scale-105 hover:bg-accent-soft sm:bottom-6 sm:right-6"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/25" />
          <MessageCircle size={23} aria-hidden="true" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink bg-emerald-400">
            <Sparkles size={7} className="text-black" aria-hidden="true" />
          </span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal={fullScreen}
          aria-label="JP Technology AI chat"
          className="fixed inset-0 z-[95] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#111111] pt-[env(safe-area-inset-top)] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(72dvh,560px)] sm:w-[calc(100vw-1.5rem)] sm:max-w-[390px] sm:rounded-2xl sm:border sm:border-white/[0.1] sm:pt-0 sm:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)]"
        >
          <div className="flex items-center gap-3 border-b border-white/[0.07] bg-gradient-to-r from-accent/15 via-[#151515] to-[#141414] px-4 py-3.5 sm:py-3">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Bot size={18} aria-hidden="true" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#141414] bg-emerald-400" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-white">JP Assistant</p>
              <p className="text-[10.5px] text-emerald-400/90">
                Online · AI-powered
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.07] hover:text-white sm:h-8 sm:w-8"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed sm:text-[12.5px] ${
                    message.role === "user"
                      ? "rounded-br-md bg-accent text-white"
                      : "rounded-bl-md border border-white/[0.07] bg-white/[0.04] text-white/80"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <TypingBubble />
              </div>
            )}

            {messages.length === 1 && !sending && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-white/60 transition-colors hover:border-accent/40 hover:text-accent sm:text-[10.5px]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
            className="border-t border-white/[0.07] bg-[#0f0f0f] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:pb-3"
          >
            <div className="flex items-end gap-2 rounded-xl border border-white/[0.09] bg-white/[0.03] px-3 py-2 transition-colors focus-within:border-accent/50">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void send(input);
                  }
                }}
                rows={1}
                maxLength={2000}
                placeholder="Ask about a website, app, or network issue..."
                aria-label="Message JP Assistant"
                className="max-h-24 min-h-[22px] w-full resize-none bg-transparent text-[16px] leading-relaxed text-white outline-none placeholder:text-white/30 sm:text-[12.5px]"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8"
              >
                <Send size={14} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10.5px] text-white/25 sm:text-[9.5px]">
              AI assistant · answers may vary · for project help email{" "}
              {site.email}
            </p>
          </form>
        </div>
      )}
    </>
  );
}
