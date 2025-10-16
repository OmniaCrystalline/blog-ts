/** @format */

import prisma from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

interface CreatePostRequest {
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  authorId: string;
}

export async function POST(req: Request) {
  try {
    const body: CreatePostRequest = await req.json();
    const { title, content, category, imageUrl, authorId } = body;

    // Validate required fields
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Title, content, and authorId are required" },
        { status: 400 }
      );
    }

    // Get user email from authorId
    const user = await prisma.user.findUnique({
      where: { id: authorId },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the post
    // Check if imageUrl already contains the full path or just public_id
    let fullImageUrl = null;
    if (imageUrl) {
      if (imageUrl.startsWith("http")) {
        fullImageUrl = imageUrl;
      } else {
        // Add version to make it work like existing posts
        const timestamp = Math.floor(Date.now() / 1000);
        fullImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${timestamp}/${imageUrl}`;
      }
    }

    // Parse blocks from JSON string
    let blocks = [];
    try {
      blocks = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "Invalid content format" },
        { status: 400 }
      );
    }

    // Convert blocks to HTML
    const htmlContent = blocks
      .map((block: { type: string; content: string; level?: number; src?: string }) => {
        if (block.type === "heading") {
          const level = block.level || 1;
          return `<h${level}>${block.content}</h${level}>`;
        } else if (block.type === "paragraph") {
          return `<p>${block.content}</p>`;
        } else if (block.type === "quote") {
          return `<blockquote>${block.content}</blockquote>`;
        } else if (block.type === "image") {
          return `<img src="${block.src || ""}" alt="Image" />`;
        }
        return `<p>${block.content}</p>`;
      })
      .filter(Boolean)
      .join("");

    const post = await prisma.post.create({
      data: {
        title,
        desc: htmlContent, // Convert blocks to HTML
        img: fullImageUrl,
        userEmail: user.email,
        catSlag: category || "other",
        slug: title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
        views: 0,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
