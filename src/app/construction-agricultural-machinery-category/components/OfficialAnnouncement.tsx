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
            <span>Amtliche Bekanntmachung - Bau- & Landmaschinen</span>
            <Icon name="ShieldCheckIcon" size={20} className="text-white" variant="solid" />
          </h2>
          <div className="space-y-2 text-sm opacity-90">
            <p>
              <strong>Maschinentechnische Prüfung:</strong> Alle Bau- und Landmaschinen werden durch staatlich anerkannte Sachverständige geprüft. Hydrauliksysteme, Motoren und Sicherheitseinrichtungen entsprechen den Maschinenrichtlinien der EU.
            </p>
            <p>
              <strong>Betriebssicherheit:</strong> Vollständige Dokumentation aller Wartungshistorien und Prüfprotokolle. CE-Kennzeichnung und Betriebserlaubnis werden bei der Übergabe mit übertragen.
            </p>
            <p>
              <strong>Verwertungsnachweis:</strong> Ordnungsgemäße Beschlagnahmung gemäß Abgabenordnung § 215 ff. Lückenlose Verwahrkette gewährleistet rechtssichere Eigentumsübertragung ohne Belastungen.
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Icon name="DocumentCheckIcon" size={14} className="text-white" variant="solid" />
              <span>DEKRA/TÜV Maschinenbewertung</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CogIcon" size={14} className="text-white" variant="solid" />
              <span>Wartungshistorie vollständig</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialAnnouncement;