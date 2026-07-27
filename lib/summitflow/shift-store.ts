import { MOCK_SHIFTS } from './mock-data';
import type { Shift } from './types';

/** In-memory shift store for demo — resets on cold start in serverless */
export const shifts: Shift[] = [...MOCK_SHIFTS];
