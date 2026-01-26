import { GapAnalysis } from './types';

export function calculateGapAnalysis(fairRate: number, brandOffer: number): GapAnalysis {
  const dollarGap = fairRate - brandOffer;
  const percentGap = Math.round((dollarGap / fairRate) * 100);
  
  let warningLevel: GapAnalysis['warningLevel'];
  let warningMessage: string;
  let warningColor: string;
  
  if (percentGap < -15) {
    // Offer is >115% of fair rate
    warningLevel = 'above';
    warningMessage = '🎉 ABOVE MARKET RATE';
    warningColor = '#10B981'; // green
  } else if (percentGap >= -15 && percentGap <= 15) {
    // Offer is 85-115% of fair rate
    warningLevel = 'fair';
    warningMessage = '✅ Fair offer';
    warningColor = '#10B981'; // green
  } else if (percentGap > 15 && percentGap <= 30) {
    // Offer is 70-85% of fair rate
    warningLevel = 'below';
    warningMessage = 'Below fair rate';
    warningColor = '#F59E0B'; // yellow
  } else if (percentGap > 30 && percentGap <= 50) {
    // Offer is 50-70% of fair rate
    warningLevel = 'significant';
    warningMessage = '⚠️ SIGNIFICANTLY BELOW MARKET';
    warningColor = '#F59E0B'; // yellow
  } else {
    // Offer is <50% of fair rate
    warningLevel = 'severe';
    warningMessage = '🚨 SEVERELY UNDERVALUED';
    warningColor = '#EF4444'; // red
  }
  
  return {
    dollarGap,
    percentGap,
    warningLevel,
    warningMessage,
    warningColor,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateCompromiseRate(fairRate: number, brandOffer: number): number {
  // Calculate a compromise that's closer to fair rate but shows flexibility
  // Formula: 60% of the gap from their offer toward your rate
  const gap = fairRate - brandOffer;
  return Math.round(brandOffer + (gap * 0.6));
}