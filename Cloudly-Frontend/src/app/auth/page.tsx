'use client'

import LoginForm from '@/components/forms/AuthLogin/LoginForm'
import RegistrationForm from '@/components/forms/RegistrationForm/RegistrationForm'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

export type StatePage = 'login' | 'registration'
const defaultState: StatePage = 'login'

export default function Auth() {
	const searchParams = useSearchParams()

	const [state, setState] = useState<StatePage>(
		(searchParams.get('state') || defaultState) !== defaultState
			? 'registration'
			: defaultState
	)

	return (
		<main className='min-h-screen overflow-x-hidden flex justify-between bg-white text-black'>
			<AnimatePresence>
				{state === 'login' && <LoginForm changeCard={setState} />}
				{state === 'registration' && <RegistrationForm changeCard={setState} />}
			</AnimatePresence>
			<motion.div
				initial={{ x: 300 }}
				animate={{ x: 0, transition: { duration: 1 } }}
				className='flex-1 flex justify-center items-center p-10 rounded-l-3xl bg-main-1'
			>
				<img src='/auth/notebooks.svg' alt='Notebooks' />
			</motion.div>
			<ToastContainer position='bottom-right' />
		</main>
	)
}
