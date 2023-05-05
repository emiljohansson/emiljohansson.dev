import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import {
	Root,
	Trigger,
	Portal,
	Content,
	Viewport,
	Icon,
	Value,
	ScrollUpButton,
	ScrollDownButton,
} from '@radix-ui/react-select'
import type { SelectProps } from '@radix-ui/react-select'
import { useState } from 'react'

interface Option {
	value: string
	title: string
}

const scrollButtonClassNames = 'flex items-center justify-center h-7 bg-white'

function getTitleFromValue(options: Option[], selectedValue: string) {
	const option = options.find((option) => option.value === selectedValue)
	return option?.title || ''
}

export default function Select({
	children,
	defaultValue,
	options,
	onValueChange = () => {
		//
	},
}: SelectProps & { options: Option[] }) {
	const [value, setValue] = useState(defaultValue || '')
	return (
		<Root
			value={value}
			onValueChange={(newValue) => {
				setValue(newValue)
				onValueChange(newValue)
			}}
		>
			<Trigger className="select" aria-label="Food">
				<Value aria-label={defaultValue}>
					{getTitleFromValue(options, value)}
				</Value>
				<Icon>
					<ChevronDownIcon />
				</Icon>
			</Trigger>
			<Portal>
				<Content className="overflow-hidden bg-white rounded shadow z-50">
					<ScrollUpButton className={scrollButtonClassNames}>
						<ChevronUpIcon />
					</ScrollUpButton>

					<Viewport className="p-1">{children}</Viewport>

					<ScrollDownButton className={scrollButtonClassNames}>
						<ChevronDownIcon />
					</ScrollDownButton>
				</Content>
			</Portal>
		</Root>
	)
}
