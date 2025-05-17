import Header from '@/components/home/Header'
import useUserStore from '@/stores/user.store'
import { Button } from '@nextui-org/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { FaArrowDownLong } from 'react-icons/fa6'
import { GoArrowRight } from 'react-icons/go'

export default function HomeMain() {
	const arrowRef = useRef(null)
	const router = useRouter()
	const { scrollYProgress } = useScroll({
		target: arrowRef,
		offset: ['center start', 'center end'],
	})

	const { user, fetchUser } = useUserStore()
	useEffect(() => {
		if (!user) fetchUser(false)
	}, [])

	const arrowScale = useTransform(scrollYProgress, [0, 1], [3, 1])

	return (
		<main className='h-auto overflow-x-hidden flex flex-col from-primary-900 to-primary-500 bg-gradient-to-t relative pt-24 font-normal'>
			<Header />
			<div className='flex-1 px-5 items-start'>
				<motion.div className='z-10 backdrop-blur-sm flex justify-between items-center h-full rounded-xl p-10'>
					<div className='flex-1 flex flex-col items-start gap-6'>
						<h1 className='text-4xl font-bold text-white text-left'>
							Cloudly - сохрани всё, даже самое нужное.
						</h1>
						<Button
							onClick={() =>
								user !== undefined
									? router.push('/dashboard')
									: router.push('/auth')
							}
							endContent={<GoArrowRight size={20} />}
							color='primary'
							variant='shadow'
						>
							Начать хранить
						</Button>
					</div>
					<div className='flex-1'>
						<motion.img
							className='hover:scale-105 transition-transform animate-pulse'
							src='/home/cloud.svg'
							alt='Cloudly'
						/>
					</div>
				</motion.div>
			</div>
			<div
				className='flex justify-center items-end flex-1 text-white h-full p-8'
				ref={arrowRef}
			>
				<motion.div style={{ scale: arrowScale, opacity: scrollYProgress }}>
					<FaArrowDownLong size={24} />
				</motion.div>
			</div>
		</main>
	)
}
