'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import BlockEditor from './BlockEditor'
import { useSession } from 'next-auth/react'
import { Category } from '@prisma/client'
import Uploader from '@/utils/cloudinary/cloudinary'

interface Block {
    id: string
    type: 'heading' | 'paragraph' | 'image' | 'quote'
    content: string
    level?: number
    src?: string
}



interface SessionUser {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
}

interface WriteProps {
    categories?: Category[]
}

export default function Write({ categories = [] }: WriteProps) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [blocks, setBlocks] = useState<Block[]>([])
    const [imageUrl, setImageUrl] = useState('')
    const [isSaving, setIsSaving] = useState(false)


    if (status === 'loading') {
        return <div>Loading...</div>
    }

    // Check if session and user exist
    if (!session || !session.user) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">You must be logged in to write a post</h1>
                    <button
                        onClick={() => router.push('/api/auth/signin')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        )
    }

    const user = session?.user as SessionUser


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            return
        }

        if (blocks.length === 0) {
            return
        }

        // Skip URL validation - Cloudinary returns public_id, not full URL

        setIsSaving(true)
        try {
            await addNewPost()
            // Reset form
            setTitle('')
            setCategory('')
            setBlocks([])
            setImageUrl('')
            alert('Post created successfully!')
        } catch {
            alert('Error creating post. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    const addNewPost = async () => {
        const res = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content: JSON.stringify(blocks),
                category,
                imageUrl,
                authorId: user.id,
            }),
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(`Failed to create post: ${errorData.error || 'Unknown error'}`)
        }

        await res.json()

        router.push('/')
        router.refresh()
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded bg-neutral-800 text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block mb-2">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 rounded bg-neutral-800 text-white"
                        required
                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Image</label>
                    <Uploader seturl={setImageUrl} />
                    {imageUrl && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-2">Uploaded: {imageUrl}</p>
                            <Image
                                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageUrl}`}
                                alt="Preview"
                                width={400}
                                height={200}
                                className="max-h-48 object-cover rounded"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label className="block mb-2">Content</label>
                    <div className="bg-neutral-800 rounded p-4">
                        <BlockEditor
                            onChange={(newBlocks) => {
                                setBlocks(newBlocks)
                            }}
                            initialBlocks={blocks}
                        />
                        <div className="mt-4 flex justify-between items-center">
                            <button
                                type="button"
                                onClick={() => {
                                    // Force update blocks from BlockEditor
                                    const editor = document.querySelector('.block-editor')
                                    if (editor) {
                                        const blockElements = editor.querySelectorAll('[data-block-id]')
                                        const currentBlocks = Array.from(blockElements).map(el => {
                                            const blockId = el.getAttribute('data-block-id') || Date.now().toString()
                                            const input = el.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null
                                            const blockType = el.querySelector('.block-content')?.children[0]?.tagName?.toLowerCase() || 'paragraph'
                                            return {
                                                id: blockId,
                                                type: (blockType === 'input' ? 'paragraph' : 'heading') as Block['type'],
                                                content: input?.value || ''
                                            }
                                        })
                                        setBlocks(currentBlocks)
                                    }
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Update Content
                            </button>
                            <span className="text-sm text-gray-400">
                                {blocks.length} block(s) added
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8 mb-8">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-green-600 text-white px-12 py-4 rounded-lg hover:bg-green-700 disabled:opacity-50 text-xl font-bold shadow-lg"
                    >
                        {isSaving ? 'Saving...' : '💾 Save Post'}
                    </button>
                </div>
            </form>
        </div>
    )
}