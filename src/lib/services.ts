
export interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: string;
    rating: number;
    reviews: number;
    checklist: string[];
}

export const servicesData: Service[] = [
    // Cleaning
    {
        id: 'cleaning-deep-cleaning',
        name: 'Deep Home Cleaning',
        description: 'Comprehensive cleaning service for your entire home, including bedrooms, kitchen, and bathrooms.',
        category: 'cleaning',
        price: 2499,
        duration: '4-5 hours',
        rating: 4.8,
        reviews: 1250,
        checklist: ['Full home dusting & vacuuming', 'Kitchen deep clean', 'Bathroom deep clean', 'Floor mopping']
    },
    {
        id: 'cleaning-pest-control',
        name: 'Pest Control',
        description: 'Effective pest control for common household pests like cockroaches, ants, and termites.',
        category: 'cleaning',
        price: 1299,
        duration: '1-2 hours',
        rating: 4.7,
        reviews: 980,
        checklist: ['Inspection of premises', 'Gel application for cockroaches', 'Spray treatment for ants', 'Termite check']
    },
    {
        id: 'cleaning-sofa-cleaning',
        name: 'Sofa & Carpet Cleaning',
        description: 'Professional cleaning for your sofa and carpets to remove dust, stains, and allergens.',
        category: 'cleaning',
        price: 899,
        duration: '2-3 hours',
        rating: 4.9,
        reviews: 1500,
        checklist: ['Sofa vacuuming', 'Shampooing and stain removal', 'Carpet deep cleaning']
    },
    {
        id: 'cleaning-car-cleaning',
        name: 'Car Cleaning',
        description: 'Interior and exterior car cleaning service at your doorstep.',
        category: 'cleaning',
        price: 599,
        duration: '1.5 hours',
        rating: 4.8,
        reviews: 1100,
        checklist: ['Exterior wash and wax', 'Interior vacuuming', 'Dashboard polishing', 'Tire shining']
    },
    // Beauty
    {
        id: 'beauty-salon',
        name: 'Salon for Women',
        description: 'A complete salon experience at home, from haircuts to waxing and facials.',
        category: 'beauty',
        price: 999,
        duration: '2 hours',
        rating: 4.9,
        reviews: 2100,
        checklist: ['Haircut & styling', 'Facial treatment', 'Waxing service']
    },
    {
        id: 'beauty-spa',
        name: 'Spa at Home',
        description: 'Relax and rejuvenate with a professional spa treatment in the comfort of your home.',
        category: 'beauty',
        price: 1499,
        duration: '1.5 hours',
        rating: 4.8,
        reviews: 850,
        checklist: ['Full body massage', 'Aromatherapy', 'Relaxing music']
    },
    {
        id: 'beauty-makeup',
        name: 'Makeup & Hair',
        description: 'Get ready for any occasion with professional makeup and hair styling.',
        category: 'beauty',
        price: 2999,
        duration: '2-3 hours',
        rating: 4.9,
        reviews: 600,
        checklist: ['Party makeup application', 'Hair styling (curls/straightening)', 'Draping']
    },
    {
        id: 'beauty-manicure',
        name: 'Manicure & Pedicure',
        description: 'Classic manicure and pedicure services for beautiful hands and feet.',
        category: 'beauty',
        price: 799,
        duration: '1 hour',
        rating: 4.7,
        reviews: 1300,
        checklist: ['Nail shaping and filing', 'Cuticle care', 'Moisturizing massage', 'Nail polish application']
    },
    // Electronics
    {
        id: 'electronics-tv-repair',
        name: 'TV Repair',
        description: 'Expert repair for all brands of LED, LCD, and Smart TVs.',
        category: 'electronics',
        price: 499,
        duration: '1-2 hours',
        rating: 4.6,
        reviews: 750,
        checklist: ['Diagnosis of the issue', 'Part replacement (if needed, extra cost)', 'Final testing']
    },
    {
        id: 'electronics-ac-repair',
        name: 'AC Service & Repair',
        description: 'Complete AC servicing including filter cleaning, gas check, and repairs.',
        category: 'electronics',
        price: 699,
        duration: '1 hour',
        rating: 4.8,
        reviews: 3200,
        checklist: ['Indoor & outdoor unit cleaning', 'Cooling coil check', 'Gas pressure check']
    },
    {
        id: 'electronics-washing-machine',
        name: 'Washing Machine Repair',
        description: 'Repair services for top-load, front-load, and semi-automatic washing machines.',
        category: 'electronics',
        price: 599,
        duration: '1-2 hours',
        rating: 4.7,
        reviews: 900,
        checklist: ['Problem diagnosis', 'Drum and motor check', 'Water inlet/outlet check']
    },
    {
        id: 'electronics-geyser',
        name: 'Geyser Repair',
        description: 'Installation and repair services for all types of water heaters.',
        category: 'electronics',
        price: 399,
        duration: '1 hour',
        rating: 4.6,
        reviews: 650,
        checklist: ['Heating element check', 'Thermostat inspection', 'Leakage fixing']
    },
    // Add other categories here...
    // Car
    {
        id: 'car-interior-detailing',
        name: 'Interior Detailing',
        description: 'Complete interior cleaning and detailing for a fresh and new car feel.',
        category: 'car',
        price: 1499,
        duration: '3-4 hours',
        rating: 4.9,
        reviews: 550,
        checklist: ['Deep vacuuming', 'Dashboard cleaning and polishing', 'Upholstery shampooing', 'Interior glass cleaning']
    },
    {
        id: 'car-exterior-wash',
        name: 'Exterior Wash',
        description: 'Professional exterior car wash with wax coating for a brilliant shine.',
        category: 'car',
        price: 499,
        duration: '1 hour',
        rating: 4.7,
        reviews: 1800,
        checklist: ['Pressure wash', 'Foam application', 'Manual scrubbing', 'Wax coating']
    },
    {
        id: 'car-full-service',
        name: 'Full Service',
        description: 'A complete car care package including interior and exterior cleaning.',
        category: 'car',
        price: 1899,
        duration: '4-5 hours',
        rating: 4.8,
        reviews: 700,
        checklist: ['Interior detailing', 'Exterior wash & wax', 'Tire & wheel care', 'Engine bay cleaning']
    },
    {
        id: 'car-tyre-care',
        name: 'Tyre & Wheel Care',
        description: 'Tyre shining, wheel alignment, and balancing check.',
        category: 'car',
        price: 799,
        duration: '1.5 hours',
        rating: 4.6,
        reviews: 400,
        checklist: ['Tyre cleaning and polishing', 'Wheel rim cleaning', 'Alignment check']
    },
    // Painting
    {
        id: 'painting-interior',
        name: 'Interior Painting',
        description: 'Professional interior painting services for a fresh new look for your home.',
        category: 'painting',
        price: 8999,
        duration: '2-3 days',
        rating: 4.9,
        reviews: 300,
        checklist: ['Wall preparation & sanding', 'Primer application', 'Two coats of paint', 'Post-painting cleanup']
    },
    {
        id: 'painting-exterior',
        name: 'Exterior Painting',
        description: 'Durable and weather-resistant exterior painting for your house.',
        category: 'painting',
        price: 14999,
        duration: '4-5 days',
        rating: 4.8,
        reviews: 150,
        checklist: ['Surface cleaning', 'Crack filling', 'Weather-proof primer', 'Two coats of exterior paint']
    },
    {
        id: 'painting-wood',
        name: 'Wood Polishing',
        description: 'Give your wooden furniture a new life with professional polishing.',
        category: 'painting',
        price: 1999,
        duration: '1-2 days',
        rating: 4.7,
        reviews: 250,
        checklist: ['Sanding and stripping old polish', 'Stain application', 'Multiple coats of polish']
    },
    {
        id: 'painting-metal',
        name: 'Metal Painting',
        description: 'Anti-rust painting for your metal gates, grills, and railings.',
        category: 'painting',
        price: 1599,
        duration: '1 day',
        rating: 4.6,
        reviews: 200,
        checklist: ['Rust removal', 'Anti-rust primer', 'Two coats of metal paint']
    },
];
