import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const mixes = await prisma.mix.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(mixes);
}

export async function POST(req: Request) {
  const data = await req.json();
  const mix = await prisma.mix.create({ data });
  return NextResponse.json(mix);
}
