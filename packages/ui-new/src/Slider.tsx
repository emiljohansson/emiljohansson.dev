import type { SliderProps } from '@radix-ui/react-slider'
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider'

interface Props extends Omit<SliderProps, 'defaultValue'> {
	defaultValue: number
	label?: string
}

export const Slider = ({ defaultValue, max, label, ...props }: Props) => (
	<Root
		className="ui-relative ui-flex ui-items-center ui-select-none ui-touch-none ui-w-full ui-h-5"
		defaultValue={[defaultValue]}
		max={max}
		step={1}
		aria-label={label}
		{...props}
	>
		<Track className="ui-bg-gray-600 ui-relative ui-flex-grow ui-rounded-full ui-h-[3px]">
			<Range className="ui-absolute ui-bg-primary ui-rounded-full ui-h-full" />
		</Track>
		<Thumb className="ui-block ui-w-5 ui-h-5 ui-bg-primary ui-shadow-md ui-rounded-full hover:ui-bg-primary-dark" />
	</Root>
)
