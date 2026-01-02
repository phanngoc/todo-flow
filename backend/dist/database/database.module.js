"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = exports.DRIZZLE = void 0;
const common_1 = require("@nestjs/common");
const better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
const BetterSqlite3 = require("better-sqlite3");
const schema = require("./schema");
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("../common/constants");
function getSqliteConstructor() {
    return BetterSqlite3.default || BetterSqlite3;
}
const DB_PATH = './data/todos.db';
exports.DRIZZLE = Symbol('DRIZZLE');
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.DRIZZLE,
                useFactory: () => {
                    const dir = (0, path_1.dirname)(DB_PATH);
                    if (!(0, fs_1.existsSync)(dir)) {
                        (0, fs_1.mkdirSync)(dir, { recursive: true });
                    }
                    const DatabaseConstructor = getSqliteConstructor();
                    const sqlite = new DatabaseConstructor(DB_PATH);
                    sqlite.pragma(constants_1.SQLITE_PRAGMA.JOURNAL_MODE_WAL);
                    sqlite.pragma(constants_1.SQLITE_PRAGMA.FOREIGN_KEYS_ON);
                    const db = (0, better_sqlite3_1.drizzle)(sqlite, { schema });
                    console.log('📦 Database connected:', DB_PATH);
                    return db;
                },
            },
        ],
        exports: [exports.DRIZZLE],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map