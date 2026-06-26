import { pricingMatrix, tariff, Tier, Currency } from '../data/pricingMatrix';

/**
 * Calculates the rounded price based on tier, currency, and annual billing discount (20%).
 * 
 * Formula:
 * price = base * currency * discount
 */
export function calculatePrice(
  tier: Tier,
  currency: Currency,
  annual: boolean
): number {
  let price = pricingMatrix[tier].base;
  
  // Apply currency tariff
  price *= tariff[currency];
  
  // Apply annual billing discount (20% discount means pay 80%)
  if (annual) {
    price *= 0.8;
  }
  
  return Math.round(price);
}
