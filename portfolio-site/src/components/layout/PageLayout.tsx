'use client';

import React, { ReactNode } from 'react';
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
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default PageLayout;
