import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

/** Eski `/blog/yazi-slug` adresleri kalıcı olarak kök `/yazi-slug` adresine yönlendirilir. */
export default async function LegacyBlogPostRedirect({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/${slug}`);
}
