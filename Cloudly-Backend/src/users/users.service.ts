import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import type { CreateUser, OmitUser } from './types'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {
	}
	
	async findOne(login: string, omitData: OmitUser = {}): Promise<Partial<User> | null> {
		return this.prisma.user.findUnique({
			where: { login },
			omit: omitData
		})
	}
	
	async create(data: CreateUser, omitData: OmitUser = {}): Promise<Partial<User>> {
		return this.prisma.user
			.create({ data: { ...data, virtualFS: { create: {} } }, omit: omitData })
			.catch(() => {
				throw new BadRequestException('Пользователь с таким логином уже существует')
			})
	}
	
	async findById(id: number, omitData: OmitUser = {}): Promise<Partial<User> | null> {
		return this.prisma.user.findUnique({
			where: { id },
			omit: omitData
		})
	}
}
