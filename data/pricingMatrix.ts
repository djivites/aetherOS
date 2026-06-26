export type Tier = 'starter' | 'pro' | 'enterprise';
export type Billing = 'monthly' | 'annual';
export type Currency = 'USD' | 'EUR' | 'INR';

export interface PricingMatrix {
  base: number;
}

export const pricingMatrix: Record<Tier, PricingMatrix> = {
  starter: {
    base: 36 // Explorer: $36 monthly, $29 annual (36 * 0.8 = 28.8 ~ 29)
  },
  pro: {
    base: 74 // Scale: $74 monthly, $59 annual (74 * 0.8 = 59.2 ~ 59)
  },
  enterprise: {
    base: 161 // Enterprise: $161 monthly, $129 annual (161 * 0.8 = 128.8 ~ 129)
  }
};

export const tariff: Record<Currency, number> = {
  USD: 1.0,
  EUR: 0.92,
  INR: 87.0
};

export const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  INR: '₹'
};
