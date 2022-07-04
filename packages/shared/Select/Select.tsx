import { FunctionComponent } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import {
  Root,
  Trigger,
  Content,
  Viewport,
  Icon,
  Value,
  ScrollUpButton,
  ScrollDownButton,
} from '@radix-ui/react-select'
import type { SelectProps } from '@radix-ui/react-select'

const scrollButtonClassNames = 'flex items-center justify-center h-7 bg-white'

const Select: FunctionComponent<SelectProps> = ({ children, defaultValue, onValueChange }) => (
  <Root
    defaultValue={defaultValue}
    onValueChange={onValueChange}
  >
    <Trigger
      className="select"
      aria-label="Food"
    >
      <Value />
      <Icon>
        <ChevronDownIcon />
      </Icon>
    </Trigger>
    <Content className="select-content">
      <ScrollUpButton className={scrollButtonClassNames}>
        <ChevronUpIcon />
      </ScrollUpButton>

      <Viewport className="p-1">
        {children}
      </Viewport>

      <ScrollDownButton className={scrollButtonClassNames}>
        <ChevronDownIcon />
      </ScrollDownButton>
    </Content>
  </Root>
)

export default Select
