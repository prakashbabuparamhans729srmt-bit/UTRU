
export interface ServiceCategory {
  id: string;
  name: string;
  children?: ServiceCategory[];
  serviceId?: string;
  imageHint: string;
}

export const serviceHierarchy: ServiceCategory[] = [
  {
    id: 'repairs',
    name: 'Repairs',
    imageHint: 'tools repair',
    children: [
      {
        id: 'ac-service-repair',
        name: 'AC Service & Repair',
        imageHint: 'ac repair',
        children: [
          {
            id: 'split-ac',
            name: 'Split AC',
            imageHint: 'split ac',
            children: [
              {
                id: 'foam-jet-service',
                name: 'Foam & Jet Service',
                serviceId: 'electronics-ac-repair',
                imageHint: 'ac service'
              },
              {
                id: 'gas-charging',
                name: 'Gas Charging',
                serviceId: 'electronics-ac-repair',
                imageHint: 'ac gas'
              }
            ]
          },
          {
            id: 'window-ac',
            name: 'Window AC',
            imageHint: 'window ac',
            children: [
               {
                id: 'window-ac-cleaning',
                name: 'Cleaning',
                serviceId: 'electronics-ac-repair',
                imageHint: 'ac cleaning'
              },
            ]
          }
        ]
      },
      {
        id: 'tv-repair',
        name: 'TV Repair',
        serviceId: 'electronics-tv-repair',
        imageHint: 'tv repair'
      },
       {
        id: 'washing-machine-repair',
        name: 'Washing Machine',
        serviceId: 'electronics-washing-machine',
        imageHint: 'washing machine'
      },
       {
        id: 'geyser-repair',
        name: 'Geyser Repair',
        serviceId: 'electronics-geyser',
        imageHint: 'water heater'
      },
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning Services',
    imageHint: 'home cleaning',
    children: [
      { id: 'deep-cleaning', name: 'Deep Home Cleaning', serviceId: 'cleaning-deep-cleaning', imageHint: 'home cleaning' },
      { id: 'pest-control', name: 'Pest Control', serviceId: 'cleaning-pest-control', imageHint: 'pest control' },
      { id: 'sofa-cleaning', name: 'Sofa & Carpet Cleaning', serviceId: 'cleaning-sofa-cleaning', imageHint: 'sofa cleaning' },
      { id: 'car-cleaning-from-cleaning', name: 'Car Cleaning', serviceId: 'cleaning-car-cleaning', imageHint: 'car washing' }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    imageHint: 'salon hair',
    children: [
      { id: 'salon-for-women', name: 'Salon for Women', serviceId: 'beauty-salon', imageHint: 'salon hair' },
      { id: 'spa-at-home', name: 'Spa at Home', serviceId: 'beauty-spa', imageHint: 'spa relax' },
      { id: 'makeup-and-hair', name: 'Makeup & Hair', serviceId: 'beauty-makeup', imageHint: 'makeup artist' },
      { id: 'manicure-pedicure', name: 'Manicure & Pedicure', serviceId: 'beauty-manicure', imageHint: 'manicure nails' }
    ]
  },
  {
    id: 'car-care',
    name: 'Car Care',
    imageHint: 'car service',
    children: [
      { id: 'interior-detailing', name: 'Interior Detailing', serviceId: 'car-interior-detailing', imageHint: 'interior detailing' },
      { id: 'exterior-wash', name: 'Exterior Wash', serviceId: 'car-exterior-wash', imageHint: 'exterior wash' },
      { id: 'full-service', name: 'Full Service', serviceId: 'car-full-service', imageHint: 'car service' },
      { id: 'tyre-care', name: 'Tyre & Wheel Care', serviceId: 'car-tyre-care', imageHint: 'tyre care' }
    ]
  },
  {
    id: 'painting',
    name: 'Painting Services',
    imageHint: 'wall painting',
    children: [
      { id: 'interior-painting', name: 'Interior Painting', serviceId: 'painting-interior', imageHint: 'interior painting' },
      { id: 'exterior-painting', name: 'Exterior Painting', serviceId: 'painting-exterior', imageHint: 'exterior painting' },
      { id: 'wood-polishing', name: 'Wood Polishing', serviceId: 'painting-wood', imageHint: 'wood painting' },
      { id: 'metal-painting', name: 'Metal Painting', serviceId: 'painting-metal', imageHint: 'metal painting' }
    ]
  }
];
