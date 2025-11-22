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
        <div className={`grid ${parent === 'hero' ? 'md:flex' : ''} gap-6 ${parent === 'hero' ? 'flex-row-reverse' : ''} p-5 md:p-6 ${parent === 'hero' ? 'bg-neutral-800/30 rounded-xl border border-neutral-700/50' : 'bg-neutral-800/50 rounded-xl hover:bg-neutral-800/70 hover:border-neutral-700 border border-neutral-800/50 transition-all shadow-sm'}`} key={id + parent}>
            <div className='flex-1 grid gap-4'>
                <div className='grid gap-3'>
                    <h1 className={`${parent === 'hero' ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'} font-bold leading-tight`}>{title}</h1>
                    <Link href={`category/${catSlag}`} className='text-sm text-blue-400 hover:text-blue-300 underline w-fit transition-colors font-medium'>{catSlag}</Link>
                    <div className='flex justify-between items-center text-sm text-neutral-400'>
                        <span>{views} views</span>
                        <span>{datestring(new Date(createdAt))}</span>
                    </div>
                </div>
                <PostDesc desc={desc.slice(0, 1000)} />
                <div className='flex justify-between items-center pt-3'>
                    <Link className='text-sm text-blue-400 hover:text-blue-300 underline transition-colors font-medium hover:gap-2 flex items-center gap-1' href={`/${slug}`}>Read more <span>→</span></Link>
                </div>
            </div>
            {img && (
                <div className={`flex-1 ${parent === 'hero' ? '' : 'md:max-w-[300px]'} ml-auto mr-auto rounded-lg overflow-hidden shadow-lg`}>
                    {img.includes('blog') || img.includes('cloudinary') ? (
                        <ClientImage img={img} title={title} />
                    ) : (
                        <Image src={`/imgs/${img}` || '/imgs/ava1.jpg'} width={500} height={500} alt={title} className='w-full h-auto object-cover' />
                    )}
                </div>
            )}
        </div>
    )
}

export default Post