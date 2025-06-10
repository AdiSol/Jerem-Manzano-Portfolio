'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  ReactCompareSlider, 
  ReactCompareSliderImage,
  ReactCompareSliderHandle
} from 'react-compare-slider';
import { mediaQueries } from '../styles/mixins';
import Image from 'next/image';

const ComparisonContainer = styled.div<{ $isVertical: boolean }>`
  position: relative;
  width: 100%;
  max-width: ${props => props.$isVertical ? '500px' : '1200px'};
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  background: #f0f0f0;

  /* Different aspect ratios for different orientations */
  aspect-ratio: ${props => props.$isVertical ? '3 / 4' : '16 / 10'};
  
  ${mediaQueries.md} {
    max-width: ${props => props.$isVertical ? '400px' : '100%'};
  }
  
  ${mediaQueries.sm} {
    max-width: ${props => props.$isVertical ? '350px' : '100%'};
  }
`;

const LoadingPlaceholder = styled.div<{ $isVertical: boolean }>`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const ErrorPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666;
  font-size: 1rem;
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
  priority?: boolean;
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

const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px 0px' } // Start loading 50px before visible
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [setNode, isIntersecting] as const;
};


type ImageLoadState = 'idle' | 'loading' | 'loaded' | 'error';


const OptimizedCompareImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({ picture, priority = false }) => {
  const [position, setPosition] = useState(50);
  const isVertical = picture.orientation === 'vertical';
  const [rawImageState, setRawImageState] = useState<ImageLoadState>('idle');
  const [editedImageState, setEditedImageState] = useState<ImageLoadState>('idle');
  const [containerRef, isVisible] = useIntersectionObserver(0.1);
  const shouldLoadImages = priority || isVisible;

  useEffect(() => {
    if (!shouldLoadImages) return;

    const preloadImage = (src: string, setState: (state: ImageLoadState) => void) => {
      setState('loading');
      const img = new window.Image();
      
      img.onload = () => setState('loaded');
      img.onerror = () => setState('error');
      img.src = src;
    };

    preloadImage(picture.rawImage, setRawImageState);
    preloadImage(picture.editedImage, setEditedImageState);
  }, [shouldLoadImages, picture.rawImage, picture.editedImage])

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

  const imageSizes = isVertical 
    ? "(max-width: 768px) 350px, (max-width: 1024px) 400px, 500px"
    : "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px";

  const showPlaceholder = !shouldLoadImages || 
    (rawImageState === 'loading' || editedImageState === 'loading') ||
    (rawImageState === 'idle' || editedImageState === 'idle');

  const showError = rawImageState === 'error' || editedImageState === 'error';

  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";


  return (
     <>
      <ComparisonContainer 
        $isVertical={isVertical} 
        className="comparison-container"
        ref={containerRef} //  Ref for intersection observer
      >
        {/* Error state */}
        {showError ? (
          <ErrorPlaceholder>
            Failed to load images
          </ErrorPlaceholder>
        ) : showPlaceholder ? (
          //  Loading state
          <LoadingPlaceholder $isVertical={isVertical}>
            Loading comparison...
          </LoadingPlaceholder>
        ) : (
          // 🔄 MODIFY: Only render slider when images are loaded
          <>
            <ReactCompareSlider
              itemOne={
                <OptimizedCompareImage>
                  <Image
                    src={picture.rawImage}
                    alt={`${picture.title} - Before`}
                    fill
                    sizes={imageSizes} //  Responsive sizes
                    quality={85} //  Quality setting
                    priority={priority} //  Priority loading
                    placeholder="blur" //  Blur placeholder
                    blurDataURL={blurDataURL} //  Blur data URL
                    style={{ 
                      objectFit: 'cover',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                </OptimizedCompareImage>
              }
              itemTwo={
                <OptimizedCompareImage>
                  <Image
                    src={picture.editedImage}
                    alt={`${picture.title} - After`}
                    fill
                    sizes={imageSizes} //  Responsive sizes
                    quality={85} //  Quality setting
                    priority={priority} //  Priority loading
                    placeholder="blur" //  Blur placeholder
                    blurDataURL={blurDataURL} //  Blur data URL
                    style={{ 
                      objectFit: 'cover',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                </OptimizedCompareImage>
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
          </>
        )}
        
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
