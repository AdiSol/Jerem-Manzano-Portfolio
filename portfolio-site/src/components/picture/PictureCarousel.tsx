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

const PictureThumbnail = styled.div<{ $selected: boolean; $isVertical: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: ${props => props.$isVertical ? '150px' : '200px'};
  height: ${props => props.$isVertical ? '200px' : '112px'};
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
    width: ${props => props.$isVertical ? '120px' : '160px'};
    height: ${props => props.$isVertical ? '160px' : '90px'};
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

const PictureTitle = styled.div`
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

interface Picture {
  id: string;
  title: string;
  description: string;
  category: string;
  rawImage: string;
  editedImage: string;
  orientation: 'horizontal' | 'vertical';
}

interface PictureCarouselProps {
  pictures: Picture[];
  selectedPicture: Picture | null;
  onPictureSelect: (picture: Picture) => void;
}

const PictureCarousel: React.FC<PictureCarouselProps> = ({
  pictures,
  selectedPicture,
  onPictureSelect,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const itemWidth = 216; // 200px + 16px gap
  const visibleItems = 5;
  const maxTranslateX = Math.max(0, (pictures.length - visibleItems) * itemWidth);

  const handlePrev = () => {
    setTranslateX(Math.min(0, translateX + itemWidth * 2));
  };

  const handleNext = () => {
    setTranslateX(Math.max(-maxTranslateX, translateX - itemWidth * 2));
  };

  if (pictures.length === 0) {
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
          {pictures.map((picture) => (
            <PictureThumbnail
              key={picture.id}
              $selected={selectedPicture?.id === picture.id}
              $isVertical={picture.orientation === 'vertical'}
              onClick={() => onPictureSelect(picture)}
            >
              <Image
                src={picture.editedImage}
                alt={picture.title}
                fill
                style={{ 
                  objectFit: 'cover',
                  userSelect: 'none',
                  // WebkitUserDrag: 'none'
                }}
              />
              <ThumbnailOverlay />
              <PictureTitle>{picture.title}</PictureTitle>
            </PictureThumbnail>
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

export default PictureCarousel;