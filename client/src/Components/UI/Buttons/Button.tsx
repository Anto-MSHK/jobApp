import React, { FC, useRef } from 'react'
import { useKey } from '../../../hooks/useIsKey';
import { useToggle } from '../../../hooks/useToggle'
import { useType } from '../../../hooks/useType'
import { LinearWaitingIndicator } from '../WaitingIcons/WaitingIndicators';

const star: string = require("../../../img/interface/star.svg").default;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	withWaitIcon?: 'white' | 'blue' | 'black'
	as: 'main-blue' | 'main-red' | 'regular' | 'regular-op' | 'regular-op-bd' | 'simple' | 'tab'
	children?: React.ReactNode
}

export const Button: FC<ButtonProps> = ({ as, children, withWaitIcon, disabled, className, ...props }) => {
	const [clickAdd, setClickAdd] = useToggle('click')
	const onClick = useType('mouseleave', [clickAdd], [setClickAdd])[0]

	return (
		<button className={`${as} ${className} ${clickAdd}`}
			disabled={disabled}
			onMouseDown={onClick}
			onMouseUp={onClick}
			onMouseLeave={onClick}
			onTouchStart={onClick}
			onTouchEnd={onClick}
			{...props}>
			<span style={disabled && withWaitIcon ? { color: 'rgba(255,255,255,0)' } : {}}>{children}</span>
			{disabled && withWaitIcon && <LinearWaitingIndicator color={withWaitIcon} className='button-wait' />}
		</button>
	)
}
