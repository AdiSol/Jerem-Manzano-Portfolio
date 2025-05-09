'use client';

import React from 'react';
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

const FeaturedVideo = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 3rem;
  
  ${mediaQueries.md} {
    height: 400px;
    margin-bottom: 2rem;
  }
  
  ${mediaQueries.sm} {
    height: 300px;
    margin-bottom: 1.5rem;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 25px solid white;
    margin-left: 5px;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  ${mediaQueries.sm} {
    width: 60px;
    height: 60px;
    
    &:before {
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 18px solid white;
    }
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2) 100%);
  z-index: 1;
`;

const VideoTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  z-index: 2;
  
  h3 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    
    ${mediaQueries.md} {
      font-size: 2rem;
    }
    
    ${mediaQueries.sm} {
      font-size: 1.5rem;
    }
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

const WorkShowcase: React.FC = () => {
  return (
    <ShowcaseSection>
      <SectionHeader>
        <SectionTitle>MY WORKS</SectionTitle>
      </SectionHeader>
      
      <WorksGrid>
        <FeaturedVideo>
          <Image
            src="/images/hero-video-thumbnail.jpg"
            alt="Jeremiah Manzano Showreel"
            fill
            style={{ objectFit: 'cover' }}
          />
          <VideoOverlay />
          <PlayButton />
          <VideoTitle>
            <h3>Jeremiah Manzano</h3>
          </VideoTitle>
        </FeaturedVideo>
        
        <WorksCategories>
          <Link href="/picture" passHref>
            <CategoryCard>
              <Image
                src="/images/car-showcase.jpg"
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
          
          <Link href="/video" passHref>
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