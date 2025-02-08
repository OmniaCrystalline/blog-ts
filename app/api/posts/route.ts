/** @format */

import prisma from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";
import { Post as IPost } from "@prisma/client";

interface PostRequestBody {
  page: number;
}
export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body: PostRequestBody = await req.json();
      const { page } = body;
      const posts: IPost[] = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
        skip: Number(page) * 3,
      });
      const n = await prisma.post.count();
      return NextResponse.json({ posts, last: Math.ceil(n / 3) });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" });
    }
  }
}
