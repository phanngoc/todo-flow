import { CategoriesService } from './categories.service';
import { CreateCategoryInput, UpdateCategoryInput } from '@demo/shared';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            createdAt: string;
            updatedAt: string;
            color: string;
            icon: string | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            createdAt: string;
            updatedAt: string;
            color: string;
            icon: string | null;
        };
    }>;
    create(data: CreateCategoryInput): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            createdAt: string;
            updatedAt: string;
            color: string;
            icon: string | null;
        };
    }>;
    update(id: number, data: UpdateCategoryInput): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            createdAt: string;
            updatedAt: string;
            color: string;
            icon: string | null;
        };
    }>;
    remove(id: number): Promise<void>;
}
