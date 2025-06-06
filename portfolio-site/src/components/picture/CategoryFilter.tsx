'use client';

import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../styles/mixins';

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  
  ${mediaQueries.sm} {
    gap: 0.5rem;
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  background-color: ${props => props.$active ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.2)'};
  }
  
  ${mediaQueries.sm} {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

interface CategoryFilterProps {
  categories: Array<{
    id: string;
    name: string;
  }>;
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <FilterContainer>
      {categories.map((category) => (
        <FilterButton
          key={category.id}
          $active={selectedCategory === category.id}
          onClick={() => onCategorySelect(category.id)}
        >
          {category.name}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default CategoryFilter;