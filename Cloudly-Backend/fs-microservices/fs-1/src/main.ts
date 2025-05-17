import { NestFactory } from '@nestjs/core'
import { type MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
	const service = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.TCP,
		options: {
			host: '127.0.0.1',
			port: 4000
		}
	})
	await service.listen()
	
	console.log('FS Microservice is starting')
}

bootstrap().then()
