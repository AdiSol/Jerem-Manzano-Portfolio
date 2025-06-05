import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Read the video data from the JSON file
    const videosPath = path.join(process.cwd(), 'public', 'content', 'videos', 'videos.json');
    
    if (!fs.existsSync(videosPath)) {
      return NextResponse.json(
        { error: 'Videos configuration not found' },
        { status: 404 }
      );
    }
    
    const videosContent = fs.readFileSync(videosPath, 'utf8');
    const videosData = JSON.parse(videosContent);
    
    return NextResponse.json(videosData);
    
  } catch (error) {
    console.error('Error reading videos data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}