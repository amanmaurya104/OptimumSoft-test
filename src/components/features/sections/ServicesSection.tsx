import { useRef, useState, useMemo } from 'react';
import type { RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStaggeredScrollAnimation } from '../../../hooks/useScrollAnimations';
import { servicesData } from '../../../data/services';
import '../../../pages/Home/Hero.css';

export function ServicesSection() {
  const navigate = useNavigate();
  const servicesSectionRef = useRef<HTMLElement>(null);
  const serviceCard1Ref = useRef<HTMLDivElement>(null);
  const serviceCard2Ref = useRef<HTMLDivElement>(null);
  const serviceCard3Ref = useRef<HTMLDivElement>(null);
  const serviceCard4Ref = useRef<HTMLDivElement>(null);
  const serviceCard5Ref = useRef<HTMLDivElement>(null);
  const serviceCard6Ref = useRef<HTMLDivElement>(null);
  const serviceCard7Ref = useRef<HTMLDivElement>(null);
  const serviceCard8Ref = useRef<HTMLDivElement>(null);
  
  const serviceRefs = [
    serviceCard1Ref,
    serviceCard2Ref,
    serviceCard3Ref,
    serviceCard4Ref,
    serviceCard5Ref,
    serviceCard6Ref,
    serviceCard7Ref,
    serviceCard8Ref,
  ];
  
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isCard1Visible, setIsCard1Visible] = useState(false);
  const [isCard2Visible, setIsCard2Visible] = useState(false);
  const [isCard3Visible, setIsCard3Visible] = useState(false);
  const [isCard4Visible, setIsCard4Visible] = useState(false);
  const [isCard5Visible, setIsCard5Visible] = useState(false);
  const [isCard6Visible, setIsCard6Visible] = useState(false);
  const [isCard7Visible, setIsCard7Visible] = useState(false);
  const [isCard8Visible, setIsCard8Visible] = useState(false);

  const cardVisibilities = [
    isCard1Visible,
    isCard2Visible,
    isCard3Visible,
    isCard4Visible,
    isCard5Visible,
    isCard6Visible,
    isCard7Visible,
    isCard8Visible,
  ];

  const setCardVisibilities = [
    setIsCard1Visible,
    setIsCard2Visible,
    setIsCard3Visible,
    setIsCard4Visible,
    setIsCard5Visible,
    setIsCard6Visible,
    setIsCard7Visible,
    setIsCard8Visible,
  ];

  const servicesAnimationItems = useMemo(() => [
    { ref: servicesSectionRef, setVisible: setIsServicesVisible, delay: 0 },
    ...servicesData.map((_, index) => ({
      ref: serviceRefs[index],
      setVisible: setCardVisibilities[index],
      delay: (index + 1) * 100,
    })),
  ], []);

  useStaggeredScrollAnimation(servicesAnimationItems, 100);

  return (
    <div id="services" className="our-services-section">
      <h2 
        ref={servicesSectionRef as RefObject<HTMLHeadingElement>}
        className={`services-title ${isServicesVisible ? 'services-title-visible' : ''}`}
      >
        Our Services
      </h2>
      <div className="services-grid">
        {servicesData.map((service, index) => (
            <div 
              key={service.id}
              ref={serviceRefs[index]}
              className={`service-card service-card-with-bg ${cardVisibilities[index] ? 'service-card-visible' : ''}`}
              onClick={() => navigate(`/services/${service.id}`)}
              style={{
                backgroundImage: `url(${service.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">
                {service.shortDescription}
              </p>
            </div>
        ))}
      </div>
    </div>
  );
}

