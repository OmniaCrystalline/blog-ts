import CategoryContent from "@/app/components/CategoryContent"

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