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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const shared_1 = require("@demo/shared");
let TodosController = class TodosController {
    constructor(todosService) {
        this.todosService = todosService;
    }
    async findAll(query) {
        return this.todosService.findAll(query);
    }
    async findOne(id) {
        return this.todosService.findOne(id);
    }
    async create(data) {
        return this.todosService.create(data);
    }
    async update(id, data) {
        return this.todosService.update(id, data);
    }
    async toggle(id) {
        return this.todosService.toggle(id);
    }
    async remove(id) {
        await this.todosService.remove(id);
    }
};
exports.TodosController = TodosController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(shared_1.todoQuerySchema)),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(shared_1.createTodoSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(shared_1.updateTodoSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/toggle'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "toggle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "remove", null);
exports.TodosController = TodosController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
//# sourceMappingURL=todos.controller.js.map