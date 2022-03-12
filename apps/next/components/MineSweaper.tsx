import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  ChangeEvent,
  FunctionComponent,
} from 'react'
import useInterval from 'lib/hooks/useInterval'
import { includes } from 'lib/utils/array'

enum SelectedDifficulty {
  loading,
  easy,
  medium,
  hard,
}

enum GameState {
  passive,
  active,
  won,
  lost,
}

interface BoardStyle {
  radius: number
  fontSize: number
}

interface Difficulty {
  title: string
  bombs: number
  rows: number
  columns: number
}

interface DifficultyState {
  type: SelectedDifficulty
  level: Difficulty
  board: BoardStyle
  queueType?: SelectedDifficulty
}

interface Tile {
  id: string
  value: number
  hasBomb: boolean
  activated: boolean
  dead: boolean
  flagged: boolean
  linked: [Tile, (newTileObject: Tile) => void][]
  activate: (setTile: (newTile: Tile) => void) => void
}

interface StatesProps {
  isFlagged: boolean
  isDead: boolean
  isActivated: boolean
  isEven: boolean
}

interface TileProps extends StatesProps {
  display: string | number
  onLeftClick: () => void
  onRightClick: () => void
}

type Rows = [Tile, (newTileObject: Tile) => void][][]

enum Colors {
  flagged = '#1982C4',
  dead = '#FF595E',
  activeEven = '#8AC926',
  activeOdd = '#98D831',
  uncheckedEven = 'aliceblue',
  uncheckedOdd = 'antiquewhite',
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

const BoardContext = createContext(boardStyles.easy)

const easy = {
  title: 'Easy',
  bombs: 10,
  rows: 8,
  columns: 10,
} as Difficulty
const medium = {
  title: 'Medium',
  bombs: 40,
  rows: 14,
  columns: 18,
} as Difficulty
const hard = {
  title: 'Hard',
  bombs: 99,
  rows: 20,
  columns: 24,
} as Difficulty

const initialState: DifficultyState = {
  type: SelectedDifficulty.easy,
  level: easy,
  board: boardStyles.easy,
}

function generateBombPositions (size: number, numberOfBombs: number) {
  const list: number[] = []
  while (list.length < numberOfBombs) {
    const value = Math.floor(Math.random() * size)
    if (!includes(list, value)) {
      list.push(value)
    }
  }
  return list.sort((a, b) => a - b)
}

function useBoard (
  numberOfRows: number,
  numberOfColumns: number,
  bombs: number[],
) {
  const rows: Rows = []

  for (let i = 0; i < numberOfRows; i++) {
    const currentRow: [Tile, (newTileObject: Tile) => void][] = []
    for (let j = 0; j < numberOfColumns; j++) {
      const currentPosition = i * 10 + j
      // TODO fix possible loop
      const [tile, setTile] = useTile(
        bombs,
        i,
        j,
        currentPosition,
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

function useTile (
  bombs: number[],
  i: number,
  j: number,
  currentPosition: number,
  numberOfColumns: number,
): [Tile, (newTileObject: Tile) => void] {
  const tile: Tile = {
    id: `${i}_${j}`,
    value: -1,
    hasBomb: includes(bombs, currentPosition),
    activated: false,
    dead: false,
    flagged: false,
    linked: [] as [Tile, (newTileObject: Tile) => void][],
    // TODO refactor our of tile
    activate (setTile) {
      (this as Tile).activated = true
      ;(this as Tile).flagged = false
      ;(this as Tile).linked.forEach(([linkedTile, setLinkedTile]) => {
        if (linkedTile.activated) return
        linkedTile.activate(setLinkedTile)
      })
      setTile({
        ...(this as Tile),
      })
    },
  }
  if (!tile.hasBomb) {
    tile.value = getDisplayValue(bombs, i, j, numberOfColumns)
  }
  return useState(tile)
}

function linkBlanks (rows: Rows) {
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

function linkBlank (
  tile: Tile,
  rows: Rows,
  i: number,
  j: number,
) {
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

function getTileObject (column: [Tile, (newTileObject: Tile) => void]): Tile {
  const [tile] = column
  return tile
}

function getDisplayValue (bombs: number[], i: number, j: number, numberOfColumns: number) {
  let result = 0
  if (i - 1 >= 0) {
    if (j - 1 >= 0) {
      if (includes(bombs, (i - 1) * 10 + j - 1)) result++
    }
    if (includes(bombs, (i - 1) * 10 + j)) result++
    if (j + 1 < numberOfColumns) {
      if (includes(bombs, (i - 1) * 10 + j + 1)) result++
    }
  }
  if (j - 1 >= 0) {
    if (includes(bombs, i * 10 + j - 1)) result++
  }
  if (j + 1 < numberOfColumns) {
    if (includes(bombs, i * 10 + j + 1)) result++
  }
  if (i + 1 < bombs.length) {
    if (j - 1 >= 0) {
      if (includes(bombs, (i + 1) * 10 + j - 1)) result++
    }
    if (includes(bombs, (i + 1) * 10 + j)) result++
    if (j + 1 < numberOfColumns) {
      if (includes(bombs, (i + 1) * 10 + j + 1)) result++
    }
  }
  return result
}

const Tile = ({
  display,
  onLeftClick,
  onRightClick,
  isEven,
  isActivated,
  isDead,
  isFlagged,
}: TileProps) => {
  const context = useContext(BoardContext)

  return (
    <>
      <style jsx>{`
        button {
          background-color: ${Colors.flagged};
          border: 3px solid rgba(0, 0, 0, 0.1);
        }
        button:focus {
          border-color: rgba(0, 0, 0, 0.4);
        }
      `}</style>
      <button
        className="leading-none text-center focus:outline-none"
        onContextMenu={(event) => {
          event.preventDefault()
          onRightClick()
        }}
        onClick={onLeftClick}
        style={{
          fontSize: `${context.fontSize}rem`,
          height: `${context.radius}px`,
          width: `${context.radius}px`,
          backgroundColor: getTileBackgroundColor({
            isFlagged,
            isDead,
            isActivated,
            isEven,
          }),
        }}
      >
        {isActivated ? display : ''}
      </button>
    </>
  )
}

const FlexRow: FunctionComponent<{ radius: number }> = ({
  children,
  radius,
}) => {
  return (
    <div className="flex flex-row"
      style={{
        height: `${radius}px`,
      }}
    >
      {children}
    </div>
  )
}

const getTileBackgroundColor = ({
  isFlagged,
  isDead,
  isActivated,
  isEven,
}: StatesProps) => {
  if (isFlagged) {
    return Colors.flagged
  }
  if (isDead) {
    return Colors.dead
  }
  if (isActivated) {
    return isEven ? Colors.activeEven : Colors.activeOdd
  }
  return isEven ? Colors.uncheckedEven : Colors.uncheckedOdd
}

function getGameState (rows: Rows, difficulty: Difficulty): GameState {
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

function tileIsEven (i: number, j: number): boolean {
  if (i % 2 === 0) {
    return j % 2 === 0
  }
  return j % 2 !== 0
}

const Board = ({ difficulty }: { difficulty: Difficulty }) => {
  const [gameState, setGameState] = useState(GameState.passive)
  const board = useBoard(
    difficulty.rows,
    difficulty.columns,
    generateBombPositions(
      difficulty.rows * difficulty.columns,
      difficulty.bombs,
    ),
  )
  const context = useContext(BoardContext)
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
    <div className="font-museo-moderno font-light text-4xl relative select-none">
      {board.map((rows, i) => (
        <FlexRow key={`row-${i}`} radius={context.radius}>
          {rows.map(([tile, setTile], j) => (
            <Tile
              key={`col-${i}-${j}`}
              display={tile.value > 0 ? tile.value : ''}
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
              isDead={tile.dead}
              isFlagged={tile.flagged}
            />
          ))}
        </FlexRow>
      ))}
      <div className="mt-3">{time}</div>
      <div className="font-sans absolute top-full w-full text-center">
        {gameState === GameState.lost ? 'You lost!' : ''}
        {gameState === GameState.won ? 'You won!' : ''}
      </div>
    </div>
  )
}

function difficultyReducer (
  state: DifficultyState,
  action: { type: SelectedDifficulty; queueType?: SelectedDifficulty },
) {
  if (action.type === SelectedDifficulty.loading) {
    return {
      type: SelectedDifficulty.loading,
      level: null,
      board: {} as BoardStyle,
      queueType: action.queueType,
    }
  }
  if (action.type === SelectedDifficulty.medium) {
    return {
      type: SelectedDifficulty.medium,
      level: medium,
      board: boardStyles.medium,
    }
  }
  if (action.type === SelectedDifficulty.hard) {
    return {
      type: SelectedDifficulty.hard,
      level: hard,
      board: boardStyles.hard,
    }
  }
  return initialState
}

const MineSweaper = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useReducer(
    difficultyReducer,
    initialState,
  )

  useEffect(() => {
    if (selectedDifficulty.type !== SelectedDifficulty.loading) return
    const timer = setTimeout(() => {
      setSelectedDifficulty({
        type: selectedDifficulty.queueType || SelectedDifficulty.easy,
      })
    })
    return () => clearTimeout(timer)
  }, [selectedDifficulty])

  return (
    <>
      <button
        onClick={() => {
          setSelectedDifficulty({
            type: SelectedDifficulty.loading,
            queueType: selectedDifficulty.type,
          })
        }}
      >
        Restart
      </button>
      <select
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          setSelectedDifficulty({
            type: SelectedDifficulty.loading,
            queueType: Number(event.target.value),
          })
        }}
      >
        <option value={SelectedDifficulty.easy}>{easy.title}</option>
        <option value={SelectedDifficulty.medium}>{medium.title}</option>
        <option value={SelectedDifficulty.hard}>{hard.title}</option>
      </select>
      {
        selectedDifficulty.type === SelectedDifficulty.loading
          ? <div></div>
          : (
            <BoardContext.Provider value={selectedDifficulty.board}>
              <Board difficulty={selectedDifficulty.level} />
            </BoardContext.Provider>
            )
      }
    </>
  )
}

export default MineSweaper
