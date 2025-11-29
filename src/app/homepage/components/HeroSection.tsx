import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section className={`relative bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary py-20 lg:py-32 ${className}`}>
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Official Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center official-badge">
              <Icon name="ShieldCheckIcon" size={20} className="text-white" variant="solid" />
            </div>
            <span className="text-sm font-semibold text-brand-primary">Deutsches Zollamt - Offiziell Autorisiert</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Zoll-Abverkauf
          <span className="block text-2xl lg:text-3xl font-normal text-blue-100 mt-2">
            Staatliche Versteigerungen & Liquidationen
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
          Entdecken Sie authentische Schätze aus Zollbeschlagnahmungen und staatlichen Liquidationen. 
          Fahrzeuge, Edelmetalle, Maschinen und mehr – mit offizieller Garantie und rechtssicherer Abwicklung.
        </p>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
            <Icon name="DocumentCheckIcon" size={24} className="text-white" variant="solid" />
            <span className="text-white font-medium">Rechtssicher</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
            <Icon name="ShieldCheckIcon" size={24} className="text-white" variant="solid" />
            <span className="text-white font-medium">Authentizität garantiert</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
            <Icon name="LockClosedIcon" size={24} className="text-white" variant="solid" />
            <span className="text-white font-medium">Staatlich geprüft</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;