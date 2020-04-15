import * as React from 'react'
import styled from 'styled-components'
import { spacers } from '../../styles/variables'

const Button = styled.button`
  background-color: transparent;
  border: 0;
  margin-left: ${spacers[3]};
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
