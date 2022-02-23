import React, { FC, useRef } from 'react'
import { useKey } from '../../../hooks/useIsKey';
import { useToggle } from '../../../hooks/useToggle'
import { useType } from '../../../hooks/useType'

const eyeClose: string = require("../../../img/interface/line-waiting.svg").default;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	withWaitIcon?: boolean
	children: React.ReactNode
}

export const Button: FC<ButtonProps> = ({ children, withWaitIcon, disabled, className, ...props }) => {
	const [clickAdd, setClickAdd] = useToggle('click')
	const onClick = useType('mouseleave', [clickAdd], [setClickAdd])[0]

	return (
		<button className={`button ${clickAdd} ${className}`}
			disabled={disabled}
			onMouseDown={onClick}
			onMouseUp={onClick}
			onMouseLeave={onClick}
			onTouchStart={onClick}
			onTouchEnd={onClick}
			{...props}>
			{disabled && withWaitIcon ? <div className='button__waiting' ><img src={eyeClose} /></div> : children}
		</button>
	)
}
