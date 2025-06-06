'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  ReactCompareSlider, 
  ReactCompareSliderImage,
  ReactCompareSliderHandle
} from 'react-compare-slider';
import { mediaQueries } from '../styles/mixins';

const ComparisonContainer = styled.div<{ $isVertical: boolean }>`
  position: relative;
  width: 100%;
  max-width: ${props => props.$isVertical ? '500px' : '1200px'};
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  
  /* Different aspect ratios for different orientations */
  aspect-ratio: ${props => props.$isVertical ? '3 / 4' : '16 / 10'};
  
  ${mediaQueries.md} {
    max-width: ${props => props.$isVertical ? '400px' : '100%'};
  }
  
  ${mediaQueries.sm} {
    max-width: ${props => props.$isVertical ? '350px' : '100%'};
  }
`;

const PictureInfo = styled.div<{ $isVertical: boolean }>`
  margin-top: 1.5rem;
  max-width: ${props => props.$isVertical ? '500px' : '1200px'};
  margin-left: auto;
  margin-right: auto;
  text-align: ${props => props.$isVertical ? 'center' : 'left'};
  
  ${mediaQueries.md} {
    max-width: ${props => props.$isVertical ? '400px' : '100%'};
  }
  
  ${mediaQueries.sm} {
    margin-top: 1rem;
    max-width: ${props => props.$isVertical ? '350px' : '100%'};
  }
`;

const PictureTitle = styled.h2<{ $isVertical: boolean }>`
  font-size: ${props => props.$isVertical ? '1.5rem' : '1.8rem'};
  font-weight: bold;
  margin-bottom: 0.5rem;
  
  ${mediaQueries.sm} {
    font-size: ${props => props.$isVertical ? '1.3rem' : '1.5rem'};
  }
`;

const PictureDescription = styled.p<{ $isVertical: boolean }>`
  font-size: ${props => props.$isVertical ? '1rem' : '1.1rem'};
  opacity: 0.8;
  line-height: 1.6;
  
  ${mediaQueries.sm} {
    font-size: ${props => props.$isVertical ? '0.9rem' : '1rem'};
  }
`;

const ComparisonLabels = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
  pointer-events: none;
`;

const Label = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  
  ${mediaQueries.sm} {
    padding: 0.3rem 0.7rem;
    font-size: 0.8rem;
  }
`;

const ProtectionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 5;
  pointer-events: none;
`;

interface Picture {
  id: string;
  title: string;
  description: string;
  category: string;
  rawImage: string;
  editedImage: string;
  orientation: 'horizontal' | 'vertical';
}

interface BeforeAfterComparisonProps {
  picture: Picture;
}

// Custom handle component for the slider
const CustomHandle = styled.div`
  width: 4px;
  height: 100%;
  background: white;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  
  &:after {
    content: '↔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
    font-size: 16px;
    font-weight: bold;
    z-index: 1;
  }
`;

const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({ picture }) => {
  const [position, setPosition] = useState(50);
  const isVertical = picture.orientation === 'vertical';

  // Disable right-click and other protections
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.comparison-container')) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && target.closest('.comparison-container')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <>
      <ComparisonContainer $isVertical={isVertical} className="comparison-container">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={picture.rawImage}
              alt={`${picture.title} - Before`}
              style={{ 
                objectFit: 'cover',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={picture.editedImage}
              alt={`${picture.title} - After`}
              style={{ 
                objectFit: 'cover',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          }
          position={position}
          onPositionChange={setPosition}
          handle={<CustomHandle />}
          style={{
            height: '100%',
            width: '100%'
          }}
        />
        
        <ComparisonLabels>
          <Label>Before</Label>
          <Label>After</Label>
        </ComparisonLabels>
        
        <ProtectionOverlay />
      </ComparisonContainer>
      
      {/* <PictureInfo $isVertical={isVertical}>
        <PictureTitle $isVertical={isVertical}>{picture.title}</PictureTitle>
        <PictureDescription $isVertical={isVertical}>{picture.description}</PictureDescription>
      </PictureInfo> */}
    </>
  );
};

export default BeforeAfterComparison;
