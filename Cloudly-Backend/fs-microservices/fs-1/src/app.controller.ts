import { Controller, Get, Request } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { AppService } from './app.service'
import type { SaveFileRequest } from './types'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}
	
	@MessagePattern({ cmd: 'get_stats' })
	async getStats() {
		return await this.appService.getStats()
	}
	
	@MessagePattern({cmd: 'save_file'})
	async saveFile(data: SaveFileRequest) {
		return this.appService.saveFile(`${data.userId}/${data.path}`, data.file)
	}
	
	@MessagePattern({cmd: 'create_folder'})
	async createFolder(data: SaveFileRequest) {
		return this.appService.createDir(`${data.userId}/${data.path}`)
	}
	
	// async getFileHTTP(@Request() req) {
	// 	console.log(req.originalUrl)
	// }
}
