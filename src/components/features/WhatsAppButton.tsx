import { useState } from 'react';
import { WhatsApp } from '../ui/icons';
import './WhatsAppButton.css';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  const phoneNumber = '919836463234'; // WhatsApp number: +91 98364 63234 (without + and spaces)
  const message = encodeURIComponent('Hello! I would like to know more about your services.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`whatsapp-button ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on WhatsApp"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="whatsapp-button-icon">
        <WhatsApp size={28} />
      </div>
      {isHovered && (
        <div className="whatsapp-button-tooltip">
          Chat with us
        </div>
      )}
      <div className="whatsapp-button-pulse"></div>
    </div>
  );
}

