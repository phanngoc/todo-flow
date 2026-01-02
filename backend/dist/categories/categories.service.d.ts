import { CategoriesRepository } from './categories.repository';
import { CreateCategoryInput, UpdateCategoryInput } from '@demo/shared';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
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
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
