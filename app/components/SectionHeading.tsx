import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** H2'yi kapsayıcı içinde ortala (SSS). */
  centered?: boolean;
};

/** Bölüm başlığı: 32/26px, font-weight 600, sol dik çizgi (marka yeşili) */
export default function SectionHeading({
  id,
  children,
  className = "",
  centered = false,
}: Props) {
  return (
    <h2
      id={id}
      className={`m-0 flex items-start gap-3 text-[26px] font-semibold leading-snug tracking-[-0.01em] text-[var(--color-text-primary)] md:text-[32px] ${centered ? "justify-center text-center" : "text-left"} ${className}`}
    >
      <span
        className="mt-1.5 h-[26px] w-[3px] shrink-0 self-start rounded-full bg-[var(--color-green)] md:h-[32px]"
        aria-hidden
      />
      <span className={`min-w-0 ${centered ? "" : "flex-1"}`}>{children}</span>
    </h2>
  );
}
