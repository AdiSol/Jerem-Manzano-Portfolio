'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { mediaQueries } from '../styles/mixins';

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  max-height: 900px; /* Increased max height for larger screens */
  min-height: 600px;
  width: 100%;
  overflow: hidden;
  
  /* Better control for very large screens */
  @media (min-width: 1920px) {
    max-height: 1000px;
  }
  
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
  
  /* 🔧 IMPROVED: Better image positioning for all screen sizes */
  & > img {
    object-position: center center; /* Default: center positioning */
  }
  
  /* Specific positioning for different screen sizes */
  @media (min-width: 1200px) {
    & > img {
      object-position: 40% center; /* Slightly left of center on large screens */
    }
  }
  
  @media (min-width: 1600px) {
    & > img {
      object-position: 35% center; /* More left on very large screens */
    }
  }
  
  ${mediaQueries.md} {
    & > img {
      object-position: left center; /* Keep existing mobile positioning */
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 🔧 IMPROVED: Better gradient for larger screens */
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 2;
  
  /* Different gradient for very large screens */
  @media (min-width: 1600px) {
    background: linear-gradient(
      120deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.05) 40%,
      rgba(0, 0, 0, 0.3) 70%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }
  
  ${mediaQueries.md} {
    /* Keep existing mobile gradient */
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
  right: 8%; /* 🔧 IMPROVED: More reasonable right margin */
  z-index: 3;
  max-width: 600px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
  
  /* Better positioning for large screens */
  @media (min-width: 1200px) {
    right: 10%;
    max-width: 650px;
  }
  
  @media (min-width: 1600px) {
    right: 12%;
    bottom: 35%;
    max-width: 700px;
  }
  
  /* Ultra-wide screen support */
  @media (min-width: 2000px) {
    right: 15%;
    max-width: 800px;
  }
  
  ${mediaQueries.md} {
    bottom: 25%;
    left: 5%;
    right: auto; /* 🔧 Reset right positioning on mobile */
  }
  
  ${mediaQueries.sm} {
    bottom: 20%;
    left: 5%;
    right: auto; /* 🔧 Reset right positioning on mobile */
    max-width: 90%;
  }
`;

const HeroName = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.1; /* Better line height */
  
  /* Responsive font sizes for larger screens */
  @media (min-width: 1200px) {
    font-size: 5rem;
  }
  
  @media (min-width: 1600px) {
    font-size: 5.5rem;
  }
  
  @media (min-width: 2000px) {
    font-size: 6rem;
  }
  
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
  font-weight: 400; /* Lighter weight for subtitle */
  
  /* Responsive font sizes for larger screens */
  @media (min-width: 1200px) {
    font-size: 3rem;
  }
  
  @media (min-width: 1600px) {
    font-size: 3.2rem;
  }
  
  @media (min-width: 2000px) {
    font-size: 3.5rem;
  }
  
  ${mediaQueries.md} {
    font-size: 1.5rem;
  }
  
  ${mediaQueries.sm} {
    font-size: 1.2rem;
  }
`;

/* Optional decorative element for large screens */
const HeroDecoration = styled.div`
  position: absolute;
  bottom: 15%;
  right: 8%;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, white 50%, transparent 100%);
  z-index: 3;
  opacity: 0.6;
  
  @media (min-width: 1200px) {
    right: 10%;
    width: 80px;
  }
  
  @media (min-width: 1600px) {
    right: 12%;
    width: 100px;
  }
  
  ${mediaQueries.md} {
    display: none; /* Hide on mobile */
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <HeroImage>
        <ImageWrapper>
          <Image
            src="/images/hero-portrait.jpg"
            alt="Jeremiah Manzano - After Effects Specialist and Videographer"
            fill
            sizes="100vw" /* Responsive sizes */
            style={{ objectFit: 'cover' }}
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </ImageWrapper>
      </HeroImage>
      <Overlay />
      <HeroContent>
        <HeroName>I'm Jeremiah Manzano.</HeroName>
        <HeroTitle>An After Effects Specialist and Videographer</HeroTitle>
      </HeroContent>
      <HeroDecoration /> {/* Optional decorative line */}
    </HeroContainer>
  );
};

export default Hero;