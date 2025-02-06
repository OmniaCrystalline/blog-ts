/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export const GET = async ({ email }) => {
    console.log('email route', email)
  try {
    const data = await prisma.user.findMany({
      where: { email },
    });

    console.log('data', data)
    return NextResponse(data.post, { status: 200 });
  } catch (error) {
    return NextResponse(
      JSON.stringify({ message: `Error: ${error.message}` }, { status: 500 })
    );
  }
};
