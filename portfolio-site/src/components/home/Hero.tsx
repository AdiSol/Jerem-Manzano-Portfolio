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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 1%);
  z-index: 2;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 30%;
  right: 1%;
  z-index: 3;
  max-width: 600px;
  
  ${mediaQueries.md} {
    bottom: 25%;
    left: 5%;
  }
  
  ${mediaQueries.sm} {
    bottom: 20%;
    left: 5%;
    max-width: 90%;
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
        <Image
          src="/images/hero-portrait.jpg"
          alt="Jeremiah Manzano"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
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
