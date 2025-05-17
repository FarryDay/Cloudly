import { StatePage } from '@/app/auth/page'
import SwapButton from '@/components/generic/SwapButton'
import useHandleToasts from '@/hooks/toastHook'
import { loginRequest } from '@/requests/auth.requests'
import { objectsIsEqual } from '@/utils'
import { getDefaultAPProps } from '@/utils/components'
import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { IoIosEyeOff, IoMdEye } from 'react-icons/io'
import LoginSchema from './LoginSchema'

type Props = {
	changeCard: Dispatch<SetStateAction<StatePage>>
}

const AuthInputClasses = {
	inputWrapper:
		'data-[hover=true]:bg-primary-200/80 data-[hover=true]:border-primary-200 transition-color border-primary-500 bg-primary-100',
}

export default function LoginForm({ changeCard }: Props) {
	const router = useRouter()
	const { errorToast } = useHandleToasts()
	const [isVisible, setIsVisible] = useState(false)
	const toggleVisibility = () => setIsVisible(!isVisible)

	const form = useFormik({
		validationSchema: LoginSchema,
		initialValues: {
			login: '',
			password: '',
		},
		onSubmit: async () => {
			const res = await loginRequest(form.values)
			if (res?.status == 200) {
				router.push('/dashboard')
			} else {
				errorToast('Ошибка авторизации!')
			}
		},
	})

	return (
		<div className='flex-1 flex flex-col relative'>
			<div className='flex p-4 justify-between absolute z-10 left-0 right-0'>
				<div
					onClick={() => router.push('/')}
					className='flex items-center gap-2 cursor-pointer'
				>
					<img src='/logo.webp' alt='logo' className='w-12 h-12 rounded-full' />
					<h1 className='font-semibold'>Cloudly</h1>
				</div>
				<SwapButton onClick={() => changeCard('registration')} />
			</div>
			<motion.div
				{...getDefaultAPProps()}
				className='flex-1 flex gap-8 flex-col relative justify-center p-10'
			>
				<h1 className='text-2xl text-center'>Авторизация</h1>
				<div className='flex flex-col gap-4'>
					<Input
						color='primary'
						variant='bordered'
						classNames={AuthInputClasses}
						placeholder='Логин'
						id='login'
						value={form.values.login}
						onChange={form.handleChange}
						isInvalid={!!form.errors.login}
						errorMessage={form.errors.login}
					/>
					<Input
						endContent={
							!isVisible ? (
								<IoMdEye
									onClick={toggleVisibility}
									className='cursor-pointer'
									size={24}
								/>
							) : (
								<IoIosEyeOff
									onClick={toggleVisibility}
									className='cursor-pointer'
									size={24}
								/>
							)
						}
						color='primary'
						variant='bordered'
						classNames={AuthInputClasses}
						placeholder='Пароль'
						type={isVisible ? 'text' : 'password'}
						id='password'
						value={form.values.password}
						onChange={form.handleChange}
						isInvalid={!!form.errors.password}
						errorMessage={form.errors.password}
					/>
					<Button
						isDisabled={
							!form.isValid || objectsIsEqual(form.values, form.initialValues)
						}
						onClick={() => form.handleSubmit()}
						color='primary'
						variant='solid'
					>
						Войти
					</Button>
				</div>
			</motion.div>
		</div>
	)
}
