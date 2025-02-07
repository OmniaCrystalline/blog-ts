/** @format */

import prisma from "@/utils/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

interface PostRequestBody {
  page: number;
}

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body: PostRequestBody = await req.json();
      const { page } = body;
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
        skip: Number(page) * 3,
      });
      const n = await prisma.post.count();
      return  NextResponse.json({ posts, last: Math.ceil(n / 3) })
      } 
     catch (error) {
      console.error(error);
      return { error: "An error occurred" }
    }
  }
}
