'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { mediaQueries } from '../styles/mixins';

const CarouselContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
`;

const CarouselTrack = styled.div<{ $translateX: number }>`
  display: flex;
  gap: 1rem;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.$translateX}px);
  
  ${mediaQueries.sm} {
    gap: 0.5rem;
  }
`;

const VideoThumbnail = styled.div<{ $selected: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 200px;
  height: 112px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${props => props.$selected ? props.theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.$selected ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.3)'};
  }
  
  ${mediaQueries.sm} {
    width: 160px;
    height: 90px;
  }
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%);
  z-index: 1;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  &:before {
    content: '';
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid #000;
    margin-left: 2px;
  }
  
  ${mediaQueries.sm} {
    width: 30px;
    height: 30px;
    
    &:before {
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 9px solid #000;
    }
  }
`;

const VideoTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  
  ${mediaQueries.sm} {
    font-size: 0.7rem;
    padding: 0.3rem;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  z-index: 3;
  transition: background-color 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  ${mediaQueries.sm} {
    width: 35px;
    height: 35px;
  }
`;

const PrevButton = styled(NavButton)`
  left: -50px;
  
  ${mediaQueries.sm} {
    left: -40px;
  }
`;

const NextButton = styled(NavButton)`
  right: -50px;
  
  ${mediaQueries.sm} {
    right: -40px;
  }
`;

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
}

interface VideoCarouselProps {
  videos: Video[];
  selectedVideo: Video | null;
  onVideoSelect: (video: Video) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  selectedVideo,
  onVideoSelect,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const itemWidth = 216; // 200px + 16px gap
  const visibleItems = 5;
  const maxTranslateX = Math.max(0, (videos.length - visibleItems) * itemWidth);

  const handlePrev = () => {
    setTranslateX(Math.min(0, translateX + itemWidth * 2));
  };

  const handleNext = () => {
    setTranslateX(Math.max(-maxTranslateX, translateX - itemWidth * 2));
  };

  if (videos.length === 0) {
    return null;
  }

  return (
    <CarouselContainer>
      <PrevButton
        onClick={handlePrev}
        disabled={translateX >= 0}
      >
        ◀
      </PrevButton>
      
      <CarouselWrapper>
        <CarouselTrack $translateX={translateX}>
          {videos.map((video) => (
            <VideoThumbnail
              key={video.id}
              $selected={selectedVideo?.id === video.id}
              onClick={() => onVideoSelect(video)}
            >
              <Image
                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                alt={video.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <ThumbnailOverlay />
              <PlayIcon />
              <VideoTitle>{video.title}</VideoTitle>
            </VideoThumbnail>
          ))}
        </CarouselTrack>
      </CarouselWrapper>
      
      <NextButton
        onClick={handleNext}
        disabled={translateX <= -maxTranslateX}
      >
        ▶
      </NextButton>
    </CarouselContainer>
  );
};

export default VideoCarousel;