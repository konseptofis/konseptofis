"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Props = {
  title: string;
  children: ReactNode;
};

export default function FooterMenuGroup({ title, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="self-start">
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-2 py-1 text-left text-[15px] font-semibold tracking-wide text-black md:pointer-events-none md:py-0 md:text-[16px]"
        >
          {title}
          <ChevronDownIcon
            className={`h-4 w-4 shrink-0 text-gray-500 transition-transform md:hidden ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </h3>
      <div id={panelId} className={`${open ? "block" : "hidden"} mt-3 md:mt-4 md:block`}>
        {children}
      </div>
    </div>
  );
}
