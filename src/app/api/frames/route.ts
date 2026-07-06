import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const animationDir = path.join(process.cwd(), 'public', 'animations', 'savidhan3');
    
    // Check if directory exists
    if (!fs.existsSync(animationDir)) {
      console.warn(`[HeroAnimation] Directory not found: ${animationDir}`);
      return NextResponse.json({ frames: [] });
    }

    const files = fs.readdirSync(animationDir);
    
    // Filter for webp frames and sort them correctly
    const frames = files
      .filter(file => file.startsWith('frame_') && file.endsWith('.webp'))
      .sort((a, b) => {
        // Extract number from frame_XXX
        const numA = parseInt(a.split('_')[1], 10);
        const numB = parseInt(b.split('_')[1], 10);
        return numA - numB;
      })
      .map(file => `/animations/savidhan3/${file}`);

    return NextResponse.json({ frames });
  } catch (error) {
    console.error('[HeroAnimation] Error reading frames:', error);
    return NextResponse.json({ frames: [] }, { status: 500 });
  }
}
