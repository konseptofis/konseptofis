"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Quote } from "lucide-react";

type RichTextEditorProps = {
  /** İçerik (HTML). value da kullanılabilir. */
  content?: string;
  value?: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-[8px] border-b border-gray-200 bg-gray-100/80 p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded p-2 text-gray-700 transition-colors ${editor.isActive("bold") ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"}`}
        title="Kalın"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded p-2 text-gray-700 transition-colors ${editor.isActive("italic") ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"}`}
        title="İtalik"
      >
        <Italic className="h-4 w-4" />
      </button>
      <span className="mx-0.5 h-4 w-px bg-gray-300" aria-hidden />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded p-2 text-gray-700 transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"}`}
        title="Başlık 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`rounded p-2 text-gray-700 transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"}`}
        title="Başlık 3"
      >
        <Heading3 className="h-4 w-4" />
      </button>
      <span className="mx-0.5 h-4 w-px bg-gray-300" aria-hidden />
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`rounded p-2 text-gray-700 transition-colors ${editor.isActive("bulletList") ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"}`}
        title="Madde imi"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={`rounded p-2 text-gray-700 transition-colors ${editor.isActive("orderedList") ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"}`}
        title="Numaralı liste"
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`rounded p-2 text-gray-700 transition-colors ${editor.isActive("blockquote") ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"}`}
        title="Alıntı"
      >
        <Quote className="h-4 w-4" />
      </button>
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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Placeholder.configure({ placeholder }),
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[400px] p-4 focus:outline-none focus:ring-2 focus:ring-[#0b7041] focus:ring-inset rounded-b-[8px] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:list-item",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#0b7041] focus-within:ring-offset-0">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
