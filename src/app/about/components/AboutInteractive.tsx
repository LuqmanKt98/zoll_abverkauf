'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface AboutInteractiveProps {
    className?: string;
}

const AboutInteractive = ({ className = '' }: AboutInteractiveProps) => {
    return (
        <div className={`min-h-screen bg-background ${className}`}>
            {/* Header Section */}
            <div className="bg-white border-b border-border mb-8 md:mb-12">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                        Über uns
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        Vertrauen, Rechtssicherheit und professionelle Vermögensverwertung
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-16">
                {/* Main Introduction */}
                <div className="bg-white border border-border rounded-xl shadow-sm p-8 md:p-12 mb-10">
                    <div className="flex items-start gap-6 mb-8">
                        <div className="flex-shrink-0 p-4 bg-brand-primary/10 rounded-xl text-brand-primary">
                            <Icon name="BuildingOffice2Icon" size={32} variant="solid" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                                zollabverkauf.de
                            </h2>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                zollabverkauf.de ist eine spezialisierte Verwertungsplattform für Vermögenswerte aus Insolvenzverfahren, behördlichen Sicherstellungen und zollrechtlichen Maßnahmen.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-6 md:p-8 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-sm text-blue-600 border border-blue-100">
                                <Icon name="ScaleIcon" size={24} variant="solid" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-blue-900 mb-2">
                                    Betrieben durch GSK Stockmann
                                </h3>
                                <p className="text-blue-800 leading-relaxed">
                                    Der Betrieb erfolgt durch GSK Stockmann – Rechtsanwälte Steuerberater Partnerschaftsgesellschaft mbB mit Hauptsitz in München.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-text-secondary">
                        <p className="leading-relaxed mb-6">
                            Als direkt autorisierter Partner des deutschen Zolls handeln wir im behördlichen Auftrag und übernehmen die rechtssichere, transparente und wirtschaftlich effiziente Veräußerung von Insolvenz- und Sicherstellungsmassen. Dazu zählen unter anderem Fahrzeuge, Maschinen, Warenbestände sowie weitere Vermögensgegenstände aus laufenden oder abgeschlossenen Verfahren.
                        </p>
                        <p className="leading-relaxed">
                            Unsere Tätigkeit verbindet juristische Expertise, steuerliche Kompetenz und praktische Verwertungserfahrung. Sämtliche Prozesse – von der Übernahme der Vermögenswerte über die Dokumentation bis hin zur Veräußerung – erfolgen streng nach den geltenden gesetzlichen Vorgaben und in enger Abstimmung mit den zuständigen Behörden und Insolvenzverwaltern.
                        </p>
                    </div>
                </div>

                {/* Our Law Firm Section */}
                <div className="bg-white border border-border rounded-xl shadow-sm p-8 md:p-12 mb-10">
                    <div className="flex items-start gap-6 mb-8">
                        <div className="flex-shrink-0 p-4 bg-brand-secondary/10 rounded-xl text-brand-secondary">
                            <Icon name="GlobeEuropeAfricaIcon" size={32} variant="solid" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                                Unsere Kanzlei
                            </h2>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-text-secondary mb-8">
                        <p className="leading-relaxed mb-6">
                            Über 250 Rechtsanwälte, Steuerberater und Notare, sieben Standorte: In Berlin, Frankfurt am Main, Hamburg, Heidelberg, München, Luxemburg und London beraten und vertreten wir deutsche sowie internationale Mandanten. Bei nationalen und grenzüberschreitenden Verwertungen, Transaktionen und Sonderprojekten arbeiten wir anlassbezogen eng mit einem ausgewählten Kreis renommierter Partnerkanzleien im Ausland zusammen.
                        </p>
                        <p className="leading-relaxed">
                            Diese breite Aufstellung ermöglicht es uns, auch komplexe Verwertungsfälle effizient, rechtssicher und marktgerecht abzuwickeln – sowohl für öffentliche Auftraggeber als auch für institutionelle Beteiligte.
                        </p>
                    </div>

                    {/* Locations Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {['Berlin', 'Frankfurt am Main', 'Hamburg', 'Heidelberg', 'München', 'Luxemburg', 'London'].map((city) => (
                            <div key={city} className="bg-muted rounded-lg p-4 text-center hover:bg-brand-primary/5 transition-colors">
                                <Icon name="MapPinIcon" size={20} className="text-brand-primary mx-auto mb-2" />
                                <span className="text-sm font-medium text-text-primary">{city}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Mission Section */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary/90 text-white rounded-xl shadow-lg p-8 md:p-12 mb-10">
                    <div className="flex items-start gap-6 mb-8">
                        <div className="flex-shrink-0 p-4 bg-white/10 rounded-xl">
                            <Icon name="SparklesIcon" size={32} variant="solid" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Unser Anspruch
                            </h2>
                        </div>
                    </div>

                    <div className="prose prose-lg prose-invert max-w-none">
                        <p className="leading-relaxed mb-6 text-white/90">
                            Unser Ziel ist es, behördliche und insolvenzrechtliche Verwertungen transparent, nachvollziehbar und wirtschaftlich optimal umzusetzen. Käufer profitieren von klaren rechtlichen Rahmenbedingungen, geprüften Informationen und einem seriösen, professionellen Marktplatz.
                        </p>
                    </div>
                </div>

                {/* Trust Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                        <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full text-green-600 mb-4">
                            <Icon name="ShieldCheckIcon" size={32} variant="solid" />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">Vertrauen</h3>
                        <p className="text-text-secondary">
                            Transparente Prozesse und geprüfte Informationen für alle Transaktionen
                        </p>
                    </div>

                    <div className="bg-white border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                        <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
                            <Icon name="DocumentCheckIcon" size={32} variant="solid" />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">Rechtssicherheit</h3>
                        <p className="text-text-secondary">
                            Klare rechtliche Rahmenbedingungen gemäß geltender Vorgaben
                        </p>
                    </div>

                    <div className="bg-white border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                        <div className="inline-flex items-center justify-center p-4 bg-purple-100 rounded-full text-purple-600 mb-4">
                            <Icon name="LinkIcon" size={32} variant="solid" />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">Professionelle Schnittstelle</h3>
                        <p className="text-text-secondary">
                            Verbindung zwischen öffentlicher Hand, Insolvenzverwaltung und Markt
                        </p>
                    </div>
                </div>

                {/* Final Statement */}
                <div className="bg-gray-900 text-white rounded-xl p-8 md:p-12 text-center">
                    <p className="text-xl md:text-2xl font-medium leading-relaxed">
                        zollabverkauf.de steht für <span className="text-brand-secondary font-bold">Vertrauen</span>, <span className="text-brand-secondary font-bold">Rechtssicherheit</span> und eine <span className="text-brand-secondary font-bold">professionelle Schnittstelle</span> zwischen öffentlicher Hand, Insolvenzverwaltung und Markt.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutInteractive;
