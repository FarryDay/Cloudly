import Navigation from '@/components/dashboard/Navigation'
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
	title: 'Cloudly - Dashboard',
	description: 'Cloudly - облачное хранилище',
	icons: ['../favicon.png'],
}

type Props = Readonly<{
	children: React.ReactNode
}>

export default function RootLayout({ children }: Props) {
	return (
		<main className='h-screen from-[#20234A] to-[#3C4677] bg-gradient-to-t flex justify-between'>
			<div className='absolute inset-0 pointer-events-none'>
				<img
					src='/dashboard/bg.png'
					className='h-screen w-screen opacity-[0.02]'
					alt='bg'
				/>
			</div>
			<Navigation />
			{children}
		</main>
	)
}
