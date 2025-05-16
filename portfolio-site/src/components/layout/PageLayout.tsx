'use client';

import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Headers';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
}

const Main = styled.main`
  min-height: calc(100vh - 160px); // Adjust based on header/footer height
`;

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {

  useEffect(() => {
    // Disable right-click on images
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('.image-protected')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default PageLayout;
