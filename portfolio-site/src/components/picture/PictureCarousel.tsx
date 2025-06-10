'use client';

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
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
  background: #f0f0f0; //Placeholder background

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.$selected ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.3)'};
  }
  
  ${mediaQueries.sm} {
    width: ${props => props.$isVertical ? '120px' : '160px'};
    height: ${props => props.$isVertical ? '160px' : '90px'};
  }
`;

// Loading thumbnail component
const LoadingThumbnail = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// Error thumbnail component
const ErrorThumbnail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666;
  font-size: 0.8rem;
  text-align: center;
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

//  Optimized thumbnail component with lazy loading
const OptimizedThumbnail: React.FC<{
  picture: Picture;
  isSelected: boolean;
  onClick: () => void;
  isVisible: boolean;
  priority?: boolean;
}> = React.memo(({ picture, isSelected, onClick, isVisible, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const isVertical = picture.orientation === 'vertical';
  
  //  Responsive sizes for thumbnails
  const thumbnailSizes = isVertical 
    ? "(max-width: 768px) 120px, 150px"
    : "(max-width: 768px) 160px, 200px";

  return (
    <PictureThumbnail
      $selected={isSelected}
      $isVertical={isVertical}
      onClick={onClick}
    >
      {/*  Conditional rendering based on visibility and error state */}
      {isVisible && !imageError ? (
        <>
          {/*  Show loading state until image loads */}
          {!imageLoaded && <LoadingThumbnail />}
          <Image
            src={picture.editedImage}
            alt={picture.title}
            fill
            sizes={thumbnailSizes} //  Responsive sizes
            quality={60} //  Lower quality for thumbnails
            priority={priority} //  Priority for visible thumbnails
            onLoad={() => setImageLoaded(true)} //  Track load state
            onError={() => setImageError(true)} //  Track error state
            style={{ 
              objectFit: 'cover',
              userSelect: 'none',
              opacity: imageLoaded ? 1 : 0, //  Fade in when loaded
              transition: 'opacity 0.3s ease' //  Smooth transition
            }}
          />
          <ThumbnailOverlay />
          <PictureTitle>{picture.title}</PictureTitle>
        </>
      ) : imageError ? (
        //  Error state
        <ErrorThumbnail>
          Failed to load
        </ErrorThumbnail>
      ) : (
        //  Loading placeholder when not visible
        <LoadingThumbnail />
      )}
    </PictureThumbnail>
  );
});

OptimizedThumbnail.displayName = 'OptimizedThumbnail'; //  Display name for debugging

//  Hook for intersection observer (lazy loading)
const useIntersectionObserver = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<string, Element>>(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const updates: { id: string; isVisible: boolean }[] = [];
        
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-thumbnail-id');
          if (id) {
            updates.push({ id, isVisible: entry.isIntersecting });
          }
        });

        if (updates.length > 0) {
          setVisibleElements(prev => {
            const next = new Set(prev);
            updates.forEach(({ id, isVisible }) => {
              if (isVisible) {
                next.add(id);
              } else {
                next.delete(id);
              }
            });
            return next;
          });
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const observe = useCallback((id: string, element: Element | null) => {
    if (!observerRef.current) return;

    // Clean up previous element if it exists
    const previousElement = elementsRef.current.get(id);
    if (previousElement) {
      observerRef.current.unobserve(previousElement);
      elementsRef.current.delete(id);
    }

    // Observe new element if provided
    if (element) {
      element.setAttribute('data-thumbnail-id', id);
      observerRef.current.observe(element);
      elementsRef.current.set(id, element);
    }
  }, []);

  const isVisible = useCallback((id: string) => {
    return visibleElements.has(id);
  }, [visibleElements]);

  return { observe, isVisible };
};

const PictureCarousel: React.FC<PictureCarouselProps> = ({
  pictures,
  selectedPicture,
  onPictureSelect,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const { observe, isVisible } = useIntersectionObserver();
  const itemWidth = 216; // 200px + 16px gap
  const visibleItems = 5;
  const maxTranslateX = Math.max(0, (pictures.length - visibleItems) * itemWidth);

  //  Memoize navigation handlers to prevent re-renders
  const handlePrev = useCallback(() => {
    setTranslateX(Math.min(0, translateX + itemWidth * 2));
  }, [translateX, itemWidth]);

  const handleNext = useCallback(() => {
    setTranslateX(Math.max(-maxTranslateX, translateX - itemWidth * 2));
  }, [translateX, itemWidth, maxTranslateX]);

  //  Memoize picture selection handlers
  const pictureHandlers = useMemo(() => {
    return pictures.reduce((acc, picture) => {
      acc[picture.id] = () => onPictureSelect(picture);
      return acc;
    }, {} as Record<string, () => void>);
  }, [pictures, onPictureSelect]);

  // Calculate which thumbnails should have priority loading
  const getPriorityIndex = useCallback((index: number) => {
    const currentVisibleStart = Math.abs(translateX) / itemWidth;
    return index >= currentVisibleStart && index < currentVisibleStart + visibleItems;
  }, [translateX, itemWidth, visibleItems]);

  if (pictures.length === 0) {
    return null;
  }

  return (
     <CarouselContainer>
      <PrevButton
        onClick={handlePrev}
        disabled={translateX >= 0}
        aria-label="Previous images" //  Accessibility
      >
        ◀
      </PrevButton>
      
      <CarouselWrapper>
        <CarouselTrack $translateX={translateX}>
          {pictures.map((picture, index) => {
            // 🔧 FIXED: Simplified visibility check
            const thumbnailIsVisible = isVisible(picture.id) || getPriorityIndex(index);
            
            return (
              <div
                key={picture.id}
                ref={(el) => observe(picture.id, el)} 
              >
                <OptimizedThumbnail
                  picture={picture}
                  isSelected={selectedPicture?.id === picture.id}
                  onClick={pictureHandlers[picture.id]}
                  isVisible={thumbnailIsVisible}
                  priority={getPriorityIndex(index)}
                />
              </div>
            );
          })}
        </CarouselTrack>
      </CarouselWrapper>
      
      <NextButton
        onClick={handleNext}
        disabled={translateX <= -maxTranslateX}
        aria-label="Next images" //  Accessibility
      >
        ▶
      </NextButton>
    </CarouselContainer>
  );
};

export default PictureCarousel;