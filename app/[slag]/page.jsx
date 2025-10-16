import SideMenu from "../../components/SideMenu1"
import SideMenu2 from "../../components/SideMenu2"
import { OnePost } from "../../components/OnePost"
import prisma from '@/utils/prisma/prisma'

export async function generateMetadata({ params }) {
    const { slag } = await params;
    const post = await prisma.post.findUnique({
        where: { slug: slag },
        include: { user: true }
    });

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested post could not be found.'
        };
    }

    const description = post.desc
        ? post.desc.replace(/<[^>]*>/g, '').substring(0, 160) + '...'
        : 'Read this interesting blog post';

    return {
        title: post.title,
        description: description,
        keywords: post.catSlag ? [post.catSlag, 'blog', 'article'] : ['blog', 'article'],
        authors: [{ name: post.user.name || 'Anonymous' }],
        openGraph: {
            title: post.title,
            description: description,
            type: 'article',
            publishedTime: post.createdAt,
            authors: [post.user.name || 'Anonymous'],
            images: post.img ? [
                {
                    url: post.img,
                    width: 500,
                    height: 500,
                    alt: post.title,
                }
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: description,
            images: post.img ? [post.img] : [],
        },
    };
}

const page = async ({ params }) => {
    const { slag } = await params;
    return (
        <div className='ml-auto mr-auto min-h-screen'>
            <div className='p-5 grid gap-5' >
                <OnePost slag={slag} />
            </div>
            <div className='grid gap-5'>
                <SideMenu />
                <SideMenu2 />
            </div >
        </div>
    )
}

export default page