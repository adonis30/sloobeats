// src/app/api/events/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
  });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const data = await req.json();
  const event = await prisma.event.create({ data });
  return NextResponse.json(event);
}
