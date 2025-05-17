export const objectsIsEqual = (firstObj: any, secondObj: any) => {
	return JSON.stringify(firstObj) === JSON.stringify(secondObj)
}
