/** @format */

declare global {
  var prisma: ReturnType<typeof getPrismaClient>; // This must be a `var` and not a `let / const`
}

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

function getPrismaClient() {
  return new PrismaClient().$extends(withAccelerate());
}

let prisma: ReturnType<typeof getPrismaClient>;

if (process.env.NODE_ENV === "production") {
  prisma = getPrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = getPrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
