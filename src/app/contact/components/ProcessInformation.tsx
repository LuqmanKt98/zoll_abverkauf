'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  timeframe: string;
  icon: keyof typeof import('@heroicons/react/24/outline');
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface ProcessInformationProps {
  className?: string;
}

const ProcessInformation = ({ className = '' }: ProcessInformationProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const processSteps: ProcessStep[] = [
    {
      step: 1,
      title: 'Anfrage einreichen',
      description: 'Senden Sie Ihre Anfrage über das Kontaktformular oder per E-Mail an uns.',
      timeframe: 'Sofort',
      icon: 'PaperAirplaneIcon'
    },
    {
      step: 2,
      title: 'Eingangsbestätigung',
      description: 'Sie erhalten eine automatische Bestätigung mit Ihrer Referenznummer.',
      timeframe: 'Innerhalb 1 Stunde',
      icon: 'CheckCircleIcon'
    },
    {
      step: 3,
      title: 'Bearbeitung',
      description: 'Unsere Sachbearbeiter prüfen Ihre Anfrage und bereiten die Antwort vor.',
      timeframe: '1-2 Werktage',
      icon: 'CogIcon'
    },
    {
      step: 4,
      title: 'Antwort',
      description: 'Sie erhalten eine detaillierte Antwort oder weitere Handlungsanweisungen.',
      timeframe: 'Max. 2 Werktage',
      icon: 'EnvelopeOpenIcon'
    }
  ];

  const faqs: FAQ[] = [
    {
      question: 'Wie lange dauert die Bearbeitung meiner Anfrage?',
      answer: 'Standardanfragen werden innerhalb von 2 Werktagen bearbeitet. Komplexe rechtliche Fragen können bis zu 5 Werktage in Anspruch nehmen. Sie erhalten immer eine Eingangsbestätigung mit der voraussichtlichen Bearbeitungszeit.',
      category: 'Allgemein'
    },
    {
      question: 'Kann ich mehrere Produkte gleichzeitig anfragen?',
      answer: 'Ja, Sie können mehrere Produkt-IDs in einer Anfrage angeben. Trennen Sie die IDs durch Kommas und beschreiben Sie Ihr Interesse an jedem Produkt im Nachrichtenfeld.',
      category: 'Produkte'
    },
    {
      question: 'Welche Informationen benötige ich für eine Produktanfrage?',
      answer: 'Für eine effiziente Bearbeitung benötigen wir die Produkt-ID, Ihre vollständigen Kontaktdaten und eine Beschreibung Ihres Interesses. Bei gewerblichen Anfragen fügen Sie bitte Ihre Unternehmensdaten hinzu.',
      category: 'Produkte'
    },
    {
      question: 'Ist die Kommunikation rechtlich verbindlich?',
      answer: 'Ja, alle Kommunikation über offizielle Kanäle ist rechtlich verbindlich. Angebote und Zusagen werden schriftlich dokumentiert und haben Gültigkeit nach deutschem Recht.',
      category: 'Rechtliches'
    },
    {
      question: 'Was passiert, wenn ich keine Antwort erhalte?',
      answer: 'Falls Sie nach 3 Werktagen keine Antwort erhalten haben, kontaktieren Sie bitte unseren Bereitschaftsdienst unter +49 (0) 30 18 372-9999 oder senden Sie eine Erinnerung mit Ihrer Referenznummer.',
      category: 'Support'
    }
  ];

  const toggleAccordion = (index: number) => {
    if (!isHydrated) return;
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  if (!isHydrated) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="card p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Process Steps */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-text-primary mb-6">Kommunikationsablauf</h2>
        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <div key={step.step} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name={step.icon} size={20} className="text-brand-primary" />
                  <h3 className="font-semibold text-text-primary">{step.title}</h3>
                  <span className="text-xs bg-muted text-text-muted px-2 py-1 rounded">
                    {step.timeframe}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="absolute left-6 mt-12 w-0.5 h-6 bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-text-primary mb-6">Häufig gestellte Fragen</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-1 rounded">
                    {faq.category}
                  </span>
                  <span className="font-medium text-text-primary">{faq.question}</span>
                </div>
                <Icon 
                  name={activeAccordion === index ? "ChevronUpIcon" : "ChevronDownIcon"} 
                  size={20} 
                  className="text-text-secondary" 
                />
              </button>
              {activeAccordion === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Escalation Process */}
      <div className="card p-6 bg-warning/5 border-warning/20">
        <div className="flex items-start space-x-3">
          <Icon name="ExclamationTriangleIcon" size={24} className="text-warning mt-1" />
          <div>
            <h3 className="font-bold text-warning mb-2">Eskalationsverfahren</h3>
            <p className="text-sm text-text-secondary mb-4">
              Falls Sie mit der Bearbeitung Ihrer Anfrage nicht zufrieden sind oder eine Beschwerde haben:
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="ArrowRightIcon" size={16} className="text-warning" />
                <span className="text-sm text-text-primary">
                  Wenden Sie sich an unseren Kundenservice: kundenservice@zoll.bund.de
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="ArrowRightIcon" size={16} className="text-warning" />
                <span className="text-sm text-text-primary">
                  Bei rechtlichen Beschwerden: beschwerde@zoll.bund.de
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="ArrowRightIcon" size={16} className="text-warning" />
                <span className="text-sm text-text-primary">
                  Ombudsstelle: +49 (0) 30 18 372-8888
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessInformation;