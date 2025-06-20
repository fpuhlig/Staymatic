import { Response } from 'express';
import { APP_CONSTANTS } from '../constants';

// Response handler utilities for DRY principle
export const responseHandlers = {
  // Success responses
  success: <T>(res: Response, data: T, status = 200) => {
    res.status(status).json({
      success: true,
      data,
    });
  },

  successWithMessage: (res: Response, message: string, status = 200) => {
    res.status(status).json({
      success: true,
      message,
    });
  },

  successWithMeta: <T>(res: Response, data: T, meta: Record<string, unknown>, status = 200) => {
    res.status(status).json({
      success: true,
      data,
      ...meta,
    });
  },

  // Error responses
  validationError: (res: Response, details?: Record<string, unknown>) => {
    res.status(400).json({
      success: false,
      error: APP_CONSTANTS.ERRORS.VALIDATION_FAILED,
      ...(details && { details }),
    });
  },

  notFound: (res: Response, error = APP_CONSTANTS.ERRORS.PROPERTY_NOT_FOUND) => {
    res.status(404).json({
      success: false,
      error,
    });
  },

  invalidId: (res: Response) => {
    res.status(400).json({
      success: false,
      error: APP_CONSTANTS.ERRORS.INVALID_ID,
    });
  },

  serverError: (res: Response, error: string, logContext?: string) => {
    if (logContext) {
      console.error(`[${logContext}] ${error}`);
    }
    res.status(500).json({
      success: false,
      error,
    });
  },
} as const;
