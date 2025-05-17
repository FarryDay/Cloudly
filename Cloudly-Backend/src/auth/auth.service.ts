import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { RegistrationDto } from './dto/registration.dto'
import { HashService } from './hash/hash.service'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private hashService: HashService
	) {
	}
	
	async login(login: string, password: string): Promise<{ accessToken: string }> {
		const user = await this.usersService.findOne(login)
		if (!user) {
			throw new BadRequestException()
		}
		
		const isMath = await this.hashService.compare(password, user.hashPassword)
		if (!isMath) {
			throw new BadRequestException()
		}
		
		const { hashPassword, ...data } = user
		const payload = { ...data }
		return {
			accessToken: await this.jwtService.signAsync(payload)
		}
	}
	
	async registration(registrationDto: RegistrationDto) {
		const { password, ...data } = registrationDto
		const hashPassword = await this.hashService.hash(password)
		const user = await this.usersService.create(
			{ ...data, hashPassword },
			{ hashPassword: true }
		)

		return {
			accessToken: await this.jwtService.signAsync(user)
		}
	}
	
	async getMe(id: number) {
		return this.usersService.findById(id, { hashPassword: true, updateAt: true })
	}
}
