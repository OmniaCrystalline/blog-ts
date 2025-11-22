'use client'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

interface SafeHTMLProps {
    content: string
    className?: string
}

export default function SafeHTML({ content, className }: SafeHTMLProps) {
    const [sanitizedContent, setSanitizedContent] = useState('')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Sanitize HTML content to prevent XSS attacks
        const clean = DOMPurify.sanitize(content, {
            ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'blockquote', 'img'],
            ALLOWED_ATTR: ['src', 'alt', 'class']
        })
        setSanitizedContent(clean)
    }, [content])

    if (!mounted) {
        return (
            <div className={className}>
                <div className="flex items-center gap-2 py-2">
                    <div className="w-4 h-4 border-2 border-neutral-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-neutral-500 text-sm">Завантаження...</span>
                </div>
            </div>
        )
    }

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    )
}
