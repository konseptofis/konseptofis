import type { Metadata } from "next";
import PostPreview from "@/app/components/blog/PostPreview";

export const metadata: Metadata = {
  title: "Yazı Önizleme | Konsept Ofis",
  robots: { index: false, follow: false },
};

export default function PostPreviewPage() {
  return <PostPreview />;
}
