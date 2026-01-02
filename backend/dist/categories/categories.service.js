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
var CategoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const categories_repository_1 = require("./categories.repository");
let CategoriesService = CategoriesService_1 = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
        this.logger = new common_1.Logger(CategoriesService_1.name);
    }
    async findAll() {
        this.logger.debug('Fetching all categories');
        console.log('CategoriesService.findAll() called');
        const allCategories = this.categoriesRepository.findAll();
        return {
            success: true,
            data: allCategories,
        };
    }
    async findOne(id) {
        const category = this.categoriesRepository.findById(id);
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return {
            success: true,
            data: category,
        };
    }
    async create(data) {
        const newCategory = this.categoriesRepository.create({
            ...data,
            updatedAt: new Date().toISOString(),
        });
        return {
            success: true,
            data: newCategory,
        };
    }
    async update(id, data) {
        const existing = this.categoriesRepository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        const updated = this.categoriesRepository.update(id, {
            ...data,
            updatedAt: new Date().toISOString(),
        });
        return {
            success: true,
            data: updated,
        };
    }
    async remove(id) {
        const existing = this.categoriesRepository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        this.categoriesRepository.delete(id);
        return { success: true };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = CategoriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_repository_1.CategoriesRepository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map