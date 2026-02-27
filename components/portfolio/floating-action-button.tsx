"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { X, User, Mail, FolderOpen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "mary" | "user";

interface Message {
  id: string;
  role: Role;
  text: string;
}

// ─── Quick-reply options ───────────────────────────────────────────────────────

const quickReplies = [
  {
    id: "about",
    label: "Get to know Mary!",
    icon: User,
    reply: "Hi, I am Mary! Get to know more about me!",
    sectionId: "about",
  },
  {
    id: "contact",
    label: "How can I reach out?",
    icon: Mail,
    reply:
      "Here you can check my social media and information to reach out to me. Talk to you soon!",
    sectionId: "contact",
  },
  {
    id: "projects",
    label: "Where can I see your projects and experiences?",
    icon: FolderOpen,
    reply: "See the projects and experiences I have gained through the years!",
    sectionId: "projects",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2);
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 100;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function ProfileAvatar({ size = 28 }: { size?: number }) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--accent)]/40"
      style={{ width: size, height: size }}
    >
      <Image
        src="/profile.JPG"
        alt="Mary"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <ProfileAvatar size={28} />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border/50 bg-card px-4 py-3 shadow-sm">
        {[0, 0.18, 0.36].map((delay) => (
          <motion.span
            key={delay}
            className="block h-1.5 w-1.5 rounded-full bg-muted-foreground"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Single message bubble ────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isMary = msg.role === "mary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-end gap-2 ${isMary ? "justify-start" : "justify-end"}`}
    >
      {isMary && <ProfileAvatar size={28} />}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
          isMary
            ? "rounded-bl-sm border border-border/50 bg-card text-card-foreground"
            : "rounded-br-sm bg-[var(--accent)] text-[var(--accent-foreground)]"
        }`}
      >
        {msg.text}
      </div>

      {!isMary && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <User size={13} />
        </div>
      )}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHintBubble, setShowHintBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [awaitingAction, setAwaitingAction] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasGreeted = useRef(false);
  const hintTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── Auto-scroll messages to bottom ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Show hint bubble: on mount AND every time chat is closed ──
  const scheduleHint = () => {
    hintTimers.current.forEach(clearTimeout);
    const show = setTimeout(() => setShowHintBubble(true), 900);
    const hide = setTimeout(() => setShowHintBubble(false), 5500);
    hintTimers.current = [show, hide];
  };

  useEffect(() => {
    scheduleHint();
    return () => hintTimers.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── When chat opens: hide hint. When chat closes: reschedule hint. ──
  useEffect(() => {
    if (isOpen) {
      hintTimers.current.forEach(clearTimeout);
      setShowHintBubble(false);
    } else {
      scheduleHint();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Mary greeting on first open ──
  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      hasGreeted.current = true;
      setIsTyping(true);
      const t = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: uid(),
            role: "mary",
            text: "Hi there! 👋 I'm Mary. How can I help you today?",
          },
        ]);
      }, 1100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Outside-click close ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Handle quick-reply click (always repeatable) ──
  const handleReply = (option: (typeof quickReplies)[number]) => {
    if (awaitingAction) return;
    setAwaitingAction(true);

    setMessages((prev) => [...prev, { id: uid(), role: "user", text: option.label }]);

    setTimeout(() => setIsTyping(true), 350);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "mary", text: option.reply },
      ]);

      setTimeout(() => {
        setAwaitingAction(false);
        scrollToSection(option.sectionId);
      }, 1200);
    }, 1600);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-4 sm:bottom-24 sm:right-8 z-50 flex flex-col items-end gap-3"
    >
      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-[calc(100vw-2rem)] max-w-[320px] sm:w-80 flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl"
            style={{ height: "420px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/50 bg-card/60 px-4 py-3.5">
              <ProfileAvatar size={36} />
              <div className="flex-1">
                <p className="text-sm font-semibold leading-none text-foreground">Mary</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {isTyping ? (
                    <motion.span
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[var(--accent)]"
                    >
                      typing…
                    </motion.span>
                  ) : (
                    <motion.span key="online" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                      Online
                    </motion.span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>

            <div
              className="flex flex-1 flex-col gap-3 overflow-y-auto scroll-smooth px-4 py-4 [&::-webkit-scrollbar]:hidden"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              } as CSSProperties}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  key="typing-indicator"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <TypingIndicator />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {messages.length > 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1.5 border-t border-border/50 bg-card/40 px-3 py-3"
                >
                  <p className="mb-0.5 px-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Quick replies
                  </p>
                  {quickReplies.map((option) => {
                      const Icon = option.icon;
                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleReply(option)}
                          disabled={awaitingAction}
                          className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-left text-sm font-medium text-foreground/80 shadow-sm transition-all duration-150 hover:border-[var(--accent)] hover:bg-accent/10 hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)]">
                            <Icon size={12} />
                          </span>
                          <span className="leading-snug">{option.label}</span>
                        </motion.button>
                      );
                    })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB row: hint bubble + main button ── */}
      <div className="flex items-center gap-3">
        {/* Hint bubble */}
        <AnimatePresence>
          {showHintBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, -4, 0] }}
              exit={{ opacity: 0, scale: 0.85, x: 10 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                x: { duration: 0.3 },
                y: { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
              }}
              className="relative rounded-2xl border border-border/60 bg-background/95 px-4 py-2 shadow-lg backdrop-blur-md"
            >
              <p className="whitespace-nowrap text-sm font-medium text-foreground/80">
                How can I help you! 💬
              </p>
              <span className="absolute right-[-7px] top-1/2 -translate-y-1/2">
                <span className="block h-3 w-3 rotate-45 rounded-sm border-r border-t border-border/60 bg-background/95" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB button — wrapped in bobbing container */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.button
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 ${
              isOpen
                ? "bg-foreground text-background shadow-foreground/20"
                : "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-accent/40 hover:shadow-accent/60"
            }`}
            aria-label={isOpen ? "Close chat" : "Open chat"}
          >
            {!isOpen && (
              <motion.span
                className="absolute inset-0 rounded-full bg-[var(--accent)]"
                animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* Profile image (closed) or X (open) */}
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={22} strokeWidth={2.2} />
                </motion.span>
              ) : (
                <motion.span
                  key="profile"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 overflow-hidden rounded-full"
                >
                  <Image
                    src="/profile.JPG"
                    alt="Mary"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
