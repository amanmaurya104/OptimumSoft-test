import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo/OPTIMUMSOFT_LOGO.svg';
import { Code, Package, Layers, Monitor, Users, Target, Zap, Globe } from '../ui/icons';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up Intersection Observer for active section highlighting
  useEffect(() => {
    if (location.pathname !== '/') return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const id = entry.target.getAttribute('id');
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-100px 0px -50% 0px',
      }
    );

    // Observe sections
    const sections = document.querySelectorAll('#services, #contact');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [location.pathname]);

  // Reset active section when route changes
  useEffect(() => {
    setActiveSection('');
  }, [location.pathname]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If on home page, scroll to section
      const element = document.querySelector(path);
      if (element) {
        // Add offset for fixed header
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // If on another page, navigate to home first, then scroll
      navigate('/');
      // Use requestAnimationFrame and multiple checks to ensure DOM is ready
      const scrollToSection = () => {
        const checkAndScroll = () => {
          const element = document.querySelector(path);
          if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            // Retry if element not found yet
            requestAnimationFrame(checkAndScroll);
          }
        };
        // Start checking after a short delay
        setTimeout(() => {
          requestAnimationFrame(checkAndScroll);
        }, 50);
      };
      scrollToSection();
    }
    closeMobileMenu();
  };

  const isActive = (sectionId: string) => {
    if (location.pathname !== '/') return false;
    return activeSection === sectionId;
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-logo">
            <Link to="/" className="logo-link">
              <img 
                src={logo} 
                alt="OptimumSoft Logo" 
                className="logo-img"
              />
            </Link>
          </div>

          <nav className={`header-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <div className="mobile-nav-header">
              <div className="mobile-nav-title">
                <span className="mobile-nav-title-text">Menu</span>
                <span className="mobile-nav-title-accent"></span>
              </div>
              <button 
                className="mobile-nav-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <ul className="nav-list">
              <li>
                <a 
                  href="#services" 
                  className={`nav-item ${isActive('services') ? 'active' : ''}`} 
                  onClick={(e) => handleNavClick(e, '#services')}
                >
                  <span className="nav-item-icon"><Code size={18} /></span>
                  <span className="nav-item-text">Services</span>
                </a>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className={`nav-item ${location.pathname === '/products' ? 'active' : ''}`} 
                  onClick={closeMobileMenu}
                >
                  <span className="nav-item-icon"><Package size={18} /></span>
                  <span className="nav-item-text">Products</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/technologies" 
                  className={`nav-item ${location.pathname === '/technologies' ? 'active' : ''}`} 
                  onClick={closeMobileMenu}
                >
                  <span className="nav-item-icon"><Layers size={18} /></span>
                  <span className="nav-item-text">Technologies</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/portfolio" 
                  className={`nav-item ${location.pathname === '/portfolio' ? 'active' : ''}`} 
                  onClick={closeMobileMenu}
                >
                  <span className="nav-item-icon"><Monitor size={18} /></span>
                  <span className="nav-item-text">Portfolio</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/clients" 
                  className={`nav-item ${location.pathname === '/clients' ? 'active' : ''}`} 
                  onClick={closeMobileMenu}
                >
                  <span className="nav-item-icon"><Users size={18} /></span>
                  <span className="nav-item-text">Clients</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`} 
                  onClick={closeMobileMenu}
                >
                  <span className="nav-item-icon"><Target size={18} /></span>
                  <span className="nav-item-text">About</span>
                </Link>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-item ${isActive('contact') ? 'active' : ''}`} 
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  <span className="nav-item-icon"><Zap size={18} /></span>
                  <span className="nav-item-text">Contact</span>
                </a>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className={`nav-item ${location.pathname === '/careers' ? 'active' : ''}`} 
                  onClick={closeMobileMenu}
                >
                  <span className="nav-item-icon"><Globe size={18} /></span>
                  <span className="nav-item-text">Careers</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <a href="#contact" className="btn-cta" onClick={(e) => handleNavClick(e, '#contact')}>
              Get Started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
}

