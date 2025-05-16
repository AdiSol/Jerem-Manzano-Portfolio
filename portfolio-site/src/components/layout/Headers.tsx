'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { mediaQueries } from '../styles/mixins';
import { usePathname } from 'next/navigation';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.secondary};
  
  ${mediaQueries.md} {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 10;
`;

interface NavProps {
  $isOpen: boolean;
}

const Nav = styled.nav<NavProps>`
  display: flex;
  gap: 1.5rem;
  
  ${mediaQueries.md} {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    max-width: 300px;
    flex-direction: column;
    background-color: ${props => props.theme.colors.secondary};
    padding: 5rem 2rem 2rem;
    gap: 2rem;
    transform: translateX(${props => props.$isOpen ? '0' : '100%'});
    transition: transform 0.3s ease-in-out;
    z-index: 5;
  }
`;

interface NavLinkProps {
  $active?: boolean;
}

const NavLink = styled(Link)<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
  
  ${mediaQueries.md} {
    width: 100%;
    text-align: center;
    padding: 0.75rem 1rem;
    display: block;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  
  ${mediaQueries.md} {
    display: block;
  }
`;

const Overlay = styled.div<NavProps>`
  display: none;
  
  ${mediaQueries.md} {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 4;
    opacity: ${props => props.$isOpen ? 1 : 0};
    pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
    transition: opacity 0.3s ease-in-out;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') {
      return true;
    }
    // For other pages, check if pathname starts with the path (to handle nested routes)
    if (path !== '/' && pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <HeaderContainer>
      <Logo>Jerem.M</Logo>
      
      <MenuButton onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </MenuButton>
      
      <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
      
      <Nav $isOpen={isMenuOpen}>
        <NavLink href="/" $active={isActive('/')}>
          Home
        </NavLink>
        {/* <NavLink href="/picture" $active={isActive('/picture')}>
          Picture
        </NavLink>
        <NavLink href="/video" $active={isActive('/video')}>
          Video
        </NavLink> */}
        <NavLink href="/contact" $active={isActive('/contact')}>
          Contact
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;