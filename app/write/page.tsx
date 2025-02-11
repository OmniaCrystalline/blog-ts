/** @format */
import React, { Suspense } from "react";
import prisma from "@/utils/prisma/prisma";
import Write from "../../components/Write";

const page = () => {
  const categories = prisma.category.findMany({
    select: {
      title: true,
    }
  })
  if (!categories) return
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Write categories={categories} />
    </Suspense>
  )
};

export default page;




