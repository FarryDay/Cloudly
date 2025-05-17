import type { User } from '@prisma/client'

export type CreateUser = {
	login: string
	username: string
	hashPassword: string
}

export type OmitUser = {
	[K in keyof CreateUser]: true
} | {}