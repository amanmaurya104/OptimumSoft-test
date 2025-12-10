import { useState, useRef, lazy, Suspense } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/Technologies.css';
import { 
  Code, Database, Cloud, Smartphone, Globe, Server, Shield, Zap, 
  Layers, GitBranch, Package, Cpu, Monitor, TrendingUp, Award, Star, Users
} from '../components/ui/icons';

const Footer = lazy(() => import('../components/layout/Footer').then(module => ({ default: module.Footer })));

interface Technology {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
  proficiency: number; // 1-5
  featured: boolean;
}

const technologies: Technology[] = [
  // Frontend Technologies
  { id: 1, name: 'React', category: 'Frontend', description: 'Modern UI library for building interactive user interfaces', icon: Code, color: '#61DAFB', proficiency: 5, featured: true },
  { id: 2, name: 'Vue.js', category: 'Frontend', description: 'Progressive JavaScript framework for building user interfaces', icon: Code, color: '#4FC08D', proficiency: 4, featured: false },
  { id: 3, name: 'Angular', category: 'Frontend', description: 'Platform for building mobile and desktop web applications', icon: Code, color: '#DD0031', proficiency: 4, featured: false },
  { id: 4, name: 'Next.js', category: 'Frontend', description: 'React framework for production with server-side rendering', icon: Globe, color: '#000000', proficiency: 5, featured: true },
  { id: 5, name: 'TypeScript', category: 'Frontend', description: 'Typed superset of JavaScript for better development', icon: Code, color: '#3178C6', proficiency: 5, featured: true },
  { id: 6, name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first CSS framework for rapid UI development', icon: Layers, color: '#06B6D4', proficiency: 5, featured: false },

  // Backend Technologies
  { id: 7, name: 'Node.js', category: 'Backend', description: 'JavaScript runtime for building scalable server applications', icon: Server, color: '#339933', proficiency: 5, featured: true },
  { id: 8, name: 'Python', category: 'Backend', description: 'High-level programming language for backend development', icon: Code, color: '#3776AB', proficiency: 5, featured: true },
  { id: 9, name: 'Java', category: 'Backend', description: 'Enterprise-grade programming language for robust applications', icon: Code, color: '#ED8B00', proficiency: 4, featured: false },
  { id: 10, name: 'NestJS', category: 'Backend', description: 'Progressive Node.js framework for efficient server-side apps', icon: Server, color: '#E0234E', proficiency: 4, featured: false },
  { id: 11, name: 'Express.js', category: 'Backend', description: 'Fast, unopinionated web framework for Node.js', icon: Server, color: '#000000', proficiency: 5, featured: false },
  { id: 12, name: 'GraphQL', category: 'Backend', description: 'Query language and runtime for APIs', icon: GitBranch, color: '#E10098', proficiency: 4, featured: false },

  // Mobile Technologies
  { id: 13, name: 'React Native', category: 'Mobile', description: 'Framework for building native mobile apps with React', icon: Smartphone, color: '#61DAFB', proficiency: 5, featured: true },
  { id: 14, name: 'Flutter', category: 'Mobile', description: 'UI toolkit for building natively compiled applications', icon: Smartphone, color: '#02569B', proficiency: 4, featured: false },
  { id: 15, name: 'Swift', category: 'Mobile', description: 'Programming language for iOS and macOS development', icon: Smartphone, color: '#FA7343', proficiency: 4, featured: false },
  { id: 16, name: 'Kotlin', category: 'Mobile', description: 'Modern programming language for Android development', icon: Smartphone, color: '#7F52FF', proficiency: 4, featured: false },

  // Database Technologies
  { id: 17, name: 'MongoDB', category: 'Database', description: 'NoSQL database for modern applications', icon: Database, color: '#47A248', proficiency: 5, featured: true },
  { id: 18, name: 'PostgreSQL', category: 'Database', description: 'Advanced open-source relational database', icon: Database, color: '#336791', proficiency: 5, featured: true },
  { id: 19, name: 'MySQL', category: 'Database', description: 'Popular open-source relational database management', icon: Database, color: '#4479A1', proficiency: 5, featured: false },
  { id: 20, name: 'Redis', category: 'Database', description: 'In-memory data structure store for caching', icon: Database, color: '#DC382D', proficiency: 4, featured: false },

  // Cloud Technologies
  { id: 21, name: 'AWS', category: 'Cloud', description: 'Comprehensive cloud computing platform', icon: Cloud, color: '#FF9900', proficiency: 5, featured: true },
  { id: 22, name: 'Azure', category: 'Cloud', description: 'Microsoft cloud computing service', icon: Cloud, color: '#0078D4', proficiency: 4, featured: false },
  { id: 23, name: 'Google Cloud', category: 'Cloud', description: 'Google cloud computing services', icon: Cloud, color: '#4285F4', proficiency: 4, featured: false },
  { id: 24, name: 'Docker', category: 'Cloud', description: 'Platform for containerizing applications', icon: Package, color: '#2496ED', proficiency: 5, featured: true },
  { id: 25, name: 'Kubernetes', category: 'Cloud', description: 'Container orchestration platform', icon: Package, color: '#326CE5', proficiency: 4, featured: false },

  // DevOps & Tools
  { id: 26, name: 'Git', category: 'DevOps', description: 'Distributed version control system', icon: GitBranch, color: '#F05032', proficiency: 5, featured: false },
  { id: 27, name: 'CI/CD', category: 'DevOps', description: 'Continuous integration and deployment pipelines', icon: Zap, color: '#FF6B6B', proficiency: 5, featured: false },
  { id: 28, name: 'Jenkins', category: 'DevOps', description: 'Automation server for CI/CD', icon: Server, color: '#D24939', proficiency: 4, featured: false },
];

const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'Cloud', 'DevOps'];

export function TechnologiesPage() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const statsRef = useRef<HTMLDivElement>(null);

  const filteredTechnologies = selectedCategory === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  const featuredTechnologies = technologies.filter(tech => tech.featured);

  const stats = [
    { icon: Code, label: 'Technologies', value: '50+', color: '#667eea' },
    { icon: Award, label: 'Certifications', value: '25+', color: '#f59e0b' },
    { icon: TrendingUp, label: 'Projects', value: '500+', color: '#10b981' },
    { icon: Users, label: 'Expert Team', value: '50+', color: '#ec4899' },
  ];

  return (
    <>
      <section ref={elementRef as React.RefObject<HTMLElement>} className={`technologies-section ${isVisible ? 'visible' : ''}`}>
        {/* Background Effects */}
        <div className="technologies-bg">
          <div className="technologies-blob-1"></div>
          <div className="technologies-blob-2"></div>
          <div className="technologies-blob-3"></div>
        </div>

        {/* Particles */}
        <div className="technologies-particles">
          {[...Array(30)].map((_, i) => (
            <div key={i} className={`technologies-particle technologies-particle-${i + 1}`}></div>
          ))}
        </div>

        <div className="technologies-container">
          {/* Header */}
          <div className={`technologies-header scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="technologies-badge">
              <Award size={18} style={{ color: '#4f46e5' }} />
              <span>OUR TECHNOLOGY STACK</span>
            </div>
            <h1 className="technologies-title">
              Cutting-Edge <span className="gradient-text">Technologies</span>
            </h1>
            <p className="technologies-description">
              We leverage the latest and most powerful technologies to build scalable, 
              efficient, and innovative solutions that drive business success.
            </p>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className={`technologies-stats scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="technologies-stat-card">
                  <div className="technologies-stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                    <Icon size={32} />
                  </div>
                  <div className="technologies-stat-content">
                    <div className="technologies-stat-value">{stat.value}</div>
                    <div className="technologies-stat-label">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className={`technologies-filters scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            {categories.map((category) => (
              <button
                key={category}
                className={`technologies-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Technologies */}
          {selectedCategory === 'All' && (
            <div className={`technologies-featured scroll-fade-in ${isVisible ? 'visible' : ''}`}>
              <h2 className="technologies-section-title">Featured Technologies</h2>
              <div className="technologies-grid">
                {featuredTechnologies.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.id}
                      className={`technologies-card technologies-card-featured scroll-scale scroll-delay-${Math.min((index % 6) + 1, 6)} ${isVisible ? 'visible' : ''}`}
                      style={{ '--tech-color': tech.color } as React.CSSProperties}
                    >
                      <div className="technologies-card-icon" style={{ background: `${tech.color}20`, color: tech.color }}>
                        <Icon size={40} />
                      </div>
                      <div className="technologies-card-content">
                        <h3 className="technologies-card-name">{tech.name}</h3>
                        <p className="technologies-card-description">{tech.description}</p>
                        <div className="technologies-card-category">{tech.category}</div>
                        <div className="technologies-card-proficiency">
                          <span>Proficiency:</span>
                          <div className="technologies-stars">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} style={{ color: i < tech.proficiency ? tech.color : '#374151' }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Technologies Grid */}
          <div className={`technologies-grid-section scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            {selectedCategory !== 'All' && (
              <h2 className="technologies-section-title">
                {selectedCategory} Technologies
              </h2>
            )}
            <div className="technologies-grid">
              {filteredTechnologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.id}
                    className={`technologies-card scroll-scale scroll-delay-${Math.min((index % 6) + 1, 6)} ${isVisible ? 'visible' : ''}`}
                    style={{ '--tech-color': tech.color } as React.CSSProperties}
                  >
                    <div className="technologies-card-icon" style={{ background: `${tech.color}20`, color: tech.color }}>
                      <Icon size={36} />
                    </div>
                    <div className="technologies-card-content">
                      <h3 className="technologies-card-name">{tech.name}</h3>
                      <p className="technologies-card-description">{tech.description}</p>
                      <div className="technologies-card-category">{tech.category}</div>
                      <div className="technologies-card-proficiency">
                        <span>Proficiency:</span>
                        <div className="technologies-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} style={{ color: i < tech.proficiency ? tech.color : '#374151' }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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

