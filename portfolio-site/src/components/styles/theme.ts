export const theme = {
    colors: {
      primary: '#5425FB',       // The purple color from the navigation
      secondary: '#000000',     // Black
      text: '#FFFFFF',          // White text
      background: '#1A1A1A',    // Dark background
      accent: '#F8C12C'         // A gold accent color for highlights
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
  
export type Theme = typeof theme;