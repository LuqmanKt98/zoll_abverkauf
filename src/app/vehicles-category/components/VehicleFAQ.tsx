'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface VehicleFAQProps {
  faqs: FAQItem[];
}

const VehicleFAQ = ({ faqs }: VehicleFAQProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="bg-white rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
            <Icon name="QuestionMarkCircleIcon" size={18} className="text-white" variant="solid" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Häufig gestellte Fragen – Fahrzeuge</h2>
            <p className="text-sm text-text-secondary">Fahrzeugkategorie - Wichtige Informationen</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted transition-colors duration-300"
              >
                <span className="font-medium text-text-primary pr-4">{faq.question}</span>
                <Icon 
                  name={openItems.includes(faq.id) ? "ChevronUpIcon" : "ChevronDownIcon"} 
                  size={20} 
                  className="text-text-secondary flex-shrink-0" 
                />
              </button>
              {openItems.includes(faq.id) && (
                <div className="px-4 pb-4 border-t border-border">
                  <p className="text-text-secondary leading-relaxed pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleFAQ;