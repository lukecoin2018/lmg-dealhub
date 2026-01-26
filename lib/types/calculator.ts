// Core calculator types
export type Platform = "instagram" | "tiktok" | "youtube";
export type ContentType = "reel-short" | "reel-standard" | "reel-long" | "post" | "carousel" | "story" | "video-short" | "video-standard" | "video-long" | "series" | "short" | "integration";
export type CreatorTier = "micro" | "mid-micro" | "mid-tier";
export type Niche = "finance" | "b2b" | "tech" | "health" | "fitness" | "fashion" | "beauty" | "lifestyle" | "gaming" | "entertainment";
export type EngagementTier = "excellent" | "good" | "average" | "poor";

// Single deliverable item
export interface Deliverable {
  id: string;
  platform: Platform;
  contentType: ContentType;
  quantity: number;
}

// Input form data
export interface CalculatorInput {
  // Creator basics
  followers: number;
  engagementRate: number;
  niche: Niche;
  
  // Deliverables (NEW: array of items)
  deliverables: Deliverable[];
  
  // Usage rights
  usageType: "organic" | "paid";
  usageDuration: 30 | 90 | 365 | 9999; // 9999 = perpetual
  
  // Additional terms
  hasWhitelisting: boolean;
  exclusivityDays: 0 | 30 | 60 | 90;
  isLongTermPartnership: boolean; // 3+ months
  
  // Optional context
  hasPaymentTerms?: boolean;
  revisionRounds?: number;
}

// Calculation breakdown for a single deliverable
export interface DeliverableBreakdown {
  id: string;
  platform: Platform;
  contentType: ContentType;
  quantity: number;
  ratePerItem: number;
  subtotal: number;
  label: string;
}

// Calculation step
export interface CalculationStep {
  label: string;
  value: number;
  multiplier?: number;
  explanation: string;
}

export interface RedFlag {
  severity: "warning" | "danger";
  message: string;
  suggestion: string;
}

// Final result
export interface CalculatorResult {
  // Rate range
  minRate: number;
  maxRate: number;
  recommendedRate: number;
  confidence: "high" | "medium" | "low";
  
  // Breakdown
  baseRate: number;
  engagedFollowers: number;
  deliverableBreakdowns: DeliverableBreakdown[];
  steps: CalculationStep[];
  
  // Context
  creatorTier: CreatorTier;
  engagementTier: EngagementTier;
  marketPosition: string;
  
  // Flags
  redFlags: RedFlag[];
  
  // Negotiation guidance
  negotiation: {
    openingAsk: number;
    acceptableMin: number;
    walkAwayPoint: number;
    strategy: string[];
  };
  
  // Meta
  calculatedAt: Date;
  dataSourceNote: string;
}