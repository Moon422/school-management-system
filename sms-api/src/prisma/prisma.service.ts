import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    // Optional: helper to clear DB during testing
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'test') {
            await this.grade.deleteMany();
            await this.attendance.deleteMany();
            await this.course.deleteMany();
            await this.student.deleteMany();
            await this.teacher.deleteMany();
            await this.class.deleteMany();
            await this.user.deleteMany();
        }
    }
}
