import type { FunctionComponent, ReactNode } from 'react'
import {
  Item,
  ItemText,
  ItemIndicator,
} from '@radix-ui/react-select'
import { CheckIcon } from '@radix-ui/react-icons'

const SelectItem: FunctionComponent<{
  children: ReactNode
  value: string | number
  disabled?: boolean
}> = ({
  children,
  value,
  disabled,
}) => (
  <Item
    value={value.toString()}
    disabled={disabled}
    className="
      border-0
      text-sm
      focus:bg-primary
      focus:text-white
      dark:text-primary
      dark:focus:text-white
      focus-visible:outline-none
      rounded
      flex
      items-center
      h-6
      py-0
      px-6
      relative
      select-none
      data-disabled:text-zinc-300
      data-disabled:pointer-events-none
    "
  >
    <ItemText>{children}</ItemText>
    <ItemIndicator
      className="
        absolute
        left-0
        inline-flex
        items-center
        justify-center
        w-6
      "
    >
      <CheckIcon />
    </ItemIndicator>
  </Item>
)

export default SelectItem
