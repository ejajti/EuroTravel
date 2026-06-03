import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const Home             = lazy(() => import('./pages/Home'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const PricingPage      = lazy(() => import('./pages/PricingPage'));
const RentalPage       = lazy(() => import('./pages/RentalPage'));
const ContactPage      = lazy(() => import('./pages/ContactPage'));

function PageSpinner() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-gold/30 border-t-gold animate-spin" />
        <span className="text-gold font-body text-sm tracking-widest uppercase">Učitavanje…</span>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageSpinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/',                   element: <Home /> },
      { path: '/destinacije',        element: <DestinationsPage /> },
      { path: '/destinacije/:slug',  element: <DestinationDetail /> },
      { path: '/cene',               element: <PricingPage /> },
      { path: '/najam',              element: <RentalPage /> },
      { path: '/kontakt',            element: <ContactPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
