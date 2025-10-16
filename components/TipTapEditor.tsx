'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Document from '@tiptap/extension-document'
import { Category } from '@prisma/client'

interface TipTapEditorProps {
    onChange: (content: string) => void
    categories?: Category[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

export default function TipTapEditor({
    onChange,
    categories = [],
    selectedCategory,
    onCategoryChange
}: TipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            Document.extend({
                content: 'block*',
            }),
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                paragraph: {
                    HTMLAttributes: {
                        class: 'my-4',
                    },
                },
            }),
            Image
        ],
        content: '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    const addImage = () => {
        const url = window.prompt('Image URL:')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const addHeading = (level: number) => {
        editor
            .chain()
            .focus()
            .insertContent(`<h${level}></h${level}>`)
            .run()
    }

    const addParagraph = () => {
        editor
            .chain()
            .focus()
            .insertContent('<p><br></p>')
            .run()
    }



    const addParagraphWithText = () => {
        const text = window.prompt('Enter text for paragraph:')
        if (text) {
            editor
                .chain()
                .focus()
                .insertContent(`<p>${text}</p>`)
                .run()
        }
    }

    const addQuote = () => {
        editor
            .chain()
            .focus()
            .insertContent('<blockquote><p></p></blockquote>')
            .run()
    }

    return (
        <div className="border rounded-lg p-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select category</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => addHeading(1)}
                    className="p-2 rounded bg-gray-200"
                >
                    H1
                </button>
                <button
                    onClick={() => addHeading(2)}
                    className="p-2 rounded bg-gray-200"
                >
                    H2
                </button>
                <button
                    onClick={() => addHeading(3)}
                    className="p-2 rounded bg-gray-200"
                >
                    H3
                </button>
                <button
                    onClick={addParagraph}
                    className="p-2 rounded bg-gray-200"
                    title="Add empty paragraph"
                >
                    P
                </button>
                <button
                    onClick={addParagraphWithText}
                    className="p-2 rounded bg-gray-200"
                    title="Add paragraph with text"
                >
                    P+
                </button>
                <button
                    onClick={addQuote}
                    className="p-2 rounded bg-gray-200"
                    title="Add quote"
                >
                    Quote
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                >
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                >
                    Bullet List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                >
                    Numbered List
                </button>
                <button
                    onClick={addImage}
                    className="p-2 rounded bg-gray-200"
                >
                    Add Image
                </button>
            </div>
            <EditorContent editor={editor} className="prose max-w-none" />
        </div>
    )
} 