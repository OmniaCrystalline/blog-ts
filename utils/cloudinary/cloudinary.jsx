'use client'

import {
    CldUploadButton,
    //CldImage, CldVideoPlayer
} from 'next-cloudinary';

import { useState } from 'react';

const config = {
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    }
}

export default function Uploader({ seturl }) {
    const [error, setError] = useState();

    function handleSuccess(result, widget) {
        setError(false)
        if (result) seturl(result.info.public_id)
        widget.close({
            quiet: true,
        });
    }

    function handleError(error, _widget) {
        setInfo(null);
        setError(error);
    }

    return (
        <div className="px-5 bg-inherit border rounded border-neutral-500">
            <CldUploadButton
                uploadPreset='blog-next-ts'
                onError={handleError}
                onSuccess={handleSuccess}
                className='bg-transparent hover:scale-105 hover:bg-transparent'
            >
                Upload one image
            </CldUploadButton>
            {error && <p className="mt-2 text-xs text-red-600">{error.statusText}</p>}
        </div>
    );
}
