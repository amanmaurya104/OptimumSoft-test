import { useRef, useState, useEffect } from 'react';
import type { RefObject } from 'react';
import '../../../pages/Home/Hero.css';

export function ContactSection() {
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactSubtitleRef = useRef<HTMLParagraphElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const contactMapRef = useRef<HTMLDivElement>(null);
  
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isContactSubtitleVisible, setIsContactSubtitleVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Contact form scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Title animation
            if (entry.target === contactSectionRef.current) {
              setIsContactVisible(false);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setIsContactVisible(true);
                });
              });
            }
            // Subtitle animation
            if (entry.target === contactSubtitleRef.current) {
              setIsContactSubtitleVisible(false);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setIsContactSubtitleVisible(true);
                });
              });
            }
            // Form animation
            if (entry.target === contactFormRef.current) {
              setIsFormVisible(false);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setIsFormVisible(true);
                });
              });
            }
            // Map animation
            if (entry.target === contactMapRef.current) {
              setIsMapVisible(false);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setIsMapVisible(true);
                });
              });
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (contactSectionRef.current) observer.observe(contactSectionRef.current);
    if (contactSubtitleRef.current) observer.observe(contactSubtitleRef.current);
    if (contactFormRef.current) observer.observe(contactFormRef.current);
    if (contactMapRef.current) observer.observe(contactMapRef.current);

    return () => {
      if (contactSectionRef.current) observer.unobserve(contactSectionRef.current);
      if (contactSubtitleRef.current) observer.unobserve(contactSubtitleRef.current);
      if (contactFormRef.current) observer.unobserve(contactFormRef.current);
      if (contactMapRef.current) observer.unobserve(contactMapRef.current);
      observer.disconnect();
    };
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to FormSubmit.co using fetch
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone || '');
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_subject', 'New Contact Form Submission from OptimumSoft Website');
      formDataToSend.append('_template', 'table');
      
      const response = await fetch('https://formsubmit.co/ajax/mouryaaman640@gmail.com', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      alert('There was an error submitting your form. Please try again.');
    }
  };

  return (
    <div id="contact" className="contact-form-section">
      <h2 
        ref={contactSectionRef as RefObject<HTMLHeadingElement>}
        className={`contact-form-title ${isContactVisible ? 'contact-form-title-visible' : ''}`}
      >
        Get In Touch
      </h2>
      <p 
        ref={contactSubtitleRef}
        className={`contact-form-subtitle ${isContactSubtitleVisible ? 'contact-form-subtitle-visible' : ''}`}
      >
        Have a project in mind? Let's discuss how we can help bring your ideas to life.
      </p>
      
      <div 
        ref={contactFormRef}
        className={`contact-form-container ${isFormVisible ? 'contact-form-container-visible' : ''}`}
      >
        <form 
          className="contact-form" 
          onSubmit={handleFormSubmit}
        >
          {isSubmitted && (
            <div className="form-success-message">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          <div className="contact-form-row">
            <div className="contact-form-group">
              <label htmlFor="contact-name" className="contact-form-label">
                Full Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="contact-form-input"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-email" className="contact-form-label">
                Email Address
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="contact-form-input"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="contact-form-row">
            <div className="contact-form-group">
              <label htmlFor="contact-phone" className="contact-form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="contact-form-input"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-subject" className="contact-form-label">
                Subject
              </label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                className="contact-form-input"
                placeholder="Project Inquiry"
                required
              />
            </div>
          </div>

          <div className="contact-form-group">
            <label htmlFor="contact-message" className="contact-form-label">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              className="contact-form-textarea"
              placeholder="Tell us about your project..."
              rows={6}
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="contact-form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <span>Send Message</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Google Maps Embed */}
      <div 
        ref={contactMapRef}
        className={`contact-map-container ${isMapVisible ? 'visible' : ''}`}
      >
        <div className="contact-map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.1234567890123!2d88.4858488!3d22.7191754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8a30be62e4107%3A0x62c5a4441da80da0!2sShyamoli%20yatri%20paribahan!5e0!3m2!1sen!2sin!4v1704567890123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="OptimumSoft Location - Shyamoli yatri paribahan, Barasat, Kolkata"
            className="contact-map-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

