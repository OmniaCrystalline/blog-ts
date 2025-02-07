/** @format */

"use server";
import { revalidatePath } from "next/cache";
import { IComment } from "../client-components/CommentForm";
import prisma from "@/utils/prisma/prisma";
import { Post } from "@prisma/client";
import fs from "node:fs/promises";
import { transliterate as tr, slugify } from "transliteration";

export const addComment = async (props: IComment) => {
  const res = await prisma.comment.create({ data: props });
  if (!res) return;
  revalidatePath("/" + props.postSlug);
};

export const addNewPost = async (formdata: FormData): Promise<void> => {
  const catSlag = formdata.get("cat");
  if (catSlag === "") return;
  const file = formdata.get("img") as File;
  if (file.size !== 0) {
    if (file.size > 1000000) {
      console.error("max lim 1mb");
      return;
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`public/imgs/${file.name}`, buffer);
  }
  const userEmail = formdata.get("userEmail");
  const title = formdata.get("title");
  const desc = formdata.get("desc");
  const slug = slugify(tr(title as string));
  const data = {
    title,
    desc,
    img: file.size !== 0 ? file.name : "",
    slug,
    userEmail,
    catSlag,
  } as Post;
  const res = await prisma.post.create({ data });
  console.log("res", res);
  if (!res) return;
  else revalidatePath("/write");
};

