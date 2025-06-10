/**
 * Get optimal image quality based on device and connection
 */
export const getOptimalQuality = (): number => {
  if (typeof window === 'undefined') return 75;

  // Check for slow connection
  const connection = (navigator as any).connection;
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 50;
    }
    if (connection.effectiveType === '3g') {
      return 65;
    }
  }

  // Check for data saver mode
  if (connection?.saveData) {
    return 50;
  }

  return 75;
};

/**
 * Generate responsive image sizes string based on breakpoints
 */
export const generateResponsiveSizes = (
  maxWidths: { mobile: number; tablet: number; desktop: number }
): string => {
  return `(max-width: 768px) ${maxWidths.mobile}px, (max-width: 1024px) ${maxWidths.tablet}px, ${maxWidths.desktop}px`;
};

/**
 * Generate blur placeholder data URL
 */
export const generateBlurDataURL = (width: number = 8, height: number = 8): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Preload critical images
 */
export const preloadImages = (imagePaths: string[]): void => {
  if (typeof window === 'undefined') return;

  imagePaths.forEach((path) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Memory-efficient image cache
 */
export class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private maxSize: number;

  constructor(maxSize: number = 30) {
    this.maxSize = maxSize;
  }

  get(src: string): HTMLImageElement | undefined {
    return this.cache.get(src);
  }

  set(src: string, img: HTMLImageElement): void {
    // 🔧 FIX: Proper type checking for firstKey
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) { // 🔧 FIX: Check if firstKey exists before deleting
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(src, img);
  }

  preload(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const cached = this.get(src);
      if (cached) {
        resolve(cached);
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.set(src, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Export a default instance
export const imageCache = new ImageCache();