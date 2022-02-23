import React, { FC, useRef, useState, useEffect } from 'react';
import { useToggle } from '../../../hooks/useToggle';
import { useKey } from '../../../hooks/useIsKey';
import { useType } from '../../../hooks/useType';
import { FieldProps } from 'formik';
import { ErrorMessage } from './../InfoMessages/InfoMessages';

const eyeOpen: string = require("../../../img/interface/eye-outline.svg").default;
const eyeClose: string = require("../../../img/interface/eye-sharp.svg").default;

const arrow: (classN?: string) => object = (classN) => <svg className={classN ? classN : ''} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M14.414 5.586c-.78-.781-2.048-.781-2.828 0l-6.415 6.414 6.415 6.414c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-3.585-3.586 3.585-3.586c.781-.781.781-2.047 0-2.828z" /></svg>

interface InputTextProps extends FieldProps {
	title: string
}

export const InputText: FC<InputTextProps> = ({ title, field: { name, value, onChange, onBlur }, form: { touched, errors, }, ...props }) => {
	let [addFocus, toggleAddFocus] = useToggle('active-focus');

	const addErr = touched[name] && errors[name] ? 'active-err' : ''

	return (
		<div className='input-text input-div'>
			<div className={`input-text__title input-title ${addFocus} ${addErr}`}>{title}</div>
			<input className={`input-text__input input ${addErr}`}
				type='text'
				name={name}
				value={value}
				onChange={(e) => { onChange(name)(e) }}
				onFocus={() => { toggleAddFocus(); }}
				onBlur={(e) => { toggleAddFocus(); onBlur(name)(e); }}
				{...props}
			/>
			<ErrorMessage message={errors[name]} isActive={addErr} />
		</div>
	);
}

export const InputPassword: FC<FieldProps> = ({ field: { name, value, onChange, onBlur }, form: { touched, errors }, ...props }) => {
	const [addFocus, toggleAddFocus] = useToggle('active-focus');
	const [isOpenEye, toggleIsOpenEye] = useToggle('openEye')

	const addErr = touched[name] && errors[name] ? 'active-err' : ''

	return (
		<div className='input-password input-div'>
			<div className={`input-password__title input-title ${addFocus} ${addErr}`}>Пароль</div>
			<div className='input-password__body'>
				<input className={`input-password__input input ${addErr}`}
					type={isOpenEye === '' ? 'password' : 'text'}
					name={name}
					value={value}
					onChange={(e) => { onChange(name)(e) }}
					onFocus={toggleAddFocus}
					onBlur={(e) => { toggleAddFocus(); onBlur(name)(e) }}
					{...props} />
				<img className='input-password__eye' src={isOpenEye === '' ? eyeClose : eyeOpen} alt=''
					onClick={toggleIsOpenEye} />
			</div>
			<ErrorMessage message={errors[name]} isActive={addErr} />
		</div>
	);
}
interface InputSelectionProps extends FieldProps {
	title: string
	options: Array<{ value: string, label: string }>
}

export const InputSelection: FC<InputSelectionProps> = ({ title, options, field: { name, value, onChange, onBlur }, form: { touched, errors }, ...props }) => {
	const [upArrow, toggleUpArrow] = useToggle('active-arrow');
	const [addFocus, toggleAddFocus] = useToggle('active-focus');
	const [plOption, toggleOption] = useToggle('pl-option', true);

	const isEscapeKey = useKey(['Escape'], [toggleUpArrow])
	const isEnterKey = useKey(['Enter'], [toggleUpArrow])

	const [onUpArrow] = useType('blur', [upArrow], [toggleUpArrow])

	const addErr = touched[name] && errors[name] ? 'active-err' : ''

	const pressKey = (e: any) => {
		if (upArrow !== '') {
			isEscapeKey(e)
		}
	}

	return (
		<div className='input-selection input-div'>
			<div className={`input-selection__title input-title ${addFocus} ${addErr}`}>{title}</div>
			<div className='input-selection__wrapper-selection'>
				{arrow(upArrow)}
				<select className={`input-selection__select input ${plOption} ${addErr}`}
					name={name}
					value={value}
					onChange={(e) => { onChange(name)(e); value === '' && toggleOption() }}
					onFocus={toggleAddFocus}
					onBlur={(e) => { toggleAddFocus(); onUpArrow(e); onBlur(name)(e) }}
					onClick={onUpArrow}
					onKeyPress={isEnterKey}
					onKeyUp={pressKey}
					onKeyDown={pressKey}
					{...props}>

					{options.map(option =>
						<option
							value={option.value}
							label={option.label}
							disabled={option.value === '' ? true : false}
							selected={option.value === '' ? true : false}
						/>)}

				</select>
			</div>
			<ErrorMessage message={errors[name]} isActive={addErr} />
		</div >
	);
}

interface InputAreaProps extends FieldProps {
	title: string
}

export const InputArea: FC<InputAreaProps> = ({ title, field: { name, value, onChange, onBlur }, form: { touched, errors }, ...props }) => {
	const [addFocus, toggleAddFocus] = useToggle('active-focus');

	const addErr = touched[name] && errors[name] ? 'active-err' : ''

	return (
		<div className='input-area input-div'>
			<div className={`input-area__title input-title ${addFocus} ${addErr}`}>{title}</div>
			<textarea className={`input-area__area input ${addErr}`}
				name={name}
				value={value}
				onChange={(e) => { onChange(name)(e) }}
				onFocus={toggleAddFocus}
				onBlur={(e) => { toggleAddFocus(); onBlur(name)(e) }}
				{...props} />
			<ErrorMessage message={errors[name]} isActive={addErr} />
		</div >
	);
}

interface InputStepperProps extends FieldProps {
	title: string
	defaultCount: number
	maxCount: number
	minCount: number
}

export const InputStepper: FC<InputStepperProps> = ({ title, defaultCount, maxCount, minCount, field: { name, value, onChange, onBlur }, form: { setFieldValue, touched, errors }, ...props }) => {
	const [addFocus, toggleAddFocus] = useToggle('active-focus active-focus-from-btn');
	const [isActiveInc, toggleIsActiveInc] = useToggle('active-btn')
	const [isActiveDec, toggleIsActiveDec] = useToggle('active-btn')

	const [count, setCount] = useState(defaultCount)

	const inputRef = useRef<HTMLInputElement>(null)

	const [onInc, onDec] = useType('mouseleave',
		[isActiveInc, isActiveDec],
		[toggleIsActiveInc, toggleIsActiveDec],
		[toggleAddFocus, () => inputRef.current?.focus()])

	const addErr = touched[name] && errors[name] ? 'active-err' : ''

	useEffect(() => {
		setFieldValue(name, count)
	}, [count])

	const inc = () => {
		setCount((prev) => {
			if (prev < maxCount) {
				return prev + 1
			}
			else return prev
		})

	}

	const dec = () => {
		setCount((prev) => {
			if (prev <= maxCount && prev > 0) {
				return prev - 1
			}
			else return prev
		})

	}

	const isArrowsKey = useKey(['ArrowUp', 'ArrowDown'], [inc, dec])

	const changeCounter = (e: any) => {

		switch (e.currentTarget.id || e.target.id) {
			case 'inc':
				inc()
				break
			case 'dec':
				dec()
				break
			case 'inp':
				if (e.currentTarget.value <= maxCount && e.currentTarget.value >= 0) {
					setCount(Number(e.currentTarget.value))
				}
				break
			default:
				break

		}
	}

	return (
		<div className='input-stepper input-div'>
			<div className={`input-stepper__title input-title ${addFocus} ${addErr}`}>{title}</div>
			<div className='input-stepper__body'>
				<input ref={inputRef} id='inp' className={`input-stepper__input input ${addErr} ${addFocus}`}
					name={name}
					value={count}
					onFocus={() => { toggleAddFocus() }}
					onBlur={(e) => { toggleAddFocus(); onBlur(name)(e) }}
					onChange={(e) => { changeCounter(e) }}
					onKeyDown={isArrowsKey}
					{...props} />
				<div className={`stepper-btn ${addFocus} ${addErr}`}>
					<div id='inc' className={`stepper-btn__inc input-btn ${isActiveInc} ${addErr}`}
						onClick={changeCounter}
						onMouseDown={onInc}
						onMouseUp={onInc}
						onMouseLeave={onInc} >{arrow()}</div>
					<div id='dec' className={`stepper-btn__dec input-btn ${isActiveDec} ${addErr}`}
						onClick={changeCounter}
						onMouseDown={onDec}
						onMouseUp={onDec}
						onMouseLeave={onDec}>{arrow()}</div>
				</div>
			</div>
			<ErrorMessage message={errors[name]} isActive={addErr} />
		</div >
	);
}