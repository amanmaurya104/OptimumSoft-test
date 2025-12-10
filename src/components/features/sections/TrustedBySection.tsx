import '../../../pages/Home/Hero.css';

/**
 * TrustedBySection Component
 * Displays the marquee of trusted company logos
 * Extracted for lazy loading optimization
 */
export function TrustedBySection() {
  return (
    <div className="trusted-by-section">
      <div className="trusted-by-label">Trusted By</div>
      <div className="trusted-by-marquee">
        <div className="trusted-by-track">
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" alt="Intel" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Cisco" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" alt="Adobe" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="Salesforce" loading="lazy" />
          </div>
          {/* Duplicate for seamless loop */}
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" alt="Intel" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Cisco" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" alt="Adobe" loading="lazy" />
          </div>
          <div className="trusted-by-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="Salesforce" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

