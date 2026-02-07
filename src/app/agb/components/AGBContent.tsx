'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

const AGBContent = () => {
    const currentDate = new Date().toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <div className="bg-white border-b border-border mb-8 md:mb-12">
                <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        Allgemeine Geschäftsbedingungen (AGB)
                    </h1>
                    <p className="text-lg text-text-secondary">
                        für die Internetplattform zollabverkauf.de
                    </p>
                    <p className="text-sm text-text-secondary mt-4">
                        Stand: {currentDate}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-16">
                <div className="bg-white border border-border rounded-xl shadow-sm p-8 md:p-12">
                    {/* § 1 */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§1</span>
                            Geltungsbereich und Anbieter
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                <strong>(1)</strong> Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, Angebote und Geschäftsbeziehungen über die Internetplattform zollabverkauf.de, betrieben durch die GSK Stockmann – Rechtsanwälte Steuerberater Partnerschaftsgesellschaft mbB (nachfolgend "Betreiber" oder "wir").
                            </p>
                            <p>
                                <strong>(2)</strong> Der Betreiber handelt als autorisierter Partner deutscher Behörden (insbesondere Zollbehörden) und Insolvenzverwalter im Rahmen der Verwertung von Vermögenswerten aus Insolvenzverfahren, behördlichen Sicherstellungen und zollrechtlichen Maßnahmen.
                            </p>
                            <p>
                                <strong>(3)</strong> Entgegenstehende oder von diesen AGB abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Betreiber stimmt ihrer Geltung ausdrücklich schriftlich zu.
                            </p>
                        </div>
                    </section>

                    {/* § 2 */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§2</span>
                            Vertragsgegenstand und Besonderheiten
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                <strong>(1)</strong> zollabverkauf.de ist eine reine Verwertungsplattform. Der Betreiber stellt lediglich die technische Infrastruktur bereit und übernimmt die Veräußerung im Auftrag und für Rechnung der jeweiligen Rechtsträger (Insolvenzverwalter, Behörden).
                            </p>
                            <p>
                                <strong>(2)</strong> Jeder Verkauf erfolgt im Namen und für Rechnung des jeweiligen Insolvenzverwalters oder der beauftragten Behörde. Der Betreiber tritt dabei als organisatorischer und rechtlicher Dienstleister auf. Der Kaufvertrag kommt ausschließlich zwischen dem Käufer und dem jeweiligen Verkäufer (Insolvenzverwalter/Behörde) zustande.
                            </p>
                            <p>
                                <strong>(3)</strong> Sämtliche angebotenen Gegenstände werden im Zustand veräußert, in dem sie sich zum Zeitpunkt der Übernahme befinden ("gewieft, wie gesehen"). Eine weitergehende Beschreibung oder Garantie über den im Angebot dargestellten Zustand hinaus wird nicht übernommen.
                            </p>
                        </div>
                    </section>

                    {/* § 3 */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§3</span>
                            Vertragsschluss
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                <strong>(1)</strong> Die Darstellung der Ware auf der Plattform stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Abgabe eines Angebots (invitatio ad offerendum) dar.
                            </p>
                            <p>
                                <strong>(2)</strong> Durch die Abgabe eines verbindlichen Gebots (z.B. durch Klick auf "Kaufen" oder "Gebot abgeben") gibt der Kunde ein verbindliches Angebot auf Abschluss eines Kaufvertrages ab.
                            </p>
                            <p>
                                <strong>(3)</strong> Der Betreiber bzw. der jeweilige Verkäufer behält sich das Recht vor, dieses Angebot innerhalb von 2 Werktagen schriftlich (per E-Mail) anzunehmen. Erst mit der Zusendung einer Auftragsbestätigung/Rechnung durch den Betreiber im Namen des Verkäufers kommt der Kaufvertrag zustande. Bis dahin besteht kein Anspruch auf Lieferung.
                            </p>
                            <p>
                                <strong>(4)</strong> Der Betreiber ist berechtigt, Angebote ohne Angabe von Gründen abzulehnen, insbesondere bei begründeten Zweifeln an der Bonität oder Seriosität des Käufers.
                            </p>
                        </div>
                    </section>

                    {/* § 4 */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§4</span>
                            Preise und Zahlungsbedingungen
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                <strong>(1)</strong> Alle angegebenen Preise sind Endpreise in Euro und verstehen sich zuzüglich der gesetzlichen Umsatzsteuer, sofern diese nach den Besonderheiten des Insolvenz- oder Behördenverkaufs anfällt. Eventuell anfallende Transport-, Verpackungs- oder Bearbeitungskosten werden gesondert ausgewiesen.
                            </p>
                            <p>
                                <strong>(2)</strong> Die Zahlung des Kaufpreises ist sofort mit Vertragsschluss fällig, sofern nicht in der Artikelbeschreibung oder der Auftragsbestätigung ausdrücklich andere Zahlungsziele genannt werden.
                            </p>
                            <p>
                                <strong>(3)</strong> Zugelassene Zahlungsmittel sind:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Vorabüberweisung auf das angegebene Anderkonto</li>
                                <li>Bei Abholung: Barzahlung bis zur gesetzlichen Höchstgrenze, ansonsten EC-Karte (Maestro)</li>
                            </ul>
                            <p>
                                <strong>(4)</strong> Der Versand bzw. die Freigabe zur Abholung erfolgt erst nach vollständigem und unwiderruflichem Geldeingang auf dem jeweiligen Anderkonto.
                            </p>
                        </div>
                    </section>

                    {/* § 5 */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§5</span>
                            Eigentumsvorbehalt und Risikoübergang
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                <strong>(1)</strong> Das Eigentum an der Kaufsache geht erst mit vollständiger Zahlung des Kaufpreises auf den Käufer über.
                            </p>
                            <p>
                                <strong>(2)</strong> Die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung geht auf den Käufer über mit:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>bei Versand: Übergabe der Sache an den Transportdienstleister</li>
                                <li>bei Abholung: Übergabe der Sache an den Käufer oder dessen Beauftragten am vereinbarten Abholort</li>
                            </ul>
                        </div>
                    </section>

                    {/* § 6 */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§6</span>
                            Gewährleistung und Haftung
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                <strong>(1)</strong> Für alle verkauften Gegenstände gilt ausdrücklich ein Ausschluss der gesetzlichen Sachmängelgewährleistung (§§ 434 ff. BGB), soweit dies gesetzlich zulässig ist. Der Verkauf erfolgt unter ausdrücklichem Hinweis auf § 327g InsO bzw. die behördlichen Verwertungsvorschriften.
                            </p>
                            <p>
                                <strong>(2)</strong> Der Haftungsausschluss gilt nicht bei:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Arglistigem Verschweigen eines Mangels durch den Verkäufer</li>
                                <li>Garantiezusagen, die ausdrücklich und schriftlich erteilt wurden</li>
                                <li>Schäden aus der Verletzung von Leben, Körper oder Gesundheit</li>
                                <li>Schäden aus grob fahrlässiger oder vorsätzlicher Pflichtverletzung</li>
                            </ul>
                            <p>
                                <strong>(3)</strong> Die Haftung des Betreibers ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Für leichte Fahrlässigkeit haftet der Betreiber nur bei Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht) und nur für den typischerweise vorhersehbaren Schaden.
                            </p>
                        </div>
                    </section>

                    {/* § 7 */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§7</span>
                            Widerrufsrecht und besondere Rückgaberechte
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                <strong>(1)</strong> Bei den über diese Plattform getätigten Käufen besteht kein gesetzliches Widerrufsrecht, da es sich um Veräußerungen im Rahmen einer behördlichen oder insolvenzrechtlichen Verwertung handelt (§ 312g Abs. 2 Nr. 9 BGB).
                            </p>
                            <p>
                                <strong>(2)</strong> Unabhängig davon kann der jeweilige Verkäufer im Einzelfall ein freiwilliges, vertragliches Rückgaberecht einräumen. Dieses ist dann in der jeweiligen Artikelbeschreibung oder im individuellen Kaufvertrag geregelt und geht diesen AGB vor.
                            </p>
                        </div>
                    </section>

                    {/* § 8 */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§8</span>
                            Datenschutz
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                Die Erhebung, Verarbeitung und Nutzung personenbezogener Daten erfolgt ausschließlich nach Maßgabe der geltenden Datenschutzgesetze und der separaten Datenschutzerklärung auf zollabverkauf.de, die Bestandteil dieser AGB ist.
                            </p>
                        </div>
                    </section>

                    {/* § 9 */}
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center text-sm font-bold">§9</span>
                            Schlussbestimmungen
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed pl-11">
                            <p>
                                <strong>(1)</strong> Für alle Streitigkeiten aus oder im Zusammenhang mit der Nutzung dieser Plattform oder den hierüber geschlossenen Verträgen gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).
                            </p>
                            <p>
                                <strong>(2)</strong> Sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist, ist ausschließlicher Gerichtsstand für alle Streitigkeiten der Sitz des Betreibers in München.
                            </p>
                            <p>
                                <strong>(3)</strong> Sollte eine Bestimmung dieser AGB ganz oder teilweise unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzlich zulässige Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
                            </p>
                            <p>
                                <strong>(4)</strong> Der Betreiber behält sich das Recht vor, diese AGB jederzeit zu ändern. Die jeweils aktuelle Fassung ist auf der Plattform einsehbar. Für bereits abgeschlossene Verträge gelten die AGB in der zum Zeitpunkt des Vertragsschlusses gültigen Fassung.
                            </p>
                        </div>
                    </section>

                    {/* Footer Notice */}
                    <div className="mt-12 pt-8 border-t border-border">
                        <div className="flex items-start gap-4 bg-blue-50/80 border border-blue-200 rounded-xl p-6">
                            <div className="flex-shrink-0 p-2 bg-white rounded-full text-blue-600 border border-blue-100">
                                <Icon name="InformationCircleIcon" size={20} variant="solid" />
                            </div>
                            <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">Hinweis</p>
                                <p>
                                    Diese AGB wurden zuletzt am {currentDate} aktualisiert. Bei Fragen zu unseren Geschäftsbedingungen wenden Sie sich bitte an unser <a href="/contact" className="text-blue-600 hover:underline font-medium">Kontaktformular</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AGBContent;
