import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getServiceById, servicesData } from '../data/services';
import { ArrowLeft } from '../components/ui/icons';
import { Footer } from '../components/layout/Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/ServiceDetail.css';

export function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = serviceId ? getServiceById(serviceId) : undefined;
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    // Ensure content is visible immediately after a short delay
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="service-detail-error">
        <h2>Service Not Found</h2>
        <p>The service you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="btn-back">
          <ArrowLeft size={20} /> Back to Home
        </button>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <>
      <section ref={sectionRef as React.RefObject<HTMLElement>} className={`service-detail-section ${isVisible || isContentVisible ? 'visible' : ''}`}>
        <div className="service-detail-bg">
          <div className="service-detail-blob-1"></div>
          <div className="service-detail-blob-2"></div>
        </div>

        <div className="service-detail-container">
          <button onClick={() => navigate(-1)} className="service-detail-back-btn">
            <ArrowLeft size={20} /> Back
          </button>

          <div className="service-detail-header">
            <div className="service-detail-icon-wrapper">
              <Icon size={60} />
            </div>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-subtitle">{service.shortDescription}</p>
          </div>

          <div className="service-detail-content">
            {/* Zig-Zag Section 1: Image Left, Description Right */}
            <div className="zigzag-section zigzag-left">
              <div className="zigzag-image">
                <img 
                  src={service.images[0]} 
                  alt={service.title}
                  loading="lazy"
                />
              </div>
              <div className="zigzag-content">
                <div className="service-detail-description">
                  <h2>About This Service</h2>
                  <p>{service.fullDescription}</p>
                </div>
              </div>
            </div>

            {/* Zig-Zag Section 2: Features Left, Image Right */}
            {service.features && service.features.length > 0 && (
              <div className="zigzag-section zigzag-right">
                <div className="zigzag-content">
                  <div className="service-detail-features">
                    <h2>Key Features</h2>
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="zigzag-image">
                  <img 
                    src={service.images[1] || service.images[0]} 
                    alt="Service Features"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Zig-Zag Section 3: Image Left, Benefits Right */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="zigzag-section zigzag-left">
                <div className="zigzag-image">
                  <img 
                    src={service.images[2] || service.images[0]} 
                    alt="Service Benefits"
                    loading="lazy"
                  />
                </div>
                <div className="zigzag-content">
                  <div className="service-detail-benefits">
                    <h2>Benefits</h2>
                    <ul>
                      {service.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Zig-Zag Section 4: Technologies Left, Image Right */}
            {service.technologies && service.technologies.length > 0 && (
              <div className="zigzag-section zigzag-right">
                <div className="zigzag-content">
                  <div className="service-detail-technologies">
                    <h2>Technologies We Use</h2>
                    <div className="service-tech-tags">
                      {service.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="zigzag-image">
                  <img 
                    src={service.images[0]} 
                    alt="Technologies"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Zig-Zag Section 5: Process Full Width */}
            {service.process && service.process.length > 0 && (
              <div className="zigzag-section zigzag-full">
                <div className="zigzag-content-full">
                  <div className="service-detail-process">
                    <h2>Our Process</h2>
                    <div className="process-steps">
                      {service.process.map((step, index) => (
                        <div key={index} className="process-step">
                          <div className="process-step-number">{index + 1}</div>
                          <div className="process-step-content">
                            <h3>{step}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="service-detail-cta">
              <button 
                className="btn-service-contact"
                onClick={() => {
                  navigate('/');
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        const headerHeight = 80;
                        const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerHeight;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }, 100);
                }}
              >
                Get Started Today
              </button>
            </div>
          </div>

          <div className="service-detail-related">
            <h2>Other Services</h2>
            <div className="related-services-grid">
              {servicesData
                .filter(s => s.id !== service.id)
                .slice(0, 3)
                .map((relatedService) => {
                  const RelatedIcon = relatedService.icon;
                  return (
                    <div
                      key={relatedService.id}
                      className="related-service-card"
                      onClick={() => navigate(`/services/${relatedService.id}`)}
                    >
                      <div className="related-service-icon">
                        <RelatedIcon size={40} />
                      </div>
                      <h3>{relatedService.title}</h3>
                      <p>{relatedService.shortDescription}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

