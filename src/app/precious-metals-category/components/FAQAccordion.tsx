'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { getFAQsByCategory } from '@/data/faqs';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  className?: string;
}

const FAQAccordion = ({ className = '' }: FAQAccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const faqItems: FAQItem[] = getFAQsByCategory('Edelmetalle');

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section className={`bg-white rounded-lg border border-border shadow-sm ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
            <Icon name="QuestionMarkCircleIcon" size={18} className="text-white" variant="solid" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Häufig gestellte Fragen – Edelmetalle</h2>
            <p className="text-sm text-text-secondary">Wichtige Informationen zu Authentifizierung und Lagerung</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {faqItems.length === 0 ? (
            <div className="text-center text-text-secondary py-4">
              Keine FAQs verfügbar.
            </div>
          ) : (
            faqItems.map((item) => {
              const isOpen = openItems.includes(item.id);
              return (
                <div key={item.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted transition-colors duration-300"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-text-primary pr-4">{item.question}</span>
                    <Icon
                      name={isOpen ? "ChevronUpIcon" : "ChevronDownIcon"}
                      size={20}
                      className="text-text-secondary flex-shrink-0"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-2 bg-muted/30 border-t border-border/50">
                      <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Contact Hint Match Misc Style */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-start space-x-3">
              <Icon name="InformationCircleIcon" size={20} className="text-brand-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text-primary mb-1">Weitere Fragen?</p>
                <p className="text-xs text-text-secondary mb-2 leading-relaxed">
                  Unser Expertenteam steht Ihnen für spezielle Anfragen zu Edelmetallen zur Verfügung.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-1 text-xs text-brand-primary hover:text-brand-secondary transition-colors duration-200 font-medium"
                >
                  <span>Kontakt aufnehmen</span>
                  <Icon name="ArrowRightIcon" size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;