import 'styled-components';

// Define our theme structure
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
      accent: string;
    };
    fonts: {
      main: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}

// src/styles/theme.ts
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#5425FB',
    secondary: '#000000',
    text: '#FFFFFF',
    background: '#1A1A1A',
    accent: '#F8C12C'
  },
  fonts: {
    main: "'Inter', 'Helvetica', 'Arial', sans-serif"
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
};