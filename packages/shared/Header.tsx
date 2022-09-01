import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="flex font p-4">
      <Link href="/">
        <a data-test="back-link">
          <ArrowLeftIcon width={30} height={30} />
          <span className="sr-only">Back</span>
        </a>
      </Link>
      <div className="ml-auto">{children}</div>
    </header>
  )
}

export default Header
