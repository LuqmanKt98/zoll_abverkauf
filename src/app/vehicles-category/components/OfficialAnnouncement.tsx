import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface OfficialAnnouncementProps {
  className?: string;
}

const OfficialAnnouncement = ({ className = '' }: OfficialAnnouncementProps) => {
  return (
    <div className={`bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-6 rounded-lg shadow-lg ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="MegaphoneIcon" size={24} className="text-white" variant="solid" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-3 flex items-center space-x-2">
            <span>Amtliche Bekanntmachung - Fahrzeuge</span>
            <Icon name="ShieldCheckIcon" size={20} className="text-white" variant="solid" />
          </h2>
          <div className="space-y-2 text-sm opacity-90">
            <p>
              <strong>Technische Prüfung:</strong> Alle Fahrzeuge werden durch zugelassene Prüforganisationen technisch begutachtet. Motor, Fahrwerk, Bremsen und Sicherheitssysteme werden gemäß StVZO überprüft und dokumentiert.
            </p>
            <p>
              <strong>Fahrzeugpapiere:</strong> Sämtliche Zulassungsunterlagen werden gemäß Fahrzeug-Zulassungsverordnung (FZV) ordnungsgemäß übertragen. Vollständige Eigentumsübertragung mit amtlicher Bestätigung.
            </p>
            <p>
              <strong>Rechtssicherheit:</strong> Lückenlose Dokumentation der Beschlagnahmung und Verwahrung gemäß Zollkodex. Garantierte Eigentumsübertragung ohne juristische Altlasten oder Pfandrechte.
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Icon name="DocumentCheckIcon" size={14} className="text-white" variant="solid" />
              <span>TÜV-geprüfte Fahrzeugbewertung</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ShieldExclamationIcon" size={14} className="text-white" variant="solid" />
              <span>Versicherte Auslieferung</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialAnnouncement;