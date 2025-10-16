import React from 'react'
import prisma from '@/utils/prisma/prisma'
import Image from 'next/image'
import { Suspense } from 'react'
import Comments from './Comments'
import CommentForm from './CommentForm'
import Link from 'next/link'
import { transliterate as tr, slugify } from 'transliteration';
import ClientImage from './ClientImage'
import SafeHTML from './SafeHTML'
interface OnePostProps {
  slag: string;
}

export const OnePost = async (props: OnePostProps) => {
  const current = await prisma.post.findUnique({ where: { slug: props.slag }, include: { user: true } })
  if (!current) return
  await prisma.post.update({ where: { slug: props.slag }, data: { views: current.views + 1 } })
  const comments = await prisma.comment.findMany({ where: { postSlug: props.slag }, include: { user: true } })
  const { title, desc, img, user, slug } = current
  return (
    <div>
      <div className="md:flex md:justify-between gap-2 mb-2">
        <div className="flex flex-col gap-2 justify-between">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className='flex gap-2 place-items-center p-2'>
            <Image src={user.image || '/imgs/ava1.jpg'} alt={user.name || 'anonymous'} width={40} height={40} className="rounded-full" />
            <Link href={`/author/${slugify(tr(user.name || 'anonymous'))}?id=${user.id}`}>By: {user.name || 'anonymous'}</Link>
          </div>
        </div>
        {img && <ClientImage img={img} title={title} />}
      </div>
      <SafeHTML content={desc} className="text-lg" />
      <Suspense fallback={<div>Loading...</div>}>
        <CommentForm slug={slug} />
      </Suspense>
      <div className="mt-4">
        {comments.length > 0 && <Comments comments={comments} />}
      </div>
    </div>
  )
}