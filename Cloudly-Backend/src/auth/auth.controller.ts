import { Body, Controller, Post, UseGuards, Request, Response, Get, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private prismaService: PrismaService) {
	}
	
	@Post('login')
	async login(@Body() loginDto: LoginDto, @Response() res: any) {
		const data = await this.authService.login(loginDto.login, loginDto.password)
		res.setHeader('Authorization', 'Bearer ' + data.accessToken)
		res.status(200).json({ message: 'Success authorization' })
	}
	
	@UseGuards(AuthGuard)
	@Get('me')
	async getMe(@Request() req: any) {
		const data = await this.authService.getMe(req.user.id).catch(() => {
			throw new UnauthorizedException()
		})
		return { data }
	}
	
	@Post('registration')
	async registration(@Body() registrationDto: RegistrationDto, @Response() res: any) {
		const data = await this.authService.registration(registrationDto)
		res.setHeader('Authorization', 'Bearer ' + data.accessToken)
		res.status(200).json({ message: 'Success registration' })
	}
	
}
