// Unified Pricing Configuration for TidyBeast
// This ensures consistent pricing across all components

export interface ServicePricing {
  'Studio/1RK': number;
  '1 BHK': number;
  '2 BHK': number;
  '3 BHK': number;
  '4 BHK': number;
  '5+ BHK': number;
  'Villa': number;
}

// For sofa cleaning based on number of seaters
export interface SofaPricing {
  '1-seater': number;
  '2-seater': number;
  '3-seater': number;
  '4-seater': number;
  '5-seater': number;
  '6+-seater': number;
}

// For carpet cleaning based on square feet
export interface CarpetPricing {
  basePrice: number; // Price per sq.ft
  minCharge: number; // Minimum charge
}

export interface ServiceConfig {
  id: string;
  name: string;
  basePrice: number; // Price for 2 BHK (baseline) or base unit price
  duration: string;
  description: string;
  pricing?: ServicePricing; // Optional for BHK-based services
  sofaPricing?: SofaPricing; // For sofa services
  carpetPricing?: CarpetPricing; // For carpet services
  isQuantityBased?: boolean; // For services with quantity/area-based pricing
}

// BHK multipliers based on market research and space size
export const BHK_MULTIPLIERS = {
  'Studio/1RK': 0.7,
  '1 BHK': 0.8,
  '2 BHK': 1.0, // Base price
  '3 BHK': 1.3,
  '4 BHK': 1.6,
  '5+ BHK': 2.0,
  'Villa': 2.5
};

// Generate pricing for a service based on base price
export const generateServicePricing = (basePrice: number): ServicePricing => {
  return {
    'Studio/1RK': Math.round(basePrice * BHK_MULTIPLIERS['Studio/1RK']),
    '1 BHK': Math.round(basePrice * BHK_MULTIPLIERS['1 BHK']),
    '2 BHK': Math.round(basePrice * BHK_MULTIPLIERS['2 BHK']),
    '3 BHK': Math.round(basePrice * BHK_MULTIPLIERS['3 BHK']),
    '4 BHK': Math.round(basePrice * BHK_MULTIPLIERS['4 BHK']),
    '5+ BHK': Math.round(basePrice * BHK_MULTIPLIERS['5+ BHK']),
    'Villa': Math.round(basePrice * BHK_MULTIPLIERS['Villa'])
  };
};

// All service configurations with updated TidyBeast pricing for Hyderabad
export const SERVICES_CONFIG: ServiceConfig[] = [
  {
    id: 'home-cleaning',
    name: 'Home Cleaning',
    basePrice: 2300, // 2 BHK base price
    duration: '2-3 hours',
    description: 'Complete home cleaning with kitchen, bathroom, dusting, vacuuming, and trash removal',
    pricing: {
      'Studio/1RK': 1400,
      '1 BHK': 1800,
      '2 BHK': 2300,
      '3 BHK': 3000,
      '4 BHK': 3700,
      '5+ BHK': 4300,
      'Villa': 5000 // Calculated at ₹3.5 per sq.ft for average villa
    }
  },
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    basePrice: 3600, // 2 BHK base price
    duration: '4-5 hours',
    description: 'Thorough cleaning including inside appliances, windows, and hard-to-reach areas',
    pricing: {
      'Studio/1RK': 2400,
      '1 BHK': 3100,
      '2 BHK': 3600,
      '3 BHK': 4100,
      '4 BHK': 4600,
      '5+ BHK': 5200,
      'Villa': 9000 // Calculated at ₹6.5 per sq.ft for average villa
    }
  },
  {
    id: 'house-maiden',
    name: 'House Maiden',
    basePrice: 1500, // 2 BHK base price (for display consistency)
    duration: '4-6 hours',
    description: 'Dedicated daily household maintenance including dish washing, kitchen cleanup, floor mopping, and laundry',
    pricing: {
      'Studio/1RK': 1000, // Smaller space, less work
      '1 BHK': 1200, // Base price
      '2 BHK': 1500, // Moderate increase for additional room
      '3 BHK': 1800, // More rooms, more cleaning
      '4 BHK': 2200, // Larger homes need more time
      '5+ BHK': 2600, // Maximum residential size
      'Villa': 3000 // Independent houses with more area
    }
  },
  {
    id: 'move-in-out',
    name: 'Move-In/Out Cleaning',
    basePrice: 5999, // 2 BHK base price
    duration: '4-6 hours',
    description: 'Complete cleaning for moving needs, empty spaces, cabinets, and all appliances',
    pricing: {
      'Studio/1RK': 4000, // Estimated for studio
      '1 BHK': 4500,
      '2 BHK': 5999,
      '3 BHK': 7000,
      '4 BHK': 7999,
      '5+ BHK': 8799,
      'Villa': 10500 // Calculated at ₹7.5 per sq.ft for average villa
    }
  },
  {
    id: 'sofa-cleaning',
    name: 'Sofa Cleaning',
    basePrice: 350, // Base price for 2-seater sofa
    duration: '1-2 hours',
    description: 'Professional sofa shampooing based on number of seaters',
    isQuantityBased: true,
    sofaPricing: {
      '1-seater': 300,
      '2-seater': 350,
      '3-seater': 450,
      '4-seater': 550,
      '5-seater': 650,
      '6+-seater': 750
    }
  },
  {
    id: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    basePrice: 20, // Price per sq.ft
    duration: '1-2 hours',
    description: 'Professional carpet shampooing at ₹20 per square feet',
    isQuantityBased: true,
    carpetPricing: {
      basePrice: 20, // Per sq.ft rate
      minCharge: 200 // Minimum charge for small carpets
    }
  },
  {
    id: 'sanitization',
    name: 'Sanitization Service',
    basePrice: 2750, // 2 BHK estimated at ₹2.5 per sq.ft for 1100 sq.ft
    duration: '2-3 hours',
    description: 'Hospital-grade disinfection at ₹2.5 per sq.ft for maximum health protection',
    pricing: {
      'Studio/1RK': 1250, // ~500 sq.ft
      '1 BHK': 1750, // ~700 sq.ft
      '2 BHK': 2750, // ~1100 sq.ft
      '3 BHK': 3750, // ~1500 sq.ft
      '4 BHK': 4500, // ~1800 sq.ft
      '5+ BHK': 5500, // ~2200 sq.ft
      'Villa': 7500 // ~3000 sq.ft
    }
  },
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    basePrice: 1500,
    duration: '1-2 hours',
    description: 'Deep kitchen cleaning including appliances, cabinets, and surfaces - ₹1500 per kitchen',
    pricing: {
      'Studio/1RK': 1500, // 1 kitchen
      '1 BHK': 1500, // 1 kitchen
      '2 BHK': 1500, // 1 kitchen (base price)
      '3 BHK': 1500, // 1 kitchen
      '4 BHK': 3000, // 2 kitchens typical
      '5+ BHK': 3000, // 2 kitchens typical
      'Villa': 4500 // 3 kitchens typical
    }
  },
  {
    id: 'washroom-cleaning',
    name: 'Washroom Cleaning',
    basePrice: 799,
    duration: '1 hour',
    description: 'Thorough washroom cleaning with sanitization and deep scrubbing - ₹799 per washroom',
    pricing: {
      'Studio/1RK': 799, // 1 bathroom
      '1 BHK': 799, // 1 bathroom
      '2 BHK': 1598, // 2 bathrooms typical
      '3 BHK': 2397, // 3 bathrooms typical
      '4 BHK': 3196, // 4 bathrooms typical
      '5+ BHK': 3995, // 5 bathrooms typical
      'Villa': 5593 // 7 bathrooms typical
    }
  }
];

// Helper function to get pricing for a specific service and BHK
export const getServicePrice = (serviceId: string, bhkType: keyof ServicePricing): number => {
  const service = SERVICES_CONFIG.find(s => s.id === serviceId);
  if (!service || !service.pricing) {
    // Fallback to home cleaning pricing if service not found
    return SERVICES_CONFIG[0].pricing![bhkType];
  }
  return service.pricing[bhkType];
};

// Helper function to get sofa cleaning price based on seater count
export const getSofaPrice = (seaterType: keyof SofaPricing): number => {
  const sofaService = SERVICES_CONFIG.find(s => s.id === 'sofa-cleaning');
  if (!sofaService || !sofaService.sofaPricing) {
    return 350; // Default fallback
  }
  return sofaService.sofaPricing[seaterType];
};

// Helper function to calculate carpet cleaning price based on area
export const getCarpetPrice = (squareFeet: number): number => {
  const carpetService = SERVICES_CONFIG.find(s => s.id === 'carpet-cleaning');
  if (!carpetService || !carpetService.carpetPricing) {
    return 20 * squareFeet; // Default fallback
  }
  
  const totalPrice = carpetService.carpetPricing.basePrice * squareFeet;
  return Math.max(totalPrice, carpetService.carpetPricing.minCharge);
};

// Sofa seater options for selection
export const SOFA_SEATER_OPTIONS = [
  { value: '1-seater', label: '1-Seater', price: 300 },
  { value: '2-seater', label: '2-Seater', price: 350 },
  { value: '3-seater', label: '3-Seater', price: 450 },
  { value: '4-seater', label: '4-Seater', price: 550 },
  { value: '5-seater', label: '5-Seater', price: 650 },
  { value: '6+-seater', label: '6+ Seater', price: 750 }
];

// Helper function to get service configuration
export const getServiceConfig = (serviceId: string): ServiceConfig | undefined => {
  return SERVICES_CONFIG.find(s => s.id === serviceId);
};

// BHK options for dropdowns and selectors
export const BHK_OPTIONS = [
  { value: 'Studio/1RK', label: 'Studio/1RK' },
  { value: '1 BHK', label: '1 BHK' },
  { value: '2 BHK', label: '2 BHK', popular: true },
  { value: '3 BHK', label: '3 BHK' },
  { value: '4 BHK', label: '4 BHK' },
  { value: '5+ BHK', label: '5+ BHK' },
  { value: 'Villa', label: 'Villa' }
];
