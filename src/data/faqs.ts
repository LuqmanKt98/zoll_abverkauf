export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export const FAQS: FAQ[] = [
  // Fahrzeuge FAQs
  {
    id: 'faq-vehicles-1',
    question: 'Warum werden diese Fahrzeuge verkauft?',
    answer: 'Die angebotenen Fahrzeuge stammen aus Sicherstellungen, Beschlagnahmen, Pfändungen oder nicht abgeholten Importen. Nach Abschluss der jeweiligen Verfahren werden diese Bestände gemäß den gesetzlichen Vorgaben der Zollverwaltung verwertet, um Lagerflächen freizuhalten und Verwaltungsabläufe zu vereinfachen.',
    category: 'Fahrzeuge',
    order: 1,
  },
  {
    id: 'faq-vehicles-2',
    question: 'In welchem Zustand befinden sich die Fahrzeuge?',
    answer: 'Alle Fahrzeuge befinden sich in geprüftem, verwahrtem Zustand. Wesentliche technische Funktionen wie Motor, Bremsen und Elektronik wurden im Rahmen der Verwahrung überprüft. Eventuelle Mängel werden dokumentiert. Eine persönliche Besichtigung ist aus organisatorischen Gründen nicht möglich – die Fahrzeuge werden so verkauft, wie sie sich zum Zeitpunkt der Freigabe befinden.',
    category: 'Fahrzeuge',
    order: 2,
  },
  {
    id: 'faq-vehicles-3',
    question: 'Kann ich die Fahrzeuge selbst besichtigen oder abholen?',
    answer: 'Nein. Persönliche Besichtigungen oder Abholungen sind aus Sicherheits- und Haftungsgründen nicht möglich. Die Fahrzeuge befinden sich ausschließlich an zentralen Verwahrungs- oder Zollstandorten, die nicht öffentlich zugänglich sind. Nach Zahlungseingang erfolgt die Lieferung ausschließlich über zugelassene, versicherte Logistik- oder Werttransportdienstleister. Jede Sendung ist bis zum vollen Warenwert versichert und wird mit Zustellnachweis übergeben.',
    category: 'Fahrzeuge',
    order: 3,
  },
  {
    id: 'faq-vehicles-4',
    question: 'Welche Zahlungsoptionen gibt es?',
    answer: 'Die Zahlung erfolgt ausschließlich vorab per Banküberweisung auf das angegebene Verwertungskonto der Zollstelle. Andere Zahlungsmethoden (z. B. Kryptowährungen) sind nur in Ausnahmefällen und nach vorheriger Zustimmung möglich. Barzahlungen oder Zahlungen bei Übergabe sind ausgeschlossen. Dies stellt eine rechtssichere Zahlungsabwicklung sicher.',
    category: 'Fahrzeuge',
    order: 4,
  },
  {
    id: 'faq-vehicles-5',
    question: 'Ist eine Registrierung erforderlich?',
    answer: 'Nein. Für den Erwerb der Fahrzeuge ist keine Registrierung oder Teilnahme an einer Auktion erforderlich. Die Kontaktaufnahme über das Anfrageformular genügt. Nach Erfassung der Käuferdaten wird der Erwerb gemäß den behördlichen Vorgaben abgewickelt.',
    category: 'Fahrzeuge',
    order: 5,
  },
  {
    id: 'faq-vehicles-6',
    question: 'Sind alle aufgeführten Fahrzeuge tatsächlich verfügbar?',
    answer: 'Ja. Alle auf der Webseite veröffentlichten Fahrzeuge sind zum Zeitpunkt der Veröffentlichung verfügbar. Da die Verwertung laufend erfolgt, können Bestände kurzfristig geändert oder entfernt werden. Anfragen werden in der Reihenfolge ihres Eingangs bearbeitet.',
    category: 'Fahrzeuge',
    order: 6,
  },
  {
    id: 'faq-vehicles-7',
    question: 'Gibt es Kaufbeschränkungen?',
    answer: 'Ja. Um eine faire Abwicklung sicherzustellen, kann pro Käufer und Vorgang nur eine bestimmte Anzahl Fahrzeuge erworben werden.',
    category: 'Fahrzeuge',
    order: 7,
  },
  {
    id: 'faq-vehicles-8',
    question: 'Wie funktioniert die Lieferung?',
    answer: 'Die Auslieferung erfolgt ausschließlich über zugelassene, versicherte Speditions- oder Wertlogistikunternehmen. Nach Zahlungseingang wird der Versand veranlasst, und der Käufer erhält eine Sendungsbestätigung mit Nachverfolgungsnummer. Eine Abholung vor Ort oder Übergabe an Dritte ist aus haftungsrechtlichen Gründen nicht möglich.',
    category: 'Fahrzeuge',
    order: 8,
  },
  {
    id: 'faq-vehicles-9',
    question: 'Werden Käuferdaten erfasst?',
    answer: 'Ja. Käuferdaten werden ausschließlich zum Zweck der Vertragsabwicklung, Zahlungszuordnung und Versandorganisation erhoben. Eine Weitergabe an Dritte erfolgt nur, soweit dies für Transport oder gesetzliche Nachweisführung notwendig ist.',
    category: 'Fahrzeuge',
    order: 9,
  },

  // Edelmetalle FAQs
  {
    id: 'faq-precious-metals-1',
    question: 'Wie werden die Edelmetalle authentifiziert?',
    answer: 'Alle Edelmetalle durchlaufen ein mehrstufiges Authentifizierungsverfahren: Zunächst erfolgt eine visuelle Prüfung durch zertifizierte Sachverständige, gefolgt von einer Röntgenfluoreszenzspektroskopie (XRF) zur präzisen Bestimmung der Legierungszusammensetzung. Bei Bedarf werden zusätzlich Säuretests und Dichtemessungen durchgeführt. Alle Ergebnisse werden in einem amtlichen Prüfzertifikat dokumentiert, das jedem Käufer ausgehändigt wird.',
    category: 'Edelmetalle',
    order: 1,
  },
  {
    id: 'faq-precious-metals-2',
    question: 'Wie erfolgt die Lagerung und Abholung der Edelmetalle?',
    answer: 'Die Edelmetalle werden in hochsicheren Tresoren des Hauptzollamts unter Videoüberwachung und Alarmanlagen gelagert. Nach erfolgreicher Anfrage und Kaufabwicklung erfolgt die Übergabe ausschließlich persönlich gegen Vorlage eines gültigen Lichtbildausweises. Ein Versand ist aus Sicherheitsgründen nicht möglich. Die Abholung muss innerhalb von 30 Tagen nach Kaufbestätigung erfolgen, andernfalls fallen Lagerkosten an.',
    category: 'Edelmetalle',
    order: 2,
  },
  {
    id: 'faq-precious-metals-3',
    question: 'Was sollte bei Edelmetall-Investitionen beachtet werden?',
    answer: 'Edelmetalle unterliegen Marktpreisschwankungen und sollten als langfristige Wertanlage betrachtet werden. Beim Kauf sind die aktuellen Steuerbestimmungen zu beachten: Gold ist ab 1g meldepflichtig, Silber ab 2kg. Für Investitionszwecke empfehlen wir Barren und Münzen mit hohem Feingehalt (999 oder höher). Beachten Sie auch die Aufbewahrungskosten und Versicherungsmöglichkeiten für Ihre Edelmetallbestände.',
    category: 'Edelmetalle',
    order: 3,
  },
  {
    id: 'faq-precious-metals-4',
    question: 'Welche rechtlichen Bestimmungen gelten für Edelmetall-Transaktionen?',
    answer: 'Alle Edelmetall-Verkäufe unterliegen dem Geldwäschegesetz (GwG) und erfordern bei Beträgen über 2.000 € eine Identitätsprüfung des Käufers. Geschäfte über 10.000 € sind meldepflichtig. Die Herkunft aller angebotenen Edelmetalle ist vollständig dokumentiert und rechtlich einwandfrei. Käufer erhalten eine ordnungsgemäße Rechnung mit ausgewiesener Mehrwertsteuer (falls zutreffend) sowie alle erforderlichen Zertifikate für den Weiterverkauf oder die steuerliche Behandlung.',
    category: 'Edelmetalle',
    order: 4,
  },
  {
    id: 'faq-precious-metals-5',
    question: 'Wie werden die Marktpreise ermittelt?',
    answer: 'Die angegebenen Marktwerte basieren auf den aktuellen Börsenpreisen der London Bullion Market Association (LBMA) für Gold und Silber sowie auf Platinpreisen der London Platinum and Palladium Market (LPPM). Die Preise werden täglich aktualisiert und berücksichtigen den jeweiligen Feingehalt sowie marktübliche Auf- und Abschläge. Endgültige Verkaufspreise werden zum Zeitpunkt der Kaufabwicklung auf Basis der dann aktuellen Marktpreise festgelegt.',
    category: 'Edelmetalle',
    order: 5,
  },
  {
    id: 'faq-precious-metals-6',
    question: 'Wie lange sind die Zertifikate gültig?',
    answer: 'Die von uns ausgestellten Authentifizierungszertifikate haben unbegrenzte Gültigkeit, da sie die zum Prüfzeitpunkt festgestellten physikalischen Eigenschaften der Edelmetalle dokumentieren. Diese Eigenschaften ändern sich nicht über die Zeit. Die Zertifikate werden von international anerkannten Prüflaboren ausgestellt und entsprechen den Standards der Deutschen Akkreditierungsstelle (DAkkS). Sie sind weltweit als Nachweis für Reinheit und Authentizität anerkannt.',
    category: 'Edelmetalle',
    order: 6,
  },

  // Bau-/Landmaschinen FAQs
  {
    id: 'faq-machinery-1',
    question: 'Warum werden diese Maschinen verkauft?',
    answer: 'Die angebotenen Bau- und Landmaschinen stammen aus Sicherstellungen, Beschlagnahmen, Pfändungen oder nicht abgeholten Importen. Nach Abschluss der jeweiligen Verfahren werden diese Bestände gemäß den gesetzlichen Vorgaben der Zollverwaltung verwertet, um Lagerflächen freizuhalten und Verwaltungsabläufe zu vereinfachen.',
    category: 'Bau-/Landmaschinen',
    order: 1,
  },
  {
    id: 'faq-machinery-2',
    question: 'In welchem Zustand befinden sich die Maschinen?',
    answer: 'Alle Maschinen befinden sich in geprüftem, verwahrtem Zustand. Wesentliche Funktionen und technische Komponenten wurden im Rahmen der Verwahrung überprüft. Eventuelle Mängel werden dokumentiert. Eine persönliche Besichtigung ist aus organisatorischen Gründen nicht möglich – alle Maschinen werden so verkauft, wie sie sich zum Zeitpunkt der Freigabe befinden.',
    category: 'Bau-/Landmaschinen',
    order: 2,
  },
  {
    id: 'faq-machinery-3',
    question: 'Kann ich die Maschinen selbst besichtigen oder abholen?',
    answer: 'Nein. Persönliche Besichtigungen oder Abholungen sind aus Sicherheits- und Haftungsgründen nicht möglich. Die Maschinen befinden sich ausschließlich an zentralen Verwahrungs- oder Zollstandorten, die nicht öffentlich zugänglich sind. Nach Zahlungseingang erfolgt die Lieferung ausschließlich über zugelassene, versicherte Logistik- oder Werttransportdienstleister. Jede Sendung ist bis zum vollen Warenwert versichert und wird mit Zustellnachweis übergeben.',
    category: 'Bau-/Landmaschinen',
    order: 3,
  },
  {
    id: 'faq-machinery-4',
    question: 'Welche Zahlungsoptionen gibt es?',
    answer: 'Die Zahlung erfolgt ausschließlich vorab per Banküberweisung auf das angegebene Verwertungskonto der Zollstelle. Andere Zahlungsmethoden (z. B. Kryptowährungen) sind nur in Ausnahmefällen und nach vorheriger Zustimmung möglich. Barzahlungen oder Zahlungen bei Übergabe sind ausgeschlossen. Dies stellt eine rechtssichere Zahlungsabwicklung sicher.',
    category: 'Bau-/Landmaschinen',
    order: 4,
  },
  {
    id: 'faq-machinery-5',
    question: 'Ist eine Registrierung erforderlich?',
    answer: 'Nein. Für den Erwerb der Maschinen ist keine Registrierung oder Teilnahme an einer Auktion erforderlich. Die Kontaktaufnahme über das Anfrageformular genügt. Nach Erfassung der Käuferdaten wird der Erwerb gemäß den behördlichen Vorgaben abgewickelt.',
    category: 'Bau-/Landmaschinen',
    order: 5,
  },
  {
    id: 'faq-machinery-6',
    question: 'Sind alle aufgeführten Maschinen tatsächlich verfügbar?',
    answer: 'Ja. Alle auf der Webseite veröffentlichten Maschinen sind zum Zeitpunkt der Veröffentlichung verfügbar. Da die Verwertung laufend erfolgt, können Bestände kurzfristig geändert oder entfernt werden. Anfragen werden in der Reihenfolge ihres Eingangs bearbeitet.',
    category: 'Bau-/Landmaschinen',
    order: 6,
  },
  {
    id: 'faq-machinery-7',
    question: 'Gibt es Kaufbeschränkungen?',
    answer: 'Ja. Um eine faire Abwicklung sicherzustellen, kann pro Käufer und Vorgang nur eine bestimmte Anzahl Maschinen erworben werden.',
    category: 'Bau-/Landmaschinen',
    order: 7,
  },
  {
    id: 'faq-machinery-8',
    question: 'Wie funktioniert die Lieferung?',
    answer: 'Die Auslieferung erfolgt ausschließlich über zugelassene, versicherte Speditions- oder Wertlogistikunternehmen. Nach Zahlungseingang wird der Versand veranlasst, und der Käufer erhält eine Sendungsbestätigung mit Nachverfolgungsnummer. Eine Abholung vor Ort oder Übergabe an Dritte ist aus haftungsrechtlichen Gründen nicht möglich.',
    category: 'Bau-/Landmaschinen',
    order: 8,
  },
  {
    id: 'faq-machinery-9',
    question: 'Werden Käuferdaten erfasst?',
    answer: 'Ja. Käuferdaten werden ausschließlich zum Zweck der Vertragsabwicklung, Zahlungszuordnung und Versandorganisation erhoben. Eine Weitergabe an Dritte erfolgt nur, soweit dies für Transport oder gesetzliche Nachweisführung notwendig ist.',
    category: 'Bau-/Landmaschinen',
    order: 9,
  },

  // Verschiedenes FAQs
  {
    id: 'faq-misc-1',
    question: 'Warum werden diese Waren verkauft?',
    answer: 'Die angebotenen Waren stammen aus Sicherstellungen, Beschlagnahmen, Pfändungen, Insolvenz- und Praxisauflösungen oder nicht abgeholten Importen. Nach Abschluss der jeweiligen Verfahren werden diese Bestände gemäß gesetzlichen Vorgaben verwertet, um Lagerflächen freizuhalten und behördliche Abläufe zu vereinfachen.',
    category: 'Verschiedenes',
    order: 1,
  },
  {
    id: 'faq-misc-2',
    question: 'Welche Art von Waren werden angeboten?',
    answer: 'Im Bereich "Verschiedenes" können unterschiedlichste Güter verfügbar sein, darunter z. B. Plattenwaren, Warencontainer, Industrie- und Metallerzeugnisse (Kupfer, Aluminium usw.), Restbestände, Sonderposten oder digitale Vermögenswerte. Das Sortiment ist dynamisch und verändert sich laufend.',
    category: 'Verschiedenes',
    order: 2,
  },
  {
    id: 'faq-misc-3',
    question: 'In welchem Zustand befinden sich die Waren?',
    answer: 'Alle Artikel befinden sich in behördlich verwahrtem, dokumentiertem Zustand. Je nach Warengruppe werden grundlegende Prüfungen wie Mengen-, Qualitäts- oder Materialkontrollen vorgenommen. Eine individuelle oder physische Besichtigung ist nicht möglich. Der Verkauf erfolgt stets im Zustand zum Zeitpunkt der Freigabe.',
    category: 'Verschiedenes',
    order: 3,
  },
  {
    id: 'faq-misc-4',
    question: 'Kann ich die Waren selbst besichtigen oder abholen?',
    answer: 'Nein. Besichtigungen oder Selbstabholungen sind aufgrund von Sicherheits-, Logistik- und Haftungsrichtlinien ausgeschlossen. Die Waren lagern ausschließlich an gesicherten Verwahrungs- oder Zollstandorten. Nach Zahlungseingang erfolgt die Auslieferung ausschließlich über zugelassene, versicherte Transport- oder Wertdienstleister – je nach Art der Ware. ',
    category: 'Verschiedenes',
    order: 4,
  },
  {
    id: 'faq-misc-5',
    question: 'Welche Zahlungsoptionen gibt es?',
    answer: 'Grundsätzlich erfolgt die Zahlung per Banküberweisung an das angegebene Verwertungskonto der Zoll- bzw. Gläubigerstelle. Alternative Zahlungsmethoden – etwa Kryptowährungen oder andere Sonderformen – sind nur in Ausnahmefällen und nach ausdrücklicher Zustimmung möglich. Barzahlungen oder Zahlungen bei Übergabe sind ausgeschlossen.',
    category: 'Verschiedenes',
    order: 5,
  },
  {
    id: 'faq-misc-6',
    question: 'Ist eine Registrierung erforderlich?',
    answer: 'Nein. Für den Erwerb ist keine Registrierung oder Teilnahme an einem Auktionsverfahren notwendig. Eine Anfrage über das Kontaktformular reicht aus; anschließend erfolgt die Abwicklung gemäß den gesetzlichen Anforderungen.',
    category: 'Verschiedenes',
    order: 6,
  },
  {
    id: 'faq-misc-7',
    question: 'Sind die aufgeführten Waren verfügbar?',
    answer: 'Ja, alle veröffentlichten Waren sind zum Zeitpunkt der Darstellung verfügbar. Da die Verwertung laufend erfolgt und neue Posten hinzukommen oder wegfallen können, behalten wir uns kurzfristige Änderungen vor. Anfragen werden nach zeitlichem Eingang bearbeitet.',
    category: 'Verschiedenes',
    order: 7,
  },
  {
    id: 'faq-misc-8',
    question: 'Gibt es Kauf- oder Mengenbeschränkungen?',
    answer: 'Abhängig von der Warengruppe kann die Menge pro Käufer begrenzt sein, um eine faire und nachvollziehbare Abwicklung sicherzustellen.',
    category: 'Verschiedenes',
    order: 8,
  },
  {
    id: 'faq-misc-9',
    question: 'Wie funktioniert die Lieferung?',
    answer: 'Die Lieferung erfolgt ausschließlich über versicherte Logistik-, Speditions- oder Werttransportunternehmen – angepasst an die jeweilige Warengruppe. Nach Zahlungseingang erhalten Käufer eine Versandbestätigung mit Sendungs- oder Übergabenachweis. Abholungen oder Übergaben an dritte Parteien sind ausgeschlossen.',
    category: 'Verschiedenes',
    order: 9,
  },
  {
    id: 'faq-misc-10',
    question: 'Werden Käuferdaten erfasst?',
    answer: 'Ja. Käuferdaten werden zur gesetzlich vorgeschriebenen Vertragsabwicklung, Zahlungszuordnung und Versandorganisation erhoben. Eine Weitergabe erfolgt nur, soweit dies für Transport, Dokumentation oder behördliche Nachweise erforderlich ist.',
    category: 'Verschiedenes',
    order: 10,
  },

  // Allgemeine FAQs
  {
    id: 'faq-general-1',
    question: 'Wie registriere ich mich für Auktionen?',
    answer: 'Erstellen Sie ein Konto auf unserer Website und verifizieren Sie Ihre Identität. Nach der Freischaltung können Sie an allen Auktionen teilnehmen.',
    category: 'Allgemein',
    order: 1,
  },
  {
    id: 'faq-general-2',
    question: 'Welche Gebühren fallen an?',
    answer: 'Zusätzlich zum Kaufpreis fällt eine Bearbeitungsgebühr von 10% an. Bei Versand kommen Versandkosten hinzu.',
    category: 'Allgemein',
    order: 2,
  },
  {
    id: 'faq-general-3',
    question: 'Wie lange dauert die Abwicklung?',
    answer: 'Nach Zahlungseingang können Sie die Ware innerhalb von 5 Werktagen abholen oder versenden lassen.',
    category: 'Allgemein',
    order: 3,
  },
  {
    id: 'faq-general-4',
    question: 'Kann ich als Unternehmen kaufen?',
    answer: 'Ja, sowohl Privatpersonen als auch Unternehmen können bei uns kaufen. Unternehmen erhalten auf Wunsch eine Rechnung mit ausgewiesener Mehrwertsteuer.',
    category: 'Allgemein',
    order: 4,
  },
  {
    id: 'faq-general-5',
    question: 'Wie kontaktiere ich den Kundenservice?',
    answer: 'Unser Kundenservice ist per E-Mail, Telefon und über das Kontaktformular erreichbar. Die Öffnungszeiten sind Montag bis Freitag von 9:00 bis 17:00 Uhr.',
    category: 'Allgemein',
    order: 5,
  },
];

export function getFAQsByCategory(category: string): FAQ[] {
  return FAQS.filter(faq => faq.category === category).sort((a, b) => a.order - b.order);
}

export function getAllFAQs(): FAQ[] {
  return FAQS.sort((a, b) => a.order - b.order);
}
