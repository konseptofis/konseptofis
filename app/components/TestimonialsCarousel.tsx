"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HomepageGoogleReview } from "@/app/lib/data";

const AUTO_MS = 5000;
const CLONE_INDEX_OFFSET = 1;

const SLIDE_CLASS =
  "box-border flex w-[85%] shrink-0 snap-center snap-always md:w-[calc((100%-20px)/2)] md:snap-start lg:w-[calc((100%-40px)/3)]";

function Stars({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="mt-3 flex gap-0.5"
      aria-label={hidden ? undefined : "5 üzerinden 5 yıldız"}
      aria-hidden={hidden || undefined}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="#FBBC04"
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  clone,
}: {
  review: HomepageGoogleReview;
  clone?: boolean;
}) {
  return (
    <article
      className="flex h-full w-full min-h-full flex-col rounded-xl border border-[#E6EBE8] bg-white p-6"
      aria-hidden={clone || undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5EE] text-[14px] font-semibold text-[var(--color-green)]"
            aria-hidden={clone || undefined}
          >
            {review.initials}
          </div>
          <div className="min-w-0">
            <p className="m-0 text-[15px] font-semibold leading-snug text-[#1F2A24]">
              {review.name}
            </p>
            {review.date ? (
              <p className="m-0 mt-0.5 text-[13px] leading-snug text-[#8A9690]">{review.date}</p>
            ) : null}
          </div>
        </div>
        <span
          className="shrink-0 text-[12px] leading-none text-[#8A9690]"
          aria-hidden={clone || undefined}
        >
          Google
        </span>
      </div>
      <Stars hidden={clone} />
      <p className="mb-0 mt-3 flex-1 text-[15px] leading-[1.6] text-[#3D4743]">{review.text}</p>
    </article>
  );
}

type Props = {
  reviews: readonly HomepageGoogleReview[];
};

export default function TestimonialsCarousel({ reviews }: Props) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const loopResetRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = reviews.length;
  const totalSlides = slideCount + CLONE_INDEX_OFFSET;

  const scrollToSlide = useCallback((index: number, smooth: boolean) => {
    const scroller = scrollerRef.current;
    if (!scroller || index < 0 || index >= scroller.children.length) return;
    const target = scroller.children[index] as HTMLElement;
    scroller.scrollTo({
      left: target.offsetLeft - scroller.offsetLeft,
      behavior: smooth && !reduceMotionRef.current ? "smooth" : "auto",
    });
  }, []);

  const applyLoopResetIfNeeded = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || slideCount === 0) return;
    const clone = scroller.children[slideCount] as HTMLElement | undefined;
    if (!clone) return;
    const cloneLeft = clone.offsetLeft - scroller.offsetLeft;
    if (Math.abs(scroller.scrollLeft - cloneLeft) < 6) {
      loopResetRef.current = true;
      scroller.scrollTo({ left: 0, behavior: "auto" });
      indexRef.current = 0;
      setActiveIndex(0);
    }
  }, [slideCount]);

  const syncActiveFromScroll = useCallback(() => {
    if (loopResetRef.current) {
      loopResetRef.current = false;
      return;
    }
    const scroller = scrollerRef.current;
    if (!scroller || scroller.children.length === 0) return;
    const left = scroller.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < totalSlides; i++) {
      const child = scroller.children[i] as HTMLElement;
      const dist = Math.abs(child.offsetLeft - scroller.offsetLeft - left);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    if (closest >= slideCount) {
      return;
    }
    indexRef.current = closest;
    setActiveIndex(closest);
  }, [slideCount, totalSlides]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const onMq = () => {
      reduceMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => syncActiveFromScroll();
    const onScrollEnd = () => applyLoopResetIfNeeded();

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("scrollend", onScrollEnd);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("scrollend", onScrollEnd);
    };
  }, [applyLoopResetIfNeeded, syncActiveFromScroll]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const desktopMq = window.matchMedia("(min-width: 1024px)");
    const blockDesktopWheel = (event: WheelEvent) => {
      if (!desktopMq.matches) return;
      if (event.deltaX !== 0) {
        event.preventDefault();
      }
    };

    scroller.addEventListener("wheel", blockDesktopWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", blockDesktopWheel);
  }, []);

  useEffect(() => {
    const tick = () => {
      if (pausedRef.current || reduceMotionRef.current || slideCount === 0) return;

      const current = indexRef.current;
      if (current >= slideCount - 1) {
        indexRef.current = 0;
        scrollToSlide(slideCount, true);
        window.setTimeout(() => applyLoopResetIfNeeded(), 450);
      } else {
        const next = current + 1;
        indexRef.current = next;
        setActiveIndex(next);
        scrollToSlide(next, true);
      }
    };

    const id = window.setInterval(tick, AUTO_MS);
    return () => window.clearInterval(id);
  }, [applyLoopResetIfNeeded, scrollToSlide, slideCount]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div className="mt-10">
      <ul
        ref={scrollerRef}
        className="flex list-none items-stretch gap-5 overflow-x-auto overscroll-x-contain scroll-smooth p-0 [scrollbar-width:none] [-ms-overflow-style:none] motion-reduce:scroll-auto lg:overflow-x-hidden lg:overscroll-x-none lg:[touch-action:pan-y] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onTouchCancel={resume}
      >
        {reviews.map((review, index) => (
          <li key={`${review.name}-${index}`} className={SLIDE_CLASS}>
            <ReviewCard review={review} />
          </li>
        ))}
        {reviews[0] ? (
          <li className={SLIDE_CLASS} aria-hidden="true">
            <ReviewCard review={reviews[0]} clone />
          </li>
        ) : null}
      </ul>

      <div
        className="mt-5 flex justify-center gap-2 max-lg:[&_button]:cursor-pointer lg:pointer-events-none"
        role="tablist"
        aria-label="Yorum slaytları"
      >
        {reviews.map((review, index) => {
          const selected = activeIndex === index;
          return (
            <button
              key={review.name}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`${index + 1}. yorum: ${review.name}`}
              tabIndex={selected ? 0 : -1}
              className={`h-2 w-2 rounded-full border-0 p-0 transition-colors max-lg:cursor-pointer ${
                selected ? "bg-[var(--color-green)]" : "bg-[#C5CECA]"
              }`}
              onClick={() => {
                indexRef.current = index;
                setActiveIndex(index);
                scrollToSlide(index, true);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
