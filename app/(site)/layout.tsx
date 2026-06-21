import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import FloatingChatbotLazy from "@/app/components/FloatingChatbotLazy";
import MobileContactBar from "@/app/components/MobileContactBar";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </div>
      <Footer />
      <MobileContactBar />
      <FloatingChatbotLazy />
    </>
  );
}
