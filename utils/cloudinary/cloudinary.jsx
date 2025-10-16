'use client'

import { CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';

export default function Uploader({ seturl }) {
    const [error, setError] = useState();

    function handleSuccess(result) {
        setError(null);
        if (result?.info?.public_id) {
            seturl(result.info.public_id);
        }
    }

    function handleError(error) {
        setError(error);
    }

    return (
        <div className="px-5 bg-inherit border rounded border-neutral-500">
            <CldUploadButton
                uploadPreset="blog-next-ts"
                onError={handleError}
                onSuccess={handleSuccess}
                className="bg-transparent hover:scale-105 hover:bg-transparent"
            >
                Upload one image
            </CldUploadButton>
            {error && <p className="mt-2 text-xs text-red-600">{error.message || 'Upload failed'}</p>}
        </div>
    );
}
