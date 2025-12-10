import { useEffect, useRef, useCallback } from 'react';
import type { RefObject } from 'react';

interface ScrollAnimationItem {
  ref: RefObject<HTMLElement | null>;
  setVisible: (visible: boolean) => void;
  delay?: number;
}

interface UseScrollAnimationsOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimations(
  items: ScrollAnimationItem[],
  options: UseScrollAnimationsOptions = {}
) {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -50px 0px',
  } = options;

  // Store item mappings in a ref to avoid dependency issues
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    if (items.length === 0) return;

    // Single observer for all items
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the corresponding item
            const item = itemsRef.current.find(
              (item) => item.ref.current === entry.target
            );
            if (item) {
              const delay = item.delay ?? 0;
              // Simplified retrigger - remove double RAF
              item.setVisible(false);
              const timeoutId = setTimeout(() => {
                item.setVisible(true);
              }, delay + 10);
              
              // Store timeout for cleanup
              (entry.target as any).__animationTimeout = timeoutId;
            }
          } else {
            // Clean up timeout if element leaves viewport
            const timeoutId = (entry.target as any).__animationTimeout;
            if (timeoutId) {
              clearTimeout(timeoutId);
              delete (entry.target as any).__animationTimeout;
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe all items
    const observedElements: HTMLElement[] = [];
    itemsRef.current.forEach((item) => {
      if (item.ref.current) {
        observer.observe(item.ref.current);
        observedElements.push(item.ref.current);
      }
    });

    return () => {
      // Clean up timeouts
      observedElements.forEach((el) => {
        const timeoutId = (el as any).__animationTimeout;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [threshold, rootMargin]);
}

// Helper hook for staggered animations
export function useStaggeredScrollAnimation(
  items: ScrollAnimationItem[],
  baseDelay: number = 150,
  options: UseScrollAnimationsOptions = {}
) {
  const processedItems = items.map((item, index) => ({
    ...item,
    delay: item.delay !== undefined ? item.delay : index * baseDelay,
  }));

  useScrollAnimations(processedItems, options);
}

