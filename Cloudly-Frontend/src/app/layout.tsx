import { montserrat } from '@/utils/fonts'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Cloudly',
	description: 'Cloudly - облачное хранилище',
	icons: ['/favicon.png'],
}

type Props = Readonly<{
	children: React.ReactNode
}>

export default function RootLayout({ children }: Props) {
	return (
		<html lang='ru'>
			<body className={`${montserrat.className}`}>{children}</body>
		</html>
	)
}
