import type { FunctionComponent, ReactNode } from 'react'
import { Label } from '@radix-ui/react-select'

const SelectLabel: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <Label className="select-label">{children}</Label>
)

export default SelectLabel
