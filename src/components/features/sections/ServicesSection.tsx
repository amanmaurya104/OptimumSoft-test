import { useRef, useState, useMemo } from 'react';
import type { RefObject } from 'react';
import { useStaggeredScrollAnimation } from '../../../hooks/useScrollAnimations';
import '../../../pages/Home/Hero.css';

export function ServicesSection() {
  const servicesSectionRef = useRef<HTMLElement>(null);
  const serviceCard1Ref = useRef<HTMLDivElement>(null);
  const serviceCard2Ref = useRef<HTMLDivElement>(null);
  const serviceCard3Ref = useRef<HTMLDivElement>(null);
  
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isCard1Visible, setIsCard1Visible] = useState(false);
  const [isCard2Visible, setIsCard2Visible] = useState(false);
  const [isCard3Visible, setIsCard3Visible] = useState(false);

  const servicesAnimationItems = useMemo(() => [
    { ref: servicesSectionRef, setVisible: setIsServicesVisible, delay: 0 },
    { ref: serviceCard1Ref, setVisible: setIsCard1Visible, delay: 0 },
    { ref: serviceCard2Ref, setVisible: setIsCard2Visible, delay: 150 },
    { ref: serviceCard3Ref, setVisible: setIsCard3Visible, delay: 300 },
  ], []);

  useStaggeredScrollAnimation(servicesAnimationItems, 150);

  return (
    <div id="services" className="our-services-section">
      <h2 
        ref={servicesSectionRef as RefObject<HTMLHeadingElement>}
        className={`services-title ${isServicesVisible ? 'services-title-visible' : ''}`}
      >
        Our Services
      </h2>
      <div className="services-grid">
        <div 
          ref={serviceCard1Ref}
          className={`service-card ${isCard1Visible ? 'service-card-visible' : ''}`}
        >
          <div className="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6v6H9z" />
            </svg>
          </div>
          <h3 className="service-card-title">Web Development</h3>
          <p className="service-card-description">
            Custom web applications built with modern technologies for optimal performance and user experience.
          </p>
        </div>

        <div 
          ref={serviceCard2Ref}
          className={`service-card ${isCard2Visible ? 'service-card-visible' : ''}`}
        >
          <div className="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 className="service-card-title">Mobile Apps</h3>
          <p className="service-card-description">
            Native and cross-platform mobile applications for iOS and Android with seamless user experience.
          </p>
        </div>

        <div 
          ref={serviceCard3Ref}
          className={`service-card ${isCard3Visible ? 'service-card-visible' : ''}`}
        >
          <div className="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <h3 className="service-card-title">Cloud Solutions</h3>
          <p className="service-card-description">
            Scalable cloud infrastructure and services to power your business with reliability and efficiency.
          </p>
        </div>
      </div>
    </div>
  );
}

