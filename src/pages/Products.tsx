import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/Products.css';
import { ExternalLink, Star, TrendingUp, Shield, Zap, Globe, Smartphone, Database, Cloud } from '../components/ui/icons';

const Footer = lazy(() => import('../components/layout/Footer').then(module => ({ default: module.Footer })));

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  link?: string;
  featured: boolean;
  badge?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'CloudSync Pro',
    category: 'Cloud Solutions',
    description: 'Enterprise-grade cloud synchronization platform with real-time collaboration and advanced security features.',
    features: ['Real-time Sync', 'End-to-End Encryption', 'Multi-Platform Support', 'Advanced Analytics'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    icon: Cloud,
    link: '#',
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'DataViz Analytics',
    category: 'Business Intelligence',
    description: 'Powerful data visualization and analytics platform that transforms complex data into actionable insights.',
    features: ['Interactive Dashboards', 'Real-time Reports', 'AI-Powered Insights', 'Custom Integrations'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    icon: TrendingUp,
    link: '#',
    featured: true
  },
  {
    id: 3,
    name: 'SecureVault',
    category: 'Security',
    description: 'Enterprise password management and security solution with zero-knowledge architecture.',
    features: ['Zero-Knowledge Encryption', 'Team Collaboration', 'Password Generator', 'Security Audits'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    icon: Shield,
    link: '#',
    featured: false
  },
  {
    id: 4,
    name: 'MobileFirst App',
    category: 'Mobile Development',
    description: 'Cross-platform mobile application framework for building native iOS and Android apps.',
    features: ['Native Performance', 'Single Codebase', 'Hot Reload', 'Rich UI Components'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    icon: Smartphone,
    link: '#',
    featured: false
  },
  {
    id: 5,
    name: 'API Gateway',
    category: 'Integration',
    description: 'Comprehensive API management platform for building, deploying, and monitoring APIs at scale.',
    features: ['API Gateway', 'Rate Limiting', 'Analytics Dashboard', 'Developer Portal'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    icon: Globe,
    link: '#',
    featured: true
  },
  {
    id: 6,
    name: 'DataFlow Engine',
    category: 'Data Processing',
    description: 'High-performance data processing engine for real-time streaming and batch processing.',
    features: ['Real-time Processing', 'Scalable Architecture', 'Fault Tolerance', 'Low Latency'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    icon: Database,
    link: '#',
    featured: false
  }
];


export function Products() {
  const [filter, setFilter] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === filter));
    }
  }, [filter]);

  return (
    <section ref={sectionRef} className="products-section" id="products">
      {/* Background with same styling as Hero */}
      <div className="products-bg">
        <div className="products-blob-1"></div>
        <div className="products-blob-2"></div>
        <div className="products-blob-3"></div>
      </div>

      {/* Animated Particles */}
      <div className="products-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`products-particle products-particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="products-container">
        {/* Header */}
        <div ref={elementRef as React.RefObject<HTMLDivElement>} className={`products-header ${isVisible ? 'visible' : ''}`}>
          <div className="products-badge">
            <Zap style={{ color: '#4f46e5' }} size={18} />
            <span>Our Solutions</span>
          </div>
          <h1 className="products-title">
            <span>Innovative</span>
            <span className="products-title-gradient">Products</span>
          </h1>
          <p className="products-subtitle">
            Discover our cutting-edge software solutions designed to transform your business operations
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`products-filters ${isVisible ? 'visible' : ''}`}>
          {categories.map((category) => (
            <button
              key={category}
              className={`products-filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className={`products-cta ${isVisible ? 'visible' : ''}`}>
          <div className="products-cta-content">
            <h2 className="products-cta-title">Need a Custom Solution?</h2>
            <p className="products-cta-text">We can build a tailored product that perfectly fits your business needs</p>
            <button 
              className="products-cta-button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = product.icon;

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`products-card ${isVisible ? 'visible' : ''} ${product.featured ? 'featured' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.badge && (
        <div className="products-card-badge">
          <Star size={14} />
          <span>{product.badge}</span>
        </div>
      )}
      
      <div className="products-card-image-wrapper">
        <div className="products-card-image" style={{ backgroundImage: `url(${product.image})` }}></div>
        <div className={`products-card-overlay ${isHovered ? 'hovered' : ''}`}>
          <div className="products-card-icon">
            <Icon size={48} />
          </div>
        </div>
      </div>

      <div className="products-card-content">
        <div className="products-card-category">{product.category}</div>
        <h3 className="products-card-title">{product.name}</h3>
        <p className="products-card-description">{product.description}</p>
        
        <div className="products-card-features">
          <h4 className="products-card-features-title">Key Features:</h4>
          <ul className="products-card-features-list">
            {product.features.map((feature, i) => (
              <li key={i} className="products-card-feature-item">
                <Zap size={14} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {product.link && (
          <a href={product.link} className="products-card-link" target="_blank" rel="noopener noreferrer">
            Learn More
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

export function ProductsPage() {
  return (
    <>
      <Products />
      <Suspense fallback={<div style={{ minHeight: '100px', background: '#0a0a0a' }} />}>
        <Footer />
      </Suspense>
    </>
  );
}

