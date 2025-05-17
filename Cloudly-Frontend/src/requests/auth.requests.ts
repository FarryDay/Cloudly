import { User } from '@/types/user.types'
import { API_URL_AUTH } from '@/utils/config'
import { ApiResponse, cloudlyRequest } from '.'

type LoginData = {
	login: string
	password: string
}

export interface LoginResponse extends ApiResponse {}

export async function loginRequest(data: LoginData) {
	return await cloudlyRequest<LoginData, LoginResponse>({
		url: `${API_URL_AUTH}/login`,
		method: 'POST',
		data,
	})
}

export interface MeResponse {
	data: User
}

export async function meRequest() {
	const res = await cloudlyRequest<undefined, MeResponse>({
		url: `${API_URL_AUTH}/me`,
		method: 'GET',
		data: undefined,
	})
	return res
}
