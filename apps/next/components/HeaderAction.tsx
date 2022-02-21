import { FunctionComponent } from 'react'

const Header: FunctionComponent<{
  onClick: () => void
}> = ({ children, onClick }) => <button
  className="ml-2"
  onClick={onClick}
>{children}</button>

export default Header
