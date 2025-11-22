import SideMenu from "../../components/SideMenu1"
import SideMenu2 from "../../components/SideMenu2"
import { OnePost } from "../../components/OnePost"
import prisma from '@/utils/prisma/prisma'

export async function generateMetadata({ params }) {
    const { slag } = await params;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const siteName = "Create Your First Blog";
    
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

    const postUrl = `${siteUrl}/${post.slug}`;
    const postImage = post.img || `${siteUrl}/preview.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title: post.title,
        description: description,
        keywords: post.catSlag ? [post.catSlag, 'blog', 'article'] : ['blog', 'article'],
        authors: [{ name: post.user.name || 'Anonymous' }],
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title: post.title,
            description: description,
            type: 'article',
            url: postUrl,
            siteName: siteName,
            publishedTime: post.createdAt,
            authors: [post.user.name || 'Anonymous'],
            images: [
                {
                    url: postImage,
                    width: post.img ? 1200 : 1200,
                    height: post.img ? 630 : 630,
                    alt: post.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: description,
            images: [postImage],
        },
        robots: {
            index: true,
            follow: true,
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