import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SaveFileDto {
	@IsString()
	@IsOptional()
	folderId: string
}