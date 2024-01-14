import { useStore } from '@nanostores/react'
import { $boardStyles, $isDebugging } from './store'

interface StatesProps {
	isFlagged: boolean
	isDead: boolean
	isActivated: boolean
	isEven: boolean
}

interface TileProps extends StatesProps {
	id: string
	display: string | number
	value: number
	onLeftClick: () => void
	onRightClick: () => void
}

const colors = {
	flagged: '#1982C4',
	dead: '#FF595E',
	activeEven: '#8AC926',
	activeOdd: '#98D831',
	uncheckedEven: 'aliceblue',
	uncheckedOdd: 'antiquewhite',
} as const

const getTileBackgroundColor = ({
	isFlagged,
	isDead,
	isActivated,
	isEven,
}: StatesProps) => {
	if (isFlagged) {
		return colors.flagged
	}
	if (isDead) {
		return colors.dead
	}
	if (isActivated) {
		return isEven ? colors.activeEven : colors.activeOdd
	}
	return isEven ? colors.uncheckedEven : colors.uncheckedOdd
}

export function Tile({
	id,
	display,
	value,
	onLeftClick,
	onRightClick,
	isEven,
	isActivated,
	isDead,
	isFlagged,
}: TileProps) {
	const isDebugging = useStore($isDebugging)
	const styles = useStore($boardStyles)
	const displayValue = isActivated ? display : ''

	return (
		<button
			data-testid={`tile-${id}`}
			data-debug-value={isDebugging ? value : ''}
			className="
					leading-none text-center focus:outline-none 
					border-[3px] border-opacity-10 border-black
					focus:border-opacity-40
				"
			onContextMenu={(event) => {
				event.preventDefault()
				onRightClick()
			}}
			onClick={onLeftClick}
			style={{
				fontSize: `${styles.fontSize}rem`,
				height: `${styles.radius}px`,
				width: `${styles.radius}px`,
				backgroundColor: getTileBackgroundColor({
					isFlagged,
					isDead,
					isActivated,
					isEven,
				}),
			}}
		>
			{displayValue}
		</button>
	)
}
