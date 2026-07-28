/** Shared pricing constants — keep marketing copy in sync. */
export const FIELD_STAFF_MONTHLY = 18;
export const MANAGER_MONTHLY = 85;
export const SETUP_FEE = 500;
export const PLATFORM_MINIMUM = 299;

/** Typical 15-tech shop with one dispatch/office manager (field + manager, no minimum bump). */
export const EXAMPLE_TECH_COUNT = 15;
export const EXAMPLE_MANAGER_COUNT = 1;

export function typicalShopMonthly(
  techs = EXAMPLE_TECH_COUNT,
  managers = EXAMPLE_MANAGER_COUNT
): number {
  return techs * FIELD_STAFF_MONTHLY + managers * MANAGER_MONTHLY;
}

/** Applies the $299/mo platform minimum to the field-staff portion. */
export function shopMonthlyWithMinimum(
  techs = EXAMPLE_TECH_COUNT,
  managers = EXAMPLE_MANAGER_COUNT
): number {
  const fieldTotal = Math.max(techs * FIELD_STAFF_MONTHLY, PLATFORM_MINIMUM);
  return fieldTotal + managers * MANAGER_MONTHLY;
}

/** Display headline for hero cards — realistic all-in for a 15-tech + 1 manager shop. */
export const TYPICAL_MONTHLY_LABEL = `$${typicalShopMonthly()}`;
