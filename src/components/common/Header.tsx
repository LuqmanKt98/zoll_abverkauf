'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { db } from '@/lib/firebaseClient';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [navigationItems, setNavigationItems] = useState<{ name: string; href: string }[]>([
    { name: 'Fahrzeuge', href: '/vehicles-category' },
    { name: 'Edelmetalle', href: '/precious-metals-category' },
    { name: 'Maschinen', href: '/construction-agricultural-machinery-category' },
    { name: 'Verschiedenes', href: '/miscellaneous-category' },
  ]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        const snap = await getDocs(q);
        const items = snap.docs
          .map((d) => d.data() as any)
          .filter((c) => !c.deleted)
          .map((c) => ({ name: c.name, href: c.href }));
        if (!cancelled && items.length) setNavigationItems(items);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-government backdrop-blur-sm bg-white/95 ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/homepage" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary rounded-full flex items-center justify-center official-badge transition-transform hover:scale-110">
                  <Icon name="ShieldCheckIcon" size={20} className="text-white sm:w-6 sm:h-6" variant="solid" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-bold text-brand-primary font-sans">Zoll-Abverkauf</span>
                <span className="text-[10px] sm:text-xs text-text-secondary font-mono hidden sm:block">Deutsches Zollamt</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              prefetch={false}
              className="category-nav-item px-3 py-2 text-sm font-medium text-text-primary hover:text-brand-primary transition-colors duration-300"
            >
              {item.name}
            </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <Link
              href="/contact"
              prefetch={false}
              className="btn-primary text-sm px-4 py-2"
            >
              Kontakt
            </Link>
            <Link
              href="/admin"
              prefetch={false}
              className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-brand-primary transition-all duration-200 border border-border rounded-lg hover:border-brand-primary hover:shadow-sm"
            >
              Admin
            </Link>
            <button className="p-2 text-text-secondary hover:text-brand-primary transition-all duration-200 hover:bg-slate-100 rounded-lg" aria-label="Suchen">
              <Icon name="MagnifyingGlassIcon" size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-text-primary hover:text-brand-primary transition-all duration-200 hover:bg-slate-100 rounded-lg active:scale-95"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? "XMarkIcon" : "Bars3Icon"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden bg-white border-t border-border overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 sm:px-6 py-4 space-y-3 animate-fade-in">
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-base font-medium text-text-primary hover:text-brand-primary hover:bg-slate-50 rounded-lg transition-all duration-200 active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-border space-y-3">
              <Link
                href="/contact"
                prefetch={false}
                className="block w-full btn-primary text-center text-sm py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
              <Link
                href="/admin"
                prefetch={false}
                className="block w-full text-center px-4 py-3 text-sm font-medium text-text-secondary hover:text-brand-primary transition-all duration-200 border border-border rounded-lg hover:border-brand-primary hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <button className="flex items-center justify-center w-full space-x-2 py-3 px-4 text-text-secondary hover:text-brand-primary hover:bg-slate-50 rounded-lg transition-all duration-200" aria-label="Suchen">
                <Icon name="MagnifyingGlassIcon" size={20} />
                <span className="text-sm font-medium">Suchen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Signal Bar */}
      <div className="bg-muted border-t border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 md:space-x-6 text-[10px] sm:text-xs text-text-secondary overflow-x-auto">
            <div className="flex items-center space-x-1 trust-pulse whitespace-nowrap">
              <Icon name="ShieldCheckIcon" size={14} className="text-trust flex-shrink-0" variant="solid" />
              <span className="hidden sm:inline">Staatlich geprüft</span>
              <span className="sm:hidden">Geprüft</span>
            </div>
            <div className="flex items-center space-x-1 trust-pulse whitespace-nowrap">
              <Icon name="DocumentCheckIcon" size={14} className="text-trust flex-shrink-0" variant="solid" />
              <span>Rechtssicher</span>
            </div>
            <div className="flex items-center space-x-1 trust-pulse whitespace-nowrap">
              <Icon name="LockClosedIcon" size={14} className="text-trust flex-shrink-0" variant="solid" />
              <span className="hidden sm:inline">Authentizität garantiert</span>
              <span className="sm:hidden">Authentisch</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
