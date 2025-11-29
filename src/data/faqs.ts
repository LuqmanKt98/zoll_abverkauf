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
    question: 'Wie kann ich ein Fahrzeug erwerben?',
    answer: 'Fahrzeuge können über unsere Online-Plattform oder bei öffentlichen Versteigerungen erworben werden. Registrieren Sie sich auf unserer Website, um an Auktionen teilzunehmen.',
    category: 'Fahrzeuge',
    order: 1,
  },
  {
    id: 'faq-vehicles-2',
    question: 'Welche Dokumente erhalte ich beim Kauf?',
    answer: 'Sie erhalten alle notwendigen Fahrzeugpapiere, einschließlich Fahrzeugbrief, Fahrzeugschein und ggf. TÜV-Berichte. Bei Importfahrzeugen werden auch Zolldokumente bereitgestellt.',
    category: 'Fahrzeuge',
    order: 2,
  },
  {
    id: 'faq-vehicles-3',
    question: 'Kann ich das Fahrzeug vor dem Kauf besichtigen?',
    answer: 'Ja, Besichtigungstermine können nach vorheriger Anmeldung vereinbart werden. Bitte kontaktieren Sie uns mindestens 48 Stunden im Voraus.',
    category: 'Fahrzeuge',
    order: 3,
  },
  {
    id: 'faq-vehicles-4',
    question: 'Gibt es eine Garantie auf die Fahrzeuge?',
    answer: 'Zollfahrzeuge werden in der Regel ohne Garantie verkauft. Der Zustand wird in der Produktbeschreibung detailliert angegeben.',
    category: 'Fahrzeuge',
    order: 4,
  },
  {
    id: 'faq-vehicles-5',
    question: 'Wie erfolgt die Übergabe des Fahrzeugs?',
    answer: 'Nach erfolgreicher Zahlung können Sie das Fahrzeug an unserem Standort abholen oder einen Transportdienst beauftragen. Wir unterstützen Sie gerne bei der Organisation.',
    category: 'Fahrzeuge',
    order: 5,
  },

  // Edelmetalle FAQs
  {
    id: 'faq-precious-metals-1',
    question: 'Wie wird die Echtheit der Edelmetalle garantiert?',
    answer: 'Alle Edelmetalle werden von zertifizierten Prüfstellen authentifiziert. Jedes Stück wird mit einem Echtheitszertifikat und detaillierten Prüfberichten geliefert.',
    category: 'Edelmetalle',
    order: 1,
  },
  {
    id: 'faq-precious-metals-2',
    question: 'Welche Zahlungsmethoden werden akzeptiert?',
    answer: 'Wir akzeptieren Banküberweisung, Kreditkarten und bei größeren Beträgen auch Treuhandservice. Barzahlung ist nach vorheriger Absprache möglich.',
    category: 'Edelmetalle',
    order: 2,
  },
  {
    id: 'faq-precious-metals-3',
    question: 'Wie wird der Preis für Edelmetalle festgelegt?',
    answer: 'Die Preise basieren auf dem aktuellen Marktwert, dem Reinheitsgrad und dem Gewicht. Zusätzlich werden Prüfkosten und Verwaltungsgebühren berücksichtigt.',
    category: 'Edelmetalle',
    order: 3,
  },
  {
    id: 'faq-precious-metals-4',
    question: 'Kann ich Edelmetalle versichert versenden lassen?',
    answer: 'Ja, wir bieten versicherten Versand für alle Edelmetalle an. Die Versandkosten richten sich nach Wert und Gewicht der Sendung.',
    category: 'Edelmetalle',
    order: 4,
  },
  {
    id: 'faq-precious-metals-5',
    question: 'Gibt es Mengenrabatte?',
    answer: 'Bei größeren Abnahmemengen können individuelle Konditionen vereinbart werden. Kontaktieren Sie uns für ein persönliches Angebot.',
    category: 'Edelmetalle',
    order: 5,
  },

  // Bau-/Landmaschinen FAQs
  {
    id: 'faq-machinery-1',
    question: 'In welchem Zustand sind die Maschinen?',
    answer: 'Der Zustand variiert von gebraucht bis neuwertig. Jede Maschine wird detailliert beschrieben und mit Fotos dokumentiert. Technische Prüfberichte sind auf Anfrage verfügbar.',
    category: 'Bau-/Landmaschinen',
    order: 1,
  },
  {
    id: 'faq-machinery-2',
    question: 'Sind Betriebsstunden dokumentiert?',
    answer: 'Ja, bei den meisten Maschinen sind die Betriebsstunden dokumentiert und werden in der Produktbeschreibung angegeben.',
    category: 'Bau-/Landmaschinen',
    order: 2,
  },
  {
    id: 'faq-machinery-3',
    question: 'Kann ich die Maschine vor Ort testen?',
    answer: 'Funktionstests können nach Vereinbarung durchgeführt werden. Bitte beachten Sie, dass dafür eine Kaution hinterlegt werden muss.',
    category: 'Bau-/Landmaschinen',
    order: 3,
  },
  {
    id: 'faq-machinery-4',
    question: 'Wie erfolgt der Transport großer Maschinen?',
    answer: 'Wir arbeiten mit spezialisierten Transportunternehmen zusammen und können Ihnen Angebote vermitteln. Der Transport ist nicht im Kaufpreis enthalten.',
    category: 'Bau-/Landmaschinen',
    order: 4,
  },
  {
    id: 'faq-machinery-5',
    question: 'Gibt es Wartungsunterlagen?',
    answer: 'Soweit vorhanden, werden alle verfügbaren Wartungsunterlagen und Bedienungsanleitungen mit übergeben.',
    category: 'Bau-/Landmaschinen',
    order: 5,
  },

  // Verschiedenes FAQs
  {
    id: 'faq-misc-1',
    question: 'Welche Arten von Waren werden angeboten?',
    answer: 'Unser Sortiment umfasst Elektronik, Möbel, Werkzeuge, Sportgeräte, Schmuck und viele weitere Kategorien. Das Angebot ändert sich regelmäßig.',
    category: 'Verschiedenes',
    order: 1,
  },
  {
    id: 'faq-misc-2',
    question: 'Wie oft wird das Sortiment aktualisiert?',
    answer: 'Neue Waren werden wöchentlich hinzugefügt. Abonnieren Sie unseren Newsletter, um über neue Angebote informiert zu werden.',
    category: 'Verschiedenes',
    order: 2,
  },
  {
    id: 'faq-misc-3',
    question: 'Kann ich mehrere Artikel zusammen kaufen?',
    answer: 'Ja, Sie können mehrere Artikel in einer Bestellung kombinieren. Bei größeren Mengen können wir Ihnen einen Gesamtpreis anbieten.',
    category: 'Verschiedenes',
    order: 3,
  },
  {
    id: 'faq-misc-4',
    question: 'Gibt es ein Rückgaberecht?',
    answer: 'Aufgrund der Natur von Zollversteigerungen sind Rückgaben in der Regel ausgeschlossen. Bitte prüfen Sie die Artikel sorgfältig vor dem Kauf.',
    category: 'Verschiedenes',
    order: 4,
  },
  {
    id: 'faq-misc-5',
    question: 'Wie kann ich den Zustand der Waren überprüfen?',
    answer: 'Detaillierte Beschreibungen und Fotos sind für jeden Artikel verfügbar. Besichtigungen können nach Vereinbarung arrangiert werden.',
    category: 'Verschiedenes',
    order: 5,
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

