"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Heading4, Link as LinkIcon } from "lucide-react";

type RichTextEditorProps = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded p-2 ${editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        title="Kalın"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded p-2 ${editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        title="İtalik"
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded p-2 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : "hover:bg-gray-100"}`}
        title="Başlık 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`rounded p-2 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : "hover:bg-gray-100"}`}
        title="Başlık 3"
      >
        <Heading3 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`rounded p-2 ${editor.isActive("heading", { level: 4 }) ? "bg-gray-200" : "hover:bg-gray-100"}`}
        title="Başlık 4"
      >
        <Heading4 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded p-2 ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        title="Madde listesi"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded p-2 ${editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        title="Numaralı liste"
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Link URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={`rounded p-2 ${editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        title="Link ekle"
      >
        <LinkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function RichTextEditor({ content, onChange, placeholder = "İçerik..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[280px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
