'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { mediaQueries } from '../styles/mixins';
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 2rem;
  
  ${mediaQueries.md} {
    padding: 1.5rem;
  }
  
  ${mediaQueries.sm}{
    padding: 1rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  
  ${mediaQueries.md}{
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  
  ${mediaQueries.md}{
    width: 100%;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  
  ${mediaQueries.sm}{
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  ${mediaQueries.sm}{
    gap: 0.75rem;
  }
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    width: 45px;
    height: 45px;
  }
  
  ${mediaQueries.sm}{
    width: 36px;
    height: 36px;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  ${mediaQueries.md}{
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  ${mediaQueries.sm}{
    gap: 0.75rem;
  }
`;

const NavItem = styled.a`
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  ${mediaQueries.md}{
    margin-right: 1rem;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>Follow me</SectionTitle>
          <div>Jerem.M</div>
          <SocialIcons>
            <SocialIcon href="https://www.instagram.com/jeremiah.manzano/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://www.facebook.com/profile.php?id=61573035246039" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://www.youtube.com/@CapuleStudios" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialIcon>
            <SocialIcon href="https://www.tiktok.com/@capulestudios?_t=ZS-8wOhBpUKuCe&_r=1" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;