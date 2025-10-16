import { redirect } from "next/dist/server/api-utils"
import prisma from "@/utils/prisma/prisma"
import Post from "@/components/Post"

export async function generateMetadata({ searchParams, params }) {
  const { id } = await searchParams
  const { slag } = await params

  if (!id) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.'
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: id }
  });

  if (!user) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.'
    };
  }

  const posts = await prisma.post.findMany({
    where: { user: { id: id } },
    select: { title: true }
  });

  return {
    title: `Posts by ${user.name || 'Anonymous'}`,
    description: `Read all posts by ${user.name || 'Anonymous'}. ${posts.length} articles available.`,
    keywords: [user.name || 'Anonymous', 'author', 'blog', 'posts'],
    openGraph: {
      title: `Posts by ${user.name || 'Anonymous'}`,
      description: `Read all posts by ${user.name || 'Anonymous'}. ${posts.length} articles available.`,
      type: 'profile',
      images: user.image ? [
        {
          url: user.image,
          width: 200,
          height: 200,
          alt: user.name || 'Anonymous',
        }
      ] : [],
    },
    twitter: {
      card: 'summary',
      title: `Posts by ${user.name || 'Anonymous'}`,
      description: `Read all posts by ${user.name || 'Anonymous'}. ${posts.length} articles available.`,
    },
  };
}

const page = async ({ searchParams, params }) => {
  const { id } = await searchParams
  const { slag } = await params
  if (!id) redirect('/')
  const data = await prisma.post.findMany({
    where: {
      user: {
        id: id
      }
    }
  })
  if (!data) redirect('/')

  return (<>
    <h1 className='text-xl p-5'>{slag}</h1>
    <ul className='container'>
      {data.map(e => <li key={e.id}><Post post={e} parent="author" /></li>)}
    </ul></>
  )
}

export default page


