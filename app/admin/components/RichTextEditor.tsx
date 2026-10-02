"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Link2Off,
  Table,
  ImagePlus,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadBlogImage } from "@/lib/admin/upload-blog-image";
import LinkAnalysisPanel from "@/app/admin/components/LinkAnalysisPanel";

type RichTextEditorProps = {
  content?: string;
  value?: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

type BlogLinkItem = {
  title: string;
  slug: string;
};

const EDITOR_CLASS =
  "focus:outline-none min-h-[260px] text-gray-700 [&_p]:my-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-4 [&_h3]:mb-2 [&_h2:hover::after]:content-['_H2'] [&_h2:hover::after]:ml-1.5 [&_h2:hover::after]:text-[10px] [&_h2:hover::after]:font-mono [&_h2:hover::after]:text-gray-400 [&_h3:hover::after]:content-['_H3'] [&_h3:hover::after]:ml-1.5 [&_h3:hover::after]:text-[10px] [&_h3:hover::after]:font-mono [&_h3:hover::after]:text-gray-400 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-0.5 [&_a]:text-[#0b7041] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-lg [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-50 [&_th]:px-2 [&_th]:py-1 [&_th]:font-semibold";

const BTN_BASE =
  "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";
const BTN_IDLE = "border-gray-300 bg-white text-gray-700 hover:bg-gray-100";
const BTN_ACTIVE = "border-[#0b7041] bg-[#0b7041] text-white hover:bg-[#095530]";

const INPUT_CLASS =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#0b7041] focus:outline-none focus:ring-1 focus:ring-[#0b7041]";

function ToolbarButton({
  active,
  disabled,
  title,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  title: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`${BTN_BASE} ${active ? BTN_ACTIVE : BTN_IDLE}`}
    >
      {children}
    </button>
  );
}

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[85vh] w-full max-w-md flex-col rounded-lg bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Kapat"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function relHas(rel: string | null | undefined, token: string): boolean {
  return (rel ?? "").split(/\s+/).includes(token);
}

function normalizeUrl(raw: string): string {
  const url = raw.trim();
  if (url.startsWith("/") || url.startsWith("#") || /^(https?:|mailto:|tel:)/i.test(url)) return url;
  return `https://${url}`;
}

export default function RichTextEditor({
  content,
  value,
  onChange,
  placeholder = "İçeriği buraya yazın",
}: RichTextEditorProps) {
  const initialContent = content ?? value ?? "";
  const [notice, setNotice] = useState<string | null>(null);
  const [analysisHtml, setAnalysisHtml] = useState(initialContent);
  const analysisDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkFilter, setLinkFilter] = useState("");
  const [blogItems, setBlogItems] = useState<BlogLinkItem[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [linkNofollow, setLinkNofollow] = useState(false);
  const [linkNewTab, setLinkNewTab] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
        code: false,
        horizontalRule: false,
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
          HTMLAttributes: { target: "_self", rel: "" },
        },
      }),
      Placeholder.configure({ placeholder }),
      Image.configure({
        inline: false,
        HTMLAttributes: { class: "rounded-lg", loading: "lazy" },
      }),
      TableKit.configure({
        table: { resizable: false, renderWrapper: true },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      onChange(html);
      if (analysisDebounceRef.current) clearTimeout(analysisDebounceRef.current);
      analysisDebounceRef.current = setTimeout(() => setAnalysisHtml(html), 300);
    },
    editorProps: {
      attributes: { class: EDITOR_CLASS },
    },
  });

  useEffect(() => {
    if (!editor) return;
    setAnalysisHtml(editor.getHTML());
    return () => {
      if (analysisDebounceRef.current) clearTimeout(analysisDebounceRef.current);
    };
  }, [editor]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  useEffect(() => {
    if (!linkDialogOpen) return;
    let cancelled = false;
    (async () => {
      setBlogLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("posts")
          .select("title,slug")
          .eq("status", "published")
          .order("updated_at", { ascending: false });
        if (cancelled || error) return;
        setBlogItems(
          (data ?? [])
            .filter((p) => p.title && p.slug)
            .map((p) => ({ title: p.title as string, slug: p.slug as string })),
        );
      } finally {
        if (!cancelled) setBlogLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [linkDialogOpen]);

  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").run();
      const attrs = editor.getAttributes("link");
      setCustomUrl(attrs.href ?? "");
      setLinkNofollow(relHas(attrs.rel, "nofollow"));
      setLinkNewTab(attrs.target === "_blank");
    } else {
      const { from, to } = editor.state.selection;
      if (from === to) {
        setNotice("Önce link vermek istediğiniz metni seçin.");
        return;
      }
      setCustomUrl("");
      setLinkNofollow(false);
      setLinkNewTab(false);
    }
    setLinkFilter("");
    setLinkDialogOpen(true);
  }, [editor]);

  const applyLink = useCallback(
    (href: string) => {
      if (!editor) return;
      const relParts: string[] = [];
      if (linkNewTab) relParts.push("noopener", "noreferrer");
      if (linkNofollow) relParts.push("nofollow");
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href,
          target: linkNewTab ? "_blank" : "_self",
          rel: relParts.length ? relParts.join(" ") : null,
        })
        .run();
      setLinkDialogOpen(false);
    },
    [editor, linkNofollow, linkNewTab],
  );

  const insertCustomLink = useCallback(() => {
    const url = customUrl.trim();
    if (!url) return;
    applyLink(normalizeUrl(url));
  }, [customUrl, applyLink]);

  const confirmImageInsert = useCallback(async () => {
    if (!editor || !pendingImageFile) return;
    setImageUploading(true);
    setImageError(null);
    try {
      const publicUrl = await uploadBlogImage(pendingImageFile);
      editor
        .chain()
        .focus()
        .setImage({ src: publicUrl, alt: imageAlt.trim() || undefined })
        .run();
      setPendingImageFile(null);
      setImageAlt("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
    } finally {
      setImageUploading(false);
    }
  }, [editor, pendingImageFile, imageAlt]);

  const closeImageDialog = useCallback(() => {
    if (imageUploading) return;
    setPendingImageFile(null);
    setImageAlt("");
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [imageUploading]);

  const filteredBlog = linkFilter.trim()
    ? blogItems.filter(
        (p) =>
          p.title.toLocaleLowerCase("tr-TR").includes(linkFilter.toLocaleLowerCase("tr-TR")) ||
          p.slug.toLowerCase().includes(linkFilter.toLowerCase()),
      )
    : blogItems;

  return (
    <div>
      <div className="flex h-[440px] flex-col overflow-hidden rounded-lg border border-gray-300 bg-white sm:h-[560px]">
        {editor ? <Toolbar editor={editor} onLink={openLinkDialog} onImage={() => fileInputRef.current?.click()} /> : null}
        {notice ? (
          <div className="shrink-0 border-b border-amber-200 bg-amber-50 px-3 py-1.5 text-xs text-amber-900">
            {notice}
          </div>
        ) : null}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 text-sm focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#0b7041] [&_.tiptap]:outline-none [&_.tiptap_.is-empty::before]:pointer-events-none [&_.tiptap_.is-empty::before]:float-left [&_.tiptap_.is-empty::before]:h-0 [&_.tiptap_.is-empty::before]:text-gray-400 [&_.tiptap_.is-empty::before]:content-[attr(data-placeholder)]">
          <EditorContent editor={editor} />
        </div>
      </div>

      <LinkAnalysisPanel html={analysisHtml} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setImageError(null);
          setImageAlt("");
          setPendingImageFile(file);
        }}
      />

      <Modal open={linkDialogOpen} title="Link ekle" onClose={() => setLinkDialogOpen(false)}>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600">
              Özel URL (boş bırakırsanız blog yazılarından seçin)
            </label>
            <input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  insertCustomLink();
                }
              }}
              placeholder="/sayfa-slug veya https://..."
              className={INPUT_CLASS}
              autoFocus
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={linkNofollow}
              onChange={(e) => setLinkNofollow(e.target.checked)}
              className="rounded border-gray-300"
            />
            Nofollow olarak işaretle (SEO)
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={linkNewTab}
              onChange={(e) => setLinkNewTab(e.target.checked)}
              className="rounded border-gray-300"
            />
            Yeni sekmede aç
          </label>
        </div>

        {customUrl.trim() ? (
          <button
            type="button"
            onClick={insertCustomLink}
            className="mt-4 w-full rounded-md bg-[#0b7041] px-4 py-2 text-sm font-medium text-white hover:bg-[#095530]"
          >
            Linki uygula
          </button>
        ) : (
          <>
            <input
              value={linkFilter}
              onChange={(e) => setLinkFilter(e.target.value)}
              placeholder="Blog yazısı ara..."
              className={`${INPUT_CLASS} mt-4`}
            />
            <ul className="mt-2 max-h-[40vh] flex-1 space-y-0.5 overflow-y-auto rounded-md border border-gray-200 p-1">
              {blogLoading ? (
                <li className="px-3 py-4 text-sm text-gray-500">Yazılar yükleniyor…</li>
              ) : filteredBlog.length === 0 ? (
                <li className="px-3 py-4 text-sm text-gray-500">Eşleşen yazı yok.</li>
              ) : (
                filteredBlog.map((post) => (
                  <li key={post.slug}>
                    <button
                      type="button"
                      onClick={() => applyLink(`/${post.slug}`)}
                      className="w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      <span className="font-medium text-gray-900">{post.title}</span>
                      <span className="ml-2 text-xs text-gray-500">/{post.slug}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </Modal>

      <Modal open={pendingImageFile !== null} title="Görsel ekle" onClose={closeImageDialog}>
        <p className="mb-3 truncate text-sm text-gray-700">{pendingImageFile?.name}</p>
        <label className="block text-xs font-medium text-gray-600">Alt metin (SEO için önerilir)</label>
        <input
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          placeholder="Görseli kısaca betimleyin"
          className={INPUT_CLASS}
          autoFocus
        />
        {imageError ? <p className="mt-2 text-sm text-red-600">{imageError}</p> : null}
        <button
          type="button"
          disabled={imageUploading}
          onClick={() => void confirmImageInsert()}
          className="mt-4 w-full rounded-md bg-[#0b7041] px-4 py-2 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"
        >
          {imageUploading ? "Yükleniyor…" : "Yükle ve ekle"}
        </button>
      </Modal>
    </div>
  );
}

function Toolbar({
  editor,
  onLink,
  onImage,
}: {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
}) {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const rerender = () => forceRender((n) => n + 1);
    editor.on("transaction", rerender);
    return () => {
      editor.off("transaction", rerender);
    };
  }, [editor]);

  const chain = () => editor.chain().focus();
  const inTable = editor.isActive("table");

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-2 py-2">
      <ToolbarButton
        title="Başlık 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => chain().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-4" />
        H2
      </ToolbarButton>
      <ToolbarButton
        title="Başlık 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => chain().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-4" />
        H3
      </ToolbarButton>
      <ToolbarButton title="Kalın" active={editor.isActive("bold")} onClick={() => chain().toggleBold().run()}>
        <Bold className="size-4" />
        Kalın
      </ToolbarButton>
      <ToolbarButton title="İtalik" active={editor.isActive("italic")} onClick={() => chain().toggleItalic().run()}>
        <Italic className="size-4" />
        İtalik
      </ToolbarButton>
      <ToolbarButton
        title="Madde listesi"
        active={editor.isActive("bulletList")}
        onClick={() => chain().toggleBulletList().run()}
      >
        <List className="size-4" />
        Madde
      </ToolbarButton>
      <ToolbarButton
        title="Numaralı liste"
        active={editor.isActive("orderedList")}
        onClick={() => chain().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
        Numaralı
      </ToolbarButton>
      <ToolbarButton
        title="Alıntı"
        active={editor.isActive("blockquote")}
        onClick={() => chain().toggleBlockquote().run()}
      >
        <Quote className="size-4" />
        Alıntı
      </ToolbarButton>
      <ToolbarButton title="Link ekle / düzenle" active={editor.isActive("link")} onClick={onLink}>
        <Link2 className="size-4" />
        Link
      </ToolbarButton>
      <ToolbarButton
        title="Linki kaldır"
        disabled={!editor.isActive("link")}
        onClick={() => chain().extendMarkRange("link").unsetLink().run()}
      >
        <Link2Off className="size-4" />
        Link kaldır
      </ToolbarButton>
      <ToolbarButton
        title="Tablo ekle"
        active={inTable}
        disabled={inTable}
        onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <Table className="size-4" />
        Tablo
      </ToolbarButton>
      {inTable ? (
        <>
          <ToolbarButton title="Satır ekle" onClick={() => chain().addRowAfter().run()}>
            + Satır
          </ToolbarButton>
          <ToolbarButton title="Sütun ekle" onClick={() => chain().addColumnAfter().run()}>
            + Sütun
          </ToolbarButton>
          <ToolbarButton title="Satırı sil" onClick={() => chain().deleteRow().run()}>
            Satır sil
          </ToolbarButton>
          <ToolbarButton title="Sütunu sil" onClick={() => chain().deleteColumn().run()}>
            Sütun sil
          </ToolbarButton>
          <ToolbarButton title="Tabloyu sil" onClick={() => chain().deleteTable().run()}>
            Tablo sil
          </ToolbarButton>
        </>
      ) : null}
      <ToolbarButton title="Görsel ekle" onClick={onImage}>
        <ImagePlus className="size-4" />
        Görsel
      </ToolbarButton>
    </div>
  );
}
