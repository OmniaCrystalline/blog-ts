'use client'
import React, { useState } from 'react'
import { useSession } from "next-auth/react";
import { addNewPost } from './actions/action';
import { use } from 'react'
import Uploader from '@/utils/cloudinary/cloudinary';

const Write = ({
    categories,
}: {
    categories: Promise<{ title: string }[]>
}) => {

    const { data, status } = useSession();
    const [url, seturl] = useState<string[]>([])
    const cats = use(categories)
    console.log('url', url)
    return (
        <div className='p-5'>
            {status === 'authenticated' &&
                <div>
                    <h1 className='mb-5'>Write your own story</h1>
                    <form className='grid gap-5' action={addNewPost}>
                        <input type='text' name='userEmail' defaultValue={data?.user?.email ?? ''} className='hidden' />
                        <input type='text' name='title' required placeholder='Title' className='w-full block bg-inherit px-5 py-2 border border-neutral-500 rounded-lg' />
                        <select name='cat' className='w-full block bg-inherit px-4 py-2 border border-neutral-500 rounded-lg' required>
                            <option >Select category</option>
                            {cats.map(({ title }) => <option key={title} value={title}>{title}</option>)}
                        </select>
                        <div className='flex gap-2'>
                            <Uploader seturl={seturl} /> file: {url}</div>
                        <input type='text' defaultValue={url} name='img' className='hidden' />
                        <textarea name='desc' minLength={100} required placeholder='Write your story...' className='w-full block bg-inherit px-5 py-2 border border-neutral-500 rounded-lg min-h-56'></textarea>
                        <button type='submit' className='w-fit h-fit place-self-end px-5 py-2 ml-auto border bg-neutral-500/50 outline-none hover:shadow-md hover:bg-neutral-600'>send</button>
                    </form>
                </div>}
            {status === 'loading' && (<div className=''>Loading...</div>)}
            {status === 'unauthenticated' && (
                <div>You must be logged in to write a story</div>
            )}
        </div>
    )
}

export default Write