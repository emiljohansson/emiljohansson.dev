export interface RowTile {
	id: string
	value: number
	hasBomb: boolean
	activated: boolean
	dead: boolean
	flagged: boolean
	linked: [RowTile, (newTileObject: RowTile) => void][]
	activate: (setTile: (newTile: RowTile) => void) => void
}

export type Rows = [RowTile, (newTileObject: RowTile) => void][][]

export type SelectedDifficulty = 'easy' | 'loading' | 'medium' | 'hard'

export interface Difficulty {
	value: SelectedDifficulty
	title: string
	bombs: number
	rows: number
	columns: number
}

export interface BoardStyle {
	radius: number
	fontSize: number
}
