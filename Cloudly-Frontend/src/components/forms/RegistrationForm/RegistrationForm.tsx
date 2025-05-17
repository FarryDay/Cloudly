import { StatePage } from '@/app/auth/page'
import SwapButton from '@/components/generic/SwapButton'
import { getDefaultAPProps } from '@/utils/components'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

type Props = {
	changeCard: Dispatch<SetStateAction<StatePage>>
}

export default function RegistrationForm({ changeCard }: Props) {
	const router = useRouter()

	return (
		<div className='flex-1 flex flex-col relative'>
			<div className='flex p-4 justify-between absolute left-0 z-10 right-0'>
				<div
					onClick={() => router.push('/')}
					className='flex items-center gap-2 cursor-pointer'
				>
					<img src='/logo.webp' alt='logo' className='w-12 h-12 rounded-full' />
					<h1 className='font-semibold'>Cloudly</h1>
				</div>
				<SwapButton onClick={() => changeCard('login')} />
			</div>
			<motion.div
				{...getDefaultAPProps()}
				className='flex-1 flex flex-col relative justify-center p-10'
			>
				<h1 className='text-2xl text-center'>Регистрация</h1>
			</motion.div>
		</div>
	)
}
