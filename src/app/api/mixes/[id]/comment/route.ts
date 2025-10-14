import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface CommentRequestBody {
  userId: string;
  content: string;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: mixId } = await context.params;
  const data: CommentRequestBody = await req.json();

  const comment = await prisma.comment.create({
    data: {
      userId: data.userId,
      mixId,
      content: data.content,
    },
  });

  return NextResponse.json(comment);
}
