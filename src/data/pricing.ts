/**
 * Single source of truth for pricing across all TutorExel regions.
 *
 * Final monthly pricing:
 * - AU: One Subject AUD 92, Music Lesson AUD 92, Premium Plan AUD 248.40 (Save 10%)
 * - NZ: One Subject NZD 100, Music Lesson NZD 100, Premium Plan NZD 270 (Save 10%)
 * - CA: One Subject CAD 92, Music Lesson CAD 92, Premium Plan CAD 248.40 (Save 10%)
 * - US: One Subject USD 84, Music Lesson USD 84, Premium Plan USD 226.80 (Save 10%)
 *
 * Per-class rates are derived from monthly prices:
 * - 4 classes per month for single plans (tutoring and music)
 * - 12 classes per month for Premium Plan
 */

export type RegionCode = "au" | "nz" | "ca" | "us";

export interface PlanPricingItem {
  id: string;
  name: string;
  subtitle: string;
  subtitleAU: string;
  subtitleUS: string;
  amount: string;
  amountNumber: number;
  perClass: string;
  perClassNumber: number;
  originalAmount?: string;
  originalAmountNumber?: number;
  discountBadge?: string;
  discountBadgeTitleCase?: string;
  classes?: number;
}

export interface RegionPricingData {
  region: RegionCode;
  currency: string;
  currencySymbol: string;
  tutoring: PlanPricingItem;
  music: PlanPricingItem;
  premium: PlanPricingItem;
  twoSubjects: {
    amount: string;
    amountNumber: number;
  };
  activityBundle: {
    amount: string;
    amountNumber: number;
  };
}

export const AU_PRICING_DATA: RegionPricingData = {
  region: "au",
  currency: "AUD",
  currencySymbol: "$",
  tutoring: {
    id: "live-online-coaching",
    name: "Live Online Tutoring",
    subtitle: "Maths, English, Science",
    subtitleAU: "Maths, English, Science",
    subtitleUS: "Math, English, Science",
    amount: "92",
    amountNumber: 92,
    perClass: "23.00",
    perClassNumber: 23,
    classes: 4,
  },
  music: {
    id: "co-curricular",
    name: "Music Lessons",
    subtitle: "Piano and Guitar",
    subtitleAU: "Piano and Guitar",
    subtitleUS: "Piano and Guitar",
    amount: "92",
    amountNumber: 92,
    perClass: "23.00",
    perClassNumber: 23,
    classes: 4,
  },
  premium: {
    id: "premium-plan",
    name: "Premium Plan",
    subtitle: "Complete Learning Package, 3 Subjects",
    subtitleAU: "Complete Learning Package, 3 Subjects",
    subtitleUS: "Complete Learning Package, 3 Subjects",
    amount: "248.40",
    amountNumber: 248.4,
    perClass: "20.70",
    perClassNumber: 20.7,
    originalAmount: "276",
    originalAmountNumber: 276,
    discountBadge: "Save 10%",
    discountBadgeTitleCase: "Save 10%",
    classes: 12,
  },
  twoSubjects: {
    amount: "184",
    amountNumber: 184,
  },
  activityBundle: {
    amount: "184",
    amountNumber: 184,
  },
};

export const NZ_PRICING_DATA: RegionPricingData = {
  region: "nz",
  currency: "NZD",
  currencySymbol: "NZ$",
  tutoring: {
    id: "live-online-coaching",
    name: "Live Online Tutoring",
    subtitle: "Maths, English, Science",
    subtitleAU: "Maths, English, Science",
    subtitleUS: "Math, English, Science",
    amount: "100",
    amountNumber: 100,
    perClass: "25.00",
    perClassNumber: 25,
    classes: 4,
  },
  music: {
    id: "co-curricular",
    name: "Music Lessons",
    subtitle: "Piano and Guitar",
    subtitleAU: "Piano and Guitar",
    subtitleUS: "Piano and Guitar",
    amount: "100",
    amountNumber: 100,
    perClass: "25.00",
    perClassNumber: 25,
    classes: 4,
  },
  premium: {
    id: "premium-plan",
    name: "Premium Plan",
    subtitle: "Complete Learning Package, 3 Subjects",
    subtitleAU: "Complete Learning Package, 3 Subjects",
    subtitleUS: "Complete Learning Package, 3 Subjects",
    amount: "270",
    amountNumber: 270,
    perClass: "22.50",
    perClassNumber: 22.5,
    originalAmount: "300",
    originalAmountNumber: 300,
    discountBadge: "Save 10%",
    discountBadgeTitleCase: "Save 10%",
    classes: 12,
  },
  twoSubjects: {
    amount: "200",
    amountNumber: 200,
  },
  activityBundle: {
    amount: "200",
    amountNumber: 200,
  },
};

export const CA_PRICING_DATA: RegionPricingData = {
  region: "ca",
  currency: "CAD",
  currencySymbol: "$",
  tutoring: {
    id: "live-online-coaching",
    name: "Live Online Tutoring",
    subtitle: "Math, English, Science",
    subtitleAU: "Maths, English, Science",
    subtitleUS: "Math, English, Science",
    amount: "92",
    amountNumber: 92,
    perClass: "23.00",
    perClassNumber: 23,
    classes: 4,
  },
  music: {
    id: "co-curricular",
    name: "Music Lessons",
    subtitle: "Piano and Guitar",
    subtitleAU: "Piano and Guitar",
    subtitleUS: "Piano and Guitar",
    amount: "92",
    amountNumber: 92,
    perClass: "23.00",
    perClassNumber: 23,
    classes: 4,
  },
  premium: {
    id: "premium-plan",
    name: "Premium Plan",
    subtitle: "Complete Learning Package, 3 Subjects",
    subtitleAU: "Complete Learning Package, 3 Subjects",
    subtitleUS: "Complete Learning Package, 3 Subjects",
    amount: "248.40",
    amountNumber: 248.4,
    perClass: "20.70",
    perClassNumber: 20.7,
    originalAmount: "276",
    originalAmountNumber: 276,
    discountBadge: "Save 10%",
    discountBadgeTitleCase: "Save 10%",
    classes: 12,
  },
  twoSubjects: {
    amount: "184",
    amountNumber: 184,
  },
  activityBundle: {
    amount: "184",
    amountNumber: 184,
  },
};

export const US_PRICING_DATA: RegionPricingData = {
  region: "us",
  currency: "USD",
  currencySymbol: "$",
  tutoring: {
    id: "live-online-coaching",
    name: "Live Online Tutoring",
    subtitle: "Math, English, Science",
    subtitleAU: "Maths, English, Science",
    subtitleUS: "Math, English, Science",
    amount: "84",
    amountNumber: 84,
    perClass: "21.00",
    perClassNumber: 21,
    classes: 4,
  },
  music: {
    id: "co-curricular",
    name: "Music Lessons",
    subtitle: "Piano and Guitar",
    subtitleAU: "Piano and Guitar",
    subtitleUS: "Piano and Guitar",
    amount: "84",
    amountNumber: 84,
    perClass: "21.00",
    perClassNumber: 21,
    classes: 4,
  },
  premium: {
    id: "premium-plan",
    name: "Premium Plan",
    subtitle: "Complete Learning Package, 3 Subjects",
    subtitleAU: "Complete Learning Package, 3 Subjects",
    subtitleUS: "Complete Learning Package, 3 Subjects",
    amount: "226.80",
    amountNumber: 226.8,
    perClass: "18.90",
    perClassNumber: 18.9,
    originalAmount: "252",
    originalAmountNumber: 252,
    discountBadge: "Save 10%",
    discountBadgeTitleCase: "Save 10%",
    classes: 12,
  },
  twoSubjects: {
    amount: "168",
    amountNumber: 168,
  },
  activityBundle: {
    amount: "168",
    amountNumber: 168,
  },
};

export const REGIONAL_PRICING: Record<RegionCode, RegionPricingData> = {
  au: AU_PRICING_DATA,
  nz: NZ_PRICING_DATA,
  ca: CA_PRICING_DATA,
  us: US_PRICING_DATA,
};

export function getRegionalPricing(region?: string): RegionPricingData {
  if (!region) return AU_PRICING_DATA;
  const key = region.toLowerCase().trim() as RegionCode;
  return REGIONAL_PRICING[key] || AU_PRICING_DATA;
}

export const DEFAULT_PRICING_DATA = AU_PRICING_DATA;
export const PRICING_DATA = AU_PRICING_DATA;
