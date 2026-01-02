"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const errors_1 = require("../errors");
function logValidationError(context) {
    const logger = new common_1.Logger('ZodValidationPipe');
    logger.error(context);
}
let ZodValidationPipe = class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        try {
            return this.schema.parse(value);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.errors.reduce((acc, err) => {
                    const path = err.path.join('.');
                    if (!acc[path]) {
                        acc[path] = [];
                    }
                    acc[path].push(err.message);
                    return acc;
                }, {});
                throw new errors_1.ValidationError({
                    message: 'Request validation failed. Please check the input data and try again.',
                    errors,
                    context: {
                        type: metadata.type,
                        metatype: metadata.metatype?.name,
                    },
                });
            }
            logValidationError({
                what: 'Unexpected error during Zod schema validation',
                why: 'An error occurred that was not a standard ZodError - indicates potential bug or misconfiguration',
                errorMessage: error instanceof Error ? error.message : String(error),
                errorStack: error instanceof Error ? error.stack : undefined,
                inputType: typeof value,
                schemaName: this.schema.description || 'unknown',
                fix: 'Review the input data format and schema configuration. Check for type mismatches or invalid schema definitions.',
            });
            throw new common_1.InternalServerErrorException('An unexpected error occurred during validation. Please contact support if the issue persists.');
        }
    }
};
exports.ZodValidationPipe = ZodValidationPipe;
exports.ZodValidationPipe = ZodValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [zod_1.ZodSchema])
], ZodValidationPipe);
//# sourceMappingURL=zod-validation.pipe.js.map