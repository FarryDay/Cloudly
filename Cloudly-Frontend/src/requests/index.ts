import axios, { AxiosResponse, isAxiosError } from 'axios'
import { HTTP_METHOD } from 'next/dist/server/web/http'

export interface ApiResponse {
	message: string
}

type Request<T, K> = {
	url: string
	method: HTTP_METHOD
	data: T
}

export async function cloudlyRequest<T, K>(req: Request<T, K>) {
	try {
		const res = await axios<K>({
			url: req.url,
			method: req.method,
			data: req.data,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwtToken') || '',
			},
		})
		if (res.status.toString().startsWith('2')) {
			const token = extractTokenFromHeader(res)
			if (token && localStorage.getItem('jwtToken') !== token) {
				localStorage.setItem('jwtToken', token)
			}
			return res
		}
	} catch (error) {
		if (isAxiosError(error)) {
			localStorage.removeItem('Authorization')
		}
	}
}

function extractTokenFromHeader(res: AxiosResponse): string | undefined {
	const [type, token] = res.headers['authorization']?.split(' ') ?? []
	return type === 'Bearer' ? token : undefined
}
