// src/app/api/pictures/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Read the picture data from the JSON file
    const picturesPath = path.join(process.cwd(), 'public', 'content', 'pictures', 'pictures.json');
    
    if (!fs.existsSync(picturesPath)) {
      // If no JSON file exists, try to auto-generate from file system
      return generatePicturesFromFileSystem();
    }
    
    const picturesContent = fs.readFileSync(picturesPath, 'utf8');
    const picturesData = JSON.parse(picturesContent);
    
    return NextResponse.json(picturesData);
    
  } catch (error) {
    console.error('Error reading pictures data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pictures' },
      { status: 500 }
    );
  }
}

// Helper function to auto-generate pictures data from file system
function generatePicturesFromFileSystem() {
  try {
    const contentPath = path.join(process.cwd(), 'public', 'content', 'pictures');
    
    const horizontalPath = path.join(contentPath, 'horizontal');
    const verticalPath = path.join(contentPath, 'vertical');
    
    const categories = [];
    
    // Process horizontal pictures
    if (fs.existsSync(horizontalPath)) {
      const horizontalFiles = fs.readdirSync(horizontalPath);
      const horizontalPictures = processPictureFiles(horizontalFiles, 'horizontal');
      
      if (horizontalPictures.length > 0) {
        categories.push({
          id: 'horizontal',
          name: 'Horizontal',
          pictures: horizontalPictures
        });
      }
    }
    
    // Process vertical pictures
    if (fs.existsSync(verticalPath)) {
      const verticalFiles = fs.readdirSync(verticalPath);
      const verticalPictures = processPictureFiles(verticalFiles, 'vertical');
      
      if (verticalPictures.length > 0) {
        categories.push({
          id: 'vertical',
          name: 'Vertical',
          pictures: verticalPictures
        });
      }
    }
    
    const fallbackData = {
      title: "Picture",
      description: "See the difference!",
      categories: categories
    };
    
    return NextResponse.json(fallbackData);
    
  } catch (error) {
    console.error('Error generating from file system:', error);
    return NextResponse.json(
      { error: 'Failed to generate pictures from file system' },
      { status: 500 }
    );
  }
}

// Helper function to process picture files and create pairs
function processPictureFiles(files: string[], category: string) {
  const pictures: any[] = [];
  
  // Group files by base name
  const fileGroups: { [key: string]: { raw?: string; edited?: string } } = {};
  
  files.forEach(file => {
    if (!file.toLowerCase().endsWith('.jpg') && !file.toLowerCase().endsWith('.jpeg')) {
      return;
    }
    
    const lowerFile = file.toLowerCase();
    let baseName = '';
    let type = '';
    
    if (lowerFile.endsWith(' raw.jpg') || lowerFile.endsWith(' raw.jpeg')) {
      baseName = file.replace(/ raw\.(jpg|jpeg)$/i, '');
      type = 'raw';
    } else if (lowerFile.endsWith(' edit.jpg') || lowerFile.endsWith(' edit.jpeg')) {
      baseName = file.replace(/ edit\.(jpg|jpeg)$/i, '');
      type = 'edited';
    }
    
    if (baseName && type) {
      if (!fileGroups[baseName]) {
        fileGroups[baseName] = {};
      }
      fileGroups[baseName][type === 'raw' ? 'raw' : 'edited'] = file;
    }
  });
  
  // Create picture objects for complete pairs
  Object.keys(fileGroups).forEach(baseName => {
    const group = fileGroups[baseName];
    
    if (group.raw && group.edited) {
      const id = baseName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      
      pictures.push({
        id: id,
        title: baseName,
        description: `Professional editing work on ${baseName}`,
        category: category,
        rawImage: `/content/pictures/${category}/${group.raw}`,
        editedImage: `/content/pictures/${category}/${group.edited}`,
        orientation: category
      });
    }
  });
  
  return pictures;
}