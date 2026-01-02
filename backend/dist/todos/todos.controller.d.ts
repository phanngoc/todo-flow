import { TodosService } from './todos.service';
import { CreateTodoInput, UpdateTodoInput, TodoQuery } from '@demo/shared';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    findAll(query: TodoQuery): Promise<{
        success: boolean;
        data: {
            items: {
                categories: import("./todos.repository").TodoCategory[];
                id: number;
                title: string;
                description: string | null;
                priority: string;
                dueDate: string | null;
                completed: boolean;
                createdAt: string;
                updatedAt: string;
            }[];
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        data: {
            categories: import("./todos.repository").TodoCategory[];
            id: number;
            title: string;
            description: string | null;
            priority: string;
            dueDate: string | null;
            completed: boolean;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    create(data: CreateTodoInput): Promise<{
        success: boolean;
        data: {
            categories: import("./todos.repository").TodoCategory[];
            id: number;
            title: string;
            description: string | null;
            priority: string;
            dueDate: string | null;
            completed: boolean;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    update(id: number, data: UpdateTodoInput): Promise<{
        success: boolean;
        data: {
            categories: import("./todos.repository").TodoCategory[];
            id: number;
            title: string;
            description: string | null;
            priority: string;
            dueDate: string | null;
            completed: boolean;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    toggle(id: number): Promise<{
        success: boolean;
        data: {
            categories: import("./todos.repository").TodoCategory[];
            id: number;
            title: string;
            description: string | null;
            priority: string;
            dueDate: string | null;
            completed: boolean;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    remove(id: number): Promise<void>;
}
