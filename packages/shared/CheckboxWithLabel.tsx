import type { CheckboxProps } from "@radix-ui/react-checkbox"
import { Root, Indicator } from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

interface Props extends CheckboxProps {
	labelText: string
}

export const CheckboxWithLabel = ({ labelText, ...props }: Props) => (
	<div className="flex items-center">
		<Root
			className="bg-white cursor-default w-6 h-6 rounded flex items-center justify-center shadow hover:bg-gray-50"
			defaultChecked
			id="c1"
			{...props}
		>
			<Indicator>
				<CheckIcon className="text-primary" />
			</Indicator>
		</Root>
		<label className="pl-3" htmlFor="c1">
			{labelText}
		</label>
	</div>
)
