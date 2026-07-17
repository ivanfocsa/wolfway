export const company = {
  name: 'WolfWay Logistics LLC',
  phone: '+1 (224) 446-4256',
  phoneRaw: '+12244464256',
  email: 'wolfwaylogistics@gmail.com',
  tagline: 'Open-deck freight, handled right.',
  description:
    'Reliable flatbed, step deck and open-deck transportation built around safety, communication and dependable delivery.',
} as const;

export interface Principle {
  title: string;
  description: string;
}

export const principles: Principle[] = [
  {
    title: 'Safety First',
    description:
      'Every carrier in our network meets strict safety standards. We verify CSA scores, insurance, and equipment condition before a single load moves.',
  },
  {
    title: 'Clear Communication',
    description:
      'You will always know where your freight is. Real-time updates, responsive dispatch, and a single point of contact from pickup to delivery.',
  },
  {
    title: 'Built for the Long Haul',
    description:
      'We build lasting relationships with shippers, drivers, and carriers. Consistent service, fair rates, and people who answer the phone.',
  },
];
