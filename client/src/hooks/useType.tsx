type useTypeT = (type: string, toggles: string[], togglesCallB: (() => void)[], generalCallBacks?: (() => void)[]) =>
	((e: any) => any)[];

export const useType: useTypeT = (type, toggles, togglesCallB, generalCallBacks) => {
	const changeByType: ((e: any) => void)[] = []

	toggles.map((curT, index) => {
		changeByType[index] = (e: any) => {
			if (e.type === type && curT === '') {
				return
			}
			togglesCallB[index]()
			generalCallBacks && generalCallBacks.map((callB) => callB())
		}
	})

	return changeByType

}
