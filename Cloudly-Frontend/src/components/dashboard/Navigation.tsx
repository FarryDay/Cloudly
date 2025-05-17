'use client'

import { logout } from '@/utils/components'
import { Button } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { CiHome, CiLogout } from 'react-icons/ci'
import { RxDashboard } from 'react-icons/rx'

const ACTIVE_NAVIGATION = 'bg-primary-500 text-white rounded-md p-1'
const INACTIVE_NAVIGATION =
	'text-primary-500 cursor-pointer transition-all hover:bg-primary-400 hover:text-white rounded-md p-1'

export default function Navigation() {
	const path = usePathname()
	const getClassName = (key: string): string => {
		return path.endsWith(key) ? ACTIVE_NAVIGATION : INACTIVE_NAVIGATION
	}

	const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
	const handleCollapse = () => {
		setIsCollapsed(!isCollapsed)
	}

	return (
		<div className='px-8 flex w-auto flex-col gap-4 overflow-auto shadow-md shadow-black py-8'>
			<div className='flex items-center justify-center gap-4'>
				<div className='flex items-center gap-4'>
					<RxDashboard size={20} className='text-white/50' />
					<p className='text-white text-sm font-semibold'>Dashboard</p>
				</div>
			</div>
			<div className='flex-[3] flex flex-col gap-6 justify-center'>
				<div className={getClassName('/dashboard')}>
					<CiHome size={32} />
				</div>
				<div className={getClassName('/home')}>
					<CiHome size={32} />
				</div>
			</div>
			<Button
				onClick={() => logout()}
				isIconOnly
				color='danger'
				variant='light'
			>
				<CiLogout size={24} />
			</Button>
		</div>
	)
}
