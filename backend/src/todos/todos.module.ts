import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
  exports: [TodosService],
})
export class TodosModule {}
