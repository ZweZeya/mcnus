import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { ExcoMember } from '@/model/exco';

export async function GET(request: NextRequest) {
    const isWithCaptions = request.nextUrl.searchParams.get('captions') == "true";
    const fileName = "exco.json"
    const filePath = path.join(process.cwd(), `src/data/${fileName}`);
    const content = await fs.readFile(filePath, 'utf-8');
    const contentWithRandomCaption = (JSON.parse(content) as ExcoMember[]).map(member => {
        const willShowCaption = Math.random() > 0.6
        if (!isWithCaptions || !willShowCaption) {
            member.caption = ""
        }
        return member;
    })
    return NextResponse.json(contentWithRandomCaption);
}