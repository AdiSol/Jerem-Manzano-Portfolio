'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react'; //  useMemo, useCallback
import styled from 'styled-components';
import { mediaQueries } from '../styles/mixins';
import BeforeAfterComparison from './BeforeAfterComparison';
import PictureCarousel from './PictureCarousel';
import CategoryFilter from './CategoryFilter';

const PictureSection = styled.section`
  padding: 2rem 5% 4rem;
  background-color: ${props => props.theme.colors.background};
  min-height: calc(100vh - 160px);
  
  ${mediaQueries.md} {
    padding: 1.5rem 3% 3rem;
  }
  
  ${mediaQueries.sm} {
    padding: 1rem 2% 2rem;
  }
`;

const PictureHeader = styled.div`
  margin-bottom: 3rem;
  
  ${mediaQueries.sm} {
    margin-bottom: 2rem;
  }
`;

const PictureTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  ${mediaQueries.md} {
    font-size: 2.5rem;
  }
  
  ${mediaQueries.sm} {
    font-size: 2rem;
  }
`;

const PictureSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  
  ${mediaQueries.sm} {
    font-size: 1rem;
  }
`;

const ComparisonSection = styled.div`
  margin-bottom: 3rem;
  
  ${mediaQueries.sm} {
    margin-bottom: 2rem;
  }
`;

//  Enhanced loading indicator with progress
const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 1.1rem;
  opacity: 0.7;
  gap: 1rem;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: linear-gradient(90deg, #007bff, #0056b3);
  transition: width 0.3s ease;
`;

//  Error message with retry option
const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 1.1rem;
  color: #e74c3c;
  gap: 1rem;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  
  &:hover {
    background: #0056b3;
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

interface PictureData {
  title: string;
  description: string;
  categories: Array<{
    id: string;
    name: string;
    pictures: Picture[];
  }>;
}

//  Enhanced loading state interface
interface LoadingState {
  status: 'loading' | 'success' | 'error';
  progress: number;
  message: string;
}

//  Simple image cache for preloading
class SimpleImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private maxSize = 30; // Reasonable cache size

  preload(src: string): Promise<HTMLImageElement> {
    const cached = this.cache.get(src);
    if (cached) return Promise.resolve(cached);

    return new Promise((resolve, reject) => {
      // Clear old entries if cache is full
      if (this.cache.size >= this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        if (firstKey !== undefined) { 
          this.cache.delete(firstKey);
        }
      }

      const img = new Image();
      img.onload = () => {
        this.cache.set(src, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }
}

//  Create cache instance
const imageCache = new SimpleImageCache();

const PictureContent: React.FC = () => {
  const [pictureData, setPictureData] = useState<PictureData | null>(null);
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loadingState, setLoadingState] = useState<LoadingState>({ //  Enhanced loading state
    status: 'loading',
    progress: 0,
    message: 'Loading pictures...'
  });

  //  Preload critical images function
  const preloadCriticalImages = useCallback(async (data: PictureData) => {
    if (!data.categories.length) return;

    const firstCategory = data.categories[0];
    if (!firstCategory.pictures.length) return;

    const firstPicture = firstCategory.pictures[0];
    
    try {
      setLoadingState(prev => ({ 
        ...prev, 
        message: 'Preloading critical images...',
        progress: 60 
      }));

      // Preload the first image's before/after
      await Promise.all([
        imageCache.preload(firstPicture.rawImage),
        imageCache.preload(firstPicture.editedImage)
      ]);

      setLoadingState(prev => ({ 
        ...prev, 
        progress: 80 
      }));

      // Preload first few thumbnails
      const thumbnailsToPreload = firstCategory.pictures
        .slice(0, 4)
        .map(p => p.editedImage);
      
      await Promise.all(
        thumbnailsToPreload.map(src => imageCache.preload(src))
      );

      setLoadingState(prev => ({ 
        ...prev, 
        progress: 100,
        message: 'Ready!'
      }));

    } catch (error) {
      console.warn('Failed to preload some images:', error);
      // Continue anyway, just log the warning
    }
  }, []);

  useEffect(() => {
    const loadPictureData = async () => {
      //  Enhanced fallback data
      const fallbackData: PictureData = {
        title: "Picture Portfolio",
        description: "Professional photo editing showcase - using offline content",
        categories: [
          {
            id: "landscape",
            name: "Landscape",
            pictures: [
              {
                id: "landscape-1",
                title: "Mountain Sunrise",
                description: "Enhanced colors and contrast in this stunning mountain landscape",
                category: "landscape",
                rawImage: "/images/PICC March 8, 2025 Picture 21 raw.jpg",
                editedImage: "/images/PICC March 8, 2025 Picture 21 edit.jpg",
                orientation: "horizontal"
              }
            ]
          },
          {
            id: "portrait",
            name: "Portrait", 
            pictures: [
              {
                id: "portrait-1",
                title: "Studio Portrait",
                description: "Professional retouching and color grading",
                category: "portrait",
                rawImage: "/images/Cosplay-Carnival-42 raw.jpg",
                editedImage: "/images/Cosplay-Carnival-42 edit.jpg",
                orientation: "vertical"
              }
            ]
          }
        ]
      };

      try {
        //  Progress updates
        setLoadingState({
          status: 'loading',
          progress: 10,
          message: 'Fetching picture data...'
        });

        const response = await fetch('/api/pictures');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        setLoadingState(prev => ({ 
          ...prev, 
          progress: 30,
          message: 'Processing data...'
        }));
        
        const data = await response.json();
        
        setLoadingState(prev => ({ 
          ...prev, 
          progress: 50,
          message: 'Setting up gallery...'
        }));

        setPictureData(data);
        
        // Set the first category as default
        if (data.categories && data.categories.length > 0) {
          const firstCategory = data.categories[0];
          setSelectedCategory(firstCategory.id);
          
          if (firstCategory.pictures.length > 0) {
            setSelectedPicture(firstCategory.pictures[0]);
          }
        }

        //  Preload critical images
        await preloadCriticalImages(data);
        
        setLoadingState({
          status: 'success',
          progress: 100,
          message: 'Gallery ready!'
        });
        
      } catch (error) {
        console.error('Error loading picture data:', error);
        
        //  Better error handling with fallback
        setPictureData(fallbackData);
        setSelectedCategory('landscape');
        setSelectedPicture(fallbackData.categories[0].pictures[0]);
        
        // Still preload fallback images
        await preloadCriticalImages(fallbackData);
        
        setLoadingState({
          status: 'success', // Still show content with fallback
          progress: 100,
          message: 'Using offline content'
        });
      }
    };

    loadPictureData();
  }, [preloadCriticalImages]); //  Dependency

  //  Optimized picture selection handler with preloading
  const handlePictureSelect = useCallback((picture: Picture) => {
    setSelectedPicture(picture);
    
    // Preload the newly selected picture's images in background
    Promise.all([
      imageCache.preload(picture.rawImage),
      imageCache.preload(picture.editedImage)
    ]).catch(error => {
      console.warn('Failed to preload selected picture:', error);
    });
  }, []);

  //  Optimized category filter handler with preloading
  const handleCategoryFilter = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    
    if (pictureData) {
      const category = pictureData.categories.find(cat => cat.id === categoryId);
      if (category && category.pictures.length > 0) {
        const firstPicture = category.pictures[0];
        setSelectedPicture(firstPicture);
        
        //  Preload first few images in the new category
        const imagesToPreload = category.pictures
          .slice(0, 3)
          .flatMap(p => [p.rawImage, p.editedImage]);
        
        Promise.all(
          imagesToPreload.map(src => imageCache.preload(src))
        ).catch(error => {
          console.warn('Failed to preload category images:', error);
        });
      }
    }
  }, [pictureData]);

  //  Retry function for error state
  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  //  Memoize current category pictures
  const currentCategoryPictures = useMemo(() => {
    if (!pictureData || !selectedCategory) return [];
    
    const category = pictureData.categories.find(cat => cat.id === selectedCategory);
    return category ? category.pictures : [];
  }, [pictureData, selectedCategory]);

  //  Enhanced loading state rendering
  if (loadingState.status === 'loading') {
    return (
      <PictureSection>
        <LoadingIndicator>
          <div>{loadingState.message}</div>
          <ProgressBar>
            <ProgressFill $progress={loadingState.progress} />
          </ProgressBar>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            {loadingState.progress}%
          </div>
        </LoadingIndicator>
      </PictureSection>
    );
  }

  //  Enhanced error state rendering
  if (loadingState.status === 'error') {
    return (
      <PictureSection>
        <ErrorMessage>
          <div>Failed to load pictures</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            Please check your connection and try again
          </div>
          <RetryButton onClick={handleRetry}>
            Retry
          </RetryButton>
        </ErrorMessage>
      </PictureSection>
    );
  }

  if (!pictureData) {
    return (
      <PictureSection>
        <ErrorMessage>
          <div>No picture data available</div>
          <RetryButton onClick={handleRetry}>
            Reload Page
          </RetryButton>
        </ErrorMessage>
      </PictureSection>
    );
  }

  return (
    <PictureSection>
      <PictureHeader>
        <PictureTitle>{pictureData.title}</PictureTitle>
        <PictureSubtitle>{pictureData.description}</PictureSubtitle>
        
        <CategoryFilter
          categories={pictureData.categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategoryFilter} //  Use optimized handler
        />
      </PictureHeader>

      <ComparisonSection>
        {selectedPicture && (
          <BeforeAfterComparison
            picture={selectedPicture}
            priority={true} //  Main comparison always gets priority
            key={selectedPicture.id} // Force re-render when picture changes
          />
        )}
      </ComparisonSection>

      <PictureCarousel
        pictures={currentCategoryPictures} //  Use memoized pictures
        selectedPicture={selectedPicture}
        onPictureSelect={handlePictureSelect} //  Use optimized handler
      />
    </PictureSection>
  );
};

export default PictureContent;