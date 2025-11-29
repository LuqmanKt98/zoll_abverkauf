'use client';

import React from 'react';

interface AcquisitionProcessProps {
  className?: string;
}

const AcquisitionProcess: React.FC<AcquisitionProcessProps> = ({ className = '' }) => {
  return (
    <section className={`bg-white rounded-lg shadow-sm border border-gray-200 p-8 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ablauf des Erwerbsverfahrens
        </h2>
      </div>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Anfrage übermitteln
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Kontaktieren Sie uns über das bereitgestellte Kontaktformular und geben Sie dabei die entsprechende Produkt-ID des gewünschten Artikels an. Wir prüfen anschließend die Verfügbarkeit und bereiten die Unterlagen vor.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Zuschlag & Rechnungsstellung
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Sofern Sie den Zuschlag für das gewünschte Produkt erhalten, wird Ihnen eine verbindliche Rechnung per E-Mail zugesandt. Diese enthält alle relevanten Angaben zum Artikel sowie die Zahlungsinformationen.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Zahlung & Versandinformation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Die Rechnung ist innerhalb von 24 Stunden nach Erhalt zu begleichen, um Ihre Reservierung aufrechtzuerhalten. Nach Zahlungseingang erhalten Sie eine Bestätigung sowie alle notwendigen Versand- und Abholinformationen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcquisitionProcess;