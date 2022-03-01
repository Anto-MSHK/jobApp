import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import './scss/style.scss'
import { Input } from './Components/UI/Inputs/InputManager';
import { Button } from './Components/UI/Buttons/Button';
import { Widget } from './Components/UITemplates/Widget/Widget';

function App() {

	const formikProps = {
		initialValues: {
			name: '', password: '', country: '', Im: '', age: ''
		},

		validationSchema: Yup.object({
			name: Yup.string().required('Это поле обязательно!'),
			password: Yup.string().required('Это поле обязательно!'),
			country: Yup.string().required('Это поле обязательно!'),
			Im: Yup.string().required('Это поле обязательно!'),
			age: Yup.number().min(10, 'Вам должно быть больше 10!')
		}),

		onSubmit: (values: any, propsF: { setSubmitting: any }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				propsF.setSubmitting(false);
			}, 2000);
		}
	}

	const options = [
		{ value: '', label: 'Выберите страну' },
		{ value: 'Russian Federation', label: 'Российская Федерация' },
		{ value: 'USA', label: 'США' },
		{ value: 'England', label: 'Англия' },
	]

	return (
		<div className="App">
			<Formik {...formikProps}>
				{({
					isSubmitting,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
						<Input type='text' name='name' title='Имя' placeholder='Введите имя' />
						<Input type='password' name='password' placeholder='Введите пароль' />
						<Input type='select' name='country' title='Страна' options={options} />
						<Input type='textArea' name='Im' title='О себе' placeholder='Расскажите о себе' />
						<Input type='stepper' name='age' title='Возраст' defaultCount={18} maxCount={120} />
						<Button as='simple' type="submit" className='form-btn' disabled={isSubmitting}>Отправить</Button>
					</form>
				)}
			</Formik>
			<Widget title='Вакансии в вашем городе' withButton='Показать все' className='wid'>
				<span>Hello!^^</span>
			</Widget>
		</div >
	);
}

export default App;
