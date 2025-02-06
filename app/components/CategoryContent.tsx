import prisma from "@/utils/prisma/prisma"
import Post from '../components/Post'
import Pag2 from './client-components/Pag2'

const CategoryContent = async (params: { category: string, page: number }) => {
    const { page } = params
    const postsOnPage = 1;
    const posts = await prisma.post.findMany({
        where: {
            catSlag: params.category
        },
        take: postsOnPage,
        skip: postsOnPage * page
    })
    const num = await prisma.post.count({
        where: {
            catSlag: params.category
        },
    })

    const last = Math.ceil(num / postsOnPage)

    return (<>
        <span id='firstPost'></span>
        <ul>{posts && posts.map(e => <li key={e.id}><Post post={e} parent={'cat'} /></li>)}</ul>
        <Pag2 last={last} page={page} />
    </>)
}

export default CategoryContent