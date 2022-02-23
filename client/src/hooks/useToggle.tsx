import React, { useState } from "react"

type useToggleT = (toggleValue: string, initVoid?: boolean) => [
	added: string,
	toggleClass: () => void
];

export const useToggle: useToggleT = (toggleValue, initVoid?) => {
	const [added, setAdded] = useState(initVoid ? toggleValue : '');
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




