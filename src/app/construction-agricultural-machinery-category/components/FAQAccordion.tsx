'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQAccordionProps {
  faqItems: FAQItem[];
}

const FAQAccordion = ({ faqItems }: FAQAccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const categories = Array.from(new Set(faqItems.map(item => item.category)));

  return (
    <section className="bg-white border border-border rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center">
            <Icon name="QuestionMarkCircleIcon" size={20} className="text-white" variant="solid" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Häufig gestellte Fragen – Bau- & Landmaschinen</h2>
            <p className="text-sm text-text-secondary">Bau- und Landmaschinen Kategorie</p>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-6 last:mb-0">
            <h3 className="text-lg font-medium text-text-primary mb-4 pb-2 border-b border-border">
              {category}
            </h3>
            
            <div className="space-y-3">
              {faqItems
                .filter(item => item.category === category)
                .map((item) => (
                  <div key={item.id} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted transition-colors duration-200"
                    >
                      <span className="font-medium text-text-primary pr-4">{item.question}</span>
                      <Icon 
                        name={openItems.includes(item.id) ? "ChevronUpIcon" : "ChevronDownIcon"} 
                        size={20} 
                        className="text-text-secondary flex-shrink-0" 
                      />
                    </button>
                    
                    {openItems.includes(item.id) && (
                      <div className="px-4 pb-4 pt-2 bg-muted/50">
                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="mt-8 p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="InformationCircleIcon" size={20} className="text-brand-primary mt-0.5" variant="solid" />
            <div>
              <h4 className="font-medium text-text-primary mb-2">Hinweis zu Verfügbarkeit und Sonderanfragen</h4>
              <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                Die veröffentlichten Maschinen stellen nur einen Teil der laufenden Verwertungsbestände dar. Lagerbestände ändern sich täglich, sodass bestimmte Maschinen kurzfristig hinzukommen oder entfallen können. Sollten Sie ein bestimmtes Modell oder eine bestimmte Warengruppe suchen, stellen Sie bitte eine Anfrage über das Formular. Die zuständige Stelle prüft dann unverbindlich die aktuelle Verfügbarkeit.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="btn-primary text-sm">
                  Kontakt aufnehmen
                </button>
                <button className="px-4 py-2 text-sm font-medium text-brand-primary border border-brand-primary rounded-md hover:bg-brand-primary hover:text-white transition-colors duration-300">
                  Beratungstermin vereinbaren
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;