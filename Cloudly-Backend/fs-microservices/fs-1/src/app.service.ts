import { Injectable, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { statfs } from 'fs'
import { readdir, stat } from 'fs/promises'
import multer, { diskStorage } from 'multer'
import * as fs from 'node:fs'
import * as path from 'path'

@Injectable()
export class AppService {
	private async dirStats(directory: string) {
		const files = await readdir(directory)
		const stats = files.map(file => stat(path.join(directory, file)))
		const storageSize = (await Promise.all(stats)).reduce((accumulator, { size }) => accumulator + size, 0)
		
		const { freeSize, totalSize } = await new Promise(resolve => {
			statfs(require.main.path, (err, stats) => {
				resolve({
					totalSize: stats.blocks * stats.bsize,
					freeSize: stats.bsize * stats.bfree
				})
			})
		}) as { totalSize: number, freeSize: number }
		
		return { storageSize, totalSize, freeSize }
	}
	
	async getStats() {
		return await this.dirStats('./storage')
	}
	
	async saveFile(dirName: string, file: Express.Multer.File) {
		const dirPath = `./storage/${dirName}`
		
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true })
		}
		
		const fileData = Buffer.from(file.buffer)
		fs.writeFileSync(`${dirPath}/${file.originalname}`, fileData)
		
		return { status: 200 }
	}
	
	async createDir(dirName: string) {
		const dirPath = `./storage/${dirName}`
		fs.mkdirSync(dirPath, { recursive: true })
		
		return { status: 200 }
	}
}
