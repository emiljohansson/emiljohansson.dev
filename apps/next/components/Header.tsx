import { FunctionComponent } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

const Header: FunctionComponent = ({ children }) => {
  return (
    <header className="flex font p-4">
      <Link href="/" passHref>
        <a>
          <ArrowLeftIcon width={30} height={30} />
          <span className="sr-only">Back</span>
        </a>
      </Link>
      <div className="ml-auto">{children}</div>
    </header>
  )
}

export default Header
