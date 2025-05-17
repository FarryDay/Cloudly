import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { extname } from 'path'

@Module({
	imports: [
		MulterModule.register({
			dest: './storage',
			storage: diskStorage({
				destination: './storage'
				, filename: (req, file, cb) => {
					const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
					cb(null, `${randomName}${extname(file.originalname)}`)
				}
			})
		})
	],
	controllers: [AppController],
	providers:
		[AppService]
})

export class AppModule {
}
