'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { mediaQueries } from '../styles/mixins';

const HeroContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  height: 500px;
  
  ${mediaQueries.lg} {
    height: 400px;
  }
  
  ${mediaQueries.md} {
    flex-direction: column;
    height: auto;
  }
`;

const HeroLeft = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 300px;
  
  ${mediaQueries.md} {
    width: 100%;
    min-height: 350px;
  }
  
  ${mediaQueries.sm} {
    min-height: 300px;
  }
`;

const HeroRight = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 300px;
  
  ${mediaQueries.md} {
    width: 100%;
    min-height: 350px;
  }
  
  ${mediaQueries.sm} {
    min-height: 300px;
  }
`;

const HeroText = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  z-index: 2;
  text-align: right;
  width: 70%;
  
  ${mediaQueries.lg} {
    width: 80%;
  }
  
  ${mediaQueries.md} {
    width: 90%;
    right: 50%;
    transform: translate(50%, -50%);
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  
  ${mediaQueries.lg} {
    font-size: 2.8rem;
  }
  
  ${mediaQueries.md} {
    font-size: 2.5rem;
  }
  
  ${mediaQueries.sm} {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  
  ${mediaQueries.lg} {
    font-size: 1.5rem;
  }
  
  ${mediaQueries.md} {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  
  ${mediaQueries.sm} {
    font-size: 1.1rem;
  }
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 30px solid white;
    margin-left: 5px;
  }
  
  ${mediaQueries.sm} {
    width: 60px;
    height: 60px;
    
    &::before {
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
      border-left: 22px solid white;
    }
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <HeroLeft>
        <Image
          src="/images/hero-portrait.jpg"
          alt="Portfolio Profile"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </HeroLeft>
      <HeroRight>
        <Image
          src="/images/hero-video-thumbnail.jpg"
          alt="Video Thumbnail"
          fill
          style={{ objectFit: 'cover' }}
        />
        <PlayIcon />
        <HeroText>
          <Title>Jeremiah Manzano</Title>
          <Subtitle>After Effects Specialist and Photographer</Subtitle>
        </HeroText>
      </HeroRight>
    </HeroContainer>
  );
};

export default Hero;