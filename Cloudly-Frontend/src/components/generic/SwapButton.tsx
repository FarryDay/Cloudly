import { Button } from '@nextui-org/react'
import { IoMdSwap } from 'react-icons/io'

type Props = {
	onClick: () => void
}

export default function SwapButton({ onClick }: Props) {
	return (
		<Button onClick={onClick} color='primary' isIconOnly>
			<IoMdSwap size={24} />
		</Button>
	)
}
