/** @format */
import React from "react";
import prisma from "../../utils/prisma/prisma";
import Write from '@/components/Write'

export default async function WritePage() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      img: true,
      color: true,
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Write New Post</h1>
      <Write categories={categories} />
    </div>
  )
}




