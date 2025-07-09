"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function mapPrismaTaskToApi(task) {
    return {
        id: task.id,
        title: task.title,
        completed: task.completed,
        createdAt: task.createdAt,
        tags: task.tags?.map((tt) => tt.tag.name) || [],
    };
}
let TaskService = class TaskService {
    async getAll() {
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: 'desc' },
            include: { tags: { include: { tag: true } } },
        });
        return tasks.map(mapPrismaTaskToApi);
    }
    async create(createTaskDto) {
        const { title, tags = [] } = createTaskDto;
        const connectOrCreateTags = tags.map((name) => ({
            where: { name },
            create: { name },
        }));
        const task = await prisma.task.create({
            data: {
                title,
                tags: {
                    create: tags.map((name) => ({ tag: { connectOrCreate: { where: { name }, create: { name } } } })),
                },
            },
            include: { tags: { include: { tag: true } } },
        });
        return mapPrismaTaskToApi(task);
    }
    async update(id, updateTaskDto) {
        const task = await prisma.task.findUnique({
            where: { id },
            include: { tags: { include: { tag: true } } },
        });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        let tagsUpdate = {};
        if (updateTaskDto.tags) {
            const tagRecords = await Promise.all(updateTaskDto.tags.map((name) => prisma.tag.upsert({ where: { name }, update: {}, create: { name } })));
            tagsUpdate = {
                set: [],
                connect: tagRecords.map((tag) => ({ id: tag.id })),
            };
        }
        const updated = await prisma.task.update({
            where: { id },
            data: {
                ...updateTaskDto,
                tags: updateTaskDto.tags ? tagsUpdate : undefined,
            },
            include: { tags: { include: { tag: true } } },
        });
        return mapPrismaTaskToApi(updated);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)()
], TaskService);
//# sourceMappingURL=task.service.js.map