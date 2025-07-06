import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
                role: createUserDto.role,
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async update(id: number, data: Partial<CreateUserDto>) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return this.prisma.user.update({ where: { id }, data });
    }

    async remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
