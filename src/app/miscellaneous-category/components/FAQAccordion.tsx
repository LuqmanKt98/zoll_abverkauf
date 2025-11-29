'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <section className="bg-white rounded-lg border border-border shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
          <Icon name="QuestionMarkCircleIcon" size={18} className="text-white" variant="solid" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Häufig gestellte Fragen</h2>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-6 last:mb-0">
          <h3 className="text-sm font-medium text-brand-primary mb-3 uppercase tracking-wide">
            {category}
          </h3>
          <div className="space-y-2">
            {faqs
              .filter(faq => faq.category === category)
              .map((faq) => (
                <div key={faq.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted transition-colors duration-200"
                  >
                    <span className="font-medium text-text-primary pr-4">{faq.question}</span>
                    <Icon
                      name={openItems.includes(faq.id) ? "ChevronUpIcon" : "ChevronDownIcon"}
                      size={20}
                      className="text-text-secondary flex-shrink-0"
                    />
                  </button>
                  {openItems.includes(faq.id) && (
                    <div className="px-4 pb-4 pt-2 bg-muted/50">
                      <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-6 pt-4 border-t border-border">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <Icon name="InformationCircleIcon" size={20} className="text-brand-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Weitere Fragen?</p>
              <p className="text-xs text-text-secondary mb-2">
                Unser Kundenservice steht Ihnen für spezielle Anfragen zur Verfügung.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-1 text-xs text-brand-primary hover:text-brand-secondary transition-colors duration-200"
              >
                <span>Kontakt aufnehmen</span>
                <Icon name="ArrowRightIcon" size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;