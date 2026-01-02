import { CategoriesRepository } from './categories.repository';
import { CreateCategoryInput, UpdateCategoryInput } from '@demo/shared';
export declare class CategoriesService {
    private readonly categoriesRepository;
    private readonly logger;
    constructor(categoriesRepository: CategoriesRepository);
    findAll(): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            color: string;
            icon: string | null;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            color: string;
            icon: string | null;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    create(data: CreateCategoryInput): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            color: string;
            icon: string | null;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    update(id: number, data: UpdateCategoryInput): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            color: string;
            icon: string | null;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
