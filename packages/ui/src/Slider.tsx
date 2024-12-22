import type { SliderProps } from '@radix-ui/react-slider'
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider'

interface Props extends Omit<SliderProps, 'defaultValue'> {
	defaultValue: number
	label?: string
}

export const Slider = ({ defaultValue, max, label, ...props }: Props) => (
	<Root
		className="relative flex items-center select-none touch-none w-full h-5"
		defaultValue={[defaultValue]}
		max={max}
		step={1}
		aria-label={label}
		{...props}
	>
		<Track className="bg-gray-600 relative flex-grow rounded-full h-[3px]">
			<Range className="absolute bg-primary rounded-full h-full" />
		</Track>
		<Thumb className="block w-5 h-5 bg-primary shadow-md rounded-full hover:bg-primary-dark" />
	</Root>
)
