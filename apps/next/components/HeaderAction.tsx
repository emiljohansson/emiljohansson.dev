import { FunctionComponent, ReactNode } from 'react'

const Header: FunctionComponent<{
  children?: ReactNode
  onClick: () => void
}> = ({ children, onClick }) => <button
  className="ml-2"
  onClick={onClick}
>{children}</button>

export default Header
