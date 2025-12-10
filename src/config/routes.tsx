import type { RouteObject } from 'react-router-dom';
// Direct imports for all pages (no lazy loading)
import { HomePage } from '../pages/Home/HomePage';
import { PortfolioPage } from '../pages/Portfolio';
import { ClientsPage } from '../pages/Clients';
import { AboutPage } from '../pages/About';
import { ProductsPage } from '../pages/Products';
import { TechnologiesPage } from '../pages/Technologies';
import { CareersPage } from '../pages/Careers';

export interface AppRoute extends Omit<RouteObject, 'path' | 'element'> {
  name: string;
  path: string;
  element: React.ReactNode;
}

export const routes: AppRoute[] = [
  {
    path: '/',
    name: 'Home',
    element: <HomePage />,
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    element: <PortfolioPage />,
  },
  {
    path: '/clients',
    name: 'Clients',
    element: <ClientsPage />,
  },
  {
    path: '/about',
    name: 'About',
    element: <AboutPage />,
  },
  {
    path: '/products',
    name: 'Products',
    element: <ProductsPage />,
  },
  {
    path: '/technologies',
    name: 'Technologies',
    element: <TechnologiesPage />,
  },
  {
    path: '/careers',
    name: 'Careers',
    element: <CareersPage />,
  },
];

// Helper to get route by path
export const getRouteByPath = (path: string): AppRoute | undefined => {
  return routes.find(route => route.path === path);
};

// Helper to get route by name
export const getRouteByName = (name: string): AppRoute | undefined => {
  return routes.find(route => route.name === name);
};

