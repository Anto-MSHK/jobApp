import React, { FC } from 'react'
import { Button } from '../../UI/Buttons/Button'

interface WidgetI {
	title: string
	color?: 'blue' | 'red'
	withButton?: string
	className: string
}

export const Widget: FC<WidgetI> = ({ title, withButton, color = 'blue', className, children }) => {
	return (
		<div className='widget'>
			<div className='widget__top'>
				<div className={`widget__title ${color}`}><span>{title}</span></div>
				<Button as='tab' className='widget__button'>{withButton}</Button>
			</div>
			<div className={`widget__body ${className}`}>
				{children}
			</div>
		</div>
	)
}
