import { Root, Indicator, type CheckboxProps } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { useUniqueId } from 'lib/hooks/useUniqueId'

interface Props extends CheckboxProps {
	labelText: string
}

export const CheckboxWithLabel = ({ labelText, ...props }: Props) => {
	const id = useUniqueId()

	return (
		<div className="flex items-center">
			<Root
				className="bg-white cursor-default w-6 h-6 rounded flex items-center justify-center shadow hover:bg-gray-50"
				defaultChecked
				id={id}
				{...props}
			>
				<Indicator>
					<CheckIcon className="text-primary" />
				</Indicator>
			</Root>
			<label className="pl-3" htmlFor={id}>
				{labelText}
			</label>
		</div>
	)
}
