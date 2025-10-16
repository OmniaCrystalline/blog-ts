'use client'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

interface SafeHTMLProps {
    content: string
    className?: string
}

export default function SafeHTML({ content, className }: SafeHTMLProps) {
    const [sanitizedContent, setSanitizedContent] = useState('')

    useEffect(() => {
        // Sanitize HTML content to prevent XSS attacks
        const clean = DOMPurify.sanitize(content, {
            ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'blockquote', 'img'],
            ALLOWED_ATTR: ['src', 'alt', 'class']
        })
        setSanitizedContent(clean)
    }, [content])

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    )
}
