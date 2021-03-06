type useIsKeyT = (keyCodes: string[], changesByKeys: (() => any)[]) => ((e: any) => any);

export const useKey: useIsKeyT = (keyCodes, changesByKeys) => {

	const changeByKey = (e: any) => {
		keyCodes.map((key, index) => {
			if (e.code === key) {
				changesByKeys[index]()
			}
		})
	}

	return changeByKey

}
