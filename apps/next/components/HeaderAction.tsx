import { FunctionComponent, ReactNode } from 'react'

const Header: FunctionComponent<{
  children?: ReactNode
  onClick: () => void
  attributes?: { [key: string]: string }[]
}> = ({ children, onClick, ...attributes }) => <button
  className="ml-2"
  onClick={onClick}
  {...attributes}
>{children}</button>

export default Header
