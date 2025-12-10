// Common types used across the application

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  featured: boolean;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
  industry: string;
  description: string;
}

export interface PortfolioItem {
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

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

export interface Stat {
  id: number;
  number: string;
  label: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

