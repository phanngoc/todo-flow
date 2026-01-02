import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors';

interface ValidationErrorLog {
  what: string;
  why: string;
  errorMessage: string;
  errorStack?: string;
  inputType: string;
  schemaName: string;
  fix: string;
}

/**
 * Log validation errors with structured format.
 * Provides complete context for debugging validation issues.
 */
function logValidationError(context: ValidationErrorLog): void {
  const logger = new Logger('ZodValidationPipe');
  logger.error(context);
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.reduce(
          (acc, err) => {
            const path = err.path.join('.');
            if (!acc[path]) {
              acc[path] = [];
            }
            acc[path].push(err.message);
            return acc;
          },
          {} as Record<string, string[]>
        );

        throw new ValidationError({
          message: 'Request validation failed. Please check the input data and try again.',
          errors,
          context: {
            type: metadata.type,
            metatype: metadata.metatype?.name,
          },
        });
      }

      // sunlint-disable-next-line C018 -- Using structured logging via logValidationError helper
      // Log unexpected validation error with structured context
      // This helps debugging by providing complete error information
      logValidationError({
        what: 'Unexpected error during Zod schema validation',
        why: 'An error occurred that was not a standard ZodError - indicates potential bug or misconfiguration',
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
        inputType: typeof value,
        schemaName: this.schema.description || 'unknown',
        fix: 'Review the input data format and schema configuration. Check for type mismatches or invalid schema definitions.',
      });

      throw new InternalServerErrorException(
        'An unexpected error occurred during validation. Please contact support if the issue persists.'
      );
    }
  }
}
