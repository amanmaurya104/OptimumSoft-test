import { useRef, lazy, Suspense } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/About.css';
import { Award, Users, Target, Heart, TrendingUp, Star, Shield, Clock } from '../components/ui/icons';

const Footer = lazy(() => import('../components/layout/Footer').then(module => ({ default: module.Footer })));

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
}

interface Value {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Smith',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    bio: 'Visionary leader with 20+ years of experience in software development and business strategy.',
    linkedin: '#'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    bio: 'Technology expert specializing in cloud architecture and scalable solutions.',
    linkedin: '#'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    bio: 'Creative director passionate about user experience and innovative design solutions.',
    linkedin: '#'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    role: 'VP of Engineering',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    bio: 'Engineering leader focused on building robust and efficient software systems.',
    linkedin: '#'
  }
];

const values: Value[] = [
  {
    id: 1,
    title: 'Innovation',
    description: 'We constantly push boundaries and embrace cutting-edge technologies to deliver exceptional solutions.',
    icon: TrendingUp
  },
  {
    id: 2,
    title: 'Excellence',
    description: 'We strive for perfection in every project, ensuring the highest quality standards in our deliverables.',
    icon: Star
  },
  {
    id: 3,
    title: 'Integrity',
    description: 'We build trust through transparency, honesty, and ethical practices in all our business relationships.',
    icon: Shield
  },
  {
    id: 4,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and work closely with clients to achieve shared success.',
    icon: Users
  }
];

export function About() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      {/* Background with same styling as Hero */}
      <div className="about-bg">
        <div className="about-blob-1"></div>
        <div className="about-blob-2"></div>
        <div className="about-blob-3"></div>
      </div>

      {/* Animated Particles */}
      <div className="about-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`about-particle about-particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="about-container">
        {/* Header */}
        <div ref={elementRef as React.RefObject<HTMLDivElement>} className={`about-header ${isVisible ? 'visible' : ''}`}>
          <div className="about-badge">
            <Heart style={{ color: '#4f46e5' }} size={18} />
            <span>Our Story</span>
          </div>
          <h1 className="about-title">
            <span>About</span>
            <span className="about-title-gradient">OptimumSoft</span>
          </h1>
          <p className="about-subtitle">
            We are a team of passionate innovators dedicated to transforming ideas into powerful digital solutions
          </p>
        </div>

        {/* Mission Section */}
        <div className={`about-mission ${isVisible ? 'visible' : ''}`}>
          <div className="about-mission-content">
            <div className="about-mission-icon">
              <Target size={48} />
            </div>
            <h2 className="about-mission-title">Our Mission</h2>
            <p className="about-mission-text">
              To empower businesses worldwide with cutting-edge software solutions that drive growth, 
              enhance efficiency, and create lasting value. We combine technical expertise with creative 
              problem-solving to deliver exceptional results that exceed expectations.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`about-stats ${isVisible ? 'visible' : ''}`}>
          <div className="about-stat-item">
            <div className="about-stat-icon">
              <Clock size={32} />
            </div>
            <div className="about-stat-content">
              <h3 className="about-stat-number">15+</h3>
              <p className="about-stat-label">Years Experience</p>
            </div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-icon">
              <Users size={32} />
            </div>
            <div className="about-stat-content">
              <h3 className="about-stat-number">200+</h3>
              <p className="about-stat-label">Team Members</p>
            </div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-icon">
              <TrendingUp size={32} />
            </div>
            <div className="about-stat-content">
              <h3 className="about-stat-number">500+</h3>
              <p className="about-stat-label">Projects Delivered</p>
            </div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-icon">
              <Award size={32} />
            </div>
            <div className="about-stat-content">
              <h3 className="about-stat-number">50+</h3>
              <p className="about-stat-label">Awards Won</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`about-values ${isVisible ? 'visible' : ''}`}>
          <h2 className="about-values-title">Our Core Values</h2>
          <div className="about-values-grid">
            {values.map((value, index) => (
              <ValueCard key={value.id} value={value} index={index} />
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className={`about-team ${isVisible ? 'visible' : ''}`}>
          <h2 className="about-team-title">Meet Our Leadership Team</h2>
          <p className="about-team-subtitle">The talented individuals driving our success</p>
          <div className="about-team-grid">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className={`about-why ${isVisible ? 'visible' : ''}`}>
          <h2 className="about-why-title">Why Choose OptimumSoft?</h2>
          <div className="about-why-grid">
            <div className="about-why-item">
              <div className="about-why-icon">
                <Shield size={32} />
              </div>
              <h3 className="about-why-item-title">ISO Certified</h3>
              <p className="about-why-item-text">ISO 9001:2015 certified for quality management systems</p>
            </div>
            <div className="about-why-item">
              <div className="about-why-icon">
                <Star size={32} />
              </div>
              <h3 className="about-why-item-title">Proven Track Record</h3>
              <p className="about-why-item-text">15+ years of delivering successful projects across industries</p>
            </div>
            <div className="about-why-item">
              <div className="about-why-icon">
                <Users size={32} />
              </div>
              <h3 className="about-why-item-title">Expert Team</h3>
              <p className="about-why-item-text">200+ skilled professionals with diverse expertise</p>
            </div>
            <div className="about-why-item">
              <div className="about-why-icon">
                <Heart size={32} />
              </div>
              <h3 className="about-why-item-title">Client-Centric</h3>
              <p className="about-why-item-text">98% client satisfaction rate with long-term partnerships</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({ value, index }: { value: Value; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const Icon = value.icon;

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`about-value-card ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="about-value-icon">
        <Icon size={32} />
      </div>
      <h3 className="about-value-title">{value.title}</h3>
      <p className="about-value-description">{value.description}</p>
    </div>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`about-team-card ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="about-team-card-image-wrapper">
        <img src={member.image} alt={member.name} className="about-team-card-image" />
        <div className="about-team-card-overlay">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="about-team-card-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="about-team-card-content">
        <h3 className="about-team-card-name">{member.name}</h3>
        <p className="about-team-card-role">{member.role}</p>
        <p className="about-team-card-bio">{member.bio}</p>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <>
      <About />
      <Suspense fallback={<div style={{ minHeight: '100px', background: '#0a0a0a' }} />}>
        <Footer />
      </Suspense>
    </>
  );
}

