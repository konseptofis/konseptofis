import Link from "next/link";

const linkClass = "text-[#0b7041] underline hover:no-underline";

type Props = {
  className?: string;
  onLinkClick?: (e: React.MouseEvent) => void;
};

export default function KvkkConsentText({ className, onLinkClick }: Props) {
  return (
    <span className={className}>
      <Link
        href="/kvkk-kapsaminda-aydinlatma-metni/"
        className={linkClass}
        onClick={onLinkClick}
      >
        KVKK Aydınlatma Metni
      </Link>
      &apos;ni ve{" "}
      <Link href="/acik-riza-onayi/" className={linkClass} onClick={onLinkClick}>
        Açık Rıza Onayı
      </Link>
      &apos;nı okudum ve kabul ediyorum. *
    </span>
  );
}
