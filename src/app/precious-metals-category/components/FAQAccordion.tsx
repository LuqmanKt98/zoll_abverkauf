'use client';

import React, { useState } from 'react';
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
    <div className={`bg-white rounded-lg shadow-sm border border-border ${className}`}>
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-text-primary flex items-center space-x-2">
          <Icon name="QuestionMarkCircleIcon" size={24} className="text-brand-primary" />
          <span>Häufig gestellte Fragen - Edelmetalle</span>
        </h2>
        <p className="text-text-secondary mt-2">
          Wichtige Informationen zu Authentifizierung, Lagerung und rechtlichen Bestimmungen
        </p>
      </div>

      <div className="divide-y divide-border">
        {faqItems.length === 0 ? (
          <div className="p-6 text-center text-text-secondary">
            Keine FAQs verfügbar.
          </div>
        ) : (
          faqItems.map((item) => {
            const isOpen = openItems.includes(item.id);

            return (
              <div key={item.id} className="p-6">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-md p-2 -m-2"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-semibold text-text-primary pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <Icon
                      name={isOpen ? "ChevronUpIcon" : "ChevronDownIcon"}
                      size={20}
                      className="text-text-secondary transition-transform duration-200"
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pl-2">
                    <p className="text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="p-6 bg-muted border-t border-border">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-brand-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-text-secondary">
              <strong>Weitere Fragen?</strong> Unser Expertenteam steht Ihnen für spezielle Anfragen zu Edelmetallen zur Verfügung. 
              Kontaktieren Sie uns über unser <a href="/contact" className="text-brand-primary hover:underline">Kontaktformular</a> oder 
              telefonisch während der Geschäftszeiten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;