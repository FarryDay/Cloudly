import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { HashService } from './hash/hash.service';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1d' }
		}),
	],
	providers: [AuthService, ConfigService, HashService],
	controllers: [AuthController]
})
export class AuthModule {
}
