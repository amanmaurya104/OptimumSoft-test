import { useState, useRef, lazy, Suspense } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/Careers.css';
import { 
  Award, Users, Heart, TrendingUp, Star, Shield, Clock, 
  Zap, Globe, Smartphone, Database, Code, ExternalLink, Target
} from '../components/ui/icons';

const Footer = lazy(() => import('../components/layout/Footer').then(module => ({ default: module.Footer })));

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  featured: boolean;
}

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
}

const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    experience: '5+ years',
    description: 'We are looking for an experienced Full Stack Developer to join our dynamic engineering team. You will be responsible for designing and developing scalable web applications using modern technologies.',
    requirements: [
      '5+ years of experience in full-stack development',
      'Proficiency in React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS, Azure)',
      'Strong problem-solving and communication skills',
      'Experience with Agile methodologies'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health insurance coverage',
      'Flexible work arrangements',
      'Professional development budget'
    ],
    featured: true
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'On-site / Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Join our creative team as a UI/UX Designer and help shape the future of digital experiences. You will work on exciting projects and collaborate with cross-functional teams.',
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma, Adobe Creative Suite',
      'Strong portfolio showcasing design skills',
      'Understanding of user research methodologies',
      'Excellent visual design and typography skills'
    ],
    benefits: [
      'Creative freedom and autonomy',
      'Latest design tools and software',
      'Design conference attendance',
      'Mentorship opportunities'
    ],
    featured: true
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    description: 'We are seeking a DevOps Engineer to help build and maintain our cloud infrastructure. You will work on automation, CI/CD pipelines, and infrastructure as code.',
    requirements: [
      '4+ years of DevOps experience',
      'Experience with Docker, Kubernetes',
      'Knowledge of AWS, Azure, or GCP',
      'Proficiency in Terraform or CloudFormation',
      'Strong scripting skills (Bash, Python)'
    ],
    benefits: [
      'Cloud certification support',
      'Cutting-edge infrastructure',
      'Remote work flexibility',
      'Competitive compensation'
    ],
    featured: false
  },
  {
    id: 4,
    title: 'Product Manager',
    department: 'Product',
    location: 'Hybrid',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead product strategy and execution for our innovative software solutions. Work closely with engineering, design, and business teams to deliver exceptional products.',
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and strategic thinking',
      'Experience with Agile/Scrum methodologies',
      'Excellent communication and leadership skills',
      'Technical background preferred'
    ],
    benefits: [
      'Strategic impact on product direction',
      'Cross-functional collaboration',
      'Product management training',
      'Leadership development'
    ],
    featured: true
  },
  {
    id: 5,
    title: 'Mobile App Developer',
    department: 'Engineering',
    location: 'Remote / On-site',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Build beautiful and performant mobile applications for iOS and Android platforms. Work with React Native or native technologies to create exceptional user experiences.',
    requirements: [
      '3+ years of mobile development experience',
      'Proficiency in React Native, Swift, or Kotlin',
      'Experience with mobile app architecture',
      'Understanding of app store guidelines',
      'Portfolio of published apps'
    ],
    benefits: [
      'Mobile development tools',
      'App store optimization support',
      'Creative project opportunities',
      'Growth in mobile technologies'
    ],
    featured: false
  },
  {
    id: 6,
    title: 'Data Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Design and build data pipelines and infrastructure to support our data-driven decision making. Work with big data technologies and cloud platforms.',
    requirements: [
      '4+ years of data engineering experience',
      'Experience with Python, SQL, Spark',
      'Knowledge of data warehousing solutions',
      'Experience with ETL/ELT processes',
      'Understanding of data modeling'
    ],
    benefits: [
      'Big data technology exposure',
      'Data science collaboration',
      'Cloud data platform experience',
      'Competitive salary package'
    ],
    featured: false
  }
];

const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Competitive Salary',
    description: 'We offer market-leading compensation packages with performance bonuses and equity options.',
    icon: TrendingUp,
    color: '#10b981'
  },
  {
    id: 2,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance, dental, vision, and mental health support programs.',
    icon: Heart,
    color: '#ec4899'
  },
  {
    id: 3,
    title: 'Flexible Work',
    description: 'Remote work options, flexible hours, and work-life balance initiatives.',
    icon: Globe,
    color: '#3b82f6'
  },
  {
    id: 4,
    title: 'Learning & Growth',
    description: 'Professional development budget, training programs, and conference attendance.',
    icon: Award,
    color: '#f59e0b'
  },
  {
    id: 5,
    title: 'Team Culture',
    description: 'Collaborative environment, team events, and a supportive community of professionals.',
    icon: Users,
    color: '#8b5cf6'
  },
  {
    id: 6,
    title: 'Time Off',
    description: 'Generous paid time off, holidays, and sabbatical opportunities for long-term employees.',
    icon: Clock,
    color: '#06b6d4'
  }
];

const cultureValues = [
  {
    title: 'Innovation First',
    description: 'We encourage experimentation and embrace new technologies',
    icon: Zap
  },
  {
    title: 'Work-Life Balance',
    description: 'We believe in sustainable productivity and personal well-being',
    icon: Heart
  },
  {
    title: 'Continuous Learning',
    description: 'We invest in your growth with training and development opportunities',
    icon: Target
  },
  {
    title: 'Diversity & Inclusion',
    description: 'We celebrate diverse perspectives and create an inclusive environment',
    icon: Users
  }
];

export function CareersPage() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const departments = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales'];

  const filteredJobs = selectedDepartment === 'All'
    ? jobOpenings
    : jobOpenings.filter(job => job.department === selectedDepartment);

  const featuredJobs = jobOpenings.filter(job => job.featured);

  return (
    <>
      <section ref={elementRef as React.RefObject<HTMLElement>} className={`careers-section ${isVisible ? 'visible' : ''}`}>
        {/* Background Effects */}
        <div className="careers-bg">
          <div className="careers-blob-1"></div>
          <div className="careers-blob-2"></div>
          <div className="careers-blob-3"></div>
        </div>

        {/* Particles */}
        <div className="careers-particles">
          {[...Array(30)].map((_, i) => (
            <div key={i} className={`careers-particle careers-particle-${i + 1}`}></div>
          ))}
        </div>

        <div className="careers-container">
          {/* Header */}
          <div className={`careers-header scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="careers-badge">
              <Users size={18} style={{ color: '#4f46e5' }} />
              <span>JOIN OUR TEAM</span>
            </div>
            <h1 className="careers-title">
              Build Your <span className="gradient-text">Career</span> With Us
            </h1>
            <p className="careers-description">
              Join a team of passionate professionals working on cutting-edge projects. 
              We're looking for talented individuals who want to make an impact and grow their careers.
            </p>
          </div>

          {/* Stats Section */}
          <div className={`careers-stats scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="careers-stat-card">
              <div className="careers-stat-icon" style={{ background: '#667eea20', color: '#667eea' }}>
                <Users size={32} />
              </div>
              <div className="careers-stat-content">
                <div className="careers-stat-value">50+</div>
                <div className="careers-stat-label">Team Members</div>
              </div>
            </div>
            <div className="careers-stat-card">
              <div className="careers-stat-icon" style={{ background: '#10b98120', color: '#10b981' }}>
                <Award size={32} />
              </div>
              <div className="careers-stat-content">
                <div className="careers-stat-value">15+</div>
                <div className="careers-stat-label">Years Experience</div>
              </div>
            </div>
            <div className="careers-stat-card">
              <div className="careers-stat-icon" style={{ background: '#f59e0b20', color: '#f59e0b' }}>
                <Globe size={32} />
              </div>
              <div className="careers-stat-content">
                <div className="careers-stat-value">20+</div>
                <div className="careers-stat-label">Countries</div>
              </div>
            </div>
            <div className="careers-stat-card">
              <div className="careers-stat-icon" style={{ background: '#ec489920', color: '#ec4899' }}>
                <Star size={32} />
              </div>
              <div className="careers-stat-content">
                <div className="careers-stat-value">4.9/5</div>
                <div className="careers-stat-label">Employee Rating</div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className={`careers-benefits scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <h2 className="careers-section-title">Why Work With Us</h2>
            <div className="careers-benefits-grid">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.id}
                    className={`careers-benefit-card scroll-scale scroll-delay-${Math.min((index % 6) + 1, 6)} ${isVisible ? 'visible' : ''}`}
                  >
                    <div className="careers-benefit-icon" style={{ background: `${benefit.color}20`, color: benefit.color }}>
                      <Icon size={32} />
                    </div>
                    <h3 className="careers-benefit-title">{benefit.title}</h3>
                    <p className="careers-benefit-description">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Culture Values */}
          <div className={`careers-culture scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <h2 className="careers-section-title">Our Culture</h2>
            <div className="careers-culture-grid">
              {cultureValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className={`careers-culture-card scroll-scale scroll-delay-${Math.min((index % 4) + 1, 4)} ${isVisible ? 'visible' : ''}`}
                  >
                    <div className="careers-culture-icon">
                      <Icon size={28} style={{ color: '#667eea' }} />
                    </div>
                    <h3 className="careers-culture-title">{value.title}</h3>
                    <p className="careers-culture-description">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Filter */}
          <div className={`careers-filters scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            {departments.map((dept) => (
              <button
                key={dept}
                className={`careers-filter-btn ${selectedDepartment === dept ? 'active' : ''}`}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Featured Jobs */}
          {selectedDepartment === 'All' && (
            <div className={`careers-featured scroll-fade-in ${isVisible ? 'visible' : ''}`}>
              <h2 className="careers-section-title">Featured Opportunities</h2>
              <div className="careers-jobs-grid">
                {featuredJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className={`careers-job-card careers-job-featured scroll-scale scroll-delay-${Math.min((index % 3) + 1, 3)} ${isVisible ? 'visible' : ''}`}
                  >
                    <div className="careers-job-header">
                      <div className="careers-job-badge">Featured</div>
                      <h3 className="careers-job-title">{job.title}</h3>
                      <div className="careers-job-meta">
                        <span className="careers-job-department">{job.department}</span>
                        <span className="careers-job-separator">•</span>
                        <span className="careers-job-location">{job.location}</span>
                        <span className="careers-job-separator">•</span>
                        <span className="careers-job-type">{job.type}</span>
                      </div>
                    </div>
                    <p className="careers-job-description">{job.description}</p>
                    <div className="careers-job-footer">
                      <span className="careers-job-experience">{job.experience}</span>
                      <button 
                        className="careers-job-apply-btn"
                        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                      >
                        {expandedJob === job.id ? 'Hide Details' : 'View Details'}
                        <ExternalLink size={16} />
                      </button>
                    </div>
                    {expandedJob === job.id && (
                      <div className="careers-job-details">
                        <div className="careers-job-details-section">
                          <h4>Requirements</h4>
                          <ul>
                            {job.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="careers-job-details-section">
                          <h4>Benefits</h4>
                          <ul>
                            {job.benefits.map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <button className="careers-job-apply-primary">
                          Apply Now
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Jobs */}
          <div className={`careers-jobs-section scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            {selectedDepartment !== 'All' && (
              <h2 className="careers-section-title">
                {selectedDepartment} Positions
              </h2>
            )}
            <div className="careers-jobs-grid">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className={`careers-job-card scroll-scale scroll-delay-${Math.min((index % 3) + 1, 3)} ${isVisible ? 'visible' : ''}`}
                >
                  <div className="careers-job-header">
                    {job.featured && <div className="careers-job-badge">Featured</div>}
                    <h3 className="careers-job-title">{job.title}</h3>
                    <div className="careers-job-meta">
                      <span className="careers-job-department">{job.department}</span>
                      <span className="careers-job-separator">•</span>
                      <span className="careers-job-location">{job.location}</span>
                      <span className="careers-job-separator">•</span>
                      <span className="careers-job-type">{job.type}</span>
                    </div>
                  </div>
                  <p className="careers-job-description">{job.description}</p>
                  <div className="careers-job-footer">
                    <span className="careers-job-experience">{job.experience}</span>
                    <button 
                      className="careers-job-apply-btn"
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    >
                      {expandedJob === job.id ? 'Hide Details' : 'View Details'}
                      <ExternalLink size={16} />
                    </button>
                  </div>
                  {expandedJob === job.id && (
                    <div className="careers-job-details">
                      <div className="careers-job-details-section">
                        <h4>Requirements</h4>
                        <ul>
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="careers-job-details-section">
                        <h4>Benefits</h4>
                        <ul>
                          {job.benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <button className="careers-job-apply-primary">
                        Apply Now
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div style={{ minHeight: '100px', background: '#0a0a0a' }} />}>
        <Footer />
      </Suspense>
    </>
  );
}

