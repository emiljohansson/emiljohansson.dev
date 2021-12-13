import { useState, useEffect, createContext, useContext, useReducer, ChangeEvent, useRef, FunctionComponent } from 'react'
import Head from 'next/head'
import { styled } from '@/stitches'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import Header from '@/components/Header'
import Content from '@/components/Content'
import { fonts } from '../src/styles/variables'

function generateBombPositions (size: number, numberOfBombs: number) {
  const list: number[] = []
  while (list.length < numberOfBombs) {
    const value = Math.floor(Math.random() * size)
    if (!hasValue(list, value)) {
      list.push(value);
    }
  }
  return list.sort((a, b) => a - b)
}

const hasValue = (list: number[], value: number) => list.indexOf(value) > -1

interface TileObject {
  id: string
  value: number
  hasBomb: boolean
  activated: boolean
  dead: boolean
  flagged: boolean
  linked: [TileObject, (newTileObject: TileObject) => void][]
  activate: (setTile: (newTile: TileObject) => void) => void
}

function useBoard (numberOfRows: number, numberOfColumns: number, bombs: number[]) {
  const rows: [TileObject, (newTileObject: TileObject) => void][][] = []

  for (let i = 0; i < numberOfRows; i++) {
    let currentRow: [TileObject, (newTileObject: TileObject) => void][] = []
    for (let j = 0; j < numberOfColumns; j++) {
      let currentPosition = (i * 10) + j
      const [tile, setTile] = useTile(bombs, i, j, currentPosition, numberOfColumns)
      currentRow.push([tile, setTile])
    }
    rows.push(currentRow)
  }
  linkBlanks(rows)

  const [board] = useState(rows)

  return board
}

function useTile (bombs: number[], i: number, j: number, currentPosition: number, numberOfColumns: number): [TileObject, (newTileObject: TileObject) => void] {
  const tile = {
    id: `${i}_${j}`,
    value: -1,
    hasBomb: hasValue(bombs, currentPosition),
    activated: false,
    dead: false,
    flagged: false,
    linked: [] as [TileObject, (newTileObject: TileObject) => void][],
    activate (setTile) {
      this.activated = true
      this.flagged = false
      this.linked.forEach(([linkedTile, setLinkedTile]) => {
        if (linkedTile.activated) return
        linkedTile.activate(setLinkedTile)
      })
      setTile({
        ...this
      })
    },
  }
  if (!tile.hasBomb) {
    tile.value = getDisplayValue(bombs, i, j, numberOfColumns)
  }
  return useState(tile)
}

function linkBlanks (rows: [TileObject, (newTileObject: TileObject) => void][][]) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    for (let j = 0; j < row.length; j++) {
      const [tile] = row[j]
      if (tile.value === 0) {
        linkBlank(tile, rows, i , j)
      }
    }
  }
}

function linkBlank (tile: TileObject, rows: [TileObject, (newTileObject: TileObject) => void][][], i , j) {
  const numberOfColumns = rows[i].length
  if (i - 1 >= 0) {
    if (j - 1 >= 0) {
      if (!getTileObject(rows[i - 1][j - 1]).hasBomb) tile.linked.push(rows[i - 1][j - 1])
    }
    if (!getTileObject(rows[i - 1][j]).hasBomb) tile.linked.push(rows[i - 1][j])
    if (j + 1 < numberOfColumns) {
      if (!getTileObject(rows[i - 1][j + 1]).hasBomb) tile.linked.push(rows[i - 1][j + 1])
    }
  }
  if (j - 1 >= 0) {
    if (!getTileObject(rows[i][j - 1]).hasBomb) tile.linked.push(rows[i][j - 1])
  }
  if (j + 1 < numberOfColumns) {
    if (!getTileObject(rows[i][j + 1]).hasBomb) tile.linked.push(rows[i][j + 1])
  }
  if (i + 1 < rows.length) {
    if (j - 1 >= 0) {
      if (!getTileObject(rows[i + 1][j - 1]).hasBomb) tile.linked.push(rows[i + 1][j - 1])
    }
    if (!getTileObject(rows[i + 1][j]).hasBomb) tile.linked.push(rows[i + 1][j])
    if (j + 1 < numberOfColumns) {
      if (!getTileObject(rows[i + 1][j + 1]).hasBomb) tile.linked.push(rows[i + 1][j + 1])
    }
  }
}

function getTileObject (column: [TileObject, (newTileObject: TileObject) => void]): TileObject {
  const [tile] = column
  return tile
}


function getDisplayValue (bombs, i, j, numberOfColumns) {
  let result = 0
  if (i - 1 >= 0) {
    if (j - 1 >= 0) {
      if (hasValue(bombs, ((i - 1) * 10 + j - 1))) result++
    }
    if (hasValue(bombs, ((i - 1) * 10 + j))) result++
    if (j + 1 < numberOfColumns) {
      if (hasValue(bombs, ((i - 1) * 10 + j + 1))) result++
    }
  }
  if (j - 1 >= 0) {
    if (hasValue(bombs, ((i) * 10 + j - 1))) result++
  }
  if (j + 1 < numberOfColumns) {
    if (hasValue(bombs, ((i) * 10 + j + 1))) result++
  }
  if (i + 1 < bombs.length) {
    if (j - 1 >= 0) {
      if (hasValue(bombs, ((i + 1) * 10 + j - 1))) result++
    }
    if (hasValue(bombs, ((i + 1) * 10 + j))) result++
    if (j + 1 < numberOfColumns) {
      if (hasValue(bombs, ((i + 1) * 10 + j + 1))) result++
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
}) => {
  const context = useContext(BoardContext)

  return (
    <StyledTile
      onContextMenu={(event)=> {
        event.preventDefault()
        onRightClick()
      }}
      onClick={onLeftClick}
      css={{
        fontSize: `${context.fontSize}rem`,
        height: `${context.radius}px`,
        width: `${context.radius}px`,
        backgroundColor: getTileBackgroundColor({
          isFlagged,
          isDead,
          isActivated,
          isEven,
        })
      }}
    >{isActivated ? display : ''}</StyledTile>
  )
}

const StyledFlexRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

const FlexRow: FunctionComponent<{ radius: number }> = ({ children, radius }) => {
  return <StyledFlexRow css={{
    height: `${radius}px`
  }}>
    {children}
  </StyledFlexRow>
}

const StyledTile = styled('button', {
  backgroundColor: '#1982C4',
  border: '3px solid rgba(0, 0, 0, 0.1)',
  lineHeight: '1.2',
  textAlign: 'center',
})

const getTileBackgroundColor = ({
  isFlagged,
  isDead,
  isActivated,
  isEven,
}) => {
  if (isFlagged) {
    return '#1982C4'
  }
  if (isDead) {
    return '#FF595E'
  }
  if (isActivated) {
    return isEven ? '#8AC926' : '#98D831'
  }
  return isEven ? 'aliceblue' : 'antiquewhite'
}

function isEven(i: number, j: number): boolean {
  if (i % 2 === 0) {
    return j % 2 === 0
  }
  return j % 2 !== 0
}

const StyledBoard = styled('div', {
  fontFamily: 'MuseoModerno',
  fontWeight: '300',
  fontSize: '2.6rem',
  userSelect: 'none',
  position: 'relative',
})

enum GameState {
  passive,
  active,
  won,
  lost,
}

function getGameState (board, difficulty: Difficulty): GameState {
  let activatedTiles = 0
  for (let i = 0; i < board.length; i++) {
    const row = board[i]
    for (let j = 0; j < row.length; j++) {
      const [tile]: [TileObject] = row[j]
      if (tile.dead) {
        return GameState.lost
      }
      if (tile.activated) {
        activatedTiles++
      }
    }
  }
  if (activatedTiles === (board.length * board[0].length) - difficulty.bombs) {
    return GameState.won
  }
  return GameState.active
}

const GameOverMessage = styled('div', {
  fontFamily: fonts.baseFontFamily,
  position: 'absolute',
  top: '100%',
  textAlign: 'center',
  width: '100%',
})

function useInterval (callback, delay) {
  const savedCallback = useRef(() => {})

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay === null) return
    function tick () {
      savedCallback.current()
    }
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

const Board = ({
  difficulty
}) => {
  const [gameState, setGameState] = useState(GameState.passive)
  const board = useBoard(difficulty.rows, difficulty.columns, generateBombPositions(difficulty.rows * difficulty.columns, difficulty.bombs))
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

  return <>
    <StyledBoard>
      {
        board.map((rows, i) => (
          <FlexRow
            key={`row-${i}`}
            radius={context.radius}
          >
            {
              rows.map(([tile, setTile], j) => {
                return <Tile
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
                      ...tile
                    })
                  }}
                  isEven={isEven(i, j)}
                  isActivated={tile.activated}
                  isDead={tile.dead}
                  isFlagged={tile.flagged}
                />
              })
            }
          </FlexRow>
        ))
      }
      <div>{time}</div>
      <GameOverMessage>
        {gameState === GameState.lost ? 'You lost!' : ''}
        {gameState === GameState.won ? 'You won!' : ''}
      </GameOverMessage>
    </StyledBoard>
  </>
}

interface BoardStyle {
  radius: number
  fontSize: number
}

const boards = {
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
    fontSize: 1.3,
  } as BoardStyle,
}

const BoardContext = createContext(boards.easy)

enum SelectedDifficulty {
  loading,
  easy,
  medium,
  hard,
}

interface Difficulty {
  title: string
  bombs: number
  rows: number
  columns: number
}

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

interface DifficultyState {
  type: SelectedDifficulty
  level: Difficulty
  board: BoardStyle
  queueType?: SelectedDifficulty
}

const initialState = {
  type: SelectedDifficulty.easy,
  level: easy,
  board: boards.easy,
}

function difficultyReducer (state: DifficultyState, action: { type: SelectedDifficulty, queueType?: SelectedDifficulty }) {
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
      board: boards.medium,
    }
  }
  if (action.type === SelectedDifficulty.hard) {
    return {
      type: SelectedDifficulty.hard,
      level: hard,
      board: boards.hard,
    }
  }
  return initialState
}

const MSPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useReducer(difficultyReducer, initialState)

  useEffect(() => {
    if (selectedDifficulty.type !== SelectedDifficulty.loading) return
    const timer = setTimeout(() => {
      setSelectedDifficulty({ type: (selectedDifficulty as any).queueType || SelectedDifficulty.easy })
    })
    return () => clearTimeout(timer)
  }, [selectedDifficulty])

  return (
    <Layout>
      <Head>
        <title>ms</title>
        <meta name="description" content="ms" />
      </Head>
      <Content>
        <Header />
        <Section
          direction="column"
        >
          <button onClick={() => {
            setSelectedDifficulty({ type: SelectedDifficulty.loading, queueType: selectedDifficulty.type })
          }}>Restart</button>
          <select onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setSelectedDifficulty({ type: SelectedDifficulty.loading, queueType: Number(event.target.value) })
          }}>
            <option value={SelectedDifficulty.easy}>{easy.title}</option>
            <option value={SelectedDifficulty.medium}>{medium.title}</option>
            <option value={SelectedDifficulty.hard}>{hard.title}</option>
          </select>
          {selectedDifficulty.type === SelectedDifficulty.loading
            ? <div></div>
            : <BoardContext.Provider value={selectedDifficulty.board}>
              <Board
                difficulty={selectedDifficulty.level}
              />
            </BoardContext.Provider>
          }
        </Section>
      </Content>
    </Layout>
  )
}

export default MSPage
