import type { PropsWithChildren } from 'react'
import { Label } from '@radix-ui/react-select'

const SelectLabel = ({ children }: PropsWithChildren) => (
  <Label className="select-label">{children}</Label>
)

export default SelectLabel
