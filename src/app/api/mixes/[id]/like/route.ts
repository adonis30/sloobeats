import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface LikeRequestBody {
  userId: string;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: mixId } = await context.params;
  const data: LikeRequestBody = await req.json();

  const like = await prisma.mixLike.create({
    data: {
      userId: data.userId,
      mixId,
    },
  });

  return NextResponse.json(like);
}
