import { useEffect } from 'react';

/**
 * CursorEffects component
 * Handles cursor interaction with floating icons using optimized throttling
 */
export function CursorEffects() {
  useEffect(() => {
    let ticking = false;
    let lastX = 0;
    let lastY = 0;
    const iconsCache: HTMLElement[] = [];

    const updateIcons = () => {
      iconsCache.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const iconX = rect.left + rect.width / 2;
        const iconY = rect.top + rect.height / 2;
        
        const deltaX = lastX - iconX;
        const deltaY = lastY - iconY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 150) {
          const moveX = (deltaX / distance) * 20;
          const moveY = (deltaY / distance) * 20;
          const scale = 1 + (150 - distance) / 150 * 0.3;
          
          icon.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${scale})`;
          icon.style.opacity = `${0.2 + (150 - distance) / 150 * 0.6}`;
        } else {
          icon.style.transform = '';
          icon.style.opacity = '0.2';
        }
      });
      ticking = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      
      if (!ticking) {
        requestAnimationFrame(updateIcons);
        ticking = true;
      }
    };

    // Cache icons on mount and re-check periodically for lazy-loaded icons
    const initializeIcons = () => {
      iconsCache.length = 0;
      document.querySelectorAll('.cursor-interactive').forEach((icon) => {
        iconsCache.push(icon as HTMLElement);
      });
    };

    // Initialize immediately
    initializeIcons();
    
    // Re-initialize after a short delay to catch lazy-loaded icons
    const timeoutId = setTimeout(() => {
      initializeIcons();
    }, 500);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
      iconsCache.length = 0;
    };
  }, []);

  return null; // This component doesn't render anything
}

