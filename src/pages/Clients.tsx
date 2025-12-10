import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/Clients.css';
import { Quote, Star, Award, TrendingUp, Users, Heart } from '../components/ui/icons';

const Footer = lazy(() => import('../components/layout/Footer').then(module => ({ default: module.Footer })));

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  featured: boolean;
}

interface Client {
  id: number;
  name: string;
  logo: string;
  industry: string;
  description: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechCorp Solutions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: 'OptimumSoft transformed our digital presence completely. Their expertise and attention to detail exceeded our expectations. The team delivered on time and within budget.',
    featured: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    company: 'InnovateLabs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Working with OptimumSoft has been a game-changer. Their technical expertise and innovative solutions helped us scale our platform efficiently. Highly recommended!',
    featured: true
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'Digital Dynamics',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    text: 'The team at OptimumSoft understood our vision from day one. They delivered a beautiful, functional product that our users love. Exceptional service!',
    featured: false
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Founder',
    company: 'StartupHub',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    rating: 5,
    text: 'OptimumSoft helped us build our MVP in record time. Their agile approach and technical excellence made all the difference. We couldn\'t be happier!',
    featured: false
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Director of Operations',
    company: 'Global Enterprises',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Professional, reliable, and results-driven. OptimumSoft delivered a solution that perfectly aligned with our business goals. Outstanding partnership!',
    featured: true
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'VP of Engineering',
    company: 'CloudTech Industries',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    text: 'The technical depth and problem-solving skills of the OptimumSoft team are impressive. They turned our complex requirements into elegant solutions.',
    featured: false
  }
];

// Helper function to create SVG logo as data URI
const createLogoSVG = (text: string, color: string) => {
  const svg = `<svg width="150" height="80" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="80" fill="${color}" rx="8"/>
    <text x="50%" y="50%" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const clients: Client[] = [
  { 
    id: 1, 
    name: 'TechCorp Solutions', 
    logo: createLogoSVG('TechCorp', '#667eea'), 
    industry: 'Technology', 
    description: 'Leading tech solutions provider' 
  },
  { 
    id: 2, 
    name: 'InnovateLabs', 
    logo: createLogoSVG('InnovateLabs', '#764ba2'), 
    industry: 'Innovation', 
    description: 'Cutting-edge innovation hub' 
  },
  { 
    id: 3, 
    name: 'Digital Dynamics', 
    logo: createLogoSVG('Digital', '#ec4899'), 
    industry: 'Digital Marketing', 
    description: 'Digital transformation experts' 
  },
  { 
    id: 4, 
    name: 'StartupHub', 
    logo: createLogoSVG('StartupHub', '#10b981'), 
    industry: 'Startups', 
    description: 'Startup ecosystem platform' 
  },
  { 
    id: 5, 
    name: 'Global Enterprises', 
    logo: createLogoSVG('Global', '#3b82f6'), 
    industry: 'Enterprise', 
    description: 'Global business solutions' 
  },
  { 
    id: 6, 
    name: 'CloudTech Industries', 
    logo: createLogoSVG('CloudTech', '#f59e0b'), 
    industry: 'Cloud Services', 
    description: 'Cloud infrastructure leader' 
  },
  { 
    id: 7, 
    name: 'FinanceFlow', 
    logo: createLogoSVG('FinanceFlow', '#8b5cf6'), 
    industry: 'FinTech', 
    description: 'Financial technology innovator' 
  },
  { 
    id: 8, 
    name: 'HealthCare Plus', 
    logo: createLogoSVG('HealthCare', '#06b6d4'), 
    industry: 'Healthcare', 
    description: 'Healthcare technology solutions' 
  }
];

export function Clients() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.filter(t => t.featured).length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredTestimonials = testimonials.filter(t => t.featured);

  return (
    <section ref={sectionRef} className="clients-section" id="clients">
      {/* Background with same styling as Hero */}
      <div className="clients-bg">
        <div className="clients-blob-1"></div>
        <div className="clients-blob-2"></div>
        <div className="clients-blob-3"></div>
      </div>

      {/* Animated Particles */}
      <div className="clients-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`clients-particle clients-particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="clients-container">
        {/* Header */}
        <div ref={elementRef as React.RefObject<HTMLDivElement>} className={`clients-header ${isVisible ? 'visible' : ''}`}>
          <div className="clients-badge">
            <Heart style={{ color: '#4f46e5' }} size={18} />
            <span>Client Success</span>
          </div>
          <h1 className="clients-title">
            <span>Trusted by</span>
            <span className="clients-title-gradient">Leading Companies</span>
          </h1>
          <p className="clients-subtitle">
            We're proud to partner with innovative businesses worldwide, delivering exceptional results that drive growth and success
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className={`clients-testimonial-carousel ${isVisible ? 'visible' : ''}`}>
          <div className="testimonial-carousel-wrapper">
            {featuredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-carousel-item ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-carousel-content">
                  <Quote className="testimonial-quote-icon" size={48} />
                  <p className="testimonial-carousel-text">{testimonial.text}</p>
                  <div className="testimonial-carousel-author">
                    <img src={testimonial.image} alt={testimonial.name} className="testimonial-carousel-avatar" />
                    <div className="testimonial-carousel-info">
                      <h4 className="testimonial-carousel-name">{testimonial.name}</h4>
                      <p className="testimonial-carousel-role">{testimonial.role} at {testimonial.company}</p>
                      <div className="testimonial-carousel-rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-carousel-dots">
            {featuredTestimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-carousel-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="clients-testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Clients Logos */}
        {/* <div className={`clients-logos-section ${isVisible ? 'visible' : ''}`}>
          <h2 className="clients-logos-title">Our Valued Partners</h2>
          <div className="clients-logos-grid">
            {clients.map((client, index) => (
              <div key={client.id} className="clients-logo-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={client.logo} alt={client.name} className="clients-logo-img" />
                <div className="clients-logo-overlay">
                  <h4 className="clients-logo-name">{client.name}</h4>
                  <p className="clients-logo-industry">{client.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Stats Section */}
        <div className={`clients-stats ${isVisible ? 'visible' : ''}`}>
          <div className="clients-stat-item">
            <div className="clients-stat-icon">
              <Users size={32} />
            </div>
            <div className="clients-stat-content">
              <h3 className="clients-stat-number">200+</h3>
              <p className="clients-stat-label">Happy Clients</p>
            </div>
          </div>
          <div className="clients-stat-item">
            <div className="clients-stat-icon">
              <Award size={32} />
            </div>
            <div className="clients-stat-content">
              <h3 className="clients-stat-number">98%</h3>
              <p className="clients-stat-label">Satisfaction Rate</p>
            </div>
          </div>
          <div className="clients-stat-item">
            <div className="clients-stat-icon">
              <TrendingUp size={32} />
            </div>
            <div className="clients-stat-content">
              <h3 className="clients-stat-number">500+</h3>
              <p className="clients-stat-label">Projects Completed</p>
            </div>
          </div>
          <div className="clients-stat-item">
            <div className="clients-stat-icon">
              <Star size={32} />
            </div>
            <div className="clients-stat-content">
              <h3 className="clients-stat-number">4.9/5</h3>
              <p className="clients-stat-label">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClientsPage() {
  return (
    <>
      <Clients />
      <Suspense fallback={<div style={{ minHeight: '100px', background: '#0a0a0a' }} />}>
        <Footer />
      </Suspense>
    </>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`testimonial-card ${isVisible ? 'visible' : ''} ${testimonial.featured ? 'featured' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="testimonial-card-header">
        <div className="testimonial-card-avatar-wrapper">
          <img src={testimonial.image} alt={testimonial.name} className="testimonial-card-avatar" />
          {testimonial.featured && (
            <div className="testimonial-card-badge">
              <Star size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
            </div>
          )}
        </div>
        <div className="testimonial-card-info">
          <h4 className="testimonial-card-name">{testimonial.name}</h4>
          <p className="testimonial-card-role">{testimonial.role}</p>
          <p className="testimonial-card-company">{testimonial.company}</p>
        </div>
      </div>
      <div className="testimonial-card-rating">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
        ))}
      </div>
      <Quote className="testimonial-card-quote" size={32} />
      <p className="testimonial-card-text">{testimonial.text}</p>
    </div>
  );
}

