import { montserrat } from '@/utils/fonts'
import { TbFaceIdError } from 'react-icons/tb'
import { Flip, toast } from 'react-toastify'

export default function useHandleToasts() {
	const errorToast = (message: string) => {
		toast.error(getMessageComponent(message), {
			icon: () => <TbFaceIdError size={32} />,
			position: 'bottom-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			transition: Flip,
		})
	}

	return { errorToast }
}

const getMessageComponent = (message: string) => {
	return <h1 className={`${montserrat.className} font-medium`}>{message}</h1>
}
