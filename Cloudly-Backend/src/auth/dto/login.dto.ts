import { IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class LoginDto {
	@IsString()
	login: string
	
	@IsString()
	password: string
}