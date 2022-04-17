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
      className="
        inline-flex
        items-center
        justify-center
        cursor-default
        shadow
        rounded
        gap-1
        py-0
        px-4
        h-8
        hover:bg-gray-50
        dark:bg-white
        dark:hover:bg-blue-50
        dark:text-orange
      "
      aria-label="Food"
    >
      <Value />
      <Icon>
        <ChevronDownIcon />
      </Icon>
    </Trigger>
    <Content className="overflow-hidden bg-white rounded shadow">
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
