import { NextRequest, NextResponse } from 'next/server';
import { eventService } from '@/services/event.service';

export async function GET(request: NextRequest) {
  const eventType = request.nextUrl.searchParams.get('type');
  if (eventType == null) return NextResponse.error()
  const events = await eventService.getEvents(eventType)
  return NextResponse.json(events);
}