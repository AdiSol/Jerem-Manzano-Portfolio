# Video Content Management Instructions - Updated Version

## Overview
Your video portfolio is organized into three main categories:
- **Horizontal**: Traditional landscape videos (commercials, music videos, documentaries)
- **Vertical**: YouTube Shorts and mobile-first content (9:16 aspect ratio)
- **Motion Graphics**: Pure animation and graphics work

## File to Edit
**Main file**: `public/content/videos/videos.json`

This single file controls all videos displayed on your website.

## Video Properties Explained

Each video has these required properties:

```json
{
  "id": "unique-video-name",           // Must be unique, use lowercase and hyphens
  "title": "Your Video Title",         // Displayed under the video player
  "description": "Video description",  // Detailed description of the project
  "youtubeId": "VIDEO_ID_HERE",       // Extract from YouTube URL
  "category": "horizontal"             // Must match category id
}
```

### Removed Properties
- ❌ `"thumbnail"` - Automatically generated from YouTube

## Getting YouTube Video IDs

### For Regular Videos:
- URL: `https://www.youtube.com/watch?v=zHbvM82MVXw`
- ID: `zHbvM82MVXw` (everything after `v=`)

### For YouTube Shorts:
- URL: `https://youtube.com/shorts/RGi8lMbtHHg`
- ID: `RGi8lMbtHHg` (everything after `/shorts/`)

**Note**: Both regular videos and Shorts use the same ID format!

## How Videos Are Displayed

### Default Video Selection:
- **First video** in each category is shown when that category is selected
- No "featured" videos - just arrange videos in your preferred order

### Video Player Behavior:
- **Horizontal videos**: Display in standard 16:9 player (wide)
- **Vertical videos**: Display in 9:16 player (tall, like TikTok/Instagram)
- **All videos**: Autoplay muted with option to unmute

## Adding a New Video

1. **Get the YouTube video ID** (see instructions above)
2. **Choose the correct category**:
   - `horizontal` for landscape videos
   - `vertical` for YouTube Shorts/mobile content
   - `motion-graphics` for pure animation work
3. **Add to the appropriate category's videos array**:

```json
{
  "id": "new-project-name",
  "title": "Amazing New Project",
  "description": "Description of the project, techniques used, and client info",
  "youtubeId": "YOUR_VIDEO_ID",
  "category": "horizontal"
}
```

## Video Ordering

Videos appear in the carousel in the **exact order** they're listed in the JSON file:
- **First video** = Default video for that category
- **Reorder** by cutting and pasting entire video objects
- **Most important videos** should be placed first in each category

## Category Guidelines

### Horizontal Videos
- **16:9 aspect ratio** (traditional landscape)
- **Examples**: Commercials, music videos, documentaries, tutorials
- **Best for**: Cinematic work, detailed storytelling

### Vertical Videos  
- **9:16 aspect ratio** (portrait/mobile)
- **Examples**: YouTube Shorts, TikTok-style content, social media videos
- **Best for**: Quick tips, behind-the-scenes, social content

## Example: Complete Video Entry

```json
{
  "id": "car-commercial-2024",
  "title": "Toyota Yaris Commercial 2024",
  "description": "30-second commercial featuring advanced visual effects, color grading, and smooth camera movements. Created for Toyota's spring campaign with focus on urban lifestyle and performance.",
  "youtubeId": "zHbvM82MVXw",
  "category": "horizontal"
}
```

## Best Practices

### For Video Titles:
- Keep under 60 characters
- Be descriptive but concise
- Include client name if appropriate

### For Descriptions:
- Mention techniques used (VFX, color grading, motion graphics)
- Include client/project context
- Highlight any special achievements or challenges
- Use emojis sparingly for emphasis

### For Video IDs:
- Use lowercase letters and hyphens only
- Make them descriptive: `corporate-intro-2024` not `video1`
- Keep them unique across all categories

## Removing Videos

To remove a video:
1. Find the video object in the JSON
2. Delete the entire object including all its properties
3. Make sure to remove any trailing commas

## Common Mistakes to Avoid

❌ **Don't do this:**
- Use spaces in IDs (`"id": "my video"`)
- Forget commas between video objects
- Use private YouTube videos
- Mix up category names
- Include HTML or special characters in descriptions

✅ **Do this:**
- Use hyphens in IDs (`"id": "my-video"`)
- Check JSON syntax with an online validator
- Test YouTube links before adding
- Keep category names exactly as shown: `horizontal`, `vertical`, `motion-graphics`
- Use plain text in descriptions

## Testing Your Changes

After editing the JSON file:
1. **Validate JSON syntax** using an online JSON validator
2. **Check YouTube video IDs** by visiting the videos directly
3. **Wait 1-2 minutes** for changes to appear on your website (if using Vercel)
4. **Test both desktop and mobile** views

## Getting Help

If you encounter issues:
1. **JSON Syntax Errors**: Use [JSONLint](https://jsonlint.com/) to validate your file
2. **Videos Not Loading**: Check that YouTube videos are public or unlisted
3. **Unexpected Behavior**: Verify category names match exactly
4. **Still Having Problems**: Contact your developer with specific error messages

---

## Quick Reference: JSON Structure

```json
{
  "title": "Videos",
  "description": "With special visual effects & animations", 
  "categories": [
    {
      "id": "category-name",
      "name": "Display Name",
      "videos": [
        {
          "id": "video-id",
          "title": "Video Title", 
          "description": "Video description",
          "youtubeId": "YOUTUBE_ID",
          "category": "category-name"
        }
      ]
    }
  ]
}
```

## File Structure Reference

```
public/content/videos/
├── videos.json                    # Main file to edit
└── README-CLIENT-INSTRUCTIONS.md  # This instruction file
```

---

**Remember**: The first video in each category will be displayed by default when visitors click that category filter. Arrange your videos with your best or most representative work first!