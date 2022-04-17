import { FunctionComponent } from 'react'
import {
  Label,
} from '@radix-ui/react-select'

const SelectLabel: FunctionComponent = ({ children }) => (
  <Label className="text-slate-600 text-xs leading-6 py-0 px-6">{children}</Label>
)

export default SelectLabel