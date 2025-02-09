'use client'

import { useRouter } from "next/navigation"

export default function ErrorPage({
    error = "Oops! Something went wrong.",
    resetError
}: {
    error?: string,
    resetError?: () => void
}) {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-destructive/10 p-4">
            <div className="text-center max-w-md w-full space-y-6 bg-white dark:bg-black p-8 rounded-xl shadow-lg">
                <div className="flex justify-center mb-4">
                    
                </div>

                <h1 className="text-3xl font-bold text-destructive">
                    Error
                </h1>

                <p className="text-muted-foreground mb-6">
                    {error}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.back()}
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => router.push('/')}
                    >
                        Return to Home
                    </button>

                    {resetError && (
                        <button
                            onClick={resetError}
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}