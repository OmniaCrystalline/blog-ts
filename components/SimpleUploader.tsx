'use client'
import { useState } from 'react'

interface SimpleUploaderProps {
    seturl: (url: string) => void
}

export default function SimpleUploader({ seturl }: SimpleUploaderProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setUploading(true)
        setError(null)

        try {
            // Create a simple URL for the file (for demo purposes)
            const url = URL.createObjectURL(file)
            seturl(url)
        } catch (err) {
            setError('Failed to upload file')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="px-5 bg-inherit border rounded border-neutral-500">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="w-full p-2 bg-transparent hover:scale-105 hover:bg-transparent"
            />
            {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
    )
}
