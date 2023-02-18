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

const scrollButtonClassNames = 'flex items-center justify-center h-7 bg-white'

const Select = ({ children, defaultValue, onValueChange }: SelectProps) => (
	<Root defaultValue={defaultValue} onValueChange={onValueChange}>
		<Trigger className="select" aria-label="Food">
			<Value />
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

export default Select
