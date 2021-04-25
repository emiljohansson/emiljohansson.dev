import { FunctionComponent } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { ArrowBack } from '@styled-icons/material/ArrowBack'
import { spacers, colors } from '../src/styles/variables'

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

const Header: FunctionComponent = ({ children }) => {
  return (
    <HeaderRoot>
      <BackLink
        href="/"
      >
        <a>
          <ArrowBack size="30" title="Back" />
        </a>
      </BackLink>
      <Actions>
        {children}
      </Actions>
    </HeaderRoot>
  )
}

export default Header
