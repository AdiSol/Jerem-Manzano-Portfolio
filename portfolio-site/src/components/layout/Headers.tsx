'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { mediaQueries } from '../styles/mixins';

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

// Use $ prefix for props that shouldn't be passed to the DOM
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

const NavLink = styled.a<NavLinkProps>`
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
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <HeaderContainer>
      <Logo>Jerem.M</Logo>
      
      <MenuButton onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </MenuButton>
      
      <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
      
      <Nav $isOpen={isMenuOpen}>
        <Link href="/" passHref>
          <NavLink $active onClick={closeMenu}>Home</NavLink>
        </Link>
        <Link href="/picture" passHref>
          <NavLink onClick={closeMenu}>Picture</NavLink>
        </Link>
        <Link href="/video" passHref>
          <NavLink onClick={closeMenu}>Video</NavLink>
        </Link>
        <Link href="/contact" passHref>
          <NavLink onClick={closeMenu}>Contact</NavLink>
        </Link>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;