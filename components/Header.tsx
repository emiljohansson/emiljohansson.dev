import { FunctionComponent } from 'react'
import Link from 'next/link'
import { styled } from '@/stitches'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { spacers, colors } from '../src/styles/variables'

const HeaderRoot = styled('header', {
  backgroundColor: colors.white,
  display: 'flex',
  fontSize: '1.4rem',
  lineHeight: '0',
  padding: spacers[3],
  width: '100%',
})

const BackLink = styled('a', {
  lineHeight: 1,
  padding: 0,

  '&, &:hover': {
    color: colors.primary,
  },
})

const Actions = styled('div', {
  marginLeft: 'auto'
})

const Header: FunctionComponent = ({ children }) => {
  return (
    <HeaderRoot>
      <Link
        href="/"
        passHref
      >
        <BackLink>
          <ArrowLeftIcon width={30} height={30} />
          <span className="sr-only">Back</span>
        </BackLink>
      </Link>
      <Actions>
        {children}
      </Actions>
    </HeaderRoot>
  )
}

export default Header
