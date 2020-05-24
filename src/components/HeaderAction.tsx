import * as React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: transparent;
  border: 0;
`

function Header ({
  children,
  onClick
}: any) {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  )
}

export default Header
