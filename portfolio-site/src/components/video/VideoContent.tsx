'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../styles/mixins';
import VideoPlayer from './VideoPlayer';
import VideoCarousel from './VideoCarousel';
import CategoryFilter from './CategoryFilter';

const VideoSection = styled.section`
  padding: 2rem 5% 4rem;
  background-color: ${props => props.theme.colors.background};
  min-height: calc(100vh - 160px);
  
  ${mediaQueries.md} {
    padding: 1.5rem 3% 3rem;
  }
  
  ${mediaQueries.sm} {
    padding: 1rem 2% 2rem;
  }
`;

const VideoHeader = styled.div`
  margin-bottom: 3rem;
  
  ${mediaQueries.sm} {
    margin-bottom: 2rem;
  }
`;

const VideoTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  ${mediaQueries.md} {
    font-size: 2.5rem;
  }
  
  ${mediaQueries.sm} {
    font-size: 2rem;
  }
`;

const VideoSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  
  ${mediaQueries.sm} {
    font-size: 1rem;
  }
`;

const PlayerSection = styled.div`
  margin-bottom: 3rem;
  
  ${mediaQueries.sm} {
    margin-bottom: 2rem;
  }
`;

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  thumbnail?: string;
  featured?: boolean;
}

interface VideoData {
  title: string;
  description: string;
  categories: Array<{
    id: string;
    name: string;
    videos: Video[];
  }>;
}

const VideoContent: React.FC = () => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideoData = async () => {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setVideoData(data);
        
        // Set the first category as default
        if (data.categories && data.categories.length > 0) {
          const firstCategory = data.categories[0];
          setSelectedCategory(firstCategory.id);
          
          // Use the first video in the first category
          if (firstCategory.videos.length > 0) {
            setSelectedVideo(firstCategory.videos[0]);
          }
        }
        
      } catch (error) {
        console.error('Error loading video data:', error);
        // Fallback data for development
        const fallbackData = {
          title: "Videos",
          description: "With special visual effects & animations",
          categories: [
            {
              id: "horizontal",
              name: "Horizontal",
              videos: [
                {
                  id: "video1",
                  title: "Introductory Video",
                  description: "Jeremiah Manzano's introductory video for his video editing capabilities",
                  youtubeId: "zHbvM82MVXw",
                  category: "horizontal",
                  featured: true
                }
              ]
            }
          ]
        };
        setVideoData(fallbackData);
        setSelectedCategory('horizontal');
        setSelectedVideo(fallbackData.categories[0].videos[0]);
      } finally {
        setLoading(false);
      }
    };

    loadVideoData();
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // When switching categories, show the first video in that category
    if (videoData) {
      const category = videoData.categories.find(cat => cat.id === categoryId);
      if (category && category.videos.length > 0) {
        setSelectedVideo(category.videos[0]);
      }
    }
  };

  const getCurrentCategoryVideos = () => {
    if (!videoData || !selectedCategory) return [];
    
    const category = videoData.categories.find(cat => cat.id === selectedCategory);
    return category ? category.videos : [];
  };

  if (loading) {
    return (
      <VideoSection>
        <VideoHeader>
          <VideoTitle>Loading...</VideoTitle>
        </VideoHeader>
      </VideoSection>
    );
  }

  if (!videoData) {
    return (
      <VideoSection>
        <VideoHeader>
          <VideoTitle>Error loading videos</VideoTitle>
        </VideoHeader>
      </VideoSection>
    );
  }

  return (
    <VideoSection>
      <VideoHeader>
        <VideoTitle>{videoData.title}</VideoTitle>
        <VideoSubtitle>{videoData.description}</VideoSubtitle>
        
        <CategoryFilter
          categories={videoData.categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategoryFilter}
        />
      </VideoHeader>

      <PlayerSection>
        {selectedVideo && (
          <VideoPlayer
            video={selectedVideo}
            key={selectedVideo.id} // Force re-render when video changes
          />
        )}
      </PlayerSection>

      <VideoCarousel
        videos={getCurrentCategoryVideos()}
        selectedVideo={selectedVideo}
        onVideoSelect={handleVideoSelect}
      />
    </VideoSection>
  );
};

export default VideoContent;