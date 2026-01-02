"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const common_1 = require("@nestjs/common");
class ValidationError extends common_1.BadRequestException {
    constructor(details) {
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
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation.error.js.map