import React, { FC, useRef, useState } from 'react';
import { useToggle } from '../../../hooks/useToggle';
import { useIsKey } from '../../../hooks/useIsKey';
import { useType } from './useType';

const eyeOpen: string = require("../../../img/interface/eye-outline.svg").default;
const eyeClose: string = require("../../../img/interface/eye-sharp.svg").default;

const arrow: (classN?: string) => object = (classN) => <svg className={classN ? classN : ''} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M14.414 5.586c-.78-.781-2.048-.781-2.828 0l-6.415 6.414 6.415 6.414c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-3.585-3.586 3.585-3.586c.781-.781.781-2.047 0-2.828z" /></svg>

interface InputTextProps {
	name: string;
	title: string;
	value: string;
}

export const InputText: FC<InputTextProps> = ({ title, value, ...props }) => {
	let [addFocus, toggleAddFocus] = useToggle('active-focus');

	return (
		<div className='input-text input-div'>
			<div className={'input-text__title input-title ' + addFocus}>{title}</div>
			<input className='input-text__input input'
				type='text'
				value={value}
				onFocus={toggleAddFocus}
				onBlur={toggleAddFocus}
				{...props} />
		</div>
	);
}

interface InputPasswordProps {
	value: string;
}

export const InputPassword: FC<InputPasswordProps> = ({ value, ...props }) => {
	const [addFocus, toggleAddFocus] = useToggle('active-focus');
	const [isOpenEye, toggleIsOpenEye] = useToggle('openEye')

	return (
		<div className='input-password input-div'>
			<div className={'input-password__title input-title ' + addFocus}>Пароль</div>
			<div className='input-password__body'>
				<input className='input-password__input input'
					type={isOpenEye === '' ? 'password' : 'text'}
					value={value}
					onFocus={toggleAddFocus}
					onBlur={toggleAddFocus}
					{...props} />
				<img className='input-password__eye' src={isOpenEye === '' ? eyeClose : eyeOpen} alt=''
					onClick={toggleIsOpenEye} />
			</div>
		</div>
	);
}

interface InputSelectionProps {
	name: string
	title: string
	options: Array<string>
}

export const InputSelection: FC<InputSelectionProps> = ({ name, title, options, ...props }) => {
	const [upArrow, toggleUpArrow] = useToggle('active-arrow');
	const [addFocus, toggleAddFocus] = useToggle('active-focus');

	const isEscapeKey = useIsKey(['Escape'], [toggleUpArrow])

	const [onUpArrow] = useType('blur', [upArrow], [toggleUpArrow])

	const pressKey = (e: any) => {
		if (upArrow !== '') {
			isEscapeKey(e)
		}
	}

	return (
		<div className='input-selection input-div'>
			<div className={'input-selection__title input-title ' + addFocus}>{title}</div>
			<div className='input-selection__wrapper-selection'>
				{arrow(upArrow)}
				<select className='input-selection__select input'
					name={name}
					onFocus={toggleAddFocus}
					onBlur={(e) => { toggleAddFocus(); onUpArrow(e); }}
					onClick={onUpArrow}
					onKeyPress={onUpArrow}
					onKeyUp={pressKey}
					onKeyDown={pressKey}
					{...props}>

					{options.map(option => <option value={option}>{option}</option>)}

				</select>
			</div>
		</div >
	);
}

interface InputAreaProps {
	name: string
	title: string
	body: string
}

export const InputArea: FC<InputAreaProps> = ({ title, body, name, ...props }) => {
	const [addFocus, toggleAddFocus] = useToggle('active-focus');

	return (
		<div className='input-area input-div'>
			<div className={'input-area__title input-title ' + addFocus}>{title}</div>
			<textarea className='input-area__area input'
				name={name}
				onFocus={toggleAddFocus}
				onBlur={toggleAddFocus}
				{...props}>

				{body}

			</textarea>
		</div >
	);
}

interface InputStepperProps {
	name: string
	title: string
}

export const InputStepper: FC<InputStepperProps> = ({ name, title, ...props }) => {
	const [addFocus, toggleAddFocus] = useToggle('active-focus active-focus-from-btn');
	const [isActiveInc, toggleIsActiveInc] = useToggle('active-btn')
	const [isActiveDec, toggleIsActiveDec] = useToggle('active-btn')

	const [count, setCount] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)

	const [onInc, onDec] = useType('mouseleave',
		[isActiveInc, isActiveDec],
		[toggleIsActiveInc, toggleIsActiveDec],
		[toggleAddFocus, () => inputRef.current?.focus()])

	const inc = () => {
		setCount((prev) => {
			if (prev < 20)
				return prev + 1
			else return prev
		})
	}

	const dec = () => {
		setCount((prev) => {
			if (prev <= 20 && prev > 0)
				return prev - 1
			else return prev
		})
	}

	const isArrowsKey = useIsKey(['ArrowUp', 'ArrowDown'], [inc, dec])

	const changeCounter = (e: any) => {

		switch (e.currentTarget.id || e.target.id) {
			case 'inc':
				inc()
				break
			case 'dec':
				dec()
				break
			case 'inp':
				if (e.currentTarget.value <= 20)
					setCount(Number(e.currentTarget.value))
				break
			default:
				break

		}
	}

	return (
		<div className='input-stepper input-div'>
			<div className={'input-stepper__title input-title ' + addFocus}>{title}</div>
			<div className='input-stepper__body'>
				<input ref={inputRef} id='inp' className={'input-stepper__input input ' + addFocus}
					name={name}
					value={count}
					onFocus={toggleAddFocus}
					onBlur={toggleAddFocus}
					onChange={changeCounter}
					onKeyDown={isArrowsKey}
					{...props} />
				<div className={'stepper-btn ' + addFocus}>
					<div id='inc' className={'stepper-btn__inc input-btn ' + isActiveInc}
						onClick={changeCounter}
						onMouseDown={onInc}
						onMouseUp={onInc}
						onMouseLeave={onInc} >{arrow()}</div>
					<div id='dec' className={'stepper-btn__dec input-btn ' + isActiveDec}
						onClick={changeCounter}
						onMouseDown={onDec}
						onMouseUp={onDec}
						onMouseLeave={onDec}>{arrow()}</div>
				</div>
			</div>
		</div >
	);
}