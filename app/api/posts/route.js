/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    console.log('posts', posts)
    return new NextResponse(posts, { status: 200 });
  } catch (error) {
    console.log('error', error)
    return new NextResponse(
      JSON.stringify({ message: `Error: ${error.message}` }, { status: 500 })
    );
  }
};
