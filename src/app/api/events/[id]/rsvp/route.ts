import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RSVPRequestBody {
  userId: string;
  status: "PENDING" | "CONFIRMED" | "DECLINED";
}

// ✅ context.params is a Promise in Next.js 15+
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: eventId } = await context.params; // await it
  const data: RSVPRequestBody = await req.json();

  const rsvp = await prisma.rSVP.create({
    data: {
      userId: data.userId,
      eventId,
      status: data.status,
    },
  });

  return NextResponse.json(rsvp);
}
