import { z } from 'zod';
import { idSchema, paginationSchema, sortOrderSchema } from '../schemas/common.schema';

export type Id = z.infer<typeof idSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type SortOrder = z.infer<typeof sortOrderSchema>;
