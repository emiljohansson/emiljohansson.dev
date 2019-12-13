import * as React from 'react'
import './HeaderAction.scss'

const name: string = 'HeaderAction'

function Header ({
  children,
  onClick
}: any) {
  return (
    <button
      className={`${name}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Header
