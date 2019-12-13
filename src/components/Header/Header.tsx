import * as React from 'react'
import { Link } from 'gatsby'
import './Header.scss'

const name: string = 'Header'

function Header ({
  children
}: React.Props<any>) {
  return (
    <header className={`${name}`}>
      <Link
        to="/"
        className={`${name}__back`}
      >
        <i className="fas fa-arrow-left" />
      </Link>
      <div className={`${name}__actions`}>
        {children}
      </div>
    </header>
  )
}

export default Header
