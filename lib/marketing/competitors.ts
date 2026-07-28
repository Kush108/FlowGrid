/**
 * Competitor pricing — verify against vendor pages periodically.
 * ServiceTitan: quote-only; ranges from contractor reports (2026).
 * Housecall Pro: published MAX plan at housecallpro.com/pricing.
 */

export const EXAMPLE_TEAM_SIZE = 15;

/** ServiceTitan: ~$245–$500 per managed technician/month (contractor-reported). */
export const SERVICETITAN_PER_TECH_LOW = 245;
export const SERVICETITAN_PER_TECH_HIGH = 500;

export function serviceTitanMonthlyLow(techs = EXAMPLE_TEAM_SIZE): number {
  return techs * SERVICETITAN_PER_TECH_LOW;
}

export function serviceTitanMonthlyHigh(techs = EXAMPLE_TEAM_SIZE): number {
  return techs * SERVICETITAN_PER_TECH_HIGH;
}

export function serviceTitanMonthlyLabel(techs = EXAMPLE_TEAM_SIZE): string {
  const low = serviceTitanMonthlyLow(techs);
  const high = serviceTitanMonthlyHigh(techs);
  return `$${low.toLocaleString('en-US')}–$${high.toLocaleString('en-US')}+/mo`;
}

export const SERVICETITAN_SETUP = '$5,000–$50,000';

/** Housecall Pro MAX: $299/mo annual, 8 users included, +$35/user beyond. */
export const HCP_MAX_BASE = 299;
export const HCP_MAX_BASE_MONTHLY = 329;
export const HCP_INCLUDED_USERS = 8;
export const HCP_EXTRA_USER = 35;

export function housecallProMonthly(techs = EXAMPLE_TEAM_SIZE, annual = true): number {
  const base = annual ? HCP_MAX_BASE : HCP_MAX_BASE_MONTHLY;
  const extra = Math.max(0, techs - HCP_INCLUDED_USERS);
  return base + extra * HCP_EXTRA_USER;
}

export function housecallProMonthlyLabel(techs = EXAMPLE_TEAM_SIZE): string {
  const low = housecallProMonthly(techs, true);
  const high = housecallProMonthly(techs, false);
  if (low === high) return `~$${low}/mo`;
  return `~$${low}–$${high}/mo`;
}
