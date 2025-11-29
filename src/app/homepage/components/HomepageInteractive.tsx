'use client';

import React from 'react';
import HeroSection from './HeroSection';
import CategoryGrid from './CategoryGrid';
import FeaturedLiquidations from './FeaturedLiquidations';
import TrustSection from './TrustSection';
import ProcessSection from './ProcessSection';

interface HomepageInteractiveProps {
  className?: string;
}

const HomepageInteractive = ({ className = '' }: HomepageInteractiveProps) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <HeroSection />
      <CategoryGrid />
      <FeaturedLiquidations />
      <TrustSection />
      <ProcessSection />
    </div>
  );
};

export default HomepageInteractive;