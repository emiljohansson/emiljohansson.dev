import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { ArrowBack } from '@styled-icons/material/ArrowBack'
import { spacers, colors } from '../styles/variables'

const HeaderRoot = styled.header`
  background-color: $white;
  display: flex;
  font-size: 1.4rem;
  line-height: 0;
  padding: ${spacers[3]};
  width: 100%;
`

const BackLink = styled(Link)`
  line-height: 1;
  padding: 0;

  &,
  &:hover {
    color: ${colors.primary};
  }
`

const Actions = styled.div`
  margin-left: auto;
`

function Header ({
  children
}: React.Props<any>) {
  return (
    <HeaderRoot>
      <BackLink
        to="/"
      >
        <ArrowBack size="30" title="Back" />
      </BackLink>
      <Actions>
        {children}
      </Actions>
    </HeaderRoot>
  )
}

export default Header
