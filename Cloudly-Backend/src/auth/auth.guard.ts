import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as dayjs from 'dayjs'
import { Request } from 'express'
import { UsersService } from '../users/users.service'
import { jwtConstants } from './constants'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private readonly usersService: UsersService
	) {
	}
	
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const response = context.switchToHttp().getResponse()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new UnauthorizedException()
		}
		
		try {
			const user = await this.jwtService.verifyAsync(
				token,
				{
					secret: jwtConstants.secret
				}
			)
			
			const { iat, exp, updateAt, ...userData } = user
			const userDB = await this.usersService.findOne(
				userData.login,
				{ hashPassword: true }
			)
			
			const createdTokenDate = dayjs(iat * 1000)
			const updateUserDate = dayjs(userDB.updateAt)
			
			if (updateUserDate > createdTokenDate) {
				const newToken = await this.jwtService.signAsync(userDB)
				response.setHeader('Authorization', `Bearer ${newToken}`)
			}
			
			request['user'] = userDB
		} catch (error) {
			throw new UnauthorizedException()
		}
		
		return true
	}
	
	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
