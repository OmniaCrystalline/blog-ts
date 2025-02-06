'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { addNewPost } from './actions/action';



const Write = () => {
    const { data, status } = useSession();
    return (
        <div className='p-5'>
            {status === 'authenticated' &&
                <div>
                    <h1>Write your own story</h1>
                    <form className='grid gap-3' action={addNewPost}>
                        <input type='text' name='userEmail' defaultValue={data?.user?.email ?? ''} className='hidden' />
                        <input type='text' name='title' required placeholder='Title' className='w-full block bg-inherit px-5 py-2 border border-neutral-500 rounded-lg' />
                        <select name='cat' className='w-full block bg-inherit px-4 py-2 border border-neutral-500 rounded-lg' required>
                            <option value=''>Select category</option>
                            <option value='travel'>Travel</option>
                            <option value='sport'>Sport</option>
                            <option value='animals'>Animals</option>
                            <option value='history'>History</option>
                            <option value='science'>Science</option>
                            <option value='art'>Art</option>
                            <option value='codding'>Codding</option>
                            <option value='other'>Other</option>
                        </select>
                        <input type='file' name='img' accept='image/*' className='w-full block bg-inherit px-5 py-2 border border-neutral-500 rounded-lg' />
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