import { atom, computed } from 'nanostores'
import { BoardStyle, Difficulty, SelectedDifficulty } from './types'
import { easy, hard, medium } from './difficulties'

interface DifficultyState {
	type: SelectedDifficulty
	level: Difficulty
	board: BoardStyle
	queueType?: SelectedDifficulty
}

const boardStyles = {
	easy: {
		radius: 50,
		fontSize: 2.3,
	} as BoardStyle,
	medium: {
		radius: 40,
		fontSize: 1.8,
	} as BoardStyle,
	hard: {
		radius: 35,
		fontSize: 1.6,
	} as BoardStyle,
}

const initialState: DifficultyState = {
	type: 'easy',
	level: easy,
	board: boardStyles.easy,
}

function difficultyReducer(type: SelectedDifficulty): DifficultyState {
	if (type === 'loading') {
		return {
			type: 'loading',
			level: easy,
			board: {} as BoardStyle,
		}
	}
	if (type === 'medium') {
		return {
			type: 'medium',
			level: medium,
			board: boardStyles.medium,
		}
	}
	if (type === 'hard') {
		return {
			type: 'hard',
			level: hard,
			board: boardStyles.hard,
		}
	}
	return initialState
}

export const $isDebugging = atom(false)
export const $selectedDifficulty = atom(initialState)
export const $boardStyles = computed(
	$selectedDifficulty,
	(selectedDifficulty) => {
		if (selectedDifficulty.type === 'loading') {
			return {} as BoardStyle
		}
		return boardStyles[selectedDifficulty.type]
	},
)

$selectedDifficulty.listen((selectedDifficulty) => {
	if (selectedDifficulty.type !== 'loading') {
		return
	}
	setTimeout(() => {
		$selectedDifficulty.set(
			difficultyReducer(selectedDifficulty.queueType || 'easy'),
		)
	})
})
