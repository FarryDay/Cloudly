import { type INestApplication, type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from './auth/auth.module'
import { microservices } from './config'
import { UsersModule } from './users/users.module'
import { FsModule } from './fs/fs.module'

@Module({
	imports: [
		PrismaModule.forRoot({
			isGlobal: true
		}),
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AuthModule,
		UsersModule,
		// ClientsModule.register({
		// 	isGlobal: true,
		// 	clients: microservices.map(service => ({
		// 		name: `FS_SERVICE-${service.id}`,
		// 		transport: Transport.TCP,
		// 		options: {
		// 			host: service.host,
		// 			port: service.port
		// 		}
		// 	}))
		// }),
		FsModule
	],
	controllers: [],
	providers: []
})
export class AppModule {
}
