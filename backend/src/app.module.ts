import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TodosModule } from './todos/todos.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [DatabaseModule, TodosModule, CategoriesModule],
})
export class AppModule {}
