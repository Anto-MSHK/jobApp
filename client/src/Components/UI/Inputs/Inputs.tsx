import React, { FC, useRef, useState } from 'react';
import { useToggleClass } from '../../../hooks/useToggleClass';
import { useIsKey } from '../../../hooks/useIsKey';

const eyeOpen: string = require("../../../img/interface/eye-outline.svg").default;
const eyeClose: string = require("../../../img/interface/eye-sharp.svg").default;

const arrow: (classN?: string) => object = (classN) => <svg className={classN ? classN : ''} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M14.414 5.586c-.78-.781-2.048-.781-2.828 0l-6.415 6.414 6.415 6.414c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-3.585-3.586 3.585-3.586c.781-.781.781-2.047 0-2.828z" /></svg>

interface InputTextProps {
	title: string;
	name: string;
	value: string;
	placeholder?: string;
}

export const InputText: FC<InputTextProps> = ({ title, value, placeholder, }) => {
	let [addFocus, toggleAddFocus] = useToggleClass('active-focus');

	return (
		<div className='input-text input-div'>
			<div className={'input-text__title input-title ' + addFocus}>{title}</div>
			<input className='input-text__input input'
				type='text'
				placeholder={placeholder}
				value={value}
				onFocus={toggleAddFocus}
				onBlur={toggleAddFocus} />
		</div>

	);
}

interface InputPasswordProps {
	value: string;
}

export const InputPassword: FC<InputPasswordProps> = ({ value }) => {
	const [isOpenEye, setIsOpenEye] = useState(false);
	const [addFocus, toggleAddFocus] = useToggleClass('active-focus');

	const onEyeToggle = () => {
		setIsOpenEye(prev => !prev)
	}

	return (
		<div className='input-password input-div'>
			<div className={'input-password__title input-title ' + addFocus}>Пароль</div>
			<div className='input-password__body'>
				<input className='input-password__input input' value={value} type={isOpenEye ? "text" : "password"}
					onFocus={toggleAddFocus}
					onBlur={toggleAddFocus} />
				<img className='input-password__eye' src={isOpenEye ? eyeOpen : eyeClose} alt=''
					onClick={onEyeToggle} />
			</div>
		</div>
	);
}

interface InputSelectionProps {
	title: string
	name: string
	options: Array<string>
}

export const InputSelection: FC<InputSelectionProps> = ({ title, options }) => {
	const [upArrow, toggleUpArrow] = useToggleClass('active-arrow');
	const [addFocus, toggleAddFocus] = useToggleClass('active-focus');

	const isEscapeKey = useIsKey(['Escape'], [toggleUpArrow])

	const handleKeyDown = (e: any) => {
		if (upArrow !== '') {
			isEscapeKey(e)
		}
	}

	const onToggleUpArrow = (on: any) => {
		if (on.type === 'blur' && upArrow === '')
			return
		toggleUpArrow()
	}

	return (
		<div className='input-selection input-div'>
			<div className={'input-selection__title input-title ' + addFocus}>{title}</div>
			<div className='input-selection__wrapper-selection'>
				{arrow(upArrow)}
				<select className='input-selection__select input' name="" id=""
					onFocus={toggleAddFocus}
					onBlur={(e) => { toggleAddFocus(); onToggleUpArrow(e); }}
					onClick={onToggleUpArrow}
					onKeyPress={onToggleUpArrow}
					onKeyUp={handleKeyDown} >
					{options.map(option => <option value={option}>{option}</option>)}
				</select>
			</div>
		</div >
	);
}

interface InputAreaProps {
	title: string
	name: string
	placeholder?: string
	body: string
}

export const InputArea: FC<InputAreaProps> = ({ title, body, name, placeholder }) => {
	const [addFocus, toggleAddFocus] = useToggleClass('active-focus');

	return (
		<div className='input-area input-div'>
			<div className={'input-area__title input-title ' + addFocus}>{title}</div>
			<textarea className='input-area__area input' name={name} id="" placeholder={placeholder} onFocus={toggleAddFocus} onBlur={toggleAddFocus}>
				{body}
			</textarea>
		</div >
	);
}

interface InputStepperProps {
	title: string
	name: string
	placeholder?: string
}

export const InputStepper: FC<InputStepperProps> = ({ title, name, placeholder }) => {
	const [addFocus, toggleAddFocus] = useToggleClass('active-focus active-focus-from-btn');
	const [isActiveInc, toggleIsActiveInc] = useToggleClass('active-btn')
	const [isActiveDec, toggleIsActiveDec] = useToggleClass('active-btn')

	const [count, setCount] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)

	const onToggleIsActive = (on: any, setF: () => void, classAdded: string) => {
		if (on.type === 'mouseleave' && classAdded === '') {
			return
		}
		setF()
		toggleAddFocus()
		inputRef.current?.focus()
	}

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
					value={count}
					name={name}
					placeholder={placeholder}
					onFocus={toggleAddFocus}
					onBlur={toggleAddFocus}
					onChange={changeCounter}
					onKeyDown={isArrowsKey} />
				<div className={'stepper-btn ' + addFocus}>
					<div id='inc' className={'stepper-btn__inc input-btn ' + isActiveInc}
						onClick={changeCounter}
						onMouseDown={(e) => { onToggleIsActive(e, toggleIsActiveInc, isActiveInc); }}
						onMouseUp={(e) => { onToggleIsActive(e, toggleIsActiveInc, isActiveInc); }}
						onMouseLeave={(e) => { onToggleIsActive(e, toggleIsActiveInc, isActiveInc); }} >{arrow()}</div>
					<div id='dec' className={'stepper-btn__dec input-btn ' + isActiveDec}
						onClick={changeCounter}
						onMouseDown={(e) => { onToggleIsActive(e, toggleIsActiveDec, isActiveDec); }}
						onMouseUp={(e) => { onToggleIsActive(e, toggleIsActiveDec, isActiveDec); }}
						onMouseLeave={(e) => { onToggleIsActive(e, toggleIsActiveDec, isActiveDec); }} >{arrow()}</div>
				</div>
			</div>
		</div >
	);
}