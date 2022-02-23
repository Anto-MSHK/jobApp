import React, { FC } from 'react'
import { Field } from 'formik';
import { InputPassword, InputText, InputSelection, InputArea, InputStepper } from './Inputs';

interface InpManagerI {
	type: 'text' | 'password' | 'select' | 'textArea' | 'stepper'
	name: string
	title?: string
	placeholder?: string
	options?: {}[]
	defaultCount?: number
	maxCount?: number
}

export const Input: FC<InpManagerI> = ({ type, name, title, placeholder, options, defaultCount, maxCount }) => {
	switch (type) {
		case 'text':
			return <Field name={name} title={title} placeholder={placeholder} component={InputText} />
		case 'password':
			return <Field name={name} placeholder={placeholder} component={InputPassword} />
		case 'select':
			return <Field name={name} title={title} options={options} component={InputSelection} />
		case 'textArea':
			return <Field name={name} title={title} placeholder={placeholder} component={InputArea} />
		case 'stepper':
			return <Field name={name} title={title} defaultCount={defaultCount} maxCount={maxCount} component={InputStepper} />
		default:
			return <></>
	}

}
