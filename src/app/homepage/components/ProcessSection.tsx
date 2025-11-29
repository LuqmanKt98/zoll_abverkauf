import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  subtext?: string;
  icon: string;
}

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const processSteps: ProcessStep[] = [
    {
      id: '1',
      step: 1,
      title: 'Kategorie wählen',
      description: 'Durchsuchen Sie unsere vier Hauptkategorien und entdecken Sie interessante Artikel aus Zollbeschlagnahmungen.',
      icon: 'MagnifyingGlassIcon'
    },
    {
      id: '2',
      step: 2,
      title: 'Anfrage stellen',
      description: 'Kontaktieren Sie uns über das offizielle Anfrageformular mit der Artikel-ID für weitere Informationen.',
      icon: 'ChatBubbleLeftRightIcon'
    },
    {
      id: '3',
      step: 3,
      title: 'Sichere Abwicklung',
      description: 'Nach Prüfung Ihrer Anfrage erfolgt die rechtssichere Abwicklung gemäß deutschen Zollbestimmungen.',
      icon: 'CheckCircleIcon'
    },
    {
      id: '4',
      step: 4,
      title: 'Schneller Transport',
      description: 'Ihr erworbener Artikel wird schnell und sicher zu Ihnen geliefert.',
      subtext: 'Lieferung in max 5 Werkstagen nach erfolgter Zahlungseingang.',
      icon: 'TruckIcon'
    }
  ];

  return (
    <section className={`py-20 bg-gradient-to-b from-muted/20 to-muted/40 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/15 rounded-full px-5 py-2.5 mb-6 border border-brand-primary/20">
            <Icon name="ClipboardDocumentListIcon" size={20} className="text-brand-primary" />
            <span className="text-brand-primary font-semibold text-sm">Einfacher Prozess</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            So funktioniert's
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            In vier einfachen Schritten zu Ihrem gewünschten Artikel aus staatlichen Liquidationen. 
            Transparent, sicher und rechtlich abgesichert.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection Line (Desktop) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-full w-full h-0.5 bg-gradient-to-r from-brand-primary via-brand-primary/60 to-brand-secondary transform translate-x-4 -translate-y-1/2 z-0"></div>
              )}

              {/* Step Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-7 shadow-lg border border-white/50 hover:shadow-xl hover:bg-white transition-all duration-300 z-10 group h-auto md:h-[30rem] flex flex-col">
                {/* Step Number */}
                <div className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center mb-5 mx-auto group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>

                {/* Icon */}
                <div className="w-18 h-18 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-primary/15 transition-colors duration-300">
                  <Icon 
                    name={step.icon as any} 
                    size={32} 
                    className="text-brand-primary group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-text-primary mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed text-center mb-3">
                  {step.description}
                </p>
                {step.subtext && (
                  <p className="text-brand-primary text-xs font-medium text-center bg-brand-primary/5 rounded-lg px-3 py-2 mt-3">
                    {step.subtext}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/60">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Bereit für Ihre erste Anfrage?
            </h3>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Starten Sie noch heute und entdecken Sie einzigartige Gegenstände aus Zollbeschlagnahmungen. 
              Unser Team steht Ihnen bei Fragen gerne zur Verfügung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={20} />
                <span>Jetzt Kontakt aufnehmen</span>
              </a>
              <a
                href="/vehicles-category"
                className="btn-secondary inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
              >
                <Icon name="MagnifyingGlassIcon" size={20} />
                <span>Kategorien durchsuchen</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;