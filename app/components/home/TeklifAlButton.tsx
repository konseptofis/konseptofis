"use client";

import type { ReactNode } from "react";
import { openHizliTeklifModal } from "@/app/lib/open-hizli-teklif-modal";
import { BTN_PRIMARY } from "@/app/lib/home-ui";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function TeklifAlButton({ children, className = BTN_PRIMARY }: Props) {
  return (
    <button type="button" onClick={openHizliTeklifModal} className={className}>
      {children}
    </button>
  );
}
