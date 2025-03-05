import type React from 'react';
import { useState, useEffect } from 'react';

import { Header } from '../../../components/layouts/header';
import { Head } from '../../../components/seo';

import BestSale from './best-sell';
import Features from './features';
import FileAttachment from './file-attach';
import Footer from './footer';
import Hero from './hero';
import ProductSection from './product-section';
import ScrollToTop from './scroll-to-top';

const LandingRoute: React.FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head description="Glass shop" />
      <main>
        <Header />
        <Hero />
        <ProductSection />
        <BestSale />
        <Features />
        <Footer />
        <ScrollToTop show={showScrollToTop} />
        <FileAttachment />
      </main>
    </>
  );
};

export default LandingRoute;
