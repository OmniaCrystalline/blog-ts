/** @format */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Дозволяємо доступ якщо є токен або якщо це запит на сторінку входу
        if (!!token) return true;
        if (req.nextUrl.pathname.startsWith("/api/auth/")) return true;
        return false;
      },
    },
  }
);

export const config = {
  matcher: [],
};
