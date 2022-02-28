import React, { FC } from 'react'

interface LWI {
	color: 'white' | 'blue' | 'black'
	className?: string
}

const waitingWhite: string = require("../../../img/interface/line-waiting-white.svg").default;
const waitingBlack: string = require("../../../img/interface/line-waiting-black.svg").default;
const waitingBlue: string = require("../../../img/interface/line-waiting-blue.svg").default;

export const LinearWaitingIndicator: FC<LWI> = ({ color, className }) => {
	const selectColor = () => {
		switch (color) {
			case 'white':
				return waitingWhite
			case 'black':
				return waitingBlack
			case 'blue':
				return waitingBlue
		}
	}
	return (
		<div className={`waiting-linear ${className}`}><img src={selectColor()} /></div >
	)
}
