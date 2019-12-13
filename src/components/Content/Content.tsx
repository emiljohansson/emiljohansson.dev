import * as React from 'react'
import './Content.scss'

function Content ({
  children
}: React.Props<any>) {
  return (
    <article className="Content">
      {children}
    </article>
  )
}

export default Content
