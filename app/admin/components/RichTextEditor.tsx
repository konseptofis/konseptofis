"use client";

import { useRef, useState, useCallback, useEffect, useReducer } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Link2,
  Unlink,
  Table as TableIcon,
  ImagePlus,
  Plus,
  Columns2,
  Trash2,
  Heading,
} from "lucide-react";
import { uploadBlogImage } from "@/lib/admin/upload-blog-image";
import LinkAnalysisPanel from "@/app/admin/components/LinkAnalysisPanel";

type RichTextEditorProps = {
  content?: string;
  value?: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const EDITOR_PROSE =
  "prose prose-sm max-w-none min-h-full p-4 focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-inset [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:list-item [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-lg";

function ToolbarDivider() {
  return <span className="mx-0.5 h-4 w-px shrink-0 bg-gray-300" aria-hidden />;
}

function ToolbarBtn({
  active,
  onClick,
  onMouseDown,
  title,
  children,
  disabled,
}: {
  active?: boolean;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      title={title}
      className={`rounded p-2 text-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

function buildLinkRel(newTab: boolean, nofollow: boolean): string | undefined {
  const parts: string[] = [];
  if (nofollow) parts.push("nofollow");
  if (newTab) parts.push("noopener", "noreferrer");
  return parts.length > 0 ? parts.join(" ") : undefined;
}

function parseLinkRel(rel: string | undefined): { newTab: boolean; nofollow: boolean } {
  const tokens = (rel ?? "").split(/\s+/).filter(Boolean);
  return {
    newTab: tokens.includes("noopener") || tokens.includes("noreferrer"),
    nofollow: tokens.includes("nofollow"),
  };
}

function LinkPopover({
  editor,
  open,
  onClose,
}: {
  editor: Editor;
  open: boolean;
  onClose: () => void;
}) {
  const attrs = editor.getAttributes("link");
  const editingLink = editor.isActive("link");
  const [url, setUrl] = useState(attrs.href ?? "https://");
  const [newTab, setNewTab] = useState(
    attrs.target === "_blank" || attrs.target == null || attrs.target === ""
  );
  const [nofollow, setNofollow] = useState(parseLinkRel(attrs.rel).nofollow);

  useEffect(() => {
    if (!open) return;
    const a = editor.getAttributes("link");
    setUrl(a.href ?? "https://");
    const parsed = parseLinkRel(a.rel);
    setNofollow(parsed.nofollow);
    setNewTab(a.target ? a.target === "_blank" : true);
  }, [open, editor]);

  if (!open) return null;

  function applyLink() {
    const href = url.trim();
    if (!href) return;
    const rel = buildLinkRel(newTab, nofollow);
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href,
        target: newTab ? "_blank" : null,
        rel: rel ?? null,
      })
      .run();
    onClose();
  }

  function removeLink() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  }

  return (
    <div className="absolute left-0 top-full z-20 mt-1 w-80 max-w-[min(20rem,calc(100vw-1rem))] rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
      <label className="mb-1 block text-xs font-medium text-gray-600">URL</label>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mb-3 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
        placeholder="https://"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            applyLink();
          }
        }}
      />
      <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={newTab} onChange={(e) => setNewTab(e.target.checked)} />
        Yeni sekmede aç
      </label>
      <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={nofollow} onChange={(e) => setNofollow(e.target.checked)} />
        nofollow ekle
      </label>
      <div className="flex justify-end gap-2">
        {editingLink ? (
          <button
            type="button"
            onClick={removeLink}
            className="mr-auto rounded px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
          >
            Kaldır
          </button>
        ) : null}
        <button
          type="button"
          onClick={onClose}
          className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          İptal
        </button>
        <button
          type="button"
          onClick={applyLink}
          className="rounded bg-[#0b7041] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#095530]"
        >
          Uygula
        </button>
      </div>
    </div>
  );
}

function TableToolbar({ editor }: { editor: Editor }) {
  if (!editor.isActive("table")) return null;
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
      <span className="mr-1 text-xs font-medium text-gray-500">Tablo:</span>
      <ToolbarBtn
        title="Satır ekle (alt)"
        onClick={() => editor.chain().focus().addRowAfter().run()}
      >
        <Plus className="h-3.5 w-3.5" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Sütun ekle (sağ)"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        <Columns2 className="h-3.5 w-3.5" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Başlık satırı"
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
      >
        <Heading className="h-3.5 w-3.5" />
      </ToolbarBtn>
      <ToolbarDivider />
      <ToolbarBtn title="Satır sil" onClick={() => editor.chain().focus().deleteRow().run()}>
        <Trash2 className="h-3.5 w-3.5" />
      </ToolbarBtn>
      <ToolbarBtn title="Sütun sil" onClick={() => editor.chain().focus().deleteColumn().run()}>
        <Columns2 className="h-3.5 w-3.5 rotate-90" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Tabloyu sil"
        onClick={() => editor.chain().focus().deleteTable().run()}
      >
        <span className="text-xs font-medium">Tablo sil</span>
      </ToolbarBtn>
    </div>
  );
}

function Toolbar({
  editor,
  onLinkClick,
  onImageClick,
  imageUploading,
}: {
  editor: Editor | null;
  onLinkClick: () => void;
  onImageClick: () => void;
  imageUploading: boolean;
}) {
  if (!editor) return null;
  return (
    <div className="relative flex flex-wrap items-center gap-1 rounded-t-[8px] border-b border-gray-200 bg-gray-100/80 p-2">
      <ToolbarBtn
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Kalın"
      >
        <Bold className="h-4 w-4" />
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="İtalik"
      >
        <Italic className="h-4 w-4" />
      </ToolbarBtn>
      <ToolbarDivider />
      <ToolbarBtn
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Başlık 2"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Başlık 3"
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarBtn>
      <ToolbarDivider />
      <ToolbarBtn
        active={editor.isActive("bulletList")}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        title="Madde imi"
      >
        <List className="h-4 w-4" />
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive("orderedList")}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        title="Numaralı liste"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Alıntı"
      >
        <Quote className="h-4 w-4" />
      </ToolbarBtn>
      <ToolbarDivider />
      <ToolbarBtn
        active={editor.isActive("link")}
        onClick={onLinkClick}
        title="Link ekle / düzenle"
      >
        <Link2 className="h-4 w-4" />
      </ToolbarBtn>
      {editor.isActive("link") ? (
        <ToolbarBtn
          onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
          title="Linki kaldır"
        >
          <Unlink className="h-4 w-4" />
        </ToolbarBtn>
      ) : null}
      <ToolbarDivider />
      <ToolbarBtn
        title="Tablo ekle (3×3)"
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
      >
        <TableIcon className="h-4 w-4" />
      </ToolbarBtn>
      <ToolbarDivider />
      <ToolbarBtn title="Görsel ekle" onClick={onImageClick} disabled={imageUploading}>
        <ImagePlus className="h-4 w-4" />
      </ToolbarBtn>
      {imageUploading ? (
        <span className="text-xs text-gray-500">Görsel yükleniyor…</span>
      ) : null}
    </div>
  );
}

export default function RichTextEditor({
  content,
  value,
  onChange,
  placeholder = "İçerik...",
}: RichTextEditorProps) {
  const initialContent = content ?? value ?? "";
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  const [analysisHtml, setAnalysisHtml] = useState(initialContent);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, rerenderToolbar] = useReducer((n: number) => n + 1, 0);
  const openLinkPopoverRef = useRef<(open: boolean) => void>(() => {});
  const editorRef = useRef<Editor | null>(null);
  const analysisDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  openLinkPopoverRef.current = setLinkOpen;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Placeholder.configure({ placeholder }),
      Link.configure({
        openOnClick: false,
        enableClickSelection: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "rounded-lg",
          loading: "lazy",
        },
      }),
      Table.configure({
        resizable: true,
        renderWrapper: true,
        cellMinWidth: 100,
        HTMLAttributes: {
          class: "w-full",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: EDITOR_PROSE,
      },
      handleDOMEvents: {
        click: (view, event) => {
          const target = event.target as HTMLElement | null;
          const anchor = target?.closest("a");
          if (!anchor || !view.dom.contains(anchor)) {
            return false;
          }
          event.preventDefault();
          queueMicrotask(() => {
            const ed = editorRef.current;
            if (ed?.isActive("link")) {
              ed.chain().focus().extendMarkRange("link").run();
            }
            openLinkPopoverRef.current(true);
            rerenderToolbar();
          });
          return false;
        },
      },
    },
    onSelectionUpdate: () => {
      rerenderToolbar();
    },
    onTransaction: ({ transaction }) => {
      if (transaction.selectionSet) {
        rerenderToolbar();
      }
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      onChange(html);
      if (analysisDebounceRef.current) clearTimeout(analysisDebounceRef.current);
      analysisDebounceRef.current = setTimeout(() => {
        setAnalysisHtml(html);
      }, 300);
    },
  });

  editorRef.current = editor;

  useEffect(() => {
    if (!editor) return;
    setAnalysisHtml(editor.getHTML());
    return () => {
      if (analysisDebounceRef.current) clearTimeout(analysisDebounceRef.current);
    };
  }, [editor]);

  const handleImageFile = useCallback((file: File) => {
    setImageError(null);
    setPendingImageFile(file);
    setImageAlt("");
  }, []);

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

  return (
    <div>
      <div className="flex h-[400px] flex-col overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#0b7041] focus-within:ring-offset-0 sm:h-[500px]">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageFile(file);
        }}
      />
      <div className="relative shrink-0">
        <Toolbar
          editor={editor}
          onLinkClick={() => {
            if (editor?.isActive("link")) {
              editor.chain().focus().extendMarkRange("link").run();
            }
            setLinkOpen((v) => !v);
          }}
          onImageClick={() => fileInputRef.current?.click()}
          imageUploading={imageUploading}
        />
        {editor && linkOpen ? (
          <LinkPopover editor={editor} open={linkOpen} onClose={() => setLinkOpen(false)} />
        ) : null}
      </div>
      <div className="shrink-0">{editor ? <TableToolbar editor={editor} /> : null}</div>
      {pendingImageFile ? (
        <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-4 py-3">
          <p className="mb-2 text-sm font-medium text-gray-700">Görsel: {pendingImageFile.name}</p>
          <label className="mb-1 block text-xs text-gray-500">Alt metin (SEO için önerilir)</label>
          <input
            type="text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className="mb-2 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
            placeholder="Görseli kısaca betimleyin"
          />
          {imageError ? <p className="mb-2 text-sm text-red-600">{imageError}</p> : null}
          <div className="flex gap-2">
            <button
              type="button"
              disabled={imageUploading}
              onClick={() => void confirmImageInsert()}
              className="rounded bg-[#0b7041] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#095530] disabled:opacity-50"
            >
              {imageUploading ? "Yükleniyor…" : "Yükle ve ekle"}
            </button>
            <button
              type="button"
              disabled={imageUploading}
              onClick={() => {
                setPendingImageFile(null);
                setImageAlt("");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200"
            >
              İptal
            </button>
          </div>
        </div>
      ) : null}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <EditorContent editor={editor} />
      </div>
      </div>
      <LinkAnalysisPanel html={analysisHtml} />
    </div>
  );
}
