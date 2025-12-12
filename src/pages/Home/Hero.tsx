import { useState, useEffect, lazy, Suspense } from 'react';
import type { RefObject } from 'react';
import './Hero.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Sparkles, ArrowRight, TrendingUp, Clock, Shield, Star, Award } from '../../components/ui/icons';

// Lazy load non-critical components for better LCP performance
const FloatingIcons = lazy(() => import('../../components/features/FloatingIcons').then(module => ({ default: module.FloatingIcons })));
const CursorEffects = lazy(() => import('../../components/features/CursorEffects').then(module => ({ default: module.CursorEffects })));
const TrustedBySection = lazy(() => import('../../components/features/sections/TrustedBySection').then(module => ({ default: module.TrustedBySection })));
const ServicesSection = lazy(() => import('../../components/features/sections/ServicesSection').then(module => ({ default: module.ServicesSection })));
const MembershipSection = lazy(() => import('../../components/features/sections/MembershipSection').then(module => ({ default: module.MembershipSection })));
const ContactSection = lazy(() => import('../../components/features/sections/ContactSection').then(module => ({ default: module.ContactSection })));

export function Hero() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "We're ready for your next project! Transform your ideas into powerful digital solutions with cutting-edge technology.";
  const highlightText = "next project!";

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 50; // milliseconds per character

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  // Find the position of the highlight text in the full text
  const highlightStart = fullText.indexOf(highlightText);
  const highlightEnd = highlightStart + highlightText.length;

  const renderTextWithHighlight = () => {
    if (displayedText.length === 0) return null;

    const beforeHighlight = displayedText.slice(0, highlightStart);
    const highlight = displayedText.slice(highlightStart, Math.min(highlightEnd, displayedText.length));
    const afterHighlight = displayedText.slice(highlightEnd);

    return (
      <>
        {beforeHighlight}
        {highlight && <span className="hero-description-highlight">{highlight}</span>}
        {afterHighlight}
        {displayedText.length < fullText.length && <span className="typing-cursor">|</span>}
      </>
    );
  };

  const features = [
    { icon: TrendingUp, text: '500+ Projects Delivered' },
    { icon: Clock, text: '15+ Years Experience' },
    { icon: Shield, text: 'ISO 9001:2015 Certified' },
    { icon: Star, text: '4.9/5 Client Rating' },
  ];

  return (
    <section ref={elementRef as RefObject<HTMLElement>} className={`hero-section ${isVisible ? 'visible' : ''}`}>
      <div className="hero-bg">
        <div className="hero-blob-1"></div>
        <div className="hero-blob-2"></div>
        <div className="hero-blob-3"></div>
      </div>

      {/* Floating Icons - Lazy loaded for performance */}
      <Suspense fallback={null}>
        <FloatingIcons />
      </Suspense>

      {/* Cursor Effects - Lazy loaded for performance */}
      <Suspense fallback={null}>
        <CursorEffects />
      </Suspense>

      {/* Animated Particles */}
      <div className="hero-particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge">
            <Sparkles style={{ color: '#4f46e5' }} size={18} />
            <span className="hero-badge-text">
              Trusted by 200+ Companies Worldwide
            </span>
          </div>

          <div className="hero-text-wrapper">
            <h1 className="hero-title">
              <span>Transform Your Ideas Into </span>
              <span className="hero-title-gradient">Digital Excellence</span>
            </h1>
            <p className="hero-description typing-effect">
              {renderTextWithHighlight()}
            </p>
          </div>

          <div className="hero-buttons" style={{ justifyContent: 'center' }}>
            <button className="btn-hero-primary" onClick={() => {
              const contact = document.getElementById('contact');
              if (contact) {
                const headerHeight = 80;
                const elementPosition = contact.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}>
              <span style={{ position: 'relative', zIndex: 10 }}>
                Get Started Today
              </span>
              <ArrowRight size={20} style={{ position: 'relative', zIndex: 10 }} />
            </button>
            
            <button className="btn-hero-secondary" onClick={() => {
              const portfolio = document.getElementById('portfolio');
              if (portfolio) {
                const headerHeight = 80;
                const elementPosition = portfolio.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}>
              View Our Work
            </button>
          </div>

          <div className="hero-features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <Icon size={20} />
                  </div>
                  <span className="hero-feature-text">{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className="hero-trust" style={{ justifyContent: 'center' }}>
            <div className="trust-avatars">
              <div className="avatar-group">
                <div className="avatar avatar-1"></div>
                <div className="avatar avatar-2"></div>
                <div className="avatar avatar-3"></div>
                <div className="avatar avatar-4">+197</div>
              </div>
              <div>
                <p className="trust-text-title">200+ Happy Clients</p>
                <p className="trust-text-subtitle">Trust Our Expertise</p>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="trust-avatars">
              <Award style={{ color: '#eab308' }} size={32} />
              <div>
                <p className="trust-text-title">ISO Certified</p>
                <p className="trust-text-subtitle">Quality Assured</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section - Lazy loaded for performance */}
      <Suspense fallback={<div style={{ minHeight: '150px' }} />}>
        <TrustedBySection />
      </Suspense>

      {/* Below-the-fold sections - Lazy loaded for better LCP */}
      <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
        <MembershipSection />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
        <ContactSection />
      </Suspense>
    </section>
  );
}
