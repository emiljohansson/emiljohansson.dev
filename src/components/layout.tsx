import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import './layout.scss'

interface Props {
  children: any
}

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={() => (
      <>
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <main>{children}</main>
        <footer></footer>
      </>
    )}
  />
)

export default Layout
