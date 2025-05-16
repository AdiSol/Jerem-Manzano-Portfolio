'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { mediaQueries } from '../styles/mixins';

const ShowcaseSection = styled.section`
  padding: 4rem 5%;
  background-color: ${props => props.theme.colors.background};
  
  ${mediaQueries.md} {
    padding: 3rem 5%;
  }
  
  ${mediaQueries.sm} {
    padding: 2rem 5%;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 3rem;
  text-align: left;
  
  ${mediaQueries.sm} {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
  
  ${mediaQueries.sm} {
    font-size: 1.5rem;
  }
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  ${mediaQueries.sm} {
    gap: 1.5rem;
  }
`;

const WorksCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  ${mediaQueries.md} {
    gap: 1.5rem;
  }
  
  ${mediaQueries.sm} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CategoryCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.secondary};
  height: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  ${mediaQueries.md} {
    height: 250px;
  }
  
  ${mediaQueries.sm} {
    height: 220px;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%);
  z-index: 1;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  z-index: 2;
  
  ${mediaQueries.sm} {
    padding: 1rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  
  ${mediaQueries.sm} {
    font-size: 1.25rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  
  ${mediaQueries.sm} {
    font-size: 0.8rem;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
  border-radius: 8px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  /* Maintain 16:9 aspect ratio */
  aspect-ratio: 16 / 9;
  
  ${mediaQueries.md} {
    margin-bottom: 2rem;
  }
  
  ${mediaQueries.sm} {
    margin-bottom: 1.5rem;
  }
`;

const SoundToggle = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  z-index: 10;
  font-size: 0.9rem;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

  const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
      // This requires re-loading the iframe with different parameters
      setIsMuted(!isMuted);
    };

    return (
      <VideoContainer>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}`}
        title="Jeremiah Manzano Showreel"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <SoundToggle onClick={toggleMute}>
        {isMuted ? "Unmute 🔇" : "Mute 🔊"}
      </SoundToggle>
    </VideoContainer>
    );
  };

const WorkShowcase: React.FC = () => {
  const showreelVideoId = 'zHbvM82MVXw';
  return (
    <ShowcaseSection>
      <SectionHeader>
        <SectionTitle>MY WORKS</SectionTitle>
      </SectionHeader>
      
      <WorksGrid>
        <YouTubeEmbed videoId={showreelVideoId} />
        
        <WorksCategories>
          <Link href="https://www.instagram.com/jeremiah.manzano/" /*href="/picture"*/ passHref>
            <CategoryCard>
              <Image
                src="/images/picture-showcase.jpg"
                alt="Photography showcase"
                fill
                style={{ objectFit: 'cover' }}
              />
              <CardOverlay />
              <CardContent>
                <CardTitle>Pictures</CardTitle>
                <CardDescription>
                    Capture and enhance every timeless moment via my expertise in Lightroom. See the Difference for yourself!
                </CardDescription>
              </CardContent>
            </CategoryCard>
          </Link>
          
          <Link href="https://www.youtube.com/@CapuleStudios" /*href="/video"*/ passHref>
            <CategoryCard>
              <Image
                src="/images/video-showcase.jpg"
                alt="Video showcase"
                fill
                style={{ objectFit: 'cover' }}
              />
              <CardOverlay />
              <CardContent>
                <CardTitle>Videos</CardTitle>
                <CardDescription>
                    Whether it’s personal or professional, experience the passion first-hand through my videos!
                </CardDescription>
              </CardContent>
            </CategoryCard>
          </Link>
        </WorksCategories>
      </WorksGrid>
    </ShowcaseSection>
  );
};

export default WorkShowcase;