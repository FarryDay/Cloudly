'use client'

import useUserStore from '@/stores/user.store'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'

export default function Dashboard() {
	const { user, fetchUser } = useUserStore()
	useEffect(() => {
		if (!user) fetchUser(true)
	}, [])

	return (
		<div className='w-full p-4'>
			<p>1</p>
		</div>
	)
}
