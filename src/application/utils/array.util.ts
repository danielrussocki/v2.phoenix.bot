import { random } from 'lodash'

export function appShuffleArray<T>(array: Array<T>): Array<T> {
	let currentIndex = array.length
	// While there remain elements to shuffle.
	while (currentIndex !== 0) {
		// Pick a remaining element.
		const randomIndex = random(0, currentIndex)
		currentIndex--
		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
	}

	return array
}
