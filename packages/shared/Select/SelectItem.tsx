import type { PropsWithChildren } from 'react'
import {
  Item,
  ItemText,
  ItemIndicator,
} from '@radix-ui/react-select'
import { CheckIcon } from '@radix-ui/react-icons'

const SelectItem = ({
  children,
  value,
  disabled,
}: PropsWithChildren<{
  value: string | number
  disabled?: boolean
}>) => (
  <Item
    value={value.toString()}
    disabled={disabled}
    className="select-item"
  >
    <ItemText>{children}</ItemText>
    <ItemIndicator className="select-item-indicator">
      <CheckIcon />
    </ItemIndicator>
  </Item>
)

export default SelectItem
