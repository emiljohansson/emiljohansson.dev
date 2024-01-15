import type { Card } from 'src/types/card-games'
import { classNames } from 'lib/utils/string'

export const Image = ({
	card,
	cardImage,
}: {
	card: Card
	cardImage: string
}) => (
	<img
		src={`/images/cards/${cardImage}.png`}
		alt={card?.combined ?? 'blank card'}
		className={classNames(
			`
			border-4 border-transparent border-solid rounded-lg
			relative top-0 left-0
			mx-auto
			w-[calc(100%-0px)]
		`,
			{
				'bg-primary': card?.selected,
			},
		)}
	/>
)
