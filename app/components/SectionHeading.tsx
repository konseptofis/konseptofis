import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Bölüm başlığı: 30px, font-weight 500, sol dik çizgi (açık zeminde marka yeşili) */
export default function SectionHeading({ id, children, className = "" }: Props) {
  return (
    <h2
      id={id}
      className={`m-0 flex items-start gap-3 text-left text-[30px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)] ${className}`}
    >
      <span
        className="mt-1 h-7 w-[3px] shrink-0 self-start rounded-full bg-[var(--color-green)] sm:mt-1.5 sm:h-8"
        aria-hidden
      />
      <span className="min-w-0 flex-1">{children}</span>
    </h2>
  );
}
