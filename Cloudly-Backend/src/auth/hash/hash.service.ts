import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
	constructor(private readonly config: ConfigService) {
	}
	
	async hash(password: string): Promise<string> {
		const salt = this.config.get("HASH_SALT") as string;
		return await bcrypt.hash(password, salt)
	}
	
	async compare(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash)
	}
}
