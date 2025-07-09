import { CreateTaskDto } from '../models/create-task.dto';
import { UpdateTaskDto } from '../models/update-task.dto';
type Task = {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
    tags: string[];
};
export declare class TaskService {
    getAll(): Promise<Task[]>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
}
export {};
