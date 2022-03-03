import { FC } from "react"
import { Button } from './../UI/Buttons/Button';
import { LocationInfo } from './../LocationInfo/LocationInfo';

interface HeaderI {
	city: string
}

export const Header: FC<HeaderI> = ({ city }) => {
	return (
		<div className='header'>
			<LocationInfo city={'Азов'} />
			<div className='header__logo'>работа.ру</div>
			<div className='header__buttons'>
				<Button as='regular-bd'>Создать резюме</Button>
				<Button as='regular'>Войти</Button>
			</div>
		</div>
	)
}

