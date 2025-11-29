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
            <span>Amtliche Bekanntmachung - Edelmetalle</span>
            <Icon name="ShieldCheckIcon" size={20} className="text-white" variant="solid" />
          </h2>
          <div className="space-y-2 text-sm opacity-90">
            <p>
              <strong>Authentifizierungsverfahren:</strong> Alle Edelmetalle werden durch staatlich anerkannte Prüfstellen analysiert und zertifiziert. Reinheitsgrade werden mittels Röntgenfluoreszenzspektroskopie (XRF) und Säuretest verifiziert.
            </p>
            <p>
              <strong>Gewichtsverifikation:</strong> Präzisionswiegung erfolgt auf geeichten Waagen gemäß Eichordnung. Alle Gewichtsangaben sind rechtlich verbindlich und amtlich dokumentiert.
            </p>
            <p>
              <strong>Herkunftsnachweis:</strong> Vollständige Dokumentation der Beschlagnahmung und Verwahrung gemäß Zollkodex. Lückenlose Verwahrkette gewährleistet Authentizität und Rechtssicherheit.
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Icon name="DocumentCheckIcon" size={14} className="text-white" variant="solid" />
              <span>Zertifiziert nach DIN EN ISO/IEC 17025</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ScaleIcon" size={14} className="text-white" variant="solid" />
              <span>Geeichte Präzisionsmessung</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialAnnouncement;