import { FunctionComponent } from 'react'
import { styled } from '@/stitches'

const Button = styled('button', {
  backgroundColor: 'transparent',
  border: '0',
  marginLeft: '0.5rem',
})

const Header: FunctionComponent<{
  onClick: () => void
}> = ({ children, onClick }) => <Button onClick={onClick}>{children}</Button>

export default Header
