"use client";

import {
  CHATBOT_FAB_ICON_CACHE_REVISION,
  CHATBOT_FAB_ICON_INTRINSIC_PX,
  CHATBOT_FAB_ICON_PATH,
  CHATBOT_TOPICS,
  CHATBOT_WELCOME_MESSAGE,
  getChatbotPhoneHref,
  getChatbotWhatsAppHref,
  type ChatSubOption,
} from "@/app/lib/chatbot-flow";
import { SITE } from "@/app/lib/data";
import {
  BanknotesIcon,
  BuildingOffice2Icon,
  ChevronRightIcon,
  TruckIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ComponentType,
  type SVGProps,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type ChatMessage =
  | { id: string; kind: "bot"; text: string }
  | { id: string; kind: "user"; text: string }
  | { id: string; kind: "typing" }
  | {
      id: string;
      kind: "answerCard";
      answer: string;
      linkLabel: string;
      href: string;
    };

type Step = 1 | 2 | 3;

type TopicIconProps = SVGProps<SVGSVGElement>;

const TOPIC_ICON_BY_ID: Record<
  string,
  ComponentType<TopicIconProps>
> = {
  "sanal-hazir": BuildingOffice2Icon,
  "toplanti-makam": UserGroupIcon,
  "fiyat-sozlesme": BanknotesIcon,
  "lokasyon-kargo": TruckIcon,
};

function useMessageIds() {
  const n = useRef(0);
  return useCallback((prefix: string) => {
    n.current += 1;
    return `${prefix}-${n.current}`;
  }, []);
}

function ChoicePill({
  label,
  onPick,
  disabled,
  leading,
}: {
  label: string;
  onPick: () => void;
  disabled?: boolean;
  leading?: React.ReactNode;
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onKeyDown={onKeyDown}
      onClick={() => {
        if (!disabled) onPick();
      }}
      className="flex cursor-pointer select-none items-center justify-between gap-2 rounded-full border-[0.5px] border-[rgba(0,0,0,0.12)] bg-white px-3.5 py-2.5 text-[12.5px] leading-tight text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_10%,#ffffff)]"
    >
      <span className="flex min-w-0 flex-1 items-center gap-3">
        {leading ? (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-green)_14%,#f3f4f6)] text-[var(--color-green)]"
            aria-hidden
          >
            {leading}
          </span>
        ) : null}
        <span className="min-w-0 text-left">{label}</span>
      </span>
      <ChevronRightIcon
        className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]"
        aria-hidden
      />
    </div>
  );
}

function BotAvatar({ size = 28 }: { size?: number }) {
  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-full bg-[var(--color-green)]/15 ring-1 ring-[var(--color-green)]/20"
      style={{ width: size, height: size }}
    >
      <Image
        src="/ankara-sanal-ofis-logo.webp"
        alt=""
        width={size}
        height={size}
        className="object-cover"
      />
    </span>
  );
}

function TypingRow() {
  return (
    <div className="chatbot-msg-in flex items-end gap-2">
      <BotAvatar size={26} />
      <div
        className="inline-flex items-center gap-1 rounded-[13px] rounded-bl-[3px] bg-[#F3F4F3] px-3 py-2.5"
        aria-hidden
      >
        <span
          className="chatbot-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="chatbot-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]"
          style={{ animationDelay: "120ms" }}
        />
        <span
          className="chatbot-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]"
          style={{ animationDelay: "240ms" }}
        />
      </div>
    </div>
  );
}

const contactBtnBase =
  "flex flex-1 items-center justify-center rounded-full border px-3 py-2 text-center text-[12px] font-semibold transition-colors";

function ContactButtonPair({
  whatsappLabel,
  phoneLabel,
}: {
  whatsappLabel: string;
  phoneLabel: string;
}) {
  return (
    <div className="flex gap-2">
      <a
        href={getChatbotWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${contactBtnBase} border-[var(--color-green)]/40 bg-[color-mix(in_srgb,var(--color-green)_14%,#ffffff)] text-[var(--color-green)] hover:border-[var(--color-green)]/60 hover:bg-[color-mix(in_srgb,var(--color-green)_22%,#ffffff)]`}
      >
        {whatsappLabel}
      </a>
      <a
        href={getChatbotPhoneHref()}
        className={`${contactBtnBase} border-[rgba(0,0,0,0.12)] bg-white text-[var(--foreground)] hover:border-[var(--color-green)]/40 hover:bg-[color-mix(in_srgb,var(--color-green)_8%,#ffffff)]`}
      >
        {phoneLabel}
      </a>
    </div>
  );
}

function GlobalContactExit() {
  return (
    <div className="mt-4 border-t-[0.5px] border-[rgba(0,0,0,0.08)] pt-3">
      <p className="m-0 mb-2 text-center text-[11.5px] font-medium text-[var(--color-text-muted)]">
        Aradığını bulamadın mı?
      </p>
      <ContactButtonPair whatsappLabel="WhatsApp'tan Yaz" phoneLabel="Hemen Ara" />
    </div>
  );
}

export default function FloatingChatbot() {
  const pathname = usePathname();
  const headingId = useId();
  const nextId = useMessageIds();
  const timersRef = useRef<number[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: "welcome", kind: "bot", text: CHATBOT_WELCOME_MESSAGE },
  ]);
  const [busy, setBusy] = useState(false);

  const queueTimer = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      fn();
      timersRef.current = timersRef.current.filter((t) => t !== id);
    }, ms);
    timersRef.current.push(id);
  }, []);

  useEffect(
    () => () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
    },
    [],
  );

  const stripTyping = useCallback(
    (list: ChatMessage[]) => list.filter((m) => m.kind !== "typing"),
    [],
  );

  const resetToStart = useCallback(() => {
    setStep(1);
    setSelectedTopic(null);
    setMessages([{ id: nextId("m"), kind: "bot", text: CHATBOT_WELCOME_MESSAGE }]);
    setBusy(false);
  }, [nextId]);

  const goBackLevel1 = useCallback(() => {
    setStep(1);
    setSelectedTopic(null);
    setMessages([{ id: nextId("m"), kind: "bot", text: CHATBOT_WELCOME_MESSAGE }]);
    setBusy(false);
  }, [nextId]);

  const onPickTopic = useCallback(
    (topicIndex: number) => {
      if (busy || step !== 1) return;
      const topic = CHATBOT_TOPICS[topicIndex];
      if (!topic) return;
      setBusy(true);
      const userId = nextId("u");
      const typingId = nextId("t");
      setMessages((prev) => [
        ...prev,
        { id: userId, kind: "user", text: topic.topicLabel },
        { id: typingId, kind: "typing" },
      ]);

      queueTimer(() => {
        setMessages((prev) => {
          const base = stripTyping(prev);
          return [
            ...base,
            {
              id: nextId("b"),
              kind: "bot",
              text: topic.followUpQuestion,
            },
          ];
        });
        setSelectedTopic(topicIndex);
        setStep(2);
        setBusy(false);
      }, 650);
    },
    [busy, nextId, queueTimer, step, stripTyping],
  );

  const onPickSub = useCallback(
    (sub: ChatSubOption) => {
      if (busy || step !== 2 || selectedTopic === null) return;
      setBusy(true);
      const userId = nextId("u");
      const typingId = nextId("t");
      setMessages((prev) => [
        ...prev,
        { id: userId, kind: "user", text: sub.label },
        { id: typingId, kind: "typing" },
      ]);

      queueTimer(() => {
        setMessages((prev) => {
          const base = stripTyping(prev);
          return [
            ...base,
            {
              id: nextId("a"),
              kind: "answerCard",
              answer: sub.answer,
              linkLabel: sub.linkLabel,
              href: sub.href,
            },
          ];
        });
        setStep(3);
        setBusy(false);
      }, 650);
    },
    [busy, nextId, queueTimer, selectedTopic, step, stripTyping],
  );

  const last = messages[messages.length - 1];
  const showTopicChoices = step === 1 && last?.kind === "bot";
  const showSubChoices =
    step === 2 && selectedTopic !== null && last?.kind === "bot";
  const showAnswerActions = step === 3;

  useLayoutEffect(() => {
    if (!isOpen) return;
    const el = scrollAreaRef.current;
    if (!el) return;

    const tekKarşılama =
      step === 1 &&
      messages.length === 1 &&
      messages[0]?.kind === "bot";

    if (tekKarşılama) {
      el.scrollTop = 0;
      return;
    }

    el.scrollTop = el.scrollHeight;
  }, [isOpen, messages, step, busy, selectedTopic]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {isOpen && (
        <div
          className="chatbot-panel-in fixed right-6 z-50 w-[min(400px,calc(100vw-48px))] overflow-hidden rounded-[18px] border-[0.5px] border-[rgba(0,0,0,0.08)] bg-[var(--color-white)] font-sans bottom-[calc(11.25rem+env(safe-area-inset-bottom))] md:bottom-[110px]"
          role="dialog"
          aria-modal="false"
          aria-labelledby={headingId}
        >
          <header className="flex items-center gap-3 bg-[var(--color-green)] px-4 py-[15px] text-white">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25">
              <Image
                src="/ankara-sanal-ofis-logo.webp"
                alt=""
                width={22}
                height={22}
                className="opacity-95"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p id={headingId} className="truncate text-[15px] font-semibold leading-tight">
                {SITE.name}
              </p>
              <p className="mt-0.5 text-[11.5px] font-medium text-white/90">7/24 destek</p>
            </div>
          </header>

          <div className="flex max-h-[min(520px,calc(100vh-160px))] flex-col">
            <div
              ref={scrollAreaRef}
              className="flex min-h-[320px] flex-1 flex-col gap-[10px] overflow-y-auto px-[14px] py-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {messages.map((m) => {
                if (m.kind === "typing") {
                  return <TypingRow key={m.id} />;
                }
                if (m.kind === "user") {
                  return (
                    <div key={m.id} className="chatbot-msg-in flex justify-end">
                      <p className="max-w-[92%] rounded-[13px] rounded-br-[3px] rounded-bl-[13px] bg-[var(--color-green)] px-3 py-2.5 text-[13px] leading-snug text-white">
                        {m.text}
                      </p>
                    </div>
                  );
                }
                if (m.kind === "answerCard") {
                  return (
                    <div key={m.id} className="chatbot-msg-in space-y-2.5">
                      <div className="rounded-xl border-[0.5px] border-[rgba(0,0,0,0.08)] bg-[color-mix(in_srgb,var(--color-green)_12%,#f9fafb)] px-3 py-3">
                        <p className="text-[13px] leading-relaxed text-[var(--foreground)]">
                          {m.answer}
                        </p>
                        <Link
                          href={m.href}
                          className="mt-2 inline-flex text-[12.5px] font-semibold text-[var(--color-green)] underline underline-offset-2 hover:opacity-90"
                        >
                          {m.linkLabel}
                        </Link>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={m.id} className="chatbot-msg-in flex items-end gap-2">
                    <BotAvatar size={26} />
                    <p className="max-w-[min(100%,340px)] rounded-[13px] rounded-bl-[3px] bg-[#F3F4F3] px-3 py-2.5 text-[13px] leading-relaxed text-[var(--foreground)]">
                      {m.text}
                    </p>
                  </div>
                );
              })}

              {showSubChoices && (
                <div className="mt-3 flex flex-col gap-2">
                  <div
                    role="button"
                    tabIndex={busy ? -1 : 0}
                    className="w-fit cursor-pointer select-none text-[12.5px] font-medium text-[var(--color-text-muted)] underline-offset-2 hover:text-[var(--color-green)] hover:underline"
                    onClick={() => {
                      if (busy) return;
                      goBackLevel1();
                    }}
                    onKeyDown={(e) => {
                      if (busy) return;
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        goBackLevel1();
                      }
                    }}
                  >
                    ← Geri
                  </div>
                  {CHATBOT_TOPICS[selectedTopic!]!.subOptions.map((sub) => (
                    <ChoicePill
                      key={sub.label}
                      label={sub.label}
                      disabled={busy}
                      onPick={() => onPickSub(sub)}
                    />
                  ))}
                </div>
              )}

              {showTopicChoices && (
                <div className="mt-4 flex flex-col gap-2">
                  {CHATBOT_TOPICS.map((t, i) => {
                    const TopicIcon = TOPIC_ICON_BY_ID[t.id] ?? BuildingOffice2Icon;
                    return (
                      <ChoicePill
                        key={t.id}
                        label={t.topicLabel}
                        disabled={busy}
                        leading={<TopicIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />}
                        onPick={() => onPickTopic(i)}
                      />
                    );
                  })}
                </div>
              )}

              {showAnswerActions && (
                <div className="chatbot-msg-in flex flex-col items-center gap-2 pt-1">
                  <div
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer select-none rounded-full border-[0.5px] border-transparent px-3 py-2 text-center text-[12px] text-[var(--color-text-muted)] transition-colors hover:border-[rgba(0,0,0,0.12)] hover:bg-[color-mix(in_srgb,var(--color-green)_6%,#ffffff)]"
                    onClick={resetToStart}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        resetToStart();
                      }
                    }}
                  >
                    ← Başka bir konuda yardım al
                  </div>
                </div>
              )}

              <GlobalContactExit />
            </div>

            <footer className="border-t-[0.5px] border-t-[rgba(0,0,0,0.06)] px-[14px] pb-[13px] pt-[10px] text-center text-[10.5px] text-[var(--color-text-muted)]">
              {SITE.name} · 7/24 Destek
            </footer>
          </div>
        </div>
      )}

      <button
        type="button"
        className={`fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-6 z-50 flex h-[76px] w-[76px] cursor-pointer items-center justify-center outline-none transition-transform duration-[180ms] hover:scale-[1.07] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2 md:bottom-6 ${
          isOpen
            ? "rounded-full bg-[var(--color-green)] text-white transition-[transform,background-color] duration-[180ms] hover:bg-[#095c37]"
            : "bg-transparent p-0 shadow-none hover:bg-transparent"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? "Sohbeti kapat" : "Sohbeti aç"}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="relative block h-[76px] w-[76px] shrink-0" aria-hidden>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-[180ms] ${
              isOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <Image
              src={`${CHATBOT_FAB_ICON_PATH}?v=${CHATBOT_FAB_ICON_CACHE_REVISION}`}
              alt=""
              width={CHATBOT_FAB_ICON_INTRINSIC_PX}
              height={CHATBOT_FAB_ICON_INTRINSIC_PX}
              sizes="76px"
              className="h-[76px] w-[76px] cursor-pointer object-contain"
              unoptimized
              priority
            />
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-[180ms] ${
              isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <XMarkIcon className="h-8 w-8" />
          </span>
        </span>
      </button>
    </>
  );
}
