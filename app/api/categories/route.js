/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export const GET = async () => {
  try {
    const category = await prisma.category.findMany();
    return NextResponse(category, { status: 200 });
  } catch (error) {
    return NextResponse(
      JSON.stringify({ message: `Error: ${error.message}` }, { status: 500 })
    );
  }
};
