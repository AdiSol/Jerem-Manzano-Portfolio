'use client';

import React, { useState, useEffect } from 'react';
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

const PictureContent: React.FC = () => {
  const [pictureData, setPictureData] = useState<PictureData | null>(null);
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadPictureData = async () => {
    // Define fallback data outside the try-catch
    const fallbackData: PictureData = {
      title: "Picture",
      description: "See the difference!",
      categories: [
        {
          id: "horizontal",
          name: "Horizontal",
          pictures: [
            {
              id: "landscape-1",
              title: "Sunset Landscape",
              description: "Enhanced colors and contrast in this beautiful sunset scene",
              category: "horizontal",
              rawImage: "/images/sample-raw.jpg",
              editedImage: "/images/sample-edited.jpg",
              orientation: "horizontal"
            }
          ]
        }
      ]
    };

    try {
      const response = await fetch('/api/pictures');
      const data = await response.json();
      setPictureData(data);
      
      // Set the first category as default
      if (data.categories && data.categories.length > 0) {
        const firstCategory = data.categories[0];
        setSelectedCategory(firstCategory.id);
        
        // Use the first picture in the first category
        if (firstCategory.pictures.length > 0) {
          setSelectedPicture(firstCategory.pictures[0]);
        }
      }
      
    } catch (error) {
      console.error('Error loading picture data:', error);
      // Use fallback data
      setPictureData(fallbackData);
      setSelectedCategory('horizontal');
      setSelectedPicture(fallbackData.categories[0].pictures[0]);
    } finally {
      setLoading(false);
    }
  };

  loadPictureData();
}, []);

  const handlePictureSelect = (picture: Picture) => {
    setSelectedPicture(picture);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // When switching categories, show the first picture in that category
    if (pictureData) {
      const category = pictureData.categories.find(cat => cat.id === categoryId);
      if (category && category.pictures.length > 0) {
        setSelectedPicture(category.pictures[0]);
      }
    }
  };

  const getCurrentCategoryPictures = () => {
    if (!pictureData || !selectedCategory) return [];
    
    const category = pictureData.categories.find(cat => cat.id === selectedCategory);
    return category ? category.pictures : [];
  };

  if (loading) {
    return (
      <PictureSection>
        <PictureHeader>
          <PictureTitle>Loading...</PictureTitle>
        </PictureHeader>
      </PictureSection>
    );
  }

  if (!pictureData) {
    return (
      <PictureSection>
        <PictureHeader>
          <PictureTitle>Error loading pictures</PictureTitle>
        </PictureHeader>
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
          onCategorySelect={handleCategoryFilter}
        />
      </PictureHeader>

      <ComparisonSection>
        {selectedPicture && (
          <BeforeAfterComparison
            picture={selectedPicture}
            key={selectedPicture.id} // Force re-render when picture changes
          />
        )}
      </ComparisonSection>

      <PictureCarousel
        pictures={getCurrentCategoryPictures()}
        selectedPicture={selectedPicture}
        onPictureSelect={handlePictureSelect}
      />
    </PictureSection>
  );
};

export default PictureContent;