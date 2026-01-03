import { useRef, useState, useMemo } from 'react';
import type { RefObject } from 'react';
import { useStaggeredScrollAnimation } from '../../../hooks/useScrollAnimations';
import '../../../pages/Home/Hero.css';

export function MembershipSection() {
  const membershipSectionRef = useRef<HTMLElement>(null);
  const membershipCard1Ref = useRef<HTMLDivElement>(null);
  const membershipCard2Ref = useRef<HTMLDivElement>(null);
  const membershipCard3Ref = useRef<HTMLDivElement>(null);
  const membershipCard4Ref = useRef<HTMLDivElement>(null);
  
  const [isMembershipVisible, setIsMembershipVisible] = useState(false);
  const [isMemberCard1Visible, setIsMemberCard1Visible] = useState(false);
  const [isMemberCard2Visible, setIsMemberCard2Visible] = useState(false);
  const [isMemberCard3Visible, setIsMemberCard3Visible] = useState(false);
  const [isMemberCard4Visible, setIsMemberCard4Visible] = useState(false);

  const membershipAnimationItems = useMemo(() => [
    { ref: membershipSectionRef, setVisible: setIsMembershipVisible, delay: 0 },
    { ref: membershipCard1Ref, setVisible: setIsMemberCard1Visible, delay: 0 },
    { ref: membershipCard2Ref, setVisible: setIsMemberCard2Visible, delay: 150 },
    { ref: membershipCard3Ref, setVisible: setIsMemberCard3Visible, delay: 300 },
    { ref: membershipCard4Ref, setVisible: setIsMemberCard4Visible, delay: 450 },
  ], []);

  useStaggeredScrollAnimation(membershipAnimationItems, 150);

  return (
    <div className="membership-section">
      <h2 
        ref={membershipSectionRef as RefObject<HTMLHeadingElement>}
        className={`membership-title ${isMembershipVisible ? 'membership-title-visible' : ''}`}
      >
        Our Membership & Achievement
      </h2>
      <div className="membership-grid">
        <div 
          ref={membershipCard1Ref}
          className={`membership-card ${isMemberCard1Visible ? 'membership-card-visible' : ''}`}
        >
          <div className="membership-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="6" />
              <polyline points="15.477 12.89 17 22 12 19 7 22 8.523 12.89" />
            </svg>
          </div>
          <h3 className="membership-card-title">ISO 9001:2015 Certified</h3>
          <p className="membership-card-description">
            Quality management systems certification for delivering excellence in all our services and solutions.
          </p>
        </div>

        <div 
          ref={membershipCard2Ref}
          className={`membership-card ${isMemberCard2Visible ? 'membership-card-visible' : ''}`}
        >
          <div className="membership-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18" />
              <path d="M5 21V7l8-4v18" />
              <path d="M19 21V11l-6-4" />
              <path d="M9 9v0" />
              <path d="M9 12v0" />
              <path d="M9 15v0" />
              <path d="M9 18v0" />
            </svg>
          </div>
          <h3 className="membership-card-title">Bajaj Finance</h3>
          <p className="membership-card-description">
            Partnered with Bajaj Finance for innovative financial solutions and digital transformation services.
          </p>
        </div>

        <div 
          ref={membershipCard3Ref}
          className={`membership-card ${isMemberCard3Visible ? 'membership-card-visible' : ''}`}
        >
          <div className="membership-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <h3 className="membership-card-title">Tata Finance</h3>
          <p className="membership-card-description">
            Collaborating with Tata Finance to deliver cutting-edge financial technology solutions and services.
          </p>
        </div>

        <div 
          ref={membershipCard4Ref}
          className={`membership-card ${isMemberCard4Visible ? 'membership-card-visible' : ''}`}
        >
          <div className="membership-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M12 6v6M7 13l5 5 5-5M7 19h10" />
            </svg>
          </div>
          <h3 className="membership-card-title">Industry Recognition</h3>
          <p className="membership-card-description">
            Award-winning team recognized for innovation, quality, and excellence in software development.
          </p>
        </div>
      </div>
    </div>
  );
}

