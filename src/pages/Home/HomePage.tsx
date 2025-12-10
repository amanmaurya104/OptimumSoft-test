import { lazy, Suspense } from 'react';
import { Hero } from './Hero';
import './Hero.css';

// Lazy load Footer component - below the fold, non-critical for initial render
const Footer = lazy(() => import('../../components/layout/Footer').then(module => ({ default: module.Footer })));

export function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div style={{ minHeight: '100px', background: '#0f172a' }} />}>
        <Footer />
      </Suspense>
    </>
  );
}

