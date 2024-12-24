import {
	useState,
	useEffect,
	type FunctionComponent,
	type ReactNode,
} from 'react'
import useInterval from '@repo/lib/hooks/useInterval'
import { type Difficulty, type Rows, type RowTile } from './types'
import { $boardStyles, $isDebugging } from './store'
import { useStore } from '@nanostores/react'
import { Tile } from './Tile'

enum GameState {
	passive,
	active,
	won,
	lost,
}

function generateBombPositions(
	numberOfRows: number,
	numberOfColumns: number,
	numberOfBombs: number,
) {
	const list: boolean[][] = Array.from(Array(numberOfRows), () =>
		Array.from(Array(numberOfColumns)).map(() => false),
	)
	while (numberOfBombs > 0) {
		const row = Math.floor(Math.random() * numberOfRows)
		const column = Math.floor(Math.random() * numberOfColumns)
		if (!list[row][column]) {
			list[row][column] = true
			numberOfBombs--
		}
	}
	return list
}

function useBoard(
	numberOfRows: number,
	numberOfColumns: number,
	bombs: boolean[][],
) {
	const rows: Rows = []

	for (let row = 0; row < numberOfRows; row++) {
		const currentRow: [RowTile, (newTileObject: RowTile) => void][] = []
		for (let column = 0; column < numberOfColumns; column++) {
			// const currentPosition = i * 10 + j
			// TODO fix possible loop
			const [tile, setTile] = useTile(
				bombs,
				row,
				column,
				numberOfRows,
				numberOfColumns,
			)
			currentRow.push([tile, setTile])
		}
		rows.push(currentRow)
	}
	linkBlanks(rows)

	const [board] = useState(rows)

	return board
}

function linkBlank(tile: RowTile, rows: Rows, i: number, j: number) {
	const numberOfColumns = rows[i].length
	if (i - 1 >= 0) {
		if (j - 1 >= 0) {
			if (!getTileObject(rows[i - 1][j - 1]).hasBomb) {
				tile.linked.push(rows[i - 1][j - 1])
			}
		}
		if (!getTileObject(rows[i - 1][j]).hasBomb) {
			tile.linked.push(rows[i - 1][j])
		}
		if (j + 1 < numberOfColumns) {
			if (!getTileObject(rows[i - 1][j + 1]).hasBomb) {
				tile.linked.push(rows[i - 1][j + 1])
			}
		}
	}
	if (j - 1 >= 0) {
		if (!getTileObject(rows[i][j - 1]).hasBomb) {
			tile.linked.push(rows[i][j - 1])
		}
	}
	if (j + 1 < numberOfColumns) {
		if (!getTileObject(rows[i][j + 1]).hasBomb) {
			tile.linked.push(rows[i][j + 1])
		}
	}
	if (i + 1 < rows.length) {
		if (j - 1 >= 0) {
			if (!getTileObject(rows[i + 1][j - 1]).hasBomb) {
				tile.linked.push(rows[i + 1][j - 1])
			}
		}
		if (!getTileObject(rows[i + 1][j]).hasBomb) {
			tile.linked.push(rows[i + 1][j])
		}
		if (j + 1 < numberOfColumns) {
			if (!getTileObject(rows[i + 1][j + 1]).hasBomb) {
				tile.linked.push(rows[i + 1][j + 1])
			}
		}
	}
}

function linkBlanks(rows: Rows) {
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i]
		for (let j = 0; j < row.length; j++) {
			const [tile] = row[j]
			if (tile.value === 0) {
				linkBlank(tile, rows, i, j)
			}
		}
	}
}

function getTileObject(
	column: [RowTile, (newTileObject: RowTile) => void],
): RowTile {
	const [tile] = column
	return tile
}

function useTile(
	bombs: boolean[][],
	row: number,
	column: number,
	numberOfRows: number,
	numberOfColumns: number,
): [RowTile, (newTileObject: RowTile) => void] {
	const isDebugging = useStore($isDebugging)

	const tile: RowTile = {
		id: `${row}_${column}`,
		value: -1,
		hasBomb: bombs[row][column],
		activated: isDebugging,
		dead: false,
		flagged: false,
		linked: [] as [RowTile, (newTileObject: RowTile) => void][],
		// TODO refactor our of tile
		activate(setTile) {
			;(this as RowTile).activated = true
			;(this as RowTile).flagged = false
			;(this as RowTile).linked.forEach(([linkedTile, setLinkedTile]) => {
				if (linkedTile.activated) return
				linkedTile.activate(setLinkedTile)
			})
			setTile({
				...(this as RowTile),
			})
		},
	}
	if (!tile.hasBomb) {
		tile.value = getDisplayValue(
			bombs,
			row,
			column,
			numberOfRows,
			numberOfColumns,
		)
	}
	return useState(tile)
}

function getDisplayValue(
	bombs: boolean[][],
	i: number,
	j: number,
	numberOfRows: number,
	numberOfColumns: number,
) {
	let result = 0
	if (i - 1 >= 0) {
		if (j - 1 >= 0) {
			if (bombs[i - 1][j - 1]) result++
		}
		if (bombs[i - 1][j]) result++
		if (j + 1 < numberOfColumns) {
			if (bombs[i - 1][j + 1]) result++
		}
	}
	if (j - 1 >= 0) {
		if (bombs[i][j - 1]) result++
	}
	if (j + 1 < numberOfColumns) {
		if (bombs[i][j + 1]) result++
	}
	if (i + 1 < numberOfRows) {
		if (j - 1 >= 0) {
			if (bombs[i + 1][j - 1]) result++
		}
		if (bombs[i + 1][j]) result++
		if (j + 1 < numberOfColumns) {
			if (bombs[i + 1][j + 1]) result++
		}
	}
	return result
}

function getGameState(rows: Rows, difficulty: Difficulty): GameState {
	let activatedTiles = 0
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i]
		for (let j = 0; j < row.length; j++) {
			const [tile] = row[j]
			if (tile.dead) {
				return GameState.lost
			}
			if (tile.activated) {
				activatedTiles++
			}
		}
	}
	if (activatedTiles === rows.length * rows[0].length - difficulty.bombs) {
		return GameState.won
	}
	return GameState.active
}

function tileIsEven(i: number, j: number): boolean {
	if (i % 2 === 0) {
		return j % 2 === 0
	}
	return j % 2 !== 0
}

const FlexRow: FunctionComponent<{
	children?: ReactNode
	radius: number
}> = ({ children, radius }) => {
	return (
		<div
			className="flex flex-row"
			style={{
				height: `${radius}px`,
			}}
		>
			{children}
		</div>
	)
}

export function Board({ difficulty }: { difficulty: Difficulty }) {
	const isDebugging = useStore($isDebugging)
	const [gameState, setGameState] = useState(GameState.passive)
	const [bombs] = useState<boolean[][]>(
		generateBombPositions(
			difficulty.rows,
			difficulty.columns,
			difficulty.bombs,
		),
	)
	const board = useBoard(difficulty.rows, difficulty.columns, bombs)
	const styles = useStore($boardStyles)
	const [time, setTime] = useState(0)
	const [delay, setDelay] = useState<number | null>(null)

	useEffect(() => {
		if (gameState === GameState.passive) return
		const testState = getGameState(board, difficulty)
		if (testState !== gameState) {
			setGameState(testState)
		}
	})

	useEffect(() => {
		setDelay(gameState === GameState.active ? 1000 : null)
	}, [gameState])

	useInterval(() => {
		setTime(time + 1)
	}, delay)

	return (
		<div className={`font-light text-4xl relative select-none`}>
			{board.map((rows, i) => (
				<FlexRow key={`row-${i}`} radius={styles.radius}>
					{rows.map(([tile, setTile], j) => (
						<Tile
							key={`col-${i}-${j}`}
							id={tile.id}
							display={tile.value > 0 ? tile.value : ''}
							value={tile.value}
							onLeftClick={() => {
								if (gameState > GameState.active) return
								if (tile.activated || tile.flagged) return
								if (tile.hasBomb) {
									tile.dead = true
								}
								tile.activate(setTile)
								if (gameState === GameState.passive) {
									setGameState(GameState.active)
								}
							}}
							onRightClick={() => {
								if (tile.activated) return
								if (gameState !== GameState.active) return
								tile.flagged = !tile.flagged
								setTile({
									...tile,
								})
							}}
							isEven={tileIsEven(i, j)}
							isActivated={tile.activated}
							isDead={tile.dead || (isDebugging && tile.hasBomb)}
							isFlagged={tile.flagged}
						/>
					))}
				</FlexRow>
			))}
			<div className="mt-3">{time}</div>
			<div className="absolute top-full w-full text-center">
				{gameState === GameState.lost ? 'You lost!' : ''}
				{gameState === GameState.won ? 'You won!' : ''}
			</div>
		</div>
	)
}
