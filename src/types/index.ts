export interface Competitor {
  id: string;
  name: string;
  url: string;
  logo?: string; // URL to logo image
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string; // e.g., "$29/mo" or "Contact Us"
  features: string[];
  isPopular?: boolean;
}

export interface ReleaseNote {
  id: string;
  version: string;
  date: string; // ISO date string
  title: string;
  summary: string;
  detailsUrl?: string;
}

export interface CompetitorScrapedData {
  competitor: Competitor;
  features: Feature[];
  pricingPlans: PricingPlan[];
  releaseNotes: ReleaseNote[];
  lastScraped: string; // ISO date string
}

export interface PricingDataPoint {
  date: string; // month-year e.g. "Jan 2023"
  [competitorName: string]: number | string; // Price or date
}

export interface FeatureRelease {
  id: string;
  competitorName: string;
  date: string; // ISO date string
  featureName: string;
  scope: 'minor' | 'major' | 'new_product'; // Example scopes
  description: string;
}

export interface AlertInfo {
  id: string;
  timestamp: string; // ISO date string
  competitorName: string;
  changeType: 'PRICE' | 'FEATURE' | 'RELEASE_NOTE';
  summary: string;
  significance: 'High' | 'Medium' | 'Low';
  details?: string;
}
