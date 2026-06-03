import { MOCK_LEAVE_REQUESTS } from './mock-data';
import type { LeaveRequest } from './types';

/** In-memory leave store for demo — resets on cold start in serverless */
export const leaveRequests: LeaveRequest[] = [...MOCK_LEAVE_REQUESTS];
