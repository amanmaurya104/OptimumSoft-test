import { Code, TrendingUp, Globe, Shield, Plane, Calendar, Palette, Brain } from '../components/ui/icons';

export interface ServiceDetail {
  id: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  features: string[];
  benefits: string[];
  technologies?: string[];
  process?: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'software-development',
    icon: Code,
    title: 'Software Development & Solutions',
    shortDescription: 'Custom software solutions tailored to your business needs with cutting-edge technologies.',
    fullDescription: 'We provide comprehensive software development services that transform your business ideas into powerful digital solutions. Our team of experienced developers specializes in creating custom applications that are scalable, secure, and user-friendly. From enterprise-level systems to innovative mobile applications, we deliver solutions that drive growth and efficiency.',
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    ],
    features: [
      'Custom application development',
      'Enterprise software solutions',
      'API development and integration',
      'Database design and optimization',
      'Cloud-based solutions',
      'Legacy system modernization',
    ],
    benefits: [
      'Increased operational efficiency',
      'Scalable architecture for future growth',
      'Enhanced security and compliance',
      'Reduced development costs',
      'Faster time to market',
      '24/7 technical support',
    ],
    technologies: ['React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes'],
    process: [
      'Requirement Analysis',
      'System Design & Architecture',
      'Development & Testing',
      'Deployment & Integration',
      'Maintenance & Support',
    ],
  },
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    shortDescription: 'Data-driven digital marketing strategies to grow your online presence and reach your target audience.',
    fullDescription: 'Our digital marketing services help businesses establish a strong online presence and connect with their target audience effectively. We combine data-driven strategies with creative campaigns to maximize your ROI. From SEO and social media marketing to content creation and paid advertising, we provide comprehensive solutions that drive results.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    ],
    features: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Pay-Per-Click (PPC) Advertising',
      'Content Marketing',
      'Email Marketing Campaigns',
      'Analytics & Reporting',
    ],
    benefits: [
      'Increased brand visibility',
      'Higher conversion rates',
      'Better customer engagement',
      'Measurable ROI',
      'Targeted audience reach',
      'Competitive advantage',
    ],
    technologies: ['Google Analytics', 'Facebook Ads', 'Google Ads', 'HubSpot', 'Mailchimp'],
    process: [
      'Market Research & Analysis',
      'Strategy Development',
      'Campaign Execution',
      'Performance Monitoring',
      'Optimization & Reporting',
    ],
  },
  {
    id: 'webdesign-development',
    icon: Globe,
    title: 'UI UX Design & Web Development',
    shortDescription: 'Responsive, modern, and SEO-optimized websites that deliver exceptional user experiences.',
    fullDescription: 'We create stunning, responsive websites that not only look great but also perform exceptionally. Our web design and development services combine aesthetic appeal with functionality, ensuring your website stands out in the digital landscape. We focus on user experience, performance, and SEO to help you achieve your business goals.',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    ],
    features: [
      'Responsive web design',
      'E-commerce solutions',
      'Content Management Systems',
      'Progressive Web Apps (PWA)',
      'SEO optimization',
      'Performance optimization',
    ],
    benefits: [
      'Mobile-friendly design',
      'Fast loading times',
      'Better search engine rankings',
      'Enhanced user experience',
      'Increased conversions',
      'Scalable architecture',
    ],
    technologies: ['React', 'Next.js', 'WordPress', 'Shopify', 'Vue.js', 'TypeScript'],
    process: [
      'Discovery & Planning',
      'Design & Prototyping',
      'Development & Testing',
      'Launch & Deployment',
      'Maintenance & Updates',
    ],
  },
  {
    id: 'loans-insurance',
    icon: Shield,
    title: 'All types of Loans & Insurance',
    shortDescription: 'Comprehensive financial solutions including loans and insurance services for individuals and businesses.',
    fullDescription: 'We provide comprehensive financial services including various types of loans and insurance products tailored to meet your specific needs. Whether you\'re looking for personal loans, business loans, or insurance coverage, our expert team helps you find the best solutions with competitive rates and flexible terms.',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop',
    ],
    features: [
      'Personal loans',
      'Business loans',
      'Home loans & mortgages',
      'Vehicle loans',
      'Life insurance',
      'Health insurance',
      'Property insurance',
    ],
    benefits: [
      'Competitive interest rates',
      'Quick approval process',
      'Flexible repayment options',
      'Expert financial advice',
      'Comprehensive coverage',
      '24/7 customer support',
    ],
    process: [
      'Application & Documentation',
      'Credit Assessment',
      'Approval & Terms',
      'Disbursement',
      'Ongoing Support',
    ],
  },
  {
    id: 'travel-hotels',
    icon: Plane,
    title: 'Travel & Hotels Booking',
    shortDescription: 'Seamless travel planning and hotel booking services for your next adventure or business trip.',
    fullDescription: 'Plan your perfect trip with our comprehensive travel and hotel booking services. We offer the best deals on flights, hotels, and vacation packages. Our travel experts help you find the perfect destinations, accommodations, and experiences tailored to your preferences and budget.',
    images: [
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
    ],
    features: [
      'Flight bookings',
      'Hotel reservations',
      'Vacation packages',
      'Travel insurance',
      'Visa assistance',
      'Car rentals',
    ],
    benefits: [
      'Best price guarantee',
      '24/7 customer support',
      'Easy cancellation',
      'Exclusive deals',
      'Reward points',
      'Travel assistance',
    ],
    process: [
      'Destination Selection',
      'Booking & Payment',
      'Travel Documents',
      'Trip Management',
      'Post-Travel Support',
    ],
  },
  {
    id: 'event-management',
    icon: Calendar,
    title: 'Event Management',
    shortDescription: 'Professional event planning and management services to make your events memorable and successful.',
    fullDescription: 'From corporate conferences to weddings and social gatherings, we provide end-to-end event management services. Our experienced team handles every detail, from planning and coordination to execution, ensuring your event is flawless and memorable.',
    images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=800&h=600&fit=crop',
    ],
    features: [
      'Event planning & coordination',
      'Venue selection & booking',
      'Catering services',
      'Audio-visual setup',
      'Entertainment arrangements',
      'Photography & videography',
    ],
    benefits: [
      'Stress-free planning',
      'Professional execution',
      'Cost-effective solutions',
      'Creative event concepts',
      'Seamless coordination',
      'Memorable experiences',
    ],
    process: [
      'Consultation & Planning',
      'Vendor Coordination',
      'Event Setup',
      'Day-of Management',
      'Post-Event Follow-up',
    ],
  },
  {
    id: 'graphics-design',
    icon: Palette,
    title: 'Graphics Design & Content Generation',
    shortDescription: 'Creative graphic design and compelling content creation to elevate your brand identity.',
    fullDescription: 'We create visually stunning designs and compelling content that capture your brand\'s essence and engage your audience. Our creative team specializes in logo design, branding, marketing materials, and digital content that makes a lasting impression.',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop',
    ],
    features: [
      'Logo & brand identity',
      'Print design',
      'Digital graphics',
      'Social media content',
      'Web graphics',
      'Content writing',
    ],
    benefits: [
      'Professional branding',
      'Consistent visual identity',
      'Increased engagement',
      'Better brand recognition',
      'Creative solutions',
      'Quick turnaround',
    ],
    technologies: ['Adobe Creative Suite', 'Figma', 'Canva', 'Sketch'],
    process: [
      'Brief & Research',
      'Concept Development',
      'Design Creation',
      'Revisions & Refinement',
      'Final Delivery',
    ],
  },
  {
    id: 'ai-marketing',
    icon: Brain,
    title: 'AI Marketing & Solution',
    shortDescription: 'AI-powered marketing solutions and intelligent automation to optimize your business performance.',
    fullDescription: 'Leverage the power of artificial intelligence to transform your marketing strategies. We provide AI-driven solutions that automate processes, analyze data, and deliver personalized experiences. From chatbots to predictive analytics, we help you stay ahead of the competition.',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    ],
    features: [
      'AI-powered chatbots',
      'Predictive analytics',
      'Automated marketing campaigns',
      'Personalization engines',
      'Customer behavior analysis',
      'Intelligent automation',
    ],
    benefits: [
      'Improved efficiency',
      'Better customer insights',
      'Higher conversion rates',
      'Reduced operational costs',
      '24/7 automation',
      'Data-driven decisions',
    ],
    technologies: ['Machine Learning', 'Natural Language Processing', 'TensorFlow', 'Python', 'ChatGPT API'],
    process: [
      'AI Strategy Development',
      'Solution Design',
      'Implementation & Integration',
      'Training & Optimization',
      'Monitoring & Improvement',
    ],
  },
];

export const getServiceById = (id: string): ServiceDetail | undefined => {
  return servicesData.find(service => service.id === id);
};

export const getServiceByTitle = (title: string): ServiceDetail | undefined => {
  return servicesData.find(service => service.title === title);
};

