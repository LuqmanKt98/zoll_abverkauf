import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactInfo {
  type: string;
  icon: keyof typeof import('@heroicons/react/24/outline');
  title: string;
  primary: string;
  secondary?: string;
  hours?: string;
}

interface ContactInfoProps {
  className?: string;
}

const ContactInfo = ({ className = '' }: ContactInfoProps) => {
  const contactMethods: ContactInfo[] = [
    {
      type: 'phone',
      icon: 'PhoneIcon',
      title: 'Telefon',
      primary: '+49 (0) 30 18 372-0',
      secondary: 'Montag - Freitag',
      hours: '08:00 - 16:00 Uhr'
    },
    {
      type: 'email',
      icon: 'EnvelopeIcon',
      title: 'E-Mail',
      primary: 'abverkauf@zoll.bund.de',
      secondary: 'Antwortzeit: max. 2 Werktage'
    },
    {
      type: 'address',
      icon: 'MapPinIcon',
      title: 'Postanschrift',
      primary: 'Hauptzollamt Berlin',
      secondary: 'Packhofstraße 2-6, 10178 Berlin'
    },
    {
      type: 'fax',
      icon: 'PrinterIcon',
      title: 'Fax',
      primary: '+49 (0) 30 18 372-1000',
      secondary: 'Für offizielle Dokumente'
    }
  ];

  const businessHours = [
    { day: 'Montag - Donnerstag', hours: '08:00 - 16:00 Uhr' },
    { day: 'Freitag', hours: '08:00 - 14:00 Uhr' },
    { day: 'Samstag - Sonntag', hours: 'Geschlossen' }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Contact Methods */}
      <div className="card p-4 sm:p-6 overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6">Kontaktinformationen</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {contactMethods.map((contact, index) => (
            <div key={index} className="flex items-start space-x-3 sm:space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={contact.icon} size={18} className="text-brand-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary text-sm sm:text-base mb-0.5">{contact.title}</h3>
                <p className={`text-text-primary font-medium text-sm sm:text-base ${contact.type === 'email' ? 'break-all' : 'break-words'}`}>{contact.primary}</p>
                {contact.secondary && (
                  <p className="text-xs sm:text-sm text-text-secondary break-words">{contact.secondary}</p>
                )}
                {contact.hours && (
                  <p className="text-xs sm:text-sm text-text-secondary break-words">{contact.hours}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-text-primary mb-6">Geschäftszeiten</h2>
        <div className="space-y-3">
          {businessHours.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span className="text-text-primary font-medium">{schedule.day}</span>
              <span className="text-text-secondary">{schedule.hours}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="ExclamationTriangleIcon" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">
              An Feiertagen und zwischen den Jahren gelten abweichende Öffnungszeiten.
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="card p-6 bg-error/5 border-error/20">
        <div className="flex items-start space-x-3">
          <Icon name="ExclamationCircleIcon" size={24} className="text-error mt-1" variant="solid" />
          <div>
            <h3 className="font-bold text-error mb-2">Dringende Angelegenheiten</h3>
            <p className="text-sm text-text-secondary mb-3">
              Für dringende rechtliche oder verfahrenstechnische Fragen außerhalb der Geschäftszeiten:
            </p>
            <div className="space-y-1">
              <p className="text-sm font-medium text-text-primary">Bereitschaftsdienst: +49 (0) 30 18 372-9999</p>
              <p className="text-xs text-text-muted">Nur für Notfälle - Montag bis Sonntag, 24 Stunden</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
