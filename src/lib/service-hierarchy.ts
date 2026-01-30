
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
];
