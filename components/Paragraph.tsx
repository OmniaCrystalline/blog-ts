import React from 'react'

interface ParagraphProps {
    children: React.ReactNode
    className?: string
    variant?: 'default' | 'lead' | 'small'
}

export default function Paragraph({
    children,
    className = '',
    variant = 'default'
}: ParagraphProps) {
    const baseClasses = 'text-gray-700 dark:text-gray-300'

    const variantClasses = {
        default: 'text-base leading-7',
        lead: 'text-lg leading-8 font-medium',
        small: 'text-sm leading-6'
    }

    return (
        <p className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </p>
    )
}
