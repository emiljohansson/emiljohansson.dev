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
    className="select-item"
  >
    <ItemText>{children}</ItemText>
    <ItemIndicator className="select-item-indicator">
      <CheckIcon />
    </ItemIndicator>
  </Item>
)

export default SelectItem
