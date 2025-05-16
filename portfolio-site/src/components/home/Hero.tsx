'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { mediaQueries } from '../styles/mixins';

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  max-height: 800px;
  min-height: 600px;
  width: 100%;
  overflow: hidden;
  
  ${mediaQueries.md} {
    height: 80vh;
    min-height: 500px;
  }
  
  ${mediaQueries.sm} {
    height: 70vh;
    min-height: 400px;
  }
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  /* On mobile, position the image with object-position to show the left side */
  ${mediaQueries.md} {
    & > img {
      object-position: left center !important;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Enhanced gradient with darker bottom for better text contrast */
  background: linear-gradient(
    to bottom, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 0.35) 70%, 
    rgba(0, 0, 0, 0.06) 100%
  );
  z-index: 2;
  
  ${mediaQueries.md} {
    /* Even darker gradient for mobile */
    background: linear-gradient(
      to bottom, 
      rgba(0, 0, 0, 0) 0%, 
      rgba(0,0,0,0.7) 70%, 
      rgba(0, 0, 0, 0.49) 100%
    );
  }
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 30%;
  right: 1%;
  z-index: 3;
  max-width: 600px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
  
  ${mediaQueries.md} {
    bottom: 25%;
    left: 5%;
  }
  
  ${mediaQueries.sm} {
    bottom: 20%;
    left: 5%;
    max-width: 90%;
    /* Add text shadow for better readability on mobile */
    
  }
`;

const HeroName = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  ${mediaQueries.md} {
    font-size: 2.8rem;
  }
  
  ${mediaQueries.sm} {
    font-size: 2.2rem;
  }
`;

const HeroTitle = styled.h2`
  font-size: 2.8rem;
  line-height: 1.4;
  
  ${mediaQueries.md} {
    font-size: 1.5rem;
  }
  
  ${mediaQueries.sm} {
    font-size: 1.2rem;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <HeroImage>
        <ImageWrapper>
          <Image
            src="/images/hero-portrait.jpg"
            alt="Jeremiah Manzano"
            fill
            style={{ objectFit: 'cover' }}
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBA..."
          />
        </ImageWrapper>
      </HeroImage>
      <Overlay />
      <HeroContent>
        <HeroName>I'm Jeremiah Manzano.</HeroName>
        <HeroTitle>An After Effects Specialist and Videographer</HeroTitle>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
