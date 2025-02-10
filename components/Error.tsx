'use client'

export default function GlobalError({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-destructive/10">
                    <div className="text-center p-8 rounded-lg bg-white shadow-xl max-w-md w-full">
                        <div className="flex justify-center mb-4">
                            {error.message}
                        </div>
                        <h2 className="text-2xl font-bold text-destructive mb-4">
                            Critical Error
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            A critical error occurred that prevented the page from loading
                        </p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => reset()}>
                                Try Again
                            </button>
                            <button onClick={() => window.location.href = "/"}>
                                Go Home
                            </button>
                        </div>
                        {error.digest && (
                            <div className="mt-4 text-xs text-muted-foreground">
                                Error Trace: {error.digest}
                            </div>
                        )}
                    </div>
                </div>
            </body>
        </html>
    )
}