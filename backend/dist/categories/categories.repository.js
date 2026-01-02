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
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
const database_module_1 = require("../database/database.module");
const schema_1 = require("../database/schema");
let CategoriesRepository = class CategoriesRepository {
    constructor(db) {
        this.db = db;
    }
    findAll() {
        return this.db.select().from(schema_1.categories).orderBy(schema_1.categories.name).all();
    }
    findById(id) {
        return this.db.select().from(schema_1.categories).where((0, drizzle_orm_1.eq)(schema_1.categories.id, id)).get();
    }
    create(data) {
        return this.db.insert(schema_1.categories).values(data).returning().get();
    }
    update(id, data) {
        return this.db
            .update(schema_1.categories)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema_1.categories.id, id))
            .returning()
            .get();
    }
    delete(id) {
        this.db.delete(schema_1.categories).where((0, drizzle_orm_1.eq)(schema_1.categories.id, id)).run();
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DRIZZLE)),
    __metadata("design:paramtypes", [better_sqlite3_1.BetterSQLite3Database])
], CategoriesRepository);
//# sourceMappingURL=categories.repository.js.map