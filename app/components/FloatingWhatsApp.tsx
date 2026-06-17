"use client";

import Link from "next/link";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { SITE } from "@/app/lib/data";

export default function FloatingWhatsApp() {
  const url = `https://wa.me/${SITE.whatsapp}`;
  return (
    <aside className="fixed bottom-6 right-6 z-50" aria-label="İletişime geçin">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="İletişime geçin"
      >
        <ChatBubbleLeftRightIcon className="h-7 w-7" aria-hidden />
      </Link>
    </aside>
  );
}
