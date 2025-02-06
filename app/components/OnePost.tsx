import React from 'react'
import prisma from '@/utils/prisma/prisma'
import Image from 'next/image'
import { Suspense } from 'react'
import Comments from './Comments'
import CommentForm from './client-components/CommentForm'

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
          <div>
            <Image src={user.image || '/imgs/ava1.jpg'} alt={title} className="rounded-full" width={50} height={50} />
            <p>By: {user.name}</p></div>
        </div>

        <Image src={`/imgs/${img}` || '/imgs/ava1.jpg'} alt={title} width={200} height={200} className='w-full md:w-1/2' />
      </div>
      <p className="text-lg">{desc}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <CommentForm slug={slug} />
      </Suspense>
      <div className="mt-4">
        {comments.length > 0 && <Comments comments={comments} />}
      </div>
    </div>
  )
}