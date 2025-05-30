import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { EventType } from '@/model/event';

export async function GET(request: NextRequest) {
  const eventType = request.nextUrl.searchParams.get('type');
  if (eventType == null) return NextResponse.error()
  const fileName = parseInt(eventType) == EventType.UPCOMING ? "upcoming-events.json" : "past-events.json"
  const filePath = path.join(process.cwd(), `src/data/${fileName}`);
  const content = await fs.readFile(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(content));
}