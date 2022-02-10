import React, { useEffect, useState } from "react"

type useToggleClassT = (createdClasses: string) => [
	classAdded: string,
	toggleClass: () => void
];

export const useToggleClass: useToggleClassT = (createdClasses) => {
	const [classAdded, setClassAdded] = useState('');
	const toggleClass = () => {
		setClassAdded(prev => {
			if (prev === createdClasses)
				return ''
			else
				return createdClasses
		}
		)
	}
	return [classAdded, toggleClass]
}




