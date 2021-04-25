import { FunctionComponent } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: transparent;
  border: 0;

  &:last-child {
    margin: 0;
  }
`

const Header: FunctionComponent<{
  onClick: () => void
}> = ({
  children,
  onClick,
}) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  )
}

export default Header
