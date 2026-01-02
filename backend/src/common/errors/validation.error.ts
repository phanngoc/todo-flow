import { BadRequestException } from '@nestjs/common';

export interface ValidationErrorDetails {
  message: string;
  errors: Record<string, string[]>;
  context?: Record<string, unknown>;
}

/**
 * Custom error class for validation failures.
 * Provides structured error information including field-level errors.
 */
export class ValidationError extends BadRequestException {
  constructor(details: ValidationErrorDetails) {
    super({
      statusCode: 400,
      error: 'Validation Error',
      message: details.message,
      errors: details.errors,
      context: details.context,
      timestamp: new Date().toISOString(),
    });
  }
}
