import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  createCategorySchema,
  updateCategorySchema,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@demo/shared';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
    let a = 1;
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('Fetching category with ID:', id);
    return this.categoriesService.findOne(id);
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createCategorySchema)) data: CreateCategoryInput
  ) {
    console.log('Creating category with data:', data);
    return this.categoriesService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCategorySchema)) data: UpdateCategoryInput
  ) {
    return this.categoriesService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoriesService.remove(id);
  }
}
