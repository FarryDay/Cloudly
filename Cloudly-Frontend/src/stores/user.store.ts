import { meRequest } from '@/requests/auth.requests'
import { User } from '@/types/user.types'
import { create } from 'zustand'

interface UserState {
	user: User | undefined
	fetchUser: (isRedirect: boolean) => void
}

const useUserStore = create<UserState>()(set => ({
	user: undefined,
	fetchUser: async isRedirect => {
		const res = await meRequest()
		if (res == undefined) return

		if (res.status === 401 && isRedirect) {
			console.log(1)
			return location.replace('/auth')
		}

		set(state => ({ ...state, user: res.data.data }))
	},
}))

export default useUserStore
