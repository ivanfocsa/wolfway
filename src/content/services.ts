export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  features: string[];
  imageAlt: string;
  imagePath: string;
}

export const services: Service[] = [
  {
    slug: 'flatbed-freight',
    title: 'Flatbed Freight',
    shortTitle: 'Flatbed',
    description:
      'Standard flatbed transportation for oversized, heavy, and irregularly shaped loads. Reliable capacity with experienced operators.',
    longDescription:
      'Our flatbed freight service handles everything from steel coils and lumber to construction equipment and industrial machinery. Every load is secured by trained professionals using proper tie-downs, edge protectors, and tarping when required. We maintain a network of vetted carriers with clean safety records and modern equipment.',
    features: [
      'Up to 48,000 lbs capacity',
      'Standard 48\' and 53\' trailers',
      'Tarping and load securement included',
      'Real-time GPS tracking',
      'Dedicated dispatch support',
    ],
    imageAlt: 'Flatbed truck hauling steel beams on an open highway',
    imagePath: '/images/services/flatbed.jpg',
  },
  {
    slug: 'step-deck-transport',
    title: 'Step Deck Transport',
    shortTitle: 'Step Deck',
    description:
      'Step deck trailers for taller freight that exceeds standard flatbed height limits. Two-level loading for maximum flexibility.',
    longDescription:
      'Step deck trailers provide the extra height clearance needed for tall equipment, machinery, and oversized cargo. With a lower deck height of approximately 38 inches, step decks can handle freight up to 10 feet tall without requiring oversize permits. We coordinate loading, securement, and route planning for every shipment.',
    features: [
      'Lower deck height for tall loads',
      'No permits needed for loads up to 10\' tall',
      'Front and rear loading capability',
      'Experienced oversize load planning',
      'Permit coordination when needed',
    ],
    imageAlt:
      'Step deck trailer loaded with construction equipment at a job site',
    imagePath: '/images/services/step-deck.jpg',
  },
  {
    slug: 'open-deck-logistics',
    title: 'Open Deck Logistics',
    shortTitle: 'Open Deck',
    description:
      'Full-service open deck logistics coordination across flatbed, step deck, and specialized trailer types. One point of contact for every load.',
    longDescription:
      'Our open deck logistics service matches your freight with the right equipment and the right carrier. Whether you need a single flatbed or a fleet of step decks, we handle carrier selection, rate negotiation, load planning, and shipment tracking. You get one point of contact from pickup to delivery.',
    features: [
      'Multi-trailer type coordination',
      'Carrier vetting and selection',
      'Rate negotiation and optimization',
      'End-to-end shipment management',
      'Consolidated billing and documentation',
    ],
    imageAlt:
      'Multiple open deck trucks lined up at a freight terminal at dawn',
    imagePath: '/images/services/open-deck.jpg',
  },
];
