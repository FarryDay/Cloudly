import * as Yup from 'yup'

export default Yup.object().shape({
	login: Yup.string()
		.min(6, 'Слишком короткий логин')
		.required('Данное поле обязательное'),
	password: Yup.string()
		.min(6, 'Слишком короткий пароль')
		.required('Данное поле обязательное'),
})
