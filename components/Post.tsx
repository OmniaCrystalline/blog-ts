import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { datestring } from './helpers/functions'
import { Post as IPost } from '@prisma/client'
import PostDesc from './PostDesc'
import ClientImage from './ClientImage'

const Post = ({ post, parent }: { post: IPost, parent: string }) => {
    const { id, desc, title, slug, views, createdAt, catSlag, img } = post
    return (
        <div className='grid md:flex gap-5 flex-row-reverse p-5' key={id + parent}>
            <div className='flex-1 grid gap-2'>
                <div>
                    <h1 className='text-xl bold '>{title}</h1>
                    <Link href={`category/${catSlag}`} className='text-sm underline'>{catSlag}</Link>
                    <div className='flex justify-between'>
                        <span className='text-sm text-neutral-500'>views: {views}</span>
                        <span className='text-sm text-neutral-500'>{datestring(new Date(createdAt))}</span>
                    </div>
                </div>
                <PostDesc desc={desc.slice(0, 1000)} />
                <div className='flex justify-between ml-auto'>
                    <Link className='text-sm text-neutral-500 underline' href={`/${slug}`}>details</Link>
                </div>
            </div>
            <div className='flex-1 ml-auto mr-auto'>
                {img && (img.includes('blog') || img.includes('cloudinary')) && <ClientImage img={img} title={title} />}
                {img && !img.includes('blog') && !img.includes('cloudinary') && <Image src={`/imgs/${img}` || '/imgs/ava1.jpg'} width={500} height={500} alt={title} className=' w-full h-auto' />}
            </div>
        </div>
    )
}

export default Post