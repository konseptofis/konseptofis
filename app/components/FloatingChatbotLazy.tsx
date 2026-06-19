"use client";

import dynamic from "next/dynamic";

const FloatingChatbot = dynamic(() => import("./FloatingChatbot"), {
  ssr: false,
});

export default function FloatingChatbotLazy() {
  return <FloatingChatbot />;
}
