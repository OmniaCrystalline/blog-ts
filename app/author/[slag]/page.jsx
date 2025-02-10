import { redirect } from "next/dist/server/api-utils"
import prisma from "@/utils/prisma/prisma"
import Post from "@/components/Post"

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


