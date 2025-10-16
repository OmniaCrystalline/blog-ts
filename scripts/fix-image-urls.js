/** @format */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function fixImageUrls() {
  try {
    // Find posts with incorrect image URLs (those that don't start with http)
    const posts = await prisma.post.findMany({
      where: {
        img: {
          not: {
            startsWith: "http",
          },
        },
      },
    });

    console.log(`Found ${posts.length} posts with incorrect image URLs`);

    for (const post of posts) {
      if (post.img && !post.img.startsWith("http")) {
        const fixedUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${post.img}`;

        await prisma.post.update({
          where: { id: post.id },
          data: { img: fixedUrl },
        });

        console.log(`Fixed post ${post.id}: ${post.img} -> ${fixedUrl}`);
      }
    }

    console.log("All image URLs have been fixed!");
  } catch (error) {
    console.error("Error fixing image URLs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixImageUrls();
