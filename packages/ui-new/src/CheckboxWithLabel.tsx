import { Root, Indicator, type CheckboxProps } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { useUniqueId } from 'lib/hooks/useUniqueId'

interface Props extends CheckboxProps {
	labelText: string
}

export const CheckboxWithLabel = ({ labelText, ...props }: Props) => {
	const id = useUniqueId()

	return (
		<div className="ui-flex ui-items-center">
			<Root
				className="ui-bg-white ui-cursor-default ui-w-6 ui-h-6 ui-rounded ui-flex ui-items-center ui-justify-center ui-shadow hover:ui-bg-gray-50"
				defaultChecked
				id={id}
				{...props}
			>
				<Indicator>
					<CheckIcon className="ui-text-primary" />
				</Indicator>
			</Root>
			<label className="ui-pl-3" htmlFor={id}>
				{labelText}
			</label>
		</div>
	)
}
