import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../models/create-task.dto';
import { UpdateTaskDto } from '../models/update-task.dto';
type Task = {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
};
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAll(): Promise<Task[]>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
}
export {};
