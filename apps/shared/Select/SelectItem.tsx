import { FunctionComponent } from 'react'
import {
  Item,
  ItemText,
  ItemIndicator,
} from '@radix-ui/react-select'
import { CheckIcon } from '@radix-ui/react-icons'

const StyledItem: FunctionComponent<{ value: string, disabled?: boolean }> = ({ children, value, disabled }) => (
  <Item
    value={value}
    disabled={disabled}
    className="
      border-0
      text-sm
      focus:bg-orange
      focus:text-white
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
    {children}
  </Item>
)

const StyledItemIndicator: FunctionComponent = ({ children }) => (
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
    {children}
  </ItemIndicator>
)

const SelectItem: FunctionComponent<{
  value: string
  disabled?: boolean
}> = ({
  children,
  value,
  disabled,
}) => (
  <StyledItem value={value} disabled={disabled}>
    <ItemText>{children}</ItemText>
    <StyledItemIndicator>
      <CheckIcon />
    </StyledItemIndicator>
  </StyledItem>
)

export default SelectItem
