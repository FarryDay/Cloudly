import { IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator'

export class RegistrationDto {
	@IsString()
	@MinLength(6)
	@MaxLength(22)
	login: string
	
	@IsString()
	@MaxLength(18)
	username: string
	
	@IsString()
	@MinLength(6)
	@MaxLength(22)
	password: string
}