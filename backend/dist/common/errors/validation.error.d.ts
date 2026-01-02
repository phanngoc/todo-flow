import { BadRequestException } from '@nestjs/common';
export interface ValidationErrorDetails {
    message: string;
    errors: Record<string, string[]>;
    context?: Record<string, unknown>;
}
export declare class ValidationError extends BadRequestException {
    constructor(details: ValidationErrorDetails);
}
