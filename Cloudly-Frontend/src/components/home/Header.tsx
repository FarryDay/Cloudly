import useUserStore from '@/stores/user.store'
import { getDefaultAPProps } from '@/utils/components'
import { Avatar, Button } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CiLogin } from 'react-icons/ci'

export default function Header() {
	const { user, fetchUser } = useUserStore()
	useEffect(() => {
		if (!user) fetchUser(false)
	}, [])

	const router = useRouter()
	return (
		<div className='p-5 z-50 fixed top-0 right-0 left-0'>
			<div className='bg-white/50 backdrop-blur-sm text-black p-2 rounded-xl shadow-xl shadow-primary-300/40 flex justify-between items-center'>
				<div
					className='flex items-center gap-2 hover:cursor-pointer'
					onClick={() => router.push('/')}
				>
					<img src='/logo.webp' alt='Logo' className='w-8 h-8 rounded-full' />
					<h1 className='font-medium text-white'>Cloudly</h1>
				</div>
				<div className='flex text-white'>navigation</div>
				<AnimatePresence>
					{user === undefined && (
						<motion.div
							{...getDefaultAPProps()}
							className='flex gap-2 items-center'
						>
							<Button
								isIconOnly
								color='primary'
								className='text-white'
								variant='ghost'
								onClick={() => router.push('/auth?state=login')}
								size='sm'
							>
								<CiLogin size={20} />
							</Button>
							<Button
								color='primary'
								variant='ghost'
								className='font-medium text-white'
								onClick={() => router.push('/auth?state=registration')}
								size='sm'
							>
								Зарегистрироваться
							</Button>
						</motion.div>
					)}
					{user !== undefined && (
						<motion.div
							{...getDefaultAPProps()}
							onClick={() => router.push('/dashboard')}
							className='flex hover:bg-default-500/50 transition-colors rounded-md p-0.5 gap-2 items-center cursor-pointer'
						>
							<Avatar size='sm' color='primary' name={user.username} />
							<h4 className='text-sm font-normal'>{user.username}</h4>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
