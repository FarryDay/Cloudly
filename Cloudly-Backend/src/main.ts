import { type INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { FsService } from './fs/fs.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	app.setGlobalPrefix('/api/')
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
	app.use(cookieParser())
	
	await app.listen(3001)
}


bootstrap().then()
