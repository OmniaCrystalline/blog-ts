import CategoryContent from "@/components/CategoryContent"
import prisma from "@/utils/prisma/prisma"

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    const posts = await prisma.post.findMany({
        where: { catSlag: category },
        select: { title: true, desc: true }
    });

    const description = posts.length > 0
        ? `Browse ${posts.length} articles in the ${category} category. ${posts[0]?.desc?.replace(/<[^>]*>/g, '').substring(0, 100) || ''}...`
        : `Explore articles in the ${category} category.`;

    return {
        title: `${category} Articles`,
        description: description,
        keywords: [category, 'articles', 'blog', 'posts'],
        openGraph: {
            title: `${category} Articles`,
            description: description,
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title: `${category} Articles`,
            description: description,
        },
    };
}

const page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ category: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const data = await params
    const par = await searchParams

    return (<>
        <h1 className='text-2xl text-indigo-500 text-center pt-4'>{data.category}</h1>
        <CategoryContent category={data.category} page={Number(par.page)} />
    </>)
}

export default page