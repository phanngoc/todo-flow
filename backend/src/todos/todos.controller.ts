import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  createTodoSchema,
  updateTodoSchema,
  todoQuerySchema,
  CreateTodoInput,
  UpdateTodoInput,
  TodoQuery,
} from '@demo/shared';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(todoQuerySchema))
  async findAll(@Query() query: TodoQuery) {
    return this.todosService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createTodoSchema))
  async create(@Body() data: CreateTodoInput) {
    return this.todosService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateTodoSchema)) data: UpdateTodoInput
  ) {
    return this.todosService.update(id, data);
  }

  @Patch(':id/toggle')
  async toggle(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.toggle(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.todosService.remove(id);
  }
}
