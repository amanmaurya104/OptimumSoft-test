import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/Portfolio.css';
import { ExternalLink, Github, Star, TrendingUp } from '../components/ui/icons';

const Footer = lazy(() => import('../components/layout/Footer').then(module => ({ default: module.Footer })));

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Application',
    description: 'A modern e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 2,
    title: 'Healthcare Management System',
    category: 'Enterprise Solution',
    description: 'Comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine capabilities.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
    link: '#',
    featured: true
  },
  {
    id: 3,
    title: 'FinTech Mobile App',
    category: 'Mobile Application',
    description: 'Secure mobile banking application with biometric authentication, investment tracking, and instant money transfers.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Firebase', 'Stripe', 'AWS'],
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 4,
    title: 'AI-Powered Analytics Dashboard',
    category: 'Data Analytics',
    description: 'Advanced analytics platform with machine learning insights, real-time data visualization, and predictive modeling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js'],
    link: '#',
    github: '#',
    featured: false
  },
  {
    id: 5,
    title: 'Real Estate Platform',
    category: 'Web Application',
    description: 'Interactive real estate marketplace with virtual property tours, mortgage calculator, and agent matching system.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Mapbox'],
    link: '#',
    featured: true
  },
  {
    id: 6,
    title: 'SaaS Project Management Tool',
    category: 'SaaS Platform',
    description: 'Collaborative project management solution with team collaboration, time tracking, and automated reporting features.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    technologies: ['Angular', 'NestJS', 'MySQL', 'Redis'],
    link: '#',
    github: '#',
    featured: false
  }
];

export function Portfolio() {
  const [filter, setFilter] = useState<string>('All');
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioItems);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  useEffect(() => {
    if (filter === 'All') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === filter));
    }
  }, [filter]);

  return (
    <section ref={sectionRef} className="portfolio-section" id="portfolio">
      {/* Background with same styling as Hero */}
      <div className="portfolio-bg">
        <div className="portfolio-blob-1"></div>
        <div className="portfolio-blob-2"></div>
        <div className="portfolio-blob-3"></div>
      </div>

      {/* Animated Particles */}
      <div className="portfolio-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`portfolio-particle portfolio-particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="portfolio-container">
        <div ref={elementRef as React.RefObject<HTMLDivElement>} className={`portfolio-header ${isVisible ? 'visible' : ''}`}>
          <div className="portfolio-badge">
            <Star size={18} />
            <span>Our Work</span>
          </div>
          <h1 className="portfolio-title">
            <span>Featured</span>
            <span className="portfolio-title-gradient">Portfolio</span>
          </h1>
          <p className="portfolio-subtitle">
            Discover our innovative solutions and successful projects that have transformed businesses worldwide
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`portfolio-filters ${isVisible ? 'visible' : ''}`}>
          {categories.map((category) => (
            <button
              key={category}
              className={`portfolio-filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <div className={`portfolio-stats ${isVisible ? 'visible' : ''}`}>
          <div className="portfolio-stat-item">
            <div className="portfolio-stat-icon">
              <TrendingUp size={32} />
            </div>
            <div className="portfolio-stat-content">
              <h3 className="portfolio-stat-number">500+</h3>
              <p className="portfolio-stat-label">Projects Delivered</p>
            </div>
          </div>
          <div className="portfolio-stat-item">
            <div className="portfolio-stat-icon">
              <Star size={32} />
            </div>
            <div className="portfolio-stat-content">
              <h3 className="portfolio-stat-number">4.9/5</h3>
              <p className="portfolio-stat-label">Client Rating</p>
            </div>
          </div>
          <div className="portfolio-stat-item">
            <div className="portfolio-stat-icon">
              <TrendingUp size={32} />
            </div>
            <div className="portfolio-stat-content">
              <h3 className="portfolio-stat-number">200+</h3>
              <p className="portfolio-stat-label">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortfolioPage() {
  return (
    <>
      <Portfolio />
      <Suspense fallback={<div style={{ minHeight: '100px', background: '#0a0a0a' }} />}>
        <Footer />
      </Suspense>
    </>
  );
}

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`portfolio-card ${isVisible ? 'visible' : ''} ${item.featured ? 'featured' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="portfolio-card-image-wrapper">
        <div className="portfolio-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
        <div className={`portfolio-card-overlay ${isHovered ? 'hovered' : ''}`}>
          <div className="portfolio-card-actions">
            {item.link && (
              <a href={item.link} className="portfolio-card-action" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={20} />
                <span>View Live</span>
              </a>
            )}
            {item.github && (
              <a href={item.github} className="portfolio-card-action" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
        {item.featured && (
          <div className="portfolio-card-badge">
            <Star size={16} />
            <span>Featured</span>
          </div>
        )}
      </div>
      <div className="portfolio-card-content">
        <div className="portfolio-card-category">{item.category}</div>
        <h3 className="portfolio-card-title">{item.title}</h3>
        <p className="portfolio-card-description">{item.description}</p>
        <div className="portfolio-card-tech">
          {item.technologies.map((tech, i) => (
            <span key={i} className="portfolio-tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

