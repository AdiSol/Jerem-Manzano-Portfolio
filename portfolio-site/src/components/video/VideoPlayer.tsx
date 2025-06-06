'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../styles/mixins';

const PlayerContainer = styled.div<{ $isVertical: boolean }>`
  position: relative;
  width: 100%;
  max-width: ${props => props.$isVertical ? '400px' : '1200px'};
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  
  /* Different aspect ratios for vertical vs horizontal */
  aspect-ratio: ${props => props.$isVertical ? '9 / 16' : '16 / 9'};
  
  ${mediaQueries.md} {
    max-width: ${props => props.$isVertical ? '350px' : '100%'};
  }
  
  ${mediaQueries.sm} {
    max-width: ${props => props.$isVertical ? '300px' : '100%'};
  }
`;

const VideoFrame = styled.iframe<{ $isVertical: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoInfo = styled.div<{ $isVertical: boolean }>`
  margin-top: 1.5rem;
  max-width: ${props => props.$isVertical ? '400px' : '1200px'};
  margin-left: auto;
  margin-right: auto;
  text-align: ${props => props.$isVertical ? 'center' : 'left'};
  
  ${mediaQueries.md} {
    max-width: ${props => props.$isVertical ? '350px' : '100%'};
  }
  
  ${mediaQueries.sm} {
    margin-top: 1rem;
    max-width: ${props => props.$isVertical ? '300px' : '100%'};
  }
`;

const VideoTitle = styled.h2<{ $isVertical: boolean }>`
  font-size: ${props => props.$isVertical ? '1.5rem' : '1.8rem'};
  font-weight: bold;
  margin-bottom: 0.5rem;
  
  ${mediaQueries.sm} {
    font-size: ${props => props.$isVertical ? '1.3rem' : '1.5rem'};
  }
`;

const VideoDescription = styled.p<{ $isVertical: boolean }>`
  font-size: ${props => props.$isVertical ? '1rem' : '1.1rem'};
  opacity: 0.8;
  line-height: 1.6;
  
  ${mediaQueries.sm} {
    font-size: ${props => props.$isVertical ? '0.9rem' : '1rem'};
  }
`;

const SoundToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
  
  ${mediaQueries.sm} {
    width: 35px;
    height: 35px;
    top: 15px;
    right: 15px;
  }
`;

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
}

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isMuted, setIsMuted] = useState(true);
  const isVertical = video.category === 'vertical';
  
  // Create the YouTube embed URL with autoplay and mute parameters
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=0&rel=0&modestbranding=1&controls=1&showinfo=0`;
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Note: This will require reloading the iframe to change mute state
    // For more advanced control, you'd need to use the YouTube Player API
  };
  
  return (
    <>
      <PlayerContainer $isVertical={isVertical}>
        <VideoFrame
          key={`${video.id}-${isMuted}`} // Force reload when mute changes
          $isVertical={isVertical}
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        <SoundToggle onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? (
            // Muted icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            // Unmuted icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </SoundToggle>
      </PlayerContainer>
      
      {/* <VideoInfo $isVertical={isVertical}>
        <VideoTitle $isVertical={isVertical}>{video.title}</VideoTitle>
        <VideoDescription $isVertical={isVertical}>{video.description}</VideoDescription>
      </VideoInfo> */}
    </>
  );
};

export default VideoPlayer;