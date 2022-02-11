import React, { useState } from "react"

type useToggleT = (toggleValue: string) => [
	added: string,
	toggleClass: () => void
];

export const useToggle: useToggleT = (toggleValue) => {
	const [added, setAdded] = useState('');
	const toggleF = () => {
		setAdded(prev => {
			if (prev === toggleValue)
				return ''
			else
				return toggleValue
		}
		)
	}
	return [added, toggleF]
}




