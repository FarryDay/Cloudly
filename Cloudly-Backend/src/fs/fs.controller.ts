import {
	BadRequestException, Body,
	Controller,
	Post, Query,
	Request,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import type { Folder } from '@prisma/client'
import { AuthGuard } from '../auth/auth.guard'
import { CreateFolderDto } from './dto/createFolder.dto'
import { SaveFileDto } from './dto/saveFile.dto'
import { FsService } from './fs.service'

@Controller('fs')
export class FsController {
	constructor(
		private readonly fsService: FsService
	) {
	}
	
	@UseGuards(AuthGuard)
	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async saveFile(@Query() saveFileDto: SaveFileDto, @UploadedFile() file: Express.Multer.File, @Request() req) {
		if (!file) {
			throw new BadRequestException('Ошибка получения файла')
		}
		
		let folder: Folder | null = null
		if (saveFileDto.folderId) {
			folder = await this.fsService.findFolder(req.user.id, saveFileDto.folderId)
		}
		
		return await this.fsService.saveFile(req.user.id, file, folder)
	}
	
	@UseGuards(AuthGuard)
	@Post('createFolder')
	async createFolder(@Request() req, @Body() createFolderDto: CreateFolderDto) {
		return await this.fsService.createFolder(req.user.id, createFolderDto)
	}
}
