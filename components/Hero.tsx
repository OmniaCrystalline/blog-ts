import Post from "./Post";
import prisma from "@/utils/prisma/prisma";

const Hero = async () => {
    const post = await prisma.post.findFirst({
        orderBy: {
            views: 'desc'
        }
    });
    return (
        <div className="mb-6">
            {post ? (
                <Post post={post} parent={'hero'} />
            ) : (
                <div className="p-8 md:p-12 bg-neutral-800/30 rounded-xl border border-neutral-700/50 text-center">
                    <p className="text-neutral-400">Наразі немає публікацій</p>
                </div>
            )}
        </div>
    );
}
export default Hero