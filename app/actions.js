/** @format */

"use server";
import  prisma  from "@/utils/prisma/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const getRecentPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      take: 3,
    });
    return NextResponse(posts, { status: 200 });
  } catch (error) {
    return NextResponse(
      JSON.stringify({ message: `Error: ${error.message}` }, { status: 500 })
    );
  }
};

export const getCategoriesList = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse(categories)
  } catch (error) {
    return new Error('error')
  }
};


export const changePage = async (page) => {
  const cookiesStore = cookies()
  cookiesStore.set("page", page);
}

 export const addComment = async (formData) => {
    const desc = formData.get('desc')
    if (desc.length < 3) return
    const res = await addComment(desc, data.user.email, data.slug)
    if (res) {
      formData.set('desc', '')
      ref.current.reset()
    }
}

