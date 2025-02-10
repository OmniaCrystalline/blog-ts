import Post from "./Post";
import prisma from "@/utils/prisma/prisma";

const Hero = async () => {
    const post = await prisma.post.findFirst({
        orderBy: {
            views: 'desc'
        }
    });
    return <>{post ? <Post post={post} parent={'hero'} /> : <div>Oops...</div>}</>
    
}
export default Hero