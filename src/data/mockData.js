// Mock data based on R analysis of AirBnB listings for Paris, Bordeaux, and Lyon

export const cityColors = {
  paris: {
    main: 'hsl(220, 76%, 55%)',
    glow: 'hsl(220, 76%, 65%)',
    gradient: 'linear-gradient(135deg, hsl(220, 76%, 55%), hsl(220, 76%, 35%))',
    class: 'paris'
  },
  bordeaux: {
    main: 'hsl(350, 65%, 50%)',
    glow: 'hsl(350, 65%, 60%)',
    gradient: 'linear-gradient(135deg, hsl(350, 65%, 50%), hsl(350, 65%, 30%))',
    class: 'bordeaux'
  },
  lyon: {
    main: 'hsl(142, 58%, 45%)',
    glow: 'hsl(142, 58%, 55%)',
    gradient: 'linear-gradient(135deg, hsl(142, 58%, 45%), hsl(142, 58%, 25%))',
    class: 'lyon'
  }
};

// Total listings per city (from R analysis)
export const totalListings = [
  { city: 'Paris', total: 65124, color: cityColors.paris.main },
  { city: 'Bordeaux', total: 8456, color: cityColors.bordeaux.main },
  { city: 'Lyon', total: 9823, color: cityColors.lyon.main }
];

// Price statistics (converted to EUR from R analysis)
export const priceStats = [
  { 
    city: 'Paris', 
    mean: 142.50, 
    median: 95.00, 
    min: 8.50, 
    max: 8500.00,
    color: cityColors.paris.main 
  },
  { 
    city: 'Bordeaux', 
    mean: 98.70, 
    median: 72.00, 
    min: 10.20, 
    max: 4250.00,
    color: cityColors.bordeaux.main 
  },
  { 
    city: 'Lyon', 
    mean: 87.40, 
    median: 65.00, 
    min: 12.75, 
    max: 3825.00,
    color: cityColors.lyon.main 
  }
];

// Room type distribution
export const roomTypeDistribution = {
  Paris: [
    { type: 'Entire home/apt', count: 52100, percentage: 80 },
    { type: 'Private room', count: 11722, percentage: 18 },
    { type: 'Shared room', count: 651, percentage: 1 },
    { type: 'Hotel room', count: 651, percentage: 1 }
  ],
  Bordeaux: [
    { type: 'Entire home/apt', count: 6427, percentage: 76 },
    { type: 'Private room', count: 1776, percentage: 21 },
    { type: 'Shared room', count: 169, percentage: 2 },
    { type: 'Hotel room', count: 84, percentage: 1 }
  ],
  Lyon: [
    { type: 'Entire home/apt', count: 7367, percentage: 75 },
    { type: 'Private room', count: 2160, percentage: 22 },
    { type: 'Shared room', count: 197, percentage: 2 },
    { type: 'Hotel room', count: 99, percentage: 1 }
  ]
};

// Most common room type per city
export const mostCommonRoomType = [
  { city: 'Paris', roomType: 'Entire home/apt' },
  { city: 'Bordeaux', roomType: 'Entire home/apt' },
  { city: 'Lyon', roomType: 'Entire home/apt' }
];

// Price distribution data for histogram
export const priceDistribution = {
  Paris: [
    { range: '0-50', count: 8540 },
    { range: '50-100', count: 24570 },
    { range: '100-150', count: 15620 },
    { range: '150-200', count: 8230 },
    { range: '200-300', count: 5120 },
    { range: '300-500', count: 2340 },
    { range: '500+', count: 704 }
  ],
  Bordeaux: [
    { range: '0-50', count: 1860 },
    { range: '50-100', count: 3920 },
    { range: '100-150', count: 1520 },
    { range: '150-200', count: 680 },
    { range: '200-300', count: 340 },
    { range: '300-500', count: 98 },
    { range: '500+', count: 38 }
  ],
  Lyon: [
    { range: '0-50', count: 2450 },
    { range: '50-100', count: 4280 },
    { range: '100-150', count: 1780 },
    { range: '150-200', count: 720 },
    { range: '200-300', count: 420 },
    { range: '300-500', count: 125 },
    { range: '500+', count: 48 }
  ]
};

// Hosts analysis - Single vs Multi-listings
export const hostsAnalysis = {
  Paris: [
    { type: '1 logement', count: 42580, percentage: 65.4 },
    { type: 'Multi-logements', count: 22544, percentage: 34.6 }
  ],
  Bordeaux: [
    { type: '1 logement', count: 6087, percentage: 72.0 },
    { type: 'Multi-logements', count: 2369, percentage: 28.0 }
  ],
  Lyon: [
    { type: '1 logement', count: 6877, percentage: 70.0 },
    { type: 'Multi-logements', count: 2946, percentage: 30.0 }
  ]
};

// Price vs Host Listings scatter data (sampled)
export const priceVsHostListings = {
  Paris: Array.from({ length: 100 }, (_, i) => ({
    hostListings: Math.floor(Math.random() * 50) + 1,
    price: 50 + Math.random() * 400 + (Math.random() * 20 * Math.floor(Math.random() * 5))
  })),
  Bordeaux: Array.from({ length: 80 }, (_, i) => ({
    hostListings: Math.floor(Math.random() * 30) + 1,
    price: 40 + Math.random() * 250 + (Math.random() * 15 * Math.floor(Math.random() * 3))
  })),
  Lyon: Array.from({ length: 80 }, (_, i) => ({
    hostListings: Math.floor(Math.random() * 35) + 1,
    price: 35 + Math.random() * 220 + (Math.random() * 12 * Math.floor(Math.random() * 4))
  }))
};

// Outliers boxplot data
export const boxplotData = {
  Paris: { q1: 65, median: 95, q3: 150, min: 20, max: 350, outliers: [450, 520, 680, 850, 1200] },
  Bordeaux: { q1: 50, median: 72, q3: 115, min: 15, max: 260, outliers: [320, 380, 450, 580] },
  Lyon: { q1: 45, median: 65, q3: 100, min: 18, max: 230, outliers: [290, 350, 420, 520] }
};

// Before/After outlier cleaning
export const outlierCleaningData = {
  Paris: {
    before: { count: 65124, mean: 142.50, median: 95.00 },
    after: { count: 61234, mean: 105.80, median: 92.00 }
  },
  Bordeaux: {
    before: { count: 8456, mean: 98.70, median: 72.00 },
    after: { count: 8012, mean: 78.40, median: 70.00 }
  },
  Lyon: {
    before: { count: 9823, mean: 87.40, median: 65.00 },
    after: { count: 9345, mean: 72.60, median: 63.00 }
  }
};

// ML Model Results - R² by city
export const mlModelResults = [
  { city: 'Paris', r2: 0.324, rmse: 58.2 },
  { city: 'Bordeaux', r2: 0.287, rmse: 42.5 },
  { city: 'Lyon', r2: 0.312, rmse: 38.7 }
];

// Predicted vs Actual prices
export const predictedVsActual = {
  Paris: Array.from({ length: 50 }, () => {
    const actual = 50 + Math.random() * 200;
    const predicted = actual * (0.7 + Math.random() * 0.6);
    return { actual, predicted };
  }),
  Bordeaux: Array.from({ length: 50 }, () => {
    const actual = 40 + Math.random() * 150;
    const predicted = actual * (0.7 + Math.random() * 0.6);
    return { actual, predicted };
  }),
  Lyon: Array.from({ length: 50 }, () => {
    const actual = 35 + Math.random() * 140;
    const predicted = actual * (0.7 + Math.random() * 0.6);
    return { actual, predicted };
  })
};

// Top 10 Neighbourhoods by average price
export const topNeighbourhoods = {
  Paris: [
    { neighbourhood: 'Élysée', meanPrice: 285 },
    { neighbourhood: 'Palais-Bourbon', meanPrice: 268 },
    { neighbourhood: 'Louvre', meanPrice: 245 },
    { neighbourhood: 'Opéra', meanPrice: 232 },
    { neighbourhood: 'Passy', meanPrice: 218 },
    { neighbourhood: 'Luxembourg', meanPrice: 195 },
    { neighbourhood: 'Temple', meanPrice: 178 },
    { neighbourhood: 'Hôtel-de-Ville', meanPrice: 165 },
    { neighbourhood: 'Bourse', meanPrice: 158 },
    { neighbourhood: 'Panthéon', meanPrice: 148 }
  ],
  Bordeaux: [
    { neighbourhood: 'Chartrons', meanPrice: 145 },
    { neighbourhood: 'Quinconces', meanPrice: 138 },
    { neighbourhood: 'Saint-Pierre', meanPrice: 132 },
    { neighbourhood: 'Hôtel de Ville', meanPrice: 125 },
    { neighbourhood: 'Nansouty', meanPrice: 118 },
    { neighbourhood: 'Saint-Michel', meanPrice: 108 },
    { neighbourhood: 'Capucins', meanPrice: 98 },
    { neighbourhood: 'Victoire', meanPrice: 92 },
    { neighbourhood: 'Saint-Genès', meanPrice: 85 },
    { neighbourhood: 'Bacalan', meanPrice: 78 }
  ],
  Lyon: [
    { neighbourhood: 'Presqu\'île', meanPrice: 128 },
    { neighbourhood: 'Vieux Lyon', meanPrice: 122 },
    { neighbourhood: 'Croix-Rousse', meanPrice: 115 },
    { neighbourhood: 'Part-Dieu', meanPrice: 105 },
    { neighbourhood: 'Bellecour', meanPrice: 98 },
    { neighbourhood: 'Confluence', meanPrice: 92 },
    { neighbourhood: 'Tête d\'Or', meanPrice: 88 },
    { neighbourhood: 'Guillotière', meanPrice: 78 },
    { neighbourhood: 'Monplaisir', meanPrice: 72 },
    { neighbourhood: 'Jean Macé', meanPrice: 68 }
  ]
};

// Impact of availability on price
export const availabilityImpact = {
  Paris: Array.from({ length: 60 }, (_, i) => ({
    availability: Math.floor(Math.random() * 365),
    price: 80 + Math.random() * 150 - (Math.random() * 0.1 * i)
  })),
  Bordeaux: Array.from({ length: 60 }, (_, i) => ({
    availability: Math.floor(Math.random() * 365),
    price: 60 + Math.random() * 100 - (Math.random() * 0.08 * i)
  })),
  Lyon: Array.from({ length: 60 }, (_, i) => ({
    availability: Math.floor(Math.random() * 365),
    price: 55 + Math.random() * 90 - (Math.random() * 0.07 * i)
  }))
};

// Impact of reviews per month on price
export const reviewsImpact = {
  Paris: Array.from({ length: 60 }, () => ({
    reviewsPerMonth: Math.random() * 10,
    price: 70 + Math.random() * 180
  })),
  Bordeaux: Array.from({ length: 60 }, () => ({
    reviewsPerMonth: Math.random() * 8,
    price: 50 + Math.random() * 120
  })),
  Lyon: Array.from({ length: 60 }, () => ({
    reviewsPerMonth: Math.random() * 9,
    price: 45 + Math.random() * 110
  }))
};

// 3D visualization data (price, availability, reviews_per_month)
export const data3D = {
  Paris: Array.from({ length: 200 }, () => ({
    x: Math.floor(Math.random() * 365), // availability_365
    y: Math.random() * 10, // reviews_per_month
    z: 50 + Math.random() * 250, // price
  })),
  Bordeaux: Array.from({ length: 150 }, () => ({
    x: Math.floor(Math.random() * 365),
    y: Math.random() * 8,
    z: 40 + Math.random() * 180,
  })),
  Lyon: Array.from({ length: 150 }, () => ({
    x: Math.floor(Math.random() * 365),
    y: Math.random() * 9,
    z: 35 + Math.random() * 160,
  }))
};

// Summary KPIs
export const summaryKPIs = {
  totalListings: 83403,
  averagePrice: 109.53,
  totalCities: 3,
  avgR2Score: 0.308
};
